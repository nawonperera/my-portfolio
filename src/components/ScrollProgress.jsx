import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Convert 0-1 to percentage string for left positioning
  const leftPercent = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      {/* Thin track */}
      <div className="h-[3px] w-full bg-white/5 relative">
        {/* Gradient fill */}
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: smoothProgress,
            background: 'linear-gradient(90deg, #e63946 0%, #f4a261 50%, #e63946 100%)',
            backgroundSize: '200% 100%',
            animation: 'gradient 3s ease infinite',
          }}
        />
      </div>
      
      {/* Spider indicator following progress */}
      <motion.div
        className="absolute top-[-5px] pointer-events-none"
        style={{
          left: leftPercent,
          translateX: '-50%',
        }}
      >
        <span 
          className="text-[14px] block drop-shadow-[0_0_6px_rgba(230,57,70,0.8)]"
        >
          🕷️
        </span>
      </motion.div>
      
      {/* Glow effect at tip */}
      <motion.div
        className="absolute top-0 h-[3px] w-8 pointer-events-none blur-sm"
        style={{
          left: leftPercent,
          translateX: '-50%',
          background: 'rgba(230, 57, 70, 0.8)',
        }}
      />
    </div>
  )
}

export default ScrollProgressBar
