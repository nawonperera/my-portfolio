import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const projects = [
  {
    id: 1,
    title: 'Cristal Beauty',
    villain: 'E-Commerce Complexity',
    description: 'Full-stack beauty store with JWT/Google OAuth, stock tracking, and OTP verification. Featuring admin dashboard and customer storefront.',
    image: '/Projects/CRISTAL BEAUTY.jpeg',
    gradient: 'from-pink-500 to-rose-700',
    tags: ['.NET Core', 'React', 'MongoDB', 'Node.js', 'Tailwind'],
    category: 'fullstack',
    github: 'https://github.com/nawonperera/crystal-beauty-clear-backend',
    live: '#',
    actionWord: 'THWIP!',
  },
  {
    id: 2,
    title: 'CulinaryCore API',
    villain: 'Restaurant Disorder',
    description: 'Layered architecture backend for menu management, order processing, and role-based JWT authentication.',
    image: '/Projects/CULINARYCORE API.jpeg',
    gradient: 'from-orange-500 to-red-700',
    tags: ['.NET 9', 'EF Core', 'SQL Server', 'JWT'],
    category: 'backend',
    github: 'https://github.com/nawonperera/CulinaryCore._API',
    live: '#',
    actionWord: 'POW!',
  },
  {
    id: 3,
    title: 'Villa Management System',
    villain: 'Booking Chaos',
    description: 'Robust API and MVC frontend for property administration. Features distributed caching and repository patterns.',
    image: '/Projects/VILLA MANAGEMENT SYSTEM.jpeg',
    gradient: 'from-blue-500 to-indigo-700',
    tags: ['.NET Core', 'MVC', 'Entity Framework', 'SQL Server'],
    category: 'fullstack',
    github: 'https://github.com/nawonperera/Villa_REST-API-Backend',
    live: '#',
    actionWord: 'WHAM!',
  },
  {
    id: 4,
    title: 'Brain-Controlled Wheelchair',
    villain: 'Mobility Limitations',
    description: 'BCI smart wheelchair using EEG signal classification and ML to map brain responses to motor commands.',
    image: '/Projects/Brain-controlled_wheelchair.jpeg',
    gradient: 'from-spidey-blue to-spidey-darkRed',
    tags: ['Python', 'ML', 'Raspberry Pi', 'NumPy', 'SciPy'],
    category: 'ai_llm',
    github: 'https://github.com/nawonperera/Brain_Controlled_Wheelchair.git',
    live: '#',
    actionWord: 'ZAP!',
  },
  {
    id: 5,
    title: 'WorkLogic_HR',
    villain: 'Admin Inefficiency',
    description: 'Internal HR management using Clean Architecture. Full CRUD, holiday tracking, and in-memory caching.',
    image: '/Projects/WORKLOGIC_HR.jpeg',
    gradient: 'from-slate-500 to-slate-800',
    tags: ['.NET Core MVC', 'EF Core', 'SQL Server'],
    category: 'fullstack',
    github: 'https://github.com/nawonperera/WorkLogic_HR',
    live: '#',
    actionWord: 'BAM!',
  },
  {
    id: 6,
    title: 'Bio-Inspired Prosthetic Arm',
    villain: 'Physical Barrier',
    description: '3-DOF prosthetic arm emulating natural movements, controlled via smartphone using MQTT over WiFi.',
    image: '/Projects/BIO-INSPIRED PROSTHETIC ARM.jpeg',
    gradient: 'from-spidey-gold to-orange-600',
    tags: ['MicroPython', 'ESP32', 'MQTT', 'Servo Motors'],
    category: 'iot',
    github: 'https://github.com/nawonperera/Bio-Inspired-Prosthetic-Arm-Controlled-via-Smartphone',
    live: '#',
    actionWord: 'CRACK!',
  },
  {
    id: 7,
    title: 'Microservices eCommerce Platform',
    villain: 'Scaling Challenges',
    description: 'A containerized microservices system deployed to Azure AKS. Implemented Polyglot databases and Redis caching.',
    image: '/Projects/microservices_portfolio_image.png',
    gradient: 'from-cyan-500 to-blue-800',
    tags: ['.NET 8', 'Angular', 'PostgreSQL', 'Docker', 'AKS'],
    category: 'microservices',
    github: 'https://github.com/nawonperera/dotnet-ecommerce-microservices',
    live: '#',
    actionWord: 'BOOM!',
  },
  {
    id: 8,
    title: 'Beverage Can Monitor',
    villain: 'Empty Fridges',
    description: 'IoT fridge monitor tracking canned beverage status in real-time with MQTT transmissions to mobile.',
    image: '/Projects/BEVERAGE CAN MONITOR.jpeg',
    gradient: 'from-green-400 to-teal-800',
    tags: ['MicroPython', 'MQTT', 'ESP32', 'NodeMCU'],
    category: 'iot',
    github: 'https://github.com/nawonperera/IoT_Based_Beverage_Can_Monitoring_System',
    live: '#',
    actionWord: 'FIZZ!',
  },
  {
    id: 9,
    title: 'Sea Voyage Project',
    villain: 'Carbon Footprint',
    description: 'Solar-powered eco-friendly boat design with full project management and product strategy implementation.',
    image: '⛵',
    gradient: 'from-blue-400 to-sky-600',
    tags: ['Solar Engineering', 'Sustainability', 'Project Management'],
    category: 'iot',
    github: 'https://github.com/nawonperera',
    live: '#',
    actionWord: 'SPLASH!',
  },
  {
    id: 10,
    title: 'GenAI in .NET',
    villain: 'AI Integration Complexity',
    description: 'Comprehensive collection of .NET projects demonstrating Generative AI capabilities (RAG, function calling, embeddings, VectorSearch) using both cloud-based APIs and local models like Ollama.',
    image: '/Projects/genai_dotnet_portfolio.png',
    gradient: 'from-purple-500 to-fuchsia-700',
    tags: ['.NET', 'Generative AI', 'Ollama', 'RAG', 'Vector Search'],
    category: 'ai_llm',
    github: 'https://github.com/nawonperera/LLM_in_.NET',
    live: '#',
    actionWord: 'THWACK!',
  },
]

