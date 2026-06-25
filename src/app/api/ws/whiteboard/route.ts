import { NextResponse } from 'next/server';

interface CanvasVectorElement {
  id: string;
  type: 'draw' | 'rectangle' | 'circle';
  points: { x: number; y: number }[];
  color: string;
  strokeWidth: number;
}

interface WhiteboardRoomState {
  roomId: string;
  activeElements: Record<string, CanvasVectorElement>;
  // Maps individual ClientID hash strings to high-resolution system timestamps
  peerRegistry: Record<string, number>;
}

// Global in-memory cache bucket to preserve line data strings without database lag
const dynamicRoomCacheStore: Record<string, WhiteboardRoomState> = {};

/**
 * POST Endpoint: Processes inbound drawing strokes and refreshes active peer registries.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, clientId, element } = body;

    if (!roomId || !clientId) {
      return NextResponse.json({ error: 'Missing critical parameters: roomId or clientId.' }, { status: 400 });
    }

    // Provision an isolated room sector container if it is the first check-in instance
    if (!dynamicRoomCacheStore[roomId]) {
      dynamicRoomCacheStore[roomId] = {
        roomId,
        activeElements: {},
        peerRegistry: {},
      };
    }

    const targetRoom = dynamicRoomCacheStore[roomId];
    
    // Log or refresh this specific browser window node's check-in timestamp
    targetRoom.peerRegistry[clientId] = Date.now();

    // If the network request carries a drawing stroke vector, commit it to memory
    if (element && element.id) {
      targetRoom.activeElements[element.id] = element;
    }

    // CLEANUP PROCESS: Sweep the registry and kick out any tab that hasn't pulsed in 8 seconds
    const rightNow = Date.now();
    const activeClients: string[] = [];

    Object.entries(targetRoom.peerRegistry).forEach(([peerId, lastHeartbeat]) => {
      if (rightNow - lastHeartbeat < 8000) {
        activeClients.push(peerId);
      } else {
        // Drop stagnant web windows from memory allocations
        delete targetRoom.peerRegistry[peerId];
      }
    });

    // Return the clean live count along with all drawn elements to make them sync across screens
    return NextResponse.json(
      {
        status: 'CONNECTED',
        roomId: targetRoom.roomId,
        totalConnectedPeers: activeClients.length,
        canvasSnapshot: Object.values(targetRoom.activeElements),
      },
      { status: 200 }
    );
  } catch (apiException: any) {
    console.error('Whiteboard router processing failure:', apiException.message);
    return NextResponse.json({ error: 'Internal server architecture failure.' }, { status: 500 });
  }
}

/**
 * DELETE Endpoint: Handles graceful window closure events.
 */
export async function DELETE(request: Request) {
  try {
    const { roomId, clientId } = await request.json();

    if (dynamicRoomCacheStore[roomId] && dynamicRoomCacheStore[roomId].peerRegistry[clientId]) {
      delete dynamicRoomCacheStore[roomId].peerRegistry[clientId];
    }

    return NextResponse.json({ status: 'DISCONNECTED' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed cleanup disconnect cycle.' }, { status: 500 });
  }
}
