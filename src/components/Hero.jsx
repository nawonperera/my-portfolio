import { useState, useEffect, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

const Hero = () => {
  const [spiderSense, setSpiderSense] = useState([])
  const [isReady, setIsReady] = useState(false)
  const [viewportHeight, setViewportHeight] = useState('100vh')

  useLayoutEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight
      setViewportHeight(`${vh}px`)
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`)
    }

    updateHeight()
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)

    const updateHeight = () => {
      const vh = window.innerHeight
      setViewportHeight(`${vh}px`)
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`)
    }

    const handleLoad = () => {
      updateHeight()
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsReady(true)
        })
      })
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    const handleResize = () => {
      updateHeight()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  const triggerSpiderSense = (e) => {
    const id = Date.now()
    const rect = e.currentTarget.getBoundingClientRect()
    setSpiderSense(prev => [...prev, {
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }])
    setTimeout(() => {
      setSpiderSense(prev => prev.filter(s => s.id !== id))
    }, 1000)
  }

  return (
    <section
      id="home"
      className="flex flex-col relative px-6 overflow-hidden"
      style={{
        minHeight: viewportHeight,
        opacity: isReady ? 1 : 0.3,
        transition: 'opacity 0.5s ease-in-out',
        willChange: 'opacity'
      }}
      onMouseMove={(e) => Math.random() > 0.98 && triggerSpiderSense(e)}
    >
      <div className="h-16 md:h-20 shrink-0" />

      {spiderSense.map(sense => (
        <div
          key={sense.id}
          className="spider-sense"
          style={{ left: sense.x - 50, top: sense.y - 50 }}
        />
      ))}



      <div className="absolute inset-0 flex items-center justify-between px-4 lg:px-28 z-0 opacity-100 pointer-events-none -mt-48">
        <span className="text-[9vw] font-black text-white tracking-tighter leading-none z-0">NAWON</span>
        <span className="text-[9vw] font-black text-white tracking-tighter leading-none z-0">PERERA</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-20 flex justify-center z-10 pointer-events-none">
        <img src="/Hero/Hero.png" alt="Spider-Man" className="h-[90%] lg:h-[100%] object-contain object-bottom" />
      </div>

      <div className="flex-grow relative z-20 flex flex-col justify-end pb-16 lg:pb-32 max-w-7xl mx-auto w-full px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-end w-full h-full gap-10 lg:gap-0">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-1/3 flex flex-col items-start text-left relative top-24 lg:-ml-10 mb-4 lg:mb-10"
          >
            <div className="text-xl md:text-2xl text-gray-200 mb-8 font-medium">
              <span>Specializing in </span>
              <TypeAnimation
                sequence={[
                  '.NET Ecosystem',
                  2000,
                  'React Frontend',
                  2000,
                  'AI Solutions',
                  2000,
                  'IoT Engineering',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-spidey-red font-bold italic drop-shadow-sm"
              />
            </div>

            <div className="border-l-[3px] border-gray-400 pl-5 mb-12">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-[280px]">
                I architect <span className="text-spidey-red font-bold"> scalable industrial-grade APIs</span> and
                high-performance web systems,
                integrating <span className="text-spidey-red font-bold">intelligent AI workflows</span> to solve complex real-world challenges.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-2">
              <motion.a
                href="#contact"
                className="bg-[#c1121f] hover:bg-[#9a0e19] text-white px-8 py-3 font-bold text-sm uppercase tracking-wider transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LET'S TEAM UP
              </motion.a>
            </div>
          </motion.div>


        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-0 right-0 z-30"
      >
        <div className="relative w-[250px] lg:w-[350px] flex justify-center items-center">
          <img src="/Hero/Web.png" alt="Spider Web" className="w-full h-auto opacity-70" />
          
          <motion.div 
            animate={{ rotate: [0, 5, 0, -5, 0], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-[25%] right-[20%] px-4 py-2 rounded-full bg-gradient-to-r from-spidey-red to-spidey-gold text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20"
          >
            .NET HERO 🦸
          </motion.div>
          
          <motion.div 
            animate={{ rotate: [0, -5, 0, 5, 0], y: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-[25%] left-[5%] px-4 py-2 rounded-full bg-gradient-to-r from-spidey-blue to-spidey-lightBlue text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20"
          >
            AI SOLUTIONS 🧠
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero