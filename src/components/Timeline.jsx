import { motion } from 'framer-motion'

const Timeline = () => {
  const experiences = [
    {
      year: '2024',
      title: 'Senior Developer',
      company: 'Tech Company',
      description: 'Leading development of innovative web solutions'
    },
    {
      year: '2023',
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      description: 'Built scalable applications from scratch'
    },
    {
      year: '2022',
      title: 'Frontend Developer',
      company: 'Digital Agency',
      description: 'Created engaging user experiences'
    },
    {
      year: '2021',
      title: 'Junior Developer',
      company: 'First Company',
      description: 'Started my journey in web development'
    }
  ]

  return (
    <section id="timeline" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold mb-20 text-center"
        >
          My Journey
        </motion.h2>
        
        <div className="space-y-32">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  <h3 className="text-6xl font-bold text-gray-200 dark:text-white/20 mb-2">{exp.year}</h3>
                  <h4 className="text-2xl font-bold mb-2">{exp.title}</h4>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">{exp.company}</p>
                  <p className="text-gray-500 dark:text-gray-500">{exp.description}</p>
                </motion.div>
              </div>
              
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/50">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-white" />
              </div>
              
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
