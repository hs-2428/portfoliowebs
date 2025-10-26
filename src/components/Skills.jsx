import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const skills = useMemo(() => [
    { name: 'React', color: '#ff6b6b', x: 15, y: 20 },
    { name: 'JavaScript', color: '#ffd93d', x: 25, y: 65 },
    { name: 'Python', color: '#6bcf7f', x: 85, y: 15 },
    { name: 'Node.js', color: '#4ecdc4', x: 45, y: 35 },
    { name: 'TypeScript', color: '#a8dadc', x: 70, y: 45 },
    { name: 'HTML/CSS', color: '#ff8787', x: 10, y: 80 },
    { name: 'Docker', color: '#95e1d3', x: 55, y: 75 },
    { name: 'Git', color: '#f38181', x: 90, y: 80 },
    { name: 'MongoDB', color: '#aa96da', x: 35, y: 10 },
    { name: 'Express', color: '#fcbad3', x: 65, y: 25 },
    { name: 'Tailwind', color: '#ffffd2', x: 20, y: 45 },
    { name: 'Framer Motion', color: '#ff9a9e', x: 80, y: 60 },
    { name: 'REST API', color: '#a18cd1', x: 50, y: 55 },
    { name: 'GraphQL', color: '#fad0c4', x: 15, y: 50 },
    { name: 'PostgreSQL', color: '#fbc2eb', x: 75, y: 85 },
    { name: 'Redis', color: '#a6c1ee', x: 40, y: 85 },
    { name: 'AWS', color: '#ffeaa7', x: 60, y: 10 },
    { name: 'CI/CD', color: '#fab1a0', x: 30, y: 70 },
    { name: 'Webpack', color: '#74b9ff', x: 85, y: 40 },
    { name: 'Vite', color: '#a29bfe', x: 5, y: 35 },
    { name: 'Jest', color: '#fd79a8', x: 95, y: 50 },
    { name: 'Linux', color: '#fdcb6e', x: 45, y: 90 },
    { name: 'Nginx', color: '#55efc4', x: 70, y: 70 },
    { name: 'WebSockets', color: '#81ecec', x: 25, y: 25 },
  ], [])

  // Optimize connections - memoize and limit
  const connections = useMemo(() => {
    const conns = []
    skills.forEach((skill, i) => {
      skills.forEach((otherSkill, j) => {
        if (i < j) {
          const distance = Math.sqrt(
            Math.pow(skill.x - otherSkill.x, 2) + Math.pow(skill.y - otherSkill.y, 2)
          )
          if (distance < 35) { // Reduced from 40 for fewer lines
            conns.push({ from: i, to: j, distance })
          }
        }
      })
    })
    return conns
  }, [skills])

  return (
    <section id="skills" className="min-h-screen py-20 px-6 relative overflow-hidden bg-gray-950 dark:bg-black">
      <div className="max-w-7xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold mb-12 text-center text-white"
        >
          Skills & Technologies
        </motion.h2>

        {/* Network graph container */}
        <div 
          className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {/* Simplified grid background - static for performance */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Connection lines - optimized */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
              </linearGradient>
            </defs>
            {connections.map((conn, idx) => {
              const from = skills[conn.from]
              const to = skills[conn.to]
              const isHighlighted = hoveredSkill === conn.from || hoveredSkill === conn.to
              
              return (
                <line
                  key={idx}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={isHighlighted ? from.color : "url(#lineGradient)"}
                  strokeWidth={isHighlighted ? "2" : "1"}
                  opacity={isHighlighted ? 0.6 : 0.15}
                  style={{ transition: 'opacity 0.2s ease, stroke 0.2s ease' }}
                />
              )
            })}
          </svg>

          {/* Skill nodes - optimized animations */}
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="absolute cursor-pointer"
              style={{
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: [0, Math.sin(index * 0.5) * 15, 0],
                y: [0, Math.cos(index * 0.5) * 15, 0],
              }}
              transition={{ 
                scale: {
                  delay: index * 0.02,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                },
                opacity: {
                  delay: index * 0.02,
                },
                x: {
                  duration: 3 + index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse"
                },
                y: {
                  duration: 4 + index * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse"
                }
              }}
              whileHover={{ scale: 1.2 }}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Expanded hover area - includes node and label */}
              <div className="absolute -inset-8 md:-inset-10" />
              
              {/* Node circle - simplified */}
              <div
                className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full relative transition-all duration-200"
                style={{
                  backgroundColor: skill.color,
                  boxShadow: hoveredSkill === index 
                    ? `0 0 20px ${skill.color}, 0 0 40px ${skill.color}80`
                    : `0 0 10px ${skill.color}60`,
                }}
              >
                {/* Simplified pulse - only on hover */}
                {hoveredSkill === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    animate={{
                      scale: [1, 2],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                )}
              </div>

              {/* Label - always visible, highlight on hover */}
              <div
                className="absolute whitespace-nowrap text-xs md:text-sm font-medium transition-opacity duration-200"
                style={{ 
                  color: skill.color,
                  textShadow: hoveredSkill === index ? `0 0 10px ${skill.color}` : 'none',
                  left: '50%',
                  top: '100%',
                  transform: 'translateX(-50%)',
                  marginTop: '6px',
                  opacity: hoveredSkill === index ? 1 : 0.7,
                  pointerEvents: 'auto', // Make label clickable
                }}
              >
                {skill.name}
              </div>
            </motion.div>
          ))}

          {/* Removed center text overlay */}
        </div>
      </div>
    </section>
  )
}

export default Skills
