import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-spidey-darkBlue flex flex-col items-center justify-center z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern id="web-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#web-pattern)" />
        </svg>
      </div>

      <motion.div
        className="relative"
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.5
        }}
      >
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-white/50 to-transparent"
          style={{ top: -200, height: 200 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="relative"
          animate={{ 
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="120" height="120" viewBox="0 0 100 100">
            <ellipse cx="50" cy="50" rx="45" ry="48" fill="#e63946" />
            
            <g stroke="#1d3557" strokeWidth="1" fill="none">
              <path d="M50 2 L50 98" />
              <path d="M30 5 Q50 50 30 95" />
              <path d="M70 5 Q50 50 70 95" />
              <path d="M15 15 Q50 50 15 85" />
              <path d="M85 15 Q50 50 85 85" />
              
              <ellipse cx="50" cy="25" rx="35" ry="8" />
              <ellipse cx="50" cy="40" rx="42" ry="10" />
              <ellipse cx="50" cy="55" rx="44" ry="10" />
              <ellipse cx="50" cy="70" rx="42" ry="10" />
              <ellipse cx="50" cy="85" rx="30" ry="8" />
            </g>
            
            <motion.ellipse
              cx="30"
              cy="45"
              rx="15"
              ry="20"
              fill="white"
              className="mask-eyes"
              animate={{ 
                scaleY: [1, 0.3, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
            <motion.ellipse
              cx="70"
              cy="45"
              rx="15"
              ry="20"
              fill="white"
              className="mask-eyes"
              animate={{ 
                scaleY: [1, 0.3, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
            
            <ellipse cx="30" cy="45" rx="15" ry="20" fill="none" stroke="#0d1b2a" strokeWidth="3" />
            <ellipse cx="70" cy="45" rx="15" ry="20" fill="none" stroke="#0d1b2a" strokeWidth="3" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <h2 className="font-comic text-3xl text-spidey-red tracking-wider">
          WITH GREAT POWER...
        </h2>
        <motion.p
          className="text-spidey-light/70 mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Portfolio...
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-6 w-64 h-2 bg-spidey-blue/30 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-spidey-red to-spidey-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, delay: 1 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Loader