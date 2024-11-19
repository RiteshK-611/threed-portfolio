"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform sampler2D disp;
  uniform float dispFactor;
  uniform float effectFactor;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec4 disp = texture2D(disp, uv);
    vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
    vec4 _texture = texture2D(texture1, distortedPosition);
    vec4 _texture2 = texture2D(texture2, distortedPosition2);
    vec4 finalTexture = mix(_texture, _texture2, dispFactor);
    gl_FragColor = finalTexture;
  }
`;

interface LiquidDistortionProps {
  currentImage: string;
  nextImage: string;
  isTransitioning: boolean;
  aspectRatio?: number;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

// Cache for storing aspect ratios
const aspectRatioCache = new Map<string, number>();

// Function to get image aspect ratio with caching
const getImageAspectRatio = async (url: string): Promise<number> => {
  // Check cache first
  if (aspectRatioCache.has(url)) {
    return aspectRatioCache.get(url)!;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      // Cache the result
      aspectRatioCache.set(url, aspectRatio);
      resolve(aspectRatio);
    };
    img.onerror = () => {
      const fallbackRatio = 16 / 9;
      aspectRatioCache.set(url, fallbackRatio);
      resolve(fallbackRatio);
    };
    img.src = url;
  });
};

function LiquidDistortion({
  currentImage,
  nextImage,
  isTransitioning,
  aspectRatio: providedAspectRatio,
  onMouseEnter,
  onMouseLeave,
}: LiquidDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const requestRef = useRef<number>();
  const [aspectRatio, setAspectRatio] = useState<number | null>(
    providedAspectRatio || null
  );
  const [isLoading, setIsLoading] = useState(!providedAspectRatio);

  // Only load aspect ratio if not provided
  useEffect(() => {
    if (providedAspectRatio) {
      setAspectRatio(providedAspectRatio);
      setIsLoading(false);
      return;
    }

    const loadImages = async () => {
      setIsLoading(true);
      try {
        const ratio = await getImageAspectRatio(currentImage);
        setAspectRatio(ratio);
      } catch (error) {
        console.error("Error loading image:", error);
        setAspectRatio(16 / 9); // Fallback ratio
      }
      setIsLoading(false);
    };

    loadImages();
  }, [currentImage, providedAspectRatio]);

  useEffect(() => {
    if (!containerRef.current || !aspectRatio || isLoading) return;

    const parent = containerRef.current;

    const width = parent.offsetWidth;
    const height = width / aspectRatio;

    // Update container height
    parent.style.height = `${height}px`;

    console.log("111111", width, height, aspectRatio);

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    camera.position.z = 1;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    parent.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Texture loader
    const loader = new THREE.TextureLoader();
    const texture1 = loader.load(currentImage);
    const texture2 = loader.load(nextImage);
    const disp = loader.load("https://i.postimg.cc/QNTRDRks/4.png");

    // Material setup
    const material = new THREE.ShaderMaterial({
      uniforms: {
        effectFactor: { value: 1.2 },
        dispFactor: { value: 0 },
        texture1: { value: texture1 },
        texture2: { value: texture2 },
        disp: { value: disp },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      opacity: 1.0,
    });
    materialRef.current = material;

    // Mesh setup with proper dimensions
    const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = async () => {
      if (!parent || !renderer || !camera || !mesh || !material) return;

      try {
        // Recalculate aspect ratio
        const newAspectRatio = await getImageAspectRatio(currentImage);
        setAspectRatio(newAspectRatio);

        const newWidth = parent.offsetWidth;
        const newHeight = newWidth / newAspectRatio;

        parent.style.height = `${newHeight}px`;

        camera.left = newWidth / -2;
        camera.right = newWidth / 2;
        camera.top = newHeight / 2;
        camera.bottom = newHeight / -2;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);
        // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Update mesh with proper scaling
        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(newWidth, newHeight, 1, 1);
        // mesh.scale.set(newWidth, newHeight, 1);

        // Force a re-render
        // renderer.render(scene, camera);
      } catch (error) {
        console.error("Error during resize:", error);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent.contains(renderer.domElement)) {
        parent.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(requestRef.current!);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [currentImage, nextImage, isLoading]);

  useEffect(() => {
    if (isTransitioning && materialRef.current) {
      const startTime = Date.now();
      const duration = 1000; // 1 second transition

      const animateTransition = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        if (materialRef.current) {
          materialRef.current.uniforms.dispFactor.value = progress;
        }

        if (progress < 1) {
          requestAnimationFrame(animateTransition);
        }
      };

      animateTransition();
    }
  }, [isTransitioning]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center rounded-xl bg-white/5 border-[1px] border-white/20 w-full h-full lg:w-11/12 lg:h-11/12 overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}

export default LiquidDistortion;
