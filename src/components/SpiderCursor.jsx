import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SpiderCursor = () => {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [ripples, setRipples] = useState([])
  const isMobile = useRef(false)
  const mousePos = useRef({ x: -100, y: -100 })
  const trailPos = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)

  useEffect(() => {
    isMobile.current = window.matchMedia("(max-width: 768px)").matches || 
                       ('ontouchstart' in window)
    
    if (isMobile.current) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseDown = (e) => {
      setIsClicking(true)
      // Create a web ripple on click
      const id = Date.now()
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, 600)
    }

    const handleMouseUp = () => setIsClicking(false)

    const handleHoverStart = (e) => {
      const target = e.target
      if (target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer')) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => {
      setIsHovering(false)
    }

    // Smooth animation loop
    const animate = () => {
      // Smooth follow for outer ring (trail)
      const dx = mousePos.current.x - trailPos.current.x
      const dy = mousePos.current.y - trailPos.current.y
      trailPos.current.x += dx * 0.15
      trailPos.current.y += dy * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)

    rafId.current = requestAnimationFrame(animate)

    // Add cursor:none to all interactive elements  
    const style = document.createElement('style')
    style.id = 'spider-cursor-style'
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
      cancelAnimationFrame(rafId.current)
      document.body.style.cursor = ''
      const existingStyle = document.getElementById('spider-cursor-style')
      if (existingStyle) existingStyle.remove()
    }
  }, [])

  if (typeof window !== 'undefined' && (window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window)) return null

  return (
    <>
      {/* Inner cursor - spider dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div 
          className="flex items-center justify-center transition-all duration-150"
          style={{
            width: isHovering ? '16px' : '8px',
            height: isHovering ? '16px' : '8px',
            background: isClicking 
              ? '#f4a261' 
              : isHovering 
                ? '#e63946' 
                : '#ffffff',
            borderRadius: '50%',
            boxShadow: isHovering 
              ? '0 0 20px rgba(230, 57, 70, 0.8), 0 0 40px rgba(230, 57, 70, 0.4)'
              : '0 0 10px rgba(255, 255, 255, 0.5)',
            transform: isClicking ? 'scale(0.5)' : 'scale(1)',
          }}
        />
      </div>

      {/* Outer trail ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: isHovering ? '48px' : '32px',
            height: isHovering ? '48px' : '32px',
            borderColor: isHovering 
              ? 'rgba(230, 57, 70, 0.8)' 
              : 'rgba(255, 255, 255, 0.3)',
            borderWidth: isHovering ? '2px' : '1px',
            transform: isClicking ? 'scale(0.7)' : 'scale(1)',
            mixBlendMode: 'difference',
          }}
        />
      </div>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="fixed pointer-events-none z-[9997]"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Web burst pattern */}
            <svg width="60" height="60" viewBox="0 0 60 60">
              {[...Array(8)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="30"
                  y1="30"
                  x2={30 + 28 * Math.cos((i * Math.PI) / 4)}
                  y2={30 + 28 * Math.sin((i * Math.PI) / 4)}
                  stroke="rgba(230, 57, 70, 0.6)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
              <motion.circle
                cx="30"
                cy="30"
                r="15"
                fill="none"
                stroke="rgba(230, 57, 70, 0.4)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

export default SpiderCursor