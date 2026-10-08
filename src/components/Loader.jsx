import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

const Loader = () => {
  const [progress, setProgress] = useState(0)
  const [showTagline, setShowTagline] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowTagline(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        const increment = prev < 30 ? 2 : prev < 70 ? 3 : prev < 90 ? 2 : 1
        return Math.min(prev + increment, 100)
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])

  const webLines = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30) * Math.PI / 180
    return { angle, x2: 50 + 48 * Math.cos(angle), y2: 50 + 48 * Math.sin(angle) }
  }), [])

  const webRings = useMemo(() => [12, 20, 28, 36, 44], [])

  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  })), [])

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: 0.8 + i * 0.06,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  const tagline = "WITH GREAT POWER..."
  const subtitle = "COMES GREAT RESPONSIBILITY"

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050a14 0%, #0d1b2a 40%, #0a1628 100%)' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 opacity-[0.06]"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          {webLines.map((line, i) => (
            <motion.line
              key={`line-${i}`}
              x1="50" y1="50"
              x2={line.x2} y2={line.y2}
              stroke="rgba(230, 57, 70, 0.6)"
              strokeWidth="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.05 }}
            />
          ))}
          {webRings.map((r, i) => (
            <motion.circle
              key={`ring-${i}`}
              cx="50" cy="50" r={r}
              fill="none"
              stroke="rgba(230, 57, 70, 0.4)"
              strokeWidth="0.1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 + i * 0.15 }}
            />
          ))}
        </motion.svg>
      </div>

      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0
              ? 'rgba(230, 57, 70, 0.5)'
              : p.id % 3 === 1
                ? 'rgba(244, 162, 97, 0.4)'
                : 'rgba(255, 255, 255, 0.2)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <motion.div
        className="absolute"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,57,70,0.12) 0%, rgba(230,57,70,0.04) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative flex flex-col items-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 60, damping: 12, delay: 0.2 }}
      >
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: -140,
            width: 1,
            height: 140,
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.5) 100%)',
            transformOrigin: 'top',
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className="relative"
          animate={{ rotate: [0, -3, 3, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top center' }}
        >
          <motion.div
            className="absolute -inset-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(230,57,70,0.2) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <svg width="130" height="130" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 20px rgba(230,57,70,0.4))' }}>
            <defs>
              <radialGradient id="headGradient" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#f04050" />
                <stop offset="60%" stopColor="#e63946" />
                <stop offset="100%" stopColor="#b8202d" />
              </radialGradient>
              <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="80%" stopColor="#e8e8e8" />
                <stop offset="100%" stopColor="#d0d0d0" />
              </radialGradient>
              <filter id="eyeGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="innerShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
              </filter>
            </defs>

            <ellipse cx="50" cy="50" rx="44" ry="46" fill="url(#headGradient)" filter="url(#innerShadow)" />

            <g stroke="#9e1a25" strokeWidth="0.8" fill="none" opacity="0.7">
              <path d="M50 4 L50 96" />
              <path d="M28 7 Q50 50 28 93" />
              <path d="M72 7 Q50 50 72 93" />
              <path d="M12 18 Q50 50 12 82" />
              <path d="M88 18 Q50 50 88 82" />
              <path d="M6 40 Q50 50 6 60" />
              <path d="M94 40 Q50 50 94 60" />

              <ellipse cx="50" cy="18" rx="30" ry="6" />
              <ellipse cx="50" cy="30" rx="38" ry="8" />
              <ellipse cx="50" cy="43" rx="43" ry="9" />
              <ellipse cx="50" cy="57" rx="43" ry="9" />
              <ellipse cx="50" cy="70" rx="38" ry="8" />
              <ellipse cx="50" cy="82" rx="30" ry="6" />
              <ellipse cx="50" cy="92" rx="18" ry="4" />
            </g>

            <motion.g filter="url(#eyeGlow)">
              <motion.path
                d="M18 42 Q22 28 38 32 Q44 34 42 44 Q40 54 28 52 Q16 50 18 42Z"
                fill="url(#eyeGradient)"
                stroke="#0d1b2a"
                strokeWidth="2.5"
                animate={{ scaleY: [1, 0.15, 1] }}
                transition={{ duration: 0.2, delay: 2.5, repeat: Infinity, repeatDelay: 4 }}
                style={{ transformOrigin: '30px 42px' }}
              />
              <motion.path
                d="M82 42 Q78 28 62 32 Q56 34 58 44 Q60 54 72 52 Q84 50 82 42Z"
                fill="url(#eyeGradient)"
                stroke="#0d1b2a"
                strokeWidth="2.5"
                animate={{ scaleY: [1, 0.15, 1] }}
                transition={{ duration: 0.2, delay: 2.5, repeat: Infinity, repeatDelay: 4 }}
                style={{ transformOrigin: '70px 42px' }}
              />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>

      <motion.div className="mt-10 text-center relative z-10">
        <div className="overflow-hidden">
          <div className="flex justify-center flex-wrap">
            {tagline.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="font-comic inline-block text-2xl sm:text-3xl md:text-4xl tracking-wider"
                style={{
                  color: '#e63946',
                  textShadow: '0 0 20px rgba(230,57,70,0.4), 0 0 40px rgba(230,57,70,0.2)',
                  marginRight: char === ' ' ? '0.3em' : '0.02em',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showTagline && (
            <motion.div
              className="overflow-hidden mt-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            >
              <div className="flex justify-center flex-wrap">
                {subtitle.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.03, duration: 0.3 }}
                    className="inline-block text-xs sm:text-sm tracking-[0.25em] font-light"
                    style={{
                      color: 'rgba(241, 250, 238, 0.5)',
                      marginRight: char === ' ' ? '0.4em' : '0.02em',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          className="text-xs tracking-[0.3em] uppercase mt-6 font-light"
          style={{ color: 'rgba(244, 162, 97, 0.6)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Initializing Portfolio
          </motion.span>
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-8 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <div className="relative w-64 sm:w-72 md:w-80">
          <div
            className="h-[3px] rounded-full overflow-hidden"
            style={{ background: 'rgba(230, 57, 70, 0.1)' }}
          >
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: 'linear-gradient(90deg, #e63946, #f4a261, #e63946)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                width: `${progress}%`,
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
              }}
              transition={{
                width: { duration: 0.1, ease: 'linear' },
                backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
              }}
            >
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(244,162,97,0.8) 0%, transparent 70%)',
                  filter: 'blur(2px)',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.div>
          </div>

          <motion.div
            className="flex justify-between mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(241,250,238,0.25)' }}>
              Loading
            </span>
            <span className="text-[10px] font-mono tabular-nums" style={{ color: 'rgba(230,57,70,0.6)' }}>
              {progress}%
            </span>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-spidey-red/20" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-spidey-red/20" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-spidey-red/20" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-spidey-red/20" />

      <motion.div
        className="absolute left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(230,57,70,0.15), transparent)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
}

export default Loader