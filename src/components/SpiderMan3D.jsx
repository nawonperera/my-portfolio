import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  useGLTF, 
  useAnimations,
  Stage,
  PresentationControls,
  Html,
  ContactShadows,
  useTexture
} from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

function SpiderManModel({ onLoad }) {
  const group = useRef()
  const modelPath = '/models/spiderman.glb'
  
  const { scene, animations } = useGLTF(modelPath)
  const { actions, names } = useAnimations(animations, group)
  
  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().fadeIn(0.5).play()
    }
    onLoad?.()
  }, [actions, names, onLoad])

  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.03
    }
  })

  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={scene} 
        scale={1}
        position={[0, -1.5, 0]}
      />
    </group>
  )
}

function Scene({ onModelLoad }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.5}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#e63946" />
      <pointLight position={[10, 5, 5]} intensity={0.3} color="#1d3557" />
      
      <PresentationControls
        global
        zoom={0.8}
        rotation={[0, -Math.PI / 4, 0]}
        polar={[-0.2, Math.PI / 4]}
      >
        <Stage 
          shadows={{ type: 'contact', opacity: 0.4, blur: 2 }}
          intensity={0.5}
          environment="city"
        >
          <SpiderManModel 
            onLoad={onModelLoad}
          />
        </Stage>
      </PresentationControls>

      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2} 
        far={4}
      />
    </>
  )
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="text-6xl"
        >
          🕷️
        </motion.div>
        <p className="font-comic text-spidey-red text-lg">Loading Spider-Man...</p>
      </div>
    </Html>
  )
}

const SpiderMan3D = () => {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const forceResize = () => {
      if (canvasRef.current && containerRef.current) {
        window.dispatchEvent(new Event('resize'))
      }
    }

    if (document.readyState === 'complete') {
      forceResize()
    } else {
      window.addEventListener('load', forceResize)
    }

    const timer = setTimeout(forceResize, 100)

    return () => {
      window.removeEventListener('load', forceResize)
      clearTimeout(timer)
    }
  }, [])

  const handleClick = () => {
    const messages = [
      "Thwip! 🕸️",
      "With great power comes great responsibility!",
      "Spider-sense tingling!",
      "Let's build something amazing!",
      "Your friendly neighborhood developer!",
      "Bug? I'll squash it! 🐛",
      "Time to save the codebase!",
      "React is my superpower!",
      "Debugging in progress...",
      "Coffee.exe loading... ☕",
      "Just your average web developer 😉",
      "Ctrl+Z is my spider-sense!",
    ]
    setMessage(messages[Math.floor(Math.random() * messages.length)])
    setTimeout(() => setMessage(''), 3000)
  }



  const handleModelLoad = () => {
    setIsLoading(false)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 100)
  }

  return (
    <div ref={containerRef} className="w-full relative">
      <div className="h-[350px] lg:h-[450px] overflow-hidden">
        <div 
          className="w-full h-full relative cursor-pointer overflow-hidden"
          onClick={handleClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
        <div className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${isHovering ? 'opacity-100' : 'opacity-50'}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] transition-colors duration-1000 bg-spidey-blue/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[80px] transition-colors duration-1000 bg-spidey-gold/20" />
        </div>

        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <Canvas
            ref={canvasRef}
            camera={{ position: [0, 0, 5], fov: 50 }}
            shadows
            dpr={[1, 2]}
            gl={{ 
              preserveDrawingBuffer: true,
              antialias: true
            }}
            onCreated={({ gl, size }) => {
              gl.setClearColor('#0a0a0a', 0)
              gl.setSize(size.width, size.height)
            }}
            style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', top: 0, left: 0 }}
          >
            <Suspense fallback={<Loader />}>
              <Scene 
                onModelLoad={handleModelLoad}
              />
            </Suspense>
          </Canvas>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: -20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="absolute top-[15%] left-[5%] z-50 pointer-events-none"
            >
              <div className="relative bg-white text-gray-900 px-5 py-3 rounded-2xl shadow-2xl border-3 border-spidey-red max-w-[250px]"
                style={{ 
                  boxShadow: '0 4px 20px rgba(230, 57, 70, 0.4), 0 0 0 3px #e63946',
                }}
              >
                <p className="font-comic font-bold text-sm">{message}</p>
                <div 
                  className="absolute right-[-15px] top-1/2 -translate-y-1/2"
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '12px solid transparent',
                    borderLeft: '18px solid white',
                    borderBottom: '12px solid transparent',
                    filter: 'drop-shadow(3px 0 0 #e63946)',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-spidey-darkBlue/50 backdrop-blur-sm z-10"
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="text-6xl"
                >
                  🕷️
                </motion.div>
                <p className="font-comic text-spidey-red text-lg">Loading...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
          <span className="text-spidey-red">👆 CLICK</span> TO INTERACT • 
          <span className="text-spidey-blue"> 🖱️ DRAG</span> TO ROTATE
        </p>
      </div>
    </div>
  )
}

// Preload model
useGLTF.preload('/models/spiderman.glb')

export default SpiderMan3D