const filters = [
  { key: 'all', label: 'All Missions', icon: '🕷️' },
  { key: 'microservices', label: 'Microservices', icon: '🧩' },
  { key: 'fullstack', label: 'Full Stack', icon: '🕸️' },
  { key: 'backend', label: 'Backend', icon: '⚙️' },
  { key: 'ai_llm', label: 'AI/LLM', icon: '🧠' },
  { key: 'iot', label: 'IoT', icon: '📡' },
  { key: 'devops', label: 'DevOps', icon: '🚀' },
]

// Comic panel sizes — creates asymmetric grid
// On mobile (grid-cols-1) everything collapses to single col/row.
// row-span-2 only at md+ so cards don't eat double height on phones.
const panelLayouts = [
  'md:col-span-2 md:row-span-2',  // Large featured
  'col-span-1 row-span-1',         // Standard
  'col-span-1 md:row-span-2',      // Tall
  'col-span-1 row-span-1',         // Standard
  'md:col-span-2 row-span-1',      // Wide
  'col-span-1 row-span-1',         // Standard
  'col-span-1 row-span-1',         // Standard
  'col-span-1 row-span-1',         // Standard
  'col-span-1 row-span-1',         // Standard
]

const ComicProjectCard = ({ project, index, layout }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showAction, setShowAction] = useState(false)
  const [isTouched, setIsTouched] = useState(false)

  const handleHover = useCallback(() => {
    setIsHovered(true)
    setShowAction(true)
    setTimeout(() => setShowAction(false), 800)
  }, [])

  // On mobile, toggle card expansion on tap
  const handleTap = useCallback(() => {
    setIsTouched(prev => !prev)
    if (!isTouched) {
      setShowAction(true)
      setTimeout(() => setShowAction(false), 800)
    }
  }, [isTouched])

  const isExpanded = isHovered || isTouched
  const isLarge = layout.includes('col-span-2') || layout.includes('row-span-2')

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 4 - 2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`${layout} group relative`}
      onMouseEnter={handleHover}
      onMouseLeave={() => { setIsHovered(false); setIsTouched(false) }}
      onClick={handleTap}
    >
      <motion.div 
        className="relative w-full h-full min-h-[200px] md:min-h-[250px] overflow-hidden border-[3px] border-black bg-black"
        style={{
          clipPath: isLarge 
            ? 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'
            : 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
        }}
        whileHover={{ 
          scale: 1.02,
          zIndex: 10,
          boxShadow: '0 20px 60px rgba(230, 57, 70, 0.4), 0 0 0 3px #e63946',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Image */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}>
          {project.image.startsWith('/') ? (
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <motion.span 
                className="text-7xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {project.image}
              </motion.span>
            </div>
          )}
          
          {/* Web pattern overlay */}
          {!project.image.startsWith('/') && (
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                {[...Array(5)].map((_, i) => (
                  <circle key={i} cx="50%" cy="50%" r={20 + i * 20} fill="none" stroke="white" strokeWidth="0.5" />
                ))}
                {[...Array(8)].map((_, i) => (
                  <line key={i} x1="50%" y1="50%" x2={`${50 + 45 * Math.cos(i * Math.PI / 4)}%`} y2={`${50 + 45 * Math.sin(i * Math.PI / 4)}%`} stroke="white" strokeWidth="0.5" />
                ))}
              </svg>
            </div>
          )}
        </div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Comic action word - appears on hover */}
        <AnimatePresence>
          {showAction && (
            <motion.div
              className="absolute top-4 right-4 z-30 pointer-events-none"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: Math.random() * 20 - 10 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <span 
                className="font-comic text-3xl md:text-4xl block"
                style={{
                  color: '#f4a261',
                  textShadow: '3px 3px 0 #e63946, -1px -1px 0 #1d3557, 1px -1px 0 #1d3557, -1px 1px 0 #1d3557',
                  WebkitTextStroke: '1px #0d1b2a',
                }}
              >
                {project.actionWord}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-20">
          <h3 className={`font-black ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'} text-white uppercase tracking-tight mb-2 group-hover:text-spidey-red transition-colors leading-tight`}>
            {project.title}
          </h3>
          
          {/* Description - speech bubble style on hover */}
          <motion.div
            initial={false}
            animate={{ 
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative bg-white/10 backdrop-blur-md rounded-lg p-3 mb-3 border border-white/20">
              <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
                {project.description}
              </p>
              {/* Speech bubble tail */}
              <div 
                className="absolute -top-2 left-6 w-4 h-4 bg-white/10 border-l border-t border-white/20 backdrop-blur-md"
                style={{ transform: 'rotate(45deg)' }}
              />
            </div>
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, isLarge ? 5 : 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-sm bg-spidey-red/20 text-spidey-red border border-spidey-red/30"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > (isLarge ? 5 : 3) && (
              <span className="px-2 py-0.5 text-[10px] font-bold text-gray-400">
                +{project.tags.length - (isLarge ? 5 : 3)}
              </span>
            )}
          </div>

          {/* GitHub link */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-spidey-red/80 border border-white/20 hover:border-spidey-red rounded-sm text-white text-xs font-bold uppercase tracking-wider transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="text-base" />
            <span>View Code</span>
          </motion.a>
        </div>

        {/* Corner fold effect */}
        <div 
          className="absolute top-0 right-0 w-0 h-0 transition-all duration-300 group-hover:w-8 group-hover:h-8"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, rgba(230,57,70,0.8) 50%)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-10"
        >
          <motion.span 
            className="comic-action text-xl"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
          >
            POW!
          </motion.span>
          <h2 className="font-bold text-4xl md:text-6xl mt-4 tracking-tighter uppercase">
            <span className="text-spidey-light text-lg md:text-4xl block mb-2 font-normal">[ PROJECT ]</span>
            <span className="gradient-text text-4xl md:text-8xl">PORTFOLIO</span>
          </h2>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm md:text-lg transition-all flex items-center gap-1.5 md:gap-2 ${
                activeFilter === filter.key
                  ? 'bg-gradient-to-r from-spidey-red to-spidey-darkRed text-white shadow-lg shadow-spidey-red/30'
                  : 'glass text-gray-400 hover:text-white hover:border-spidey-red'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Comic Panel Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] md:auto-rows-[250px] gap-3"
          >
            {filteredProjects.map((project, i) => (
              <ComicProjectCard 
                key={project.id}
                project={project}
                index={i}
                layout={panelLayouts[i % panelLayouts.length]}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/nawonperera"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-spidey-red hover:text-spidey-gold transition-colors font-bold uppercase tracking-wider text-lg"
            whileHover={{ scale: 1.05 }}
          >
            <FaGithub className="text-2xl" />
            <span>More Missions on GitHub 🕸️</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects