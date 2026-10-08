import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin,FaInstagram } from 'react-icons/fa'
import HoverReveal from './HoverReveal'

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [copied, setCopied] = useState(null)

  const handleCopyEmail = (e, email) => {
    e.preventDefault()
    navigator.clipboard.writeText(email)
    setCopied(email)
    setTimeout(() => setCopied(null), 2000)
  }


  const socials = [
    { icon: FaGithub, href: 'https://github.com/nawonperera', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/nawon-perera-1106a22aa/', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://www.instagram.com/nawonperera/', label: 'Instagram' },
  ]

  return (
    <section id="contact" className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden bg-[#0d0d0d]">

      <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {[...Array(6)].map((_, i) => (
            <line key={i} x1="0" y1="0" x2={100 * Math.cos(i * Math.PI / 10)} y2={100 * Math.sin(i * Math.PI / 10)} stroke="#e63946" strokeWidth="1" />
          ))}
          {[15, 30, 45, 60, 75].map(r => (
            <path key={r} d={`M 0 ${r} A ${r} ${r} 0 0 1 ${r} 0`} fill="none" stroke="#e63946" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-10"
        >
          <h2 className="font-bold text-4xl md:text-6xl mt-4 tracking-tighter uppercase">
            <span className="text-spidey-light text-lg md:text-4xl block mb-2 font-normal">[ GET IN ]</span>
            <span className="gradient-text text-4xl md:text-8xl">TOUCH</span>
          </h2>
          
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-between relative w-full">
          <div className="max-w-2xl z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-bold text-xl md:text-3xl mb-4 md:mb-6 text-spidey-light tracking-tight uppercase">LET'S TEAM UP!</h3>
              <p className="text-gray-400 mb-8 md:mb-12 text-sm md:text-lg">
                Whether you need help saving the city (building an app) or just want to 
                chat about the latest tech, my spidey sense is always on! 
                I'm currently available for new missions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 md:mb-12">
                <div className="space-y-6 md:space-y-8">
                  <motion.div
                    className="md:hidden w-56 sm:w-64 mx-auto rounded-xl overflow-hidden shadow-2xl border-2 border-[#e63946]/20 mb-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 }}
                  >
                    <img 
                      src="/HoverImg/Full Image.jpeg" 
                      alt="Nawon Perera"
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>

                  <motion.a
                    href="mailto:nawon2794@gmail.com"
                    onClick={(e) => handleCopyEmail(e, 'nawon2794@gmail.com')}
                    className="block group"
                    whileHover={{ x: 10 }}
                  >
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                      WEB-MAIL (PRIMARY)
                      {copied === 'nawon2794@gmail.com' && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-sm font-bold"
                        >
                          COPIED!
                        </motion.span>
                      )}
                    </p>
                    <p className="text-white text-sm md:text-lg tracking-wide group-hover:text-spidey-red transition-colors">nawon2794@gmail.com</p>
                  </motion.a>

                  <motion.a
                    href="mailto:nawon.d.perera@gmail.com"
                    onClick={(e) => handleCopyEmail(e, 'nawon.d.perera@gmail.com')}
                    className="block group"
                    whileHover={{ x: 10 }}
                  >
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                      WEB-MAIL (SECONDARY)
                      {copied === 'nawon.d.perera@gmail.com' && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-sm font-bold"
                        >
                          COPIED!
                        </motion.span>
                      )}
                    </p>
                    <p className="text-white text-sm md:text-lg tracking-wide group-hover:text-spidey-red transition-colors">nawon.d.perera@gmail.com</p>
                  </motion.a>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <motion.div
                    className="block group"
                    whileHover={{ x: 10 }}
                  >
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">SPIDER BASE (KANDY)</p>
                    <p className="text-white text-sm md:text-lg tracking-wide leading-relaxed">
                      71/8, "River View", Dodanwala Passage,<br/>
                      Asgiriya,<br/>
                      Kandy,<br/>
                      Sri Lanka.
                    </p>
                  </motion.div>

                  <motion.div
                    className="block group"
                    whileHover={{ x: 10 }}
                  >
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">SPIDER BASE (COLOMBO)</p>
                    <p className="text-white text-sm md:text-lg tracking-wide leading-relaxed">
                      115/A, Robert Gunawardana Mawatha,<br/>
                      Udayapura,<br/>
                      Battaramulla,<br/>
                      Sri Lanka.
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="flex gap-4">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 bg-[#a30b0b] hover:bg-[#c91212] rounded-md flex items-center justify-center text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    aria-label={social.label}
                  >
                    <social.icon className="text-xl md:text-2xl" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="hidden lg:flex flex-col items-center justify-center relative z-10 w-full max-w-sm"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <img
              src="/touch/web.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none select-none"
            />

            <div className="relative z-10 w-full">
              <HoverReveal />
            </div>

          </motion.div>
        </div>
      </div>
    </section>

  )
}

export default Contact