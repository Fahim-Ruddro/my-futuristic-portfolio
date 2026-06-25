"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface DrawPoint {
  x: number;
  y: number;
}

interface SavedElement {
  id: string;
  type: "draw" | "rectangle" | "circle";
  points: DrawPoint[];
  color: string;
  strokeWidth: number;
}

export function useWhiteboardSocket(roomId: string) {
  const [connectedPeers, setConnectedPeers] = useState<number>(1);
  const [remoteElements, setRemoteElements] = useState<Record<string, SavedElement>>({});
  
  // Guarantee a completely unique crypto client hash signature for each browser process profile window
  const [clientId] = useState<string>(() => {
    const randomHex = Math.random().toString(36).substring(2, 15);
    return `usr_${Date.now().toString(36)}_${randomHex}`;
  });
  
  const networkSyncIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const broadcastElementMutation = useCallback(async (element: SavedElement) => {
    try {
      await fetch("/api/ws/whiteboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
          clientId,
          element,
        }),
      });
    } catch (networkError) {
      console.error("Failed to broadcast canvas structural delta:", networkError);
    }
  }, [roomId, clientId]);

  const synchronizationPulse = useCallback(async () => {
    try {
      const response = await fetch("/api/ws/whiteboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, clientId }),
      });

      if (!response.ok) return;

      const metadata = await response.json();
      setConnectedPeers(metadata.totalConnectedPeers || 1);
      
      if (metadata.canvasSnapshot) {
        const structuralMap: Record<string, SavedElement> = {};
        metadata.canvasSnapshot.forEach((element: SavedElement) => {
          if (element && element.id) {
            structuralMap[element.id] = element;
          }
        });
        setRemoteElements(structuralMap);
      }
    } catch (pulseError) {
      console.error("Synchronization loop heartbeat skipped:", pulseError);
    }
  }, [roomId, clientId]);

  useEffect(() => {
    synchronizationPulse();

    // Accelerated heartbeat: run sync collections every 1000ms for tight user coordination
    networkSyncIntervalRef.current = setInterval(synchronizationPulse, 1000);

    return () => {
      if (networkSyncIntervalRef.current) {
        clearInterval(networkSyncIntervalRef.current);
      }
      
      fetch("/api/ws/whiteboard", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, clientId }),
      }).catch((err) => console.error("Disconnect cleanup failed:", err));
    };
  }, [roomId, clientId, synchronizationPulse]);

  return {
    clientId,
    connectedPeers,
    remoteElements,
    broadcastElementMutation,
    triggerManualRefresh: synchronizationPulse,
  };
}
