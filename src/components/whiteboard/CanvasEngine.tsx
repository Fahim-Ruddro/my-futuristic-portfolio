"use client";

import React, { useRef, useState, useEffect } from "react";
import { Pencil, Square, Circle, RotateCcw, Users } from "lucide-react";
import { useWhiteboardSocket } from "@/hooks/useWhiteboardSocket";

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

/**
 * WHAT: Fully Synchronized Multi-User HTML5 Canvas Engine.
 * WHY: Pairs high-performance local UI interactions with real-time network state layers.
 * HOW: Merges local drawing arrays with remote element records inside a single redraw pipeline.
 */
export default function CanvasEngine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [tool, setTool] = useState<"draw" | "rectangle" | "circle">("draw");
  const [color, setColor] = useState<string>("#00f3ff"); // Cyber Neon Cyan
  const [strokeWidth, setStrokeWidth] = useState<number>(3);
  
  // Local state for actions committed by this specific browser tab
  const [localElements, setLocalElements] = useState<SavedElement[]>([]);
  const [currentPoints, setCurrentPoints] = useState<DrawPoint[]>([]);

  // Connect to our real-time network data channel sync matrix
  const { connectedPeers, remoteElements, broadcastElementMutation } = useWhiteboardSocket("global-portfolio-room");

  // Redraw the entire viewport layer whenever local elements or remote peer matrices mutate
  useEffect(() => {
    redrawCanvas();
  }, [localElements, remoteElements, currentPoints, isDrawing]);

  // Adjust resolution bounds on layout assembly mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = 550;
    redrawCanvas();
  }, []);

  /**
   * Resets display layers and sequences rendering pathways for both local and network elements.
   */
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    // Clear physical workspace pixels to handle clean reposition frames
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Render all network shapes streaming from other concurrent sessions
    Object.values(remoteElements).forEach((remoteElement) => {
      if (remoteElement) drawStoredElement(context, remoteElement);
    });

    // 2. Render historical paths created locally on this system machine
    localElements.forEach((element) => {
      drawStoredElement(context, element);
    });

    // 3. Render real-time cursor dragging preview coordinates
    if (isDrawing && currentPoints.length > 0) {
      const activePreview: SavedElement = {
        id: "preview",
        type: tool,
        points: currentPoints,
        color,
        strokeWidth,
      };
      drawStoredElement(context, activePreview);
    }
  };

  /**
   * Compiles mathematical vectors into physical color paths on the HTML5 surface canvas.
   */
  const drawStoredElement = (context: CanvasRenderingContext2D, element: SavedElement) => {
    context.strokeStyle = element.color;
    context.lineWidth = element.strokeWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();

    if (!element.points || element.points.length === 0) return;

    if (element.type === "draw") {
      context.moveTo(element.points[0].x, element.points[0].y);
      for (let i = 1; i < element.points.length; i++) {
        context.lineTo(element.points[i].x, element.points[i].y);
      }
      context.stroke();
    } else if (element.type === "rectangle" && element.points.length > 1) {
      const start = element.points[0];
      const end = element.points[element.points.length - 1];
      context.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
    } else if (element.type === "circle" && element.points.length > 1) {
      const start = element.points[0];
      const end = element.points[element.points.length - 1];
      const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      context.arc(start.x, start.y, radius, 0, 2 * Math.PI);
      context.stroke();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentPoints([{ x, y }]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentPoints((prev) => [...prev, { x, y }]);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentPoints.length > 0) {
      const committedElement: SavedElement = {
        id: `elem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        type: tool,
        points: currentPoints,
        color,
        strokeWidth,
      };

      // Update local view cache arrays
      setLocalElements((prev) => [...prev, committedElement]);

      // Fire vector payload structure over the network connection straight to database cache nodes
      broadcastElementMutation(committedElement);
    }
    setCurrentPoints([]);
  };

  const clearLocalWorkspace = () => {
    setLocalElements([]);
    setCurrentPoints([]);
  };

  return (
    <div className="flex flex-col gap-4 rounded border border-neutral-900 bg-black p-4 font-mono">
      
      {/* HUD INFRASTRUCTURE STATUS TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-900 pb-4">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTool("draw")}
            className={`p-2 rounded border transition-all ${
              tool === "draw" ? "border-cyan-500 bg-cyan-950/20 text-cyan-400" : "border-neutral-800 text-neutral-500"
            }`}
            title="Free Draw Brush"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("rectangle")}
            className={`p-2 rounded border transition-all ${
              tool === "rectangle" ? "border-cyan-500 bg-cyan-950/20 text-cyan-400" : "border-neutral-800 text-neutral-500"
            }`}
            title="Draw Vector Rectangle"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool("circle")}
            className={`p-2 rounded border transition-all ${
              tool === "circle" ? "border-cyan-500 bg-cyan-950/20 text-cyan-400" : "border-neutral-800 text-neutral-500"
            }`}
            title="Draw Vector Circle"
          >
            <Circle className="w-4 h-4" />
          </button>
        </div>

        {/* SYSTEM COLOR CHANGER MATRIX */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {["#00f3ff", "#ff007f", "#9d4edd", "#00ff66"].map((hex) => (
              <button
                key={hex}
                onClick={() => setColor(hex)}
                className={`w-5 h-5 rounded-full border transition-transform ${
                  color === hex ? "scale-125 border-white" : "border-transparent"
                }`}
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5 rounded border border-neutral-800 bg-neutral-900/20 px-2.5 py-1.5 text-xs text-neutral-400">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            PEERS: <span className="text-white font-bold">{connectedPeers}</span>
          </div>

          <button
            onClick={clearLocalWorkspace}
            className="flex items-center gap-1.5 rounded border border-red-900/40 bg-red-950/10 px-3 py-1.5 text-xs text-red-400 hover:bg-red-900/20 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            FLUSH.LOCAL
          </button>
        </div>
      </div>

      {/* CORE GRAPHICS SURFACE CAPTURE INTERFACE */}
      <div className="relative overflow-hidden rounded bg-neutral-950/60 border border-neutral-900">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="block cursor-crosshair touch-none bg-neutral-950/30 w-full"
        />
      </div>
    </div>
  );
}
