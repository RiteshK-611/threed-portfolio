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
    vec4 displacement = texture2D(disp, uv);
    vec2 distortedPosition = vec2(uv.x + dispFactor * (displacement.r * effectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (displacement.r * effectFactor), uv.y);
    vec4 textureA = texture2D(texture1, distortedPosition);
    vec4 textureB = texture2D(texture2, distortedPosition2);
    gl_FragColor = mix(textureA, textureB, dispFactor);
  }
`;

interface LiquidDistortionProps {
  currentImage: string;
  nextImage: string;
  isTransitioning: boolean;
  onTransitionComplete: () => void;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

function LiquidDistortion({
  currentImage,
  nextImage,
  isTransitioning,
  onTransitionComplete,
  onMouseEnter,
  onMouseLeave,
}: LiquidDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const activeTextureRef = useRef<THREE.Texture | null>(null);
  const animationFrameRef = useRef<number>();
  const transitionFrameRef = useRef<number>();
  const onTransitionCompleteRef = useRef(onTransitionComplete);
  const initialImageRef = useRef(currentImage);
  const aspectRatioRef = useRef(16 / 9);
  const resizeRef = useRef<() => void>();
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  useEffect(() => {
    onTransitionCompleteRef.current = onTransitionComplete;
  }, [onTransitionComplete]);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (cancelled) return;

      const ratio = image.naturalWidth / image.naturalHeight;
      aspectRatioRef.current = ratio;
      setAspectRatio(ratio);
      resizeRef.current?.();
    };
    image.src = currentImage;

    return () => {
      cancelled = true;
    };
  }, [currentImage]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(initialImageRef.current);
    const displacement = loader.load("https://i.postimg.cc/QNTRDRks/4.png");
    activeTextureRef.current = texture;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        effectFactor: { value: 1.2 },
        dispFactor: { value: 0 },
        texture1: { value: texture },
        texture2: { value: texture },
        disp: { value: displacement },
      },
      vertexShader,
      fragmentShader,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const width = container.clientWidth;
      if (!width) return;

      const height = width / aspectRatioRef.current;
      camera.left = width / -2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = height / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      mesh.scale.set(width, height, 1);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeRef.current = resize;
    resizeObserver.observe(container);
    resize();

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();

    return () => {
      resizeObserver.disconnect();
      resizeRef.current = undefined;
      cancelAnimationFrame(animationFrameRef.current!);
      cancelAnimationFrame(transitionFrameRef.current!);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      activeTextureRef.current?.dispose();
      displacement.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!isTransitioning || !materialRef.current || !activeTextureRef.current) return;

    let cancelled = false;
    const nextTexture = new THREE.TextureLoader().load(
      nextImage,
      () => {
        if (cancelled || !materialRef.current || !activeTextureRef.current) {
          nextTexture.dispose();
          return;
        }

        const material = materialRef.current;
        const previousTexture = activeTextureRef.current;
        material.uniforms.texture1.value = previousTexture;
        material.uniforms.texture2.value = nextTexture;
        material.uniforms.dispFactor.value = 0;
        const startedAt = performance.now();

        const transition = () => {
          const progress = Math.min((performance.now() - startedAt) / 1000, 1);
          material.uniforms.dispFactor.value = progress;

          if (progress < 1) {
            transitionFrameRef.current = requestAnimationFrame(transition);
            return;
          }

          material.uniforms.texture1.value = nextTexture;
          material.uniforms.texture2.value = nextTexture;
          material.uniforms.dispFactor.value = 0;
          activeTextureRef.current = nextTexture;
          previousTexture.dispose();
          onTransitionCompleteRef.current();
        };

        transition();
      },
      undefined,
      () => onTransitionCompleteRef.current()
    );

    return () => {
      cancelled = true;
      cancelAnimationFrame(transitionFrameRef.current!);
    };
  }, [isTransitioning]);

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer flex items-center justify-center rounded-xl bg-white/5 border-[1px] border-white/20 w-full lg:w-11/12 overflow-hidden"
      style={{ aspectRatio }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

export default LiquidDistortion;
