import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Suspense, useEffect, useState } from 'react'
import SpiderMan3D from './SpiderMan3D'

const stats = [
  { number: 1.6, label: 'Experience', subtext: '(Years)', suffix: '+', decimals: 1 },
  { number: 15, label: 'Projects', subtext: '(Completed)', suffix: '+', decimals: 0 },
  { number: 25, label: 'Technologies', subtext: '(Mastered)', suffix: '+', decimals: 0 },
  { number: 4, label: 'Companies', subtext: '(Worked At)', suffix: '+', decimals: 0 },
]

const AnimatedNumber = ({ value, suffix = '', decimals = 0, inView }) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    if (decimals > 0) {
      return latest.toFixed(decimals)
    }
    return Math.round(latest).toLocaleString()
  })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
      })
      return controls.stop
    }
  }, [inView, value, count])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v))
    return unsubscribe
  }, [rounded])

  return (
    <span>{displayValue}{suffix}</span>
  )
}

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-[#0a0a0a]">

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-16"
        >
          <h2 className="font-black text-4xl md:text-6xl mt-4 tracking-tighter uppercase">
            <span className="text-spidey-light text-2xl md:text-4xl block mb-2 font-normal">[ PROFESSIONAL ]</span>
            <span className="gradient-text text-6xl md:text-8xl">BACKGROUND</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full overflow-hidden"
            style={{ height: window.innerWidth < 1024 ? '350px' : '450px' }}
          >
            {/* 3D Spider-Man Component */}
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-6xl mb-4"
                  >
                    🕷️
                  </motion.div>
                  <p className="font-bold uppercase tracking-widest text-spidey-red">Loading Engine...</p>
                </div>
              </div>
            }>
              <SpiderMan3D />
            </Suspense>


          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-bold text-3xl mb-6 text-spidey-light tracking-tight uppercase">
              Delivering robust & scalable software solutions
            </h3>
            <div className="space-y-6 text-gray-400 mb-10 text-lg leading-relaxed border-l-[3px] border-gray-400/50 pl-6">
              <p>
                I am a dedicated Software Engineer with over 1.5 years of experience specializing in 
                <span className="text-spidey-red font-bold"> .NET Core</span>, 
                <span className="text-spidey-react font-bold drop-shadow-[0_0_10px_rgba(97,218,251,0.3)]"> React</span>, and 
                <span className="text-green-400 font-bold"> Python</span>. 
                I focus on architecting scalable APIs and intelligent, data-driven applications.
              </p>
              <p>
                My expertise lies in 
                <span className="text-spidey-gold font-semibold"> clean architecture</span>, 
                high-performance system optimization, and the integration of 
                <span className="text-spidey-lightBlue font-semibold"> Agentic AI</span> and 
                <span className="text-spidey-red font-semibold"> IoT</span> into complex web systems.
              </p>
              <p>
                I am committed to building robust software solutions that solve real-world problems 
                with efficiency, scalability, and modern design patterns.
              </p>
            </div>


          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div 
        ref={statsRef}
        initial={{ opacity: 0, y: 30 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-24 relative w-full border-t border-b border-white/10 overflow-hidden bg-[#0a0a0a]"
      >
          <div 
            className="absolute inset-0 opacity-40 mix-blend-screen"
            style={{ 
              backgroundImage: "url('/About/web.png')", 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          />
          
          <div className="relative z-10 p-10 lg:p-20 flex flex-col items-center">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-x-10 md:gap-x-32 gap-y-16 text-center max-w-3xl w-full">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col items-center hover:scale-110 transition-transform duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15 }}
                >
                  <div className="font-black text-6xl md:text-8xl mb-2 gradient-text drop-shadow-[0_0_15px_rgba(204,0,0,0.4)]">
                    <AnimatedNumber 
                      value={stat.number} 
                      suffix={stat.suffix} 
                      decimals={stat.decimals} 
                      inView={statsInView} 
                    />
                  </div>
                  <div className="text-white font-bold text-lg md:text-2xl uppercase tracking-widest mt-2">
                    {stat.label}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base mt-1">
                    {stat.subtext}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
    </section>
  )
}

export default About