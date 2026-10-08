import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  SiDotnet, SiCsharp, SiReact, SiTypescript, SiJavascript,
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn,
  SiPostgresql, SiMongodb, SiDocker, SiGit, SiNodedotjs,
  SiTailwindcss, SiRedux, SiRedis, SiRabbitmq, SiNextdotjs,
  SiAngular, SiBlazor, SiOpenai, SiKubernetes,
  SiMicrosoftazure, SiAmazonaws, SiGithubactions, SiGithub, SiOpentelemetry
} from 'react-icons/si'

const skillCategories = [
  {
    title: 'Backend Engineering',
    subtitle: 'Scalable APIs & Distributed Systems',
    icon: '⚙️',
    color: 'spidey-red',
    skills: [
      { name: 'C# / .NET / ASP.NET Core', icon: SiCsharp },
      { name: 'REST APIs / Minimal APIs', icon: SiDotnet },
      { name: 'Node.js / Express', icon: SiNodedotjs },
      { name: 'Microservices / API Gateway', icon: SiDocker },
      { name: 'SQL Server / PostgreSQL', icon: SiPostgresql },
      { name: 'MongoDB / Redis', icon: SiRedis },
      { name: 'RabbitMQ / Messaging', icon: SiRabbitmq },
    ]
  },
  {
    title: 'Frontend Engineering',
    subtitle: 'Modern Web Applications',
    icon: '💻',
    color: 'spidey-react',
    skills: [
      { name: 'React / Next.js', icon: SiNextdotjs },
      { name: 'TypeScript / JavaScript', icon: SiTypescript },
      { name: 'Angular', icon: SiAngular },
      { name: 'Blazor', icon: SiBlazor },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Redux / State Management', icon: SiRedux },
    ]
  },
  {
    title: 'AI & Intelligent Systems',
    subtitle: 'AI-Powered Software Engineering',
    icon: '🧠',
    color: 'spidey-gold',
    skills: [
      { name: 'Python / AI Workflows', icon: SiPython },
      { name: 'Agentic AI / AI Agents', icon: SiOpenai },
      { name: 'LLMs / RAG', icon: SiTensorflow },
      { name: 'Prompt Engineering', icon: SiOpenai },
      { name: 'Machine Learning', icon: SiScikitlearn },
      { name: 'AI-Assisted Development', icon: SiGithub },
    ]
  },
  {
    title: 'Cloud, DevOps & Infrastructure',
    subtitle: 'Cloud-Native Engineering',
    icon: '🛠️',
    color: 'spidey-lightBlue',
    skills: [
      { name: 'Docker / Containers', icon: SiDocker },
      { name: 'Kubernetes / Azure AKS', icon: SiKubernetes },
      { name: 'Microsoft Azure', icon: SiMicrosoftazure },
      { name: 'AWS', icon: SiAmazonaws },
      { name: 'CI/CD Pipelines', icon: SiGithubactions },
      { name: 'Git / GitHub', icon: SiGithub },
      { name: 'OpenTelemetry / Observability', icon: SiOpentelemetry },
    ]
  },
]

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [hoveredSkill, setHoveredSkill] = useState(null)

  return (
    <section id="skills" className="py-10 px-6 relative overflow-hidden bg-[#080808]">
      <div className="absolute top-0 right-0 w-48 h-48 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {[...Array(6)].map((_, i) => (
            <line key={i} x1="100" y1="0" x2={100 - 100 * Math.cos(i * Math.PI / 10)} y2={100 * Math.sin(i * Math.PI / 10)} stroke="#e63946" strokeWidth="0.5" />
          ))}
          {[20, 40, 60, 80].map(r => (
            <path key={r} d={`M 100 ${100-r} A ${r} ${r} 0 0 0 ${100-r} 0`} fill="none" stroke="#e63946" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-left mb-10"
        >
          <h2 className="font-bold text-4xl md:text-6xl mt-4 tracking-tighter uppercase">
            <span className="text-spidey-light text-lg md:text-4xl block mb-2 font-normal">[ CORE ]</span>
            <span className="gradient-text text-4xl md:text-8xl">EXPERTISE</span>
          </h2>
          
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: catIndex * 0.05 }}
              className="glass rounded-2xl p-4 md:p-6 border-2 border-transparent hover:border-spidey-red/50 transition-all group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
                <motion.span 
                  className="text-2xl md:text-4xl shrink-0"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {category.icon}
                </motion.span>
                <div>
                  <h3 className="font-bold text-lg md:text-2xl text-spidey-light tracking-tight">{category.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400">{category.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 + catIndex * 0.05 + skillIndex * 0.03 }}
                    className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl bg-spidey-darkBlue/40 border border-spidey-red/10 hover:border-spidey-red/40 hover:bg-spidey-darkBlue/60 transition-all group/item min-w-0"
                    whileHover={{ x: 5 }}
                  >
                    <skill.icon className={`text-lg md:text-2xl text-${category.color} group-hover/item:scale-110 transition-transform shrink-0`} />
                    <span className="font-medium text-gray-300 group-hover/item:text-white transition-colors truncate text-xs md:text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-16 relative"
        >
          <div className="flex flex-wrap justify-center gap-6">
            {[SiDotnet, SiReact, SiPython, SiTypescript, SiDocker, SiGit, SiTensorflow, SiMongodb].map((Icon, i) => (
                <motion.div
                key={i}
                className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl glass-red flex items-center justify-center text-xl md:text-3xl text-gray-400 hover:text-spidey-red transition-all"
                whileHover={{ scale: 1.2, rotate: 360, boxShadow: '0 0 20px rgba(230, 57, 70, 0.5)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <Icon />
              </motion.div>
            ))}
          </div>
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#e63946" strokeWidth="1" strokeDasharray="5,5" />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills