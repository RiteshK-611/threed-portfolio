"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const LiquidDistortion = ({
  currentImage,
  nextImage,
  isTransitioning
}) => {
  const containerRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const parent = containerRef.current;
    const scene = new THREE.Scene();
    
    // Calculate aspect ratio based on image
    const img = new Image();
    img.src = currentImage;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    
    // Use the parent width to determine dimensions while maintaining aspect ratio
    const width = parent.offsetWidth;
    const height = width / aspectRatio;
    
    // Update container height
    parent.style.height = `${height}px`;

    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(width, height);
    parent.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture1 = loader.load(currentImage);
    const texture2 = loader.load(nextImage);
    const disp = loader.load('https://i.postimg.cc/QNTRDRks/4.png');

    texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
    texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

    disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        intensity1: { value: 0.5 }, // Reduced intensity for subtler effect
        intensity2: { value: 0.5 },
        dispFactor: { value: 0.0 },
        angle1: { value: Math.PI / 4 },
        angle2: { value: -Math.PI / 4 },
        texture1: { value: texture1 },
        texture2: { value: texture2 },
        disp: { value: disp }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float dispFactor;
        uniform sampler2D disp;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform float angle1;
        uniform float angle2;
        uniform float intensity1;
        uniform float intensity2;

        mat2 getRotM(float angle) {
          float s = sin(angle);
          float c = cos(angle);
          return mat2(c, -s, s, c);
        }

        void main() {
          vec4 disp = texture2D(disp, vUv);
          vec2 dispVec = vec2(disp.r, disp.g);
          vec2 distortedPosition1 = vUv + getRotM(angle1) * dispVec * intensity1 * dispFactor;
          vec2 distortedPosition2 = vUv + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);
          vec4 _texture1 = texture2D(texture1, distortedPosition1);
          vec4 _texture2 = texture2D(texture2, distortedPosition2);
          gl_FragColor = mix(_texture1, _texture2, dispFactor);
        }
      `,
      transparent: true,
      opacity: 1.0
    });

    const geometry = new THREE.PlaneGeometry(width, height, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = parent.offsetWidth;
      const newHeight = newWidth / aspectRatio;
      
      parent.style.height = `${newHeight}px`;
      
      camera.left = newWidth / -2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = newHeight / -2;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
      mesh.scale.set(newWidth, newHeight, 1);
    };

    window.addEventListener('resize', handleResize);

    effectRef.current = {
      material,
      parent,
      renderer
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      parent.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [currentImage, nextImage]);

  useEffect(() => {
    if (!effectRef.current) return;

    const { material } = effectRef.current;
    
    if (isTransitioning) {
      gsap.to(material.uniforms.dispFactor, {
        value: 1,
        duration: 1.6,
        ease: 'expo.out'
      });
    } else {
      gsap.to(material.uniforms.dispFactor, {
        value: 0,
        duration: 1.2,
        ease: 'expo.out'
      }); 
    }
  }, [isTransitioning]);

  return (
    <div 
      ref={containerRef} 
      className="relative flex items-center justify-center rounded-lg bg-white/5 border-[1px] border-white/20 md:p-4 w-full h-full overflow-hidden"
    />
  );
};

export default LiquidDistortion;