import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WebShooter = () => {
  const [webs, setWebs] = useState([])

  const shootWeb = (e) => {
    e.stopPropagation()
    
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    })
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    
    const id = Date.now()
    setWebs(prev => [...prev, { id, x, y }])
    
    setTimeout(() => {
      setWebs(prev => prev.filter(w => w.id !== id))
    }, 1000)
  }

  return (
    <>
      <motion.button
        onClick={shootWeb}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg z-50 transition-all duration-300 bg-gradient-to-br from-spidey-red to-spidey-darkRed animate-pulse-red"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        title="Shoot Web! 🕸️"
        animate={{ 
          boxShadow: '0 0 30px rgba(230, 57, 70, 0.8)'
        }}
      >
        🕸️
      </motion.button>

      <AnimatePresence>
        {webs.map(web => (
          <motion.div
            key={web.id}
            className="fixed pointer-events-none z-40"
            style={{ left: web.x, top: web.y }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg width="200" height="200" style={{ transform: 'translate(-50%, -50%)' }}>
              {[...Array(8)].map((_, i) => (
                <motion.line
                  key={`spoke-${i}`}
                  x1="100"
                  y1="100"
                  x2={100 + 90 * Math.cos((i * Math.PI) / 4)}
                  y2={100 + 90 * Math.sin((i * Math.PI) / 4)}
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                />
              ))}
              {[30, 50, 70, 90].map((r, i) => (
                <motion.circle
                  key={`ring-${i}`}
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                />
              ))}
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

export default WebShooter