"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WHAT: High-Performance Global WebGL Particle Matrix Field (Fixed Layout Version).
 * WHY: Renders beautifully rounded glowing space dots that track user mouse inputs automatically without freezing.
 * HOW: Maps custom canvas texturing onto particle points and binds to global window state event listeners.
 */
export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const movementRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // --- STEP 1: GLOW SCENE BUILD ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- STEP 2: SCATTER 1,500 GEOMETRIC DATA SHARDS ---
    const count = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 90;     
      positions[i + 1] = (Math.random() - 0.5) * 90; 
      positions[i + 2] = (Math.random() - 0.5) * 50; 
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // --- STEP 3: CREATING SMOOTH ROUND GLOWING TEXTURE SPRITE ---
    // WHY: Bypasses the default WebGL square rendering block by creating a circular alpha mask brush pattern.
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");   // Pure bright core center point
      gradient.addColorStop(0.3, "rgba(0, 243, 255, 0.8)"); // Soft neon cyan bleed ring
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");         // Full fade out transparency
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const dotTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      color: 0x00f3ff, 
      size: 0.4,              // Slightly scaled up sizing to appreciate smooth circular glowing profiles
      transparent: true,
      opacity: 0.65,
      map: dotTexture,         // Injects our round dot texture layout
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- STEP 4: AUTOMATED INTERACTIVE & WAKE EVENT MANAGEMENT ---
    const processGlobalMouse = (event: MouseEvent) => {
      movementRef.current.mouseX = (event.clientX - window.innerWidth / 2) / 80;
      movementRef.current.mouseY = (event.clientY - window.innerHeight / 2) / 80;
    };

    const processGlobalResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // WHY: Bypasses browser freeze behavior by waking up tracking coordinates automatically on tab reactivation
    const processGlobalFocus = () => {
      movementRef.current.mouseX = 0;
      movementRef.current.mouseY = 0;
    };

    window.addEventListener("mousemove", processGlobalMouse, { passive: true });
    window.addEventListener("resize", processGlobalResize);
    window.addEventListener("focus", processGlobalFocus);

    // --- STEP 5: REAL-TIME GRAPHICS RENDERING SYSTEM LOOP ---
    let frameId: number;
    const clock = new THREE.Clock();

    const loopFrame = () => {
      frameId = requestAnimationFrame(loopFrame);
      const delta = clock.getElapsedTime();

      // Continuous subtle spatial orbital movements
      particles.rotation.y = delta * 0.03;
      particles.rotation.x = delta * 0.01;

      // Smooth Easing Lerp calculations to establish physical weight and drag
      movementRef.current.targetX += (movementRef.current.mouseX - movementRef.current.targetX) * 0.05;
      movementRef.current.targetY += (movementRef.current.mouseY - movementRef.current.targetY) * 0.05;

      camera.position.x = movementRef.current.targetX;
      camera.position.y = -movementRef.current.targetY;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    loopFrame();

    // --- STEP 6: CLEAN TEARDOWN LIFECYCLE ---
    return () => {
      window.removeEventListener("mousemove", processGlobalMouse);
      window.removeEventListener("resize", processGlobalResize);
      window.removeEventListener("focus", processGlobalFocus);
      cancelAnimationFrame(frameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      dotTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[-1] pointer-events-none w-full h-full block bg-transparent" 
    />
  );
}
