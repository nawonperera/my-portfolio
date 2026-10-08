import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    type: 'work',
    title: 'Software Engineer (Contract)',
    company: 'Spherehead Technologies (Pvt) Ltd',
    location: 'Sri Lanka',
    date: 'June 2026 - September 2026',
    description: [
      'Built a static company website using React, focusing on responsive UI and performance.',
      'Developed a static site using Next.js, implementing modern routing and SEO friendly structure.',
      'Contributed to a full-stack MERN project, working across MongoDB, Express, React, and Node.js.',
    ],
  },
  {
    type: 'work',
    title: 'Trainee .NET Software Engineer',
    company: 'ASN IT',
    location: 'Sri Lanka',
    date: 'September 2025 - May 2026',
    description: [
      'Developed and maintained .NET applications, fixing bugs, writing unit tests, and following best practices while collaborating with senior developers and cross functional teams.',
      'Built a real time kitchen display system using .NET MAUI to show live order updates for kitchen operations.',
      'Contributed to multiple projects including POSPointe .NET and developed a self service kiosk application using Flutter with PAX payment system integration.',
    ],
  },
  {
    type: 'work',
    title: 'Trainee Software Engineer',
    company: 'CB Electric System',
    location: 'Sri Lanka',
    date: 'October 2024 - September 2025',
    description: [
      'Developed internal business applications using C#, ASP.NET, and SQL Server',
      'Performed database maintenance and query optimization',
      'Assisted in PLC related projects and system monitoring',
      'Fixed bugs and performed unit testing for robust delivery',
    ],
  },
  {
    type: 'work',
    title: 'Intern Project Manager',
    company: 'Heineken Lanka, PVT LTD',
    location: 'Sri Lanka',
    date: 'September 2023 - March 2024',
    description: [
      'Built IoT based bottle counter with ESP32 for remote monitoring',
      'Led Destoner Machine Mounting Project, overseeing design and setup',
      'Applied project management principles to technical implementations',
    ],
  },
  {
    type: 'education',
    title: 'BSc(Hons) in Electronics and Engineering Management',
    company: 'SLTC Research University',
    location: 'Sri Lanka',
    date: 'Graduate',
    description: [
      'Specialized in engineering management and electronic systems',
      'Developed bio inspired prosthetic arm and thought(brain) controlled wheelchair',
      'Mastered the intersection of hardware and software engineering',
    ],
  },
  {
    type: 'education',
    title: 'High School',
    company: 'Trinity College Kandy',
    location: 'Sri Lanka',
    date: 'Schooling',
    description: [
      'Strong foundation in academic and analytical thinking',
      'Active participation in Rugby and Athletics',
      'Developed teamwork, discipline, and leadership through sports',
    ],
  },
]

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const containerRef = useRef(null)
  const [containerHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.scrollHeight)
      }
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Smooth spring physics for buttery animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  })

  // Map smoothed progress to pixel position
  const spiderY = useTransform(smoothProgress, [0, 1], [0, containerHeight - 40])

  return (
    <section id="experience" className="py-12 md:py-20 px-4 md:px-6 relative bg-[#0f0f0f] overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-24"
        >
          <h2 className="font-bold text-4xl md:text-6xl mt-4 tracking-tighter uppercase">
            <span className="text-spidey-red text-base md:text-2xl block mb-2 font-normal">[ PROFESSIONAL ]</span>
            <span className="gradient-text text-4xl md:text-8xl">EXPERIENCE</span>
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative w-full" ref={containerRef}>
          {/* Vertical Dotted Line */}
          <div className="absolute left-4 md:left-12 top-0 bottom-0 border-l-[2px] border-dotted border-gray-600"></div>

          {/* Scrolling Spider */}
          <motion.div 
            className="absolute left-4 md:left-12 -translate-x-1/2 w-8 h-8 md:w-16 md:h-16 z-10 pointer-events-none"
            style={{ top: spiderY }}
          >
            <img src="/experience/experiance.png" alt="Spider" className="w-full h-full object-contain" />
          </motion.div>

          {/* Experience Items */}
          <div className="flex flex-col">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative flex flex-col gap-3 md:gap-6 md:flex-row md:gap-12 pl-10 md:pl-32 py-6 md:py-16 border-b border-white/10 last:border-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-12 top-8 md:top-18 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white z-0"></div>
                
                {/* Date */}
                <div className="md:w-[25%] shrink-0 pt-0 md:pt-1">
                  <h3 className="text-white font-bold text-xs md:text-base">{exp.date}</h3>
                </div>

                {/* Company & Location */}
                <div className="md:w-[25%] shrink-0">
                  <h4 className="text-white font-bold text-lg md:text-3xl mb-0.5 md:mb-1">{exp.company}</h4>
                  <p className="text-gray-400 text-xs md:text-base">{exp.location}</p>
                </div>

                {/* Title & Description */}
                <div className="md:w-[50%]">
                  <h4 className="text-white font-bold text-base md:text-2xl mb-2 md:mb-3">{exp.title}</h4>
                  <ul className="text-gray-400 text-xs md:text-sm leading-relaxed list-disc list-outside ml-4 space-y-1 md:space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Experience