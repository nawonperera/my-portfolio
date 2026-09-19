import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = navLinks.map(link => link.href.slice(1))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass py-3' : 'py-3 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#home"
            className="flex items-center z-20"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-black text-2xl italic tracking-wider">
              <span className="text-[#c1121f]">NAWON</span>
              <span className="text-white">_DEV</span>
            </span>
          </motion.a>

          <ul className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2 w-max z-10">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <a
                  href={link.href}
                  className={`py-2 text-base font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
            
          <div className="flex items-center gap-4 z-20">
            <div className="hidden md:block relative">
              <motion.a
                href={`${import.meta.env.BASE_URL}CV/Nawon_Perera_CV.pdf`}
                download="Nawon_Perera_CV.pdf"
                className="block bg-[#c1121f] hover:bg-[#9a0e19] text-white px-8 py-2 text-sm font-bold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.a>
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full flex flex-col items-center pointer-events-none z-50">
                <div className="w-[1px] h-20 bg-white/40"></div>
                <span className="text-white text-3xl -mt-1 drop-shadow-md">🕷️</span>
              </div>
            </div>

          <button
            className="md:hidden text-2xl text-spidey-red"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiX /> : <HiMenuAlt4 />}
          </button>
        </div>
      </div>
    </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-spidey-darkBlue/95 backdrop-blur-xl">
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                  <pattern id="mobile-web" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <circle cx="30" cy="30" r="25" fill="none" stroke="white" strokeWidth="0.5" />
                    <line x1="30" y1="0" x2="30" y2="60" stroke="white" strokeWidth="0.5" />
                    <line x1="0" y1="30" x2="60" y2="30" stroke="white" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#mobile-web)" />
                </svg>
              </div>
              
              <ul className="relative flex flex-col items-center justify-center h-full gap-8">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <a
                      href={link.href}
                      className="font-comic text-3xl text-spidey-light hover:text-spidey-red transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * navLinks.length }}
                >
                  <a
                    href={`${import.meta.env.BASE_URL}CV/Nawon_Perera_CV.pdf`}
                    download="Nawon_Perera_CV.pdf"
                    className="web-btn px-8 py-3 rounded-full bg-gradient-to-r from-spidey-red to-spidey-darkRed text-white text-lg font-bold"
                    onClick={() => setMobileOpen(false)}
                  >
                    Resume 🕸️
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar