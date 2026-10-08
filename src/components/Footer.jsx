import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-spidey-red/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="footer-web" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="25" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="15" fill="none" stroke="white" strokeWidth="0.5" />
            <line x1="30" y1="0" x2="30" y2="60" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="30" x2="60" y2="30" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-web)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          <p className="flex items-center justify-center lg:justify-start flex-wrap gap-1">
            TCK @ NAWON PERERA
          </p>

          <motion.p
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            "WITH GREAT CODE COMES GREAT RESPONSIBILITY" - UNCLE BEN(PROBABLY)
          </motion.p>

          <p className="flex items-center justify-center lg:justify-end gap-2 text-gray-400">
            FULL STACK SOFTWARE ENGINEER <span>🕷️</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer