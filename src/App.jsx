import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

import SpiderCursor from './components/SpiderCursor'
import ScrollProgressBar from './components/ScrollProgress'
import WebBackground from './components/WebBackground'
import EasterEggs from './components/EasterEggs'


function App() {
  const [loading, setLoading] = useState(true)
  const [webLines, setWebLines] = useState([])
  const webIdRef = useRef(0)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleWebShoot = (e) => {
    const id = webIdRef.current++
    const startX = window.innerWidth / 2
    const startY = window.innerHeight / 2
    const endX = e.clientX
    const endY = e.clientY
    
    const angle = Math.atan2(endY - startY, endX - startX)
    const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2)

    setWebLines(prev => [...prev, { id, startX, startY, angle, distance }])
    
    setTimeout(() => {
      setWebLines(prev => prev.filter(line => line.id !== id))
    }, 500)
  }

  return (
    <div className="web-pattern">
        {webLines.map(line => (
          <motion.div
            key={line.id}
            className="web-line"
            style={{
              left: line.startX,
              top: line.startY,
              width: line.distance,
              transform: `rotate(${line.angle}rad)`,
            }}
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}

        <AnimatePresence mode="wait">
          {loading ? (
            <Loader key="loader" />
          ) : (
            <motion.main
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={('ontouchstart' in window) ? undefined : handleWebShoot}
            >
              {/* Interactive particle web background */}
              <WebBackground />
              
              {/* Scroll progress bar with spider */}
              <ScrollProgressBar />
              
              {/* Custom spider cursor */}
              <SpiderCursor />
              
              {/* Easter eggs system */}
              <EasterEggs />
              
              <Navbar />
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
              <Footer />

            </motion.main>
          )}
        </AnimatePresence>
    </div>
  )
}

export default App