
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

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
`

interface LiquidDistortionProps {
  currentImage: string
  nextImage: string
  isTransitioning: boolean
}

function LiquidDistortion({ currentImage, nextImage, isTransitioning }: LiquidDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const requestRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current) return

    // const img = new Image();
    // img.src = currentImage;
    // const aspectRatio = img.naturalWidth / img.naturalHeight;
    // // Use the parent width to determine dimensions while maintaining aspect ratio
    // const width = containerRef.current.offsetWidth;
    // const height = width / aspectRatio;

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    console.log("111111")

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    )
    camera.position.z = 1
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Texture loader
    const loader = new THREE.TextureLoader()
    const texture1 = loader.load(currentImage)
    const texture2 = loader.load(nextImage)
    const disp = loader.load('https://i.postimg.cc/QNTRDRks/4.png')

    // Material setup
    const material = new THREE.ShaderMaterial({
      uniforms: {
        effectFactor: { value: 1.2 },
        dispFactor: { value: 0 },
        texture1: { value: texture1 },
        texture2: { value: texture2 },
        disp: { value: disp },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      opacity: 1.0,
    })
    materialRef.current = material

    // Mesh setup
    const geometry = new THREE.PlaneGeometry(width, height, 1, 1)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    console.log("22222222")

    // Cleanup
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      cancelAnimationFrame(requestRef.current!)
      renderer.dispose()
    }
  }, [currentImage, nextImage])

  useEffect(() => {
    if (isTransitioning && materialRef.current) {
      const startTime = Date.now()
      const duration = 1000 // 1 second transition

      const animateTransition = () => {
        const elapsedTime = Date.now() - startTime
        const progress = Math.min(elapsedTime / duration, 1)
        
        if (materialRef.current) {
          materialRef.current.uniforms.dispFactor.value = progress
        }

        if (progress < 1) {
          requestAnimationFrame(animateTransition)
        }
      }

      animateTransition()
    }
  }, [isTransitioning])

  return (
    <div 
      ref={containerRef} 
      className="relative flex items-center justify-center rounded-lg bg-white/5 border-[1px] border-white/20 md:p-4 w-full h-full overflow-hidden"
    />
  );
};

export default LiquidDistortion;