import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EasterEggs = () => {
  const [konamiTriggered, setKonamiTriggered] = useState(false)
  const [symbioteMode, setSymbioteMode] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [clickTimer, setClickTimer] = useState(null)

  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ]
    let konamiIndex = 0

    const handleKeyDown = (e) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          konamiIndex = 0
          triggerKonami()
        }
      } else {
        konamiIndex = 0
      }
    }

  }, [])

  useEffect(() => {
    const handleLogoClick = (e) => {
      const logo = e.target.closest('a[href="#home"]')
      if (!logo || !logo.closest('nav')) return

      setClickCount(prev => {
        const newCount = prev + 1
        if (newCount >= 5) {
          toggleSymbioteMode()
          return 0
        }
        return newCount
      })

      if (clickTimer) clearTimeout(clickTimer)
      const timer = setTimeout(() => setClickCount(0), 2000)
      setClickTimer(timer)
    }

    document.addEventListener('click', handleLogoClick)
    return () => {
      document.removeEventListener('click', handleLogoClick)
      if (clickTimer) clearTimeout(clickTimer)
    }
  }, [clickTimer])

  const triggerKonami = useCallback(() => {
    setKonamiTriggered(true)
    
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200])
    }

    setTimeout(() => setKonamiTriggered(false), 4000)
  }, [])

  const toggleSymbioteMode = useCallback(() => {
    setSymbioteMode(prev => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('symbiote-mode')
      } else {
        document.documentElement.classList.remove('symbiote-mode')
      }
      return next
    })
  }, [])

  return (
    <>
      <AnimatePresence>
        {konamiTriggered && (
          <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'radial-gradient(circle, rgba(230,57,70,0.4) 0%, transparent 70%)',
              }}
            />

            <motion.div
              className="relative"
              initial={{ y: '-100vh', rotate: 0 }}
              animate={{ 
                y: ['-100vh', '10vh', '0vh', '-5vh', '0vh'],
                rotate: [0, 720, 720, 720, 720],
              }}
              transition={{ 
                duration: 1.5,
                times: [0, 0.4, 0.6, 0.8, 1],
                ease: 'easeOut',
              }}
            >
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-white/80 to-transparent"
                style={{ top: '-100vh', height: '100vh' }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 3], opacity: [1, 0] }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="w-40 h-40 rounded-full border-4 border-spidey-red" />
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="font-comic text-7xl md:text-9xl text-spidey-red"
                  style={{
                    textShadow: '4px 4px 0 #1d3557, -2px -2px 0 #f4a261',
                    WebkitTextStroke: '2px #0d1b2a',
                  }}
                >
                  THWIP!
                </p>
                <motion.p
                  className="text-white text-lg mt-4 font-bold uppercase tracking-widest"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  🕷️ Your friendly neighborhood developer! 🕷️
                </motion.p>
              </motion.div>
            </motion.div>

            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: '2px',
                  height: '40vh',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
                  transformOrigin: 'top center',
                  rotate: `${i * 30}deg`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 1], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.03 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {symbioteMode && (
          <motion.div
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] px-4 py-2 rounded-full bg-purple-900/80 backdrop-blur-md border border-purple-500/50 text-purple-200 text-xs font-bold uppercase tracking-widest"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            🖤 Symbiote Mode Active — Click logo 5x to deactivate
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EasterEggs
