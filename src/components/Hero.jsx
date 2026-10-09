import { useState, useEffect, useLayoutEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

const Hero = () => {
  const [spiderSense, setSpiderSense] = useState([])
  const [isReady, setIsReady] = useState(false)
  const [viewportHeight, setViewportHeight] = useState('100vh')

  const { scrollY } = useScroll()
  const emblemY = useTransform(scrollY, [0, 700], [0, 280]) 
  const emblemX = useTransform(scrollY, [0, 700], [0, 300])
  const emblemScale = useTransform(scrollY, [0, 650], [1, 1])
  
  const emblemFilter = useTransform(
    scrollY,
    [0, 600],
    [
      'brightness(0.2) drop-shadow(0px 0px 0px rgba(255,0,0,0))',
      'brightness(1.5) contrast(1.5) drop-shadow(0px 0px 25px rgba(255, 0, 0, 1)) hue-rotate(345deg) saturate(500%)'
    ]
  )

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
      className="flex flex-col relative px-6 overflow-x-clip z-40"
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



      <div className="absolute inset-0 flex flex-col items-center justify-start pt-20 md:pt-0 md:flex-row md:items-center md:justify-between px-4 lg:px-28 z-20 md:z-0 opacity-100 pointer-events-none md:-mt-48">
        <span className="text-[18vw] md:text-[9vw] font-black text-white tracking-tighter leading-[0.85] md:leading-none">NAWON</span>
        <span className="text-[18vw] md:text-[9vw] font-black text-white tracking-tighter leading-[0.85] md:leading-none">PERERA</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-20 flex justify-center z-10 pointer-events-none">
        <div className="relative h-[75%] md:h-[90%] lg:h-[100%] flex justify-center">
          <img src="/Hero/Hero.png" alt="Spider-Man" className="h-full w-auto object-contain object-bottom" />
          
          
          <div
            className="absolute"
            style={{
              top: '82%', 
              left: '50%',
              filter: 'brightness(0.2)',
              zIndex: 10
            }}
          >
            <img 
              src="/Hero/emblem.png" 
              alt="Spider Emblem Base" 
              className="w-16 md:w-24 lg:w-32 opacity-90"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          </div>

          <motion.div
            className="absolute hidden md:block"
            style={{
              top: '82%', 
              left: '50%',
              x: emblemX,
              y: emblemY,
              scale: emblemScale,
              filter: emblemFilter,
              zIndex: 20
            }}
          >
            <img 
              src="/Hero/emblem.png" 
              alt="Spider Emblem" 
              className="w-16 md:w-24 lg:w-32 opacity-90"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          </motion.div>
        </div>
      </div>

      <div className="flex-grow relative z-20 flex flex-col justify-end pb-8 md:pb-16 lg:pb-32 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-end w-full h-full gap-6 md:gap-10 lg:gap-0">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-1/3 flex flex-col items-start text-left relative top-0 md:top-24 lg:-ml-10 mb-4 lg:mb-10"
          >

            <div className="hidden md:block border-l-[3px] border-gray-400 pl-4 md:pl-5 mb-6 md:mb-12">
              <p className="text-gray-300 text-xs md:text-base leading-relaxed max-w-[320px]">
                I architect <span className="text-spidey-red font-bold">scalable APIs</span> and <span className="text-spidey-red font-bold">high performance web systems</span>, 
                combining <span className="text-spidey-red font-bold">cloud native architecture</span>, <span className="text-spidey-red font-bold">distributed systems</span>, and <span className="text-spidey-red font-bold">intelligent AI workflows</span> to solve complex real world problems.
              </p>
            </div>

            <div className="hidden md:flex flex-wrap gap-4 mb-2">
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#c1121f] hover:bg-[#9a0e19] text-white px-6 md:px-8 py-2.5 md:py-3 font-bold text-xs md:text-sm uppercase tracking-wider transition-colors"
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="block md:hidden relative z-20 px-6 pb-8"
      >
        <div className="border-l-[3px] border-gray-400 pl-4 mb-6">
          <p className="text-gray-300 text-xs leading-relaxed max-w-[320px]">
            I architect <span className="text-spidey-red font-bold">scalable APIs</span> and <span className="text-spidey-red font-bold">high performance web systems</span>, 
            combining <span className="text-spidey-red font-bold">cloud native architecture</span>, <span className="text-spidey-red font-bold">distributed systems</span>, and <span className="text-spidey-red font-bold">intelligent AI workflows</span> to solve complex real world problems.
          </p>
        </div>
        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-[#c1121f] hover:bg-[#9a0e19] text-white px-6 py-2.5 font-bold text-xs uppercase tracking-wider transition-colors inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          LET'S TEAM UP
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-0 right-0 z-30 hidden md:block"
      >
        <div className="relative w-[250px] lg:w-[330px] flex justify-center items-center">
          <img src="/Hero/Web.png" alt="Spider Web" className="w-full h-auto opacity-70" />
          
          <motion.div 
            animate={{ rotate: [0, 5, 0, -5, 0], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-[30%] right-[15%] px-4 py-2 rounded-full bg-gradient-to-r from-spidey-red to-spidey-gold text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20 whitespace-nowrap"
          >
            .NET HERO 🦸
          </motion.div>
          
          <motion.div 
            animate={{ rotate: [0, -5, 0, 5, 0], y: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-[40%] left-[10%] px-4 py-2 rounded-full bg-gradient-to-r from-spidey-blue to-spidey-lightBlue text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20 whitespace-nowrap"
          >
            AI SOLUTIONS 🧠
          </motion.div>

          <motion.div 
            animate={{ rotate: [0, 4, 0, -4, 0], y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1.2 }}
            className="absolute top-[15%] left-[10%] px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20 whitespace-nowrap"
          >
            MICROSERVICES 🕸️
          </motion.div>

          <motion.div 
            animate={{ rotate: [0, -4, 0, 4, 0], y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 0.8 }}
            className="absolute bottom-[15%] right-[20%] px-4 py-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20 whitespace-nowrap"
          >
            DEVOPS ⚙️
          </motion.div>
          <motion.div 
            animate={{ rotate: [0, -6, 0, 6, 0], y: [0, 4, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, delay: 0.2 }}
            className="absolute top-[5%] right-[5%] px-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20 whitespace-nowrap"
          >
            AWS ☁️
          </motion.div>

          <motion.div 
            animate={{ rotate: [0, 5, 0, -5, 0], y: [0, -3, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, delay: 1.5 }}
            className="absolute top-[60%] right-[5%] px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs font-bold uppercase tracking-widest shadow-lg z-20 whitespace-nowrap"
          >
            AZURE ☁️
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero