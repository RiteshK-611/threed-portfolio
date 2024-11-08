import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const WavyImage = ({ src, className = "w-full h-full" }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const frameRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const currentState = useRef({
    mousePosition: { x: 0, y: 0 },
    waveIntensity: 0.005,
  });

  const targetState = useRef({
    mousePosition: { x: 0, y: 0 },
    waveIntensity: 0.005,
  });

  const ANIMATION_CONFIG = {
    transitionSpeed: 0.03,
    baseIntensity: 0.005,
    hoverIntensity: 0.009,
  };

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_intensity;
    uniform sampler2D u_texture;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float wave1 = sin(uv.x * 10.0 + u_time * 0.5 + u_mouse.x * 5.0) * u_intensity;
      float wave2 = sin(uv.y * 12.0 + u_time * 0.8 + u_mouse.y * 4.0) * u_intensity;
      float wave3 = cos(uv.x * 8.0 + u_time * 0.5 + u_mouse.x * 3.0) * u_intensity;
      float wave4 = cos(uv.y * 9.0 + u_time * 0.7 + u_mouse.y * 3.5) * u_intensity;

      uv.y += wave1 + wave2;
      uv.x += wave3 + wave4;
      
      gl_FragColor = texture2D(u_texture, uv);
    }
  `;

  const updateValue = (target, current, speed) => {
    return current + (target - current) * speed;
  };

  const updateRendererSize = () => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current)
      return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    rendererRef.current.setSize(width, height);
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
  };

  const initScene = () => {
    const container = containerRef.current;
    if (!container) return;

    // Load texture first to get dimensions
    new THREE.TextureLoader().load(src, (texture) => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Camera
      const camera = new THREE.PerspectiveCamera(80, width / height, 0.01, 10);
      camera.position.z = 1;
      cameraRef.current = camera;

      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      rendererRef.current = renderer;

      // Style the canvas
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "0";
      renderer.domElement.style.left = "0";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.objectFit = "cover";

      container.appendChild(renderer.domElement);

      const uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_mouse: { type: "v2", value: new THREE.Vector2() },
        u_intensity: { type: "f", value: currentState.current.waveIntensity },
        u_texture: { type: "t", value: texture },
      };

      // Create a plane that matches the aspect ratio
      const imageAspect = texture.image.width / texture.image.height;
      const screenAspect = width / height;

      let planeWidth, planeHeight;

      if (screenAspect > imageAspect) {
        planeWidth = 2;
        planeHeight = (2 / screenAspect) * imageAspect;
      } else {
        planeHeight = 2;
        planeWidth = (2 * screenAspect) / imageAspect;
      }

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
      const mesh = new THREE.Mesh(
        geometry,
        new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
        })
      );

      scene.add(mesh);
      meshRef.current = mesh;
      setLoaded(true);
    });

    // Setup resize observer
    resizeObserverRef.current = new ResizeObserver(updateRendererSize);
    resizeObserverRef.current.observe(container);
  };

  const animate = () => {
    if (!meshRef.current) return;

    const { mousePosition: currentMouse, waveIntensity: currentIntensity } =
      currentState.current;
    const { mousePosition: targetMouse, waveIntensity: targetIntensity } =
      targetState.current;

    currentState.current.mousePosition.x = updateValue(
      targetMouse.x,
      currentMouse.x,
      ANIMATION_CONFIG.transitionSpeed
    );
    currentState.current.mousePosition.y = updateValue(
      targetMouse.y,
      currentMouse.y,
      ANIMATION_CONFIG.transitionSpeed
    );
    currentState.current.waveIntensity = updateValue(
      targetIntensity,
      currentIntensity,
      ANIMATION_CONFIG.transitionSpeed
    );

    const uniforms = meshRef.current.material.uniforms;
    uniforms.u_intensity.value = currentState.current.waveIntensity;
    uniforms.u_time.value += 0.005;
    uniforms.u_mouse.value.set(
      currentState.current.mousePosition.x,
      currentState.current.mousePosition.y
    );

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    frameRef.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (event) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetState.current.mousePosition.x =
      ((event.clientX - rect.left) / rect.width) * 2 - 1;
    targetState.current.mousePosition.y =
      -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const handleMouseOver = () => {
    targetState.current.waveIntensity = ANIMATION_CONFIG.hoverIntensity;
  };

  const handleMouseOut = () => {
    targetState.current.waveIntensity = ANIMATION_CONFIG.baseIntensity;
    targetState.current.mousePosition = { x: 0, y: 0 };
  };

  useEffect(() => {
    initScene();
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (rendererRef.current?.domElement) {
        rendererRef.current.domElement.remove();
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
      className={`relative ${className}`}
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    />
  );
};

export default WavyImage;
