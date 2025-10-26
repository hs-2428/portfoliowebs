import { motion } from 'framer-motion'
import { useState } from 'react'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      title: 'AI Playlist Generator',
      year: 'Sep 2025',
      description: 'Intelligent playlist generator that creates personalized music playlists based on mood, genre preferences, and listening history.',
      tech: ['JavaScript', 'AI/ML', 'Spotify API', 'Node.js'],
      highlights: [
        'Smart music recommendations',
        'Mood-based playlist creation',
        'Spotify integration',
        'Real-time playlist updates'
      ],
      link: 'https://github.com/hs-2428/ai-playlist-generator'
    },
    {
      title: 'ML Model Comparison',
      year: 'Sep 2025',
      description: 'Comprehensive machine learning model comparison framework with detailed metrics, visualizations, and performance analysis.',
      tech: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas'],
      highlights: [
        'Multiple ML algorithms',
        'Detailed performance metrics',
        'Interactive visualizations',
        'Model optimization tools'
      ],
      link: 'https://github.com/hs-2428/ml-model-comparison'
    },
    {
      title: 'Weather Dashboard',
      year: 'Sep 2025',
      description: 'Real-time weather dashboard with API integration, featuring current conditions, forecasts, and interactive weather maps.',
      tech: ['Python', 'Weather API', 'Flask', 'JavaScript'],
      highlights: [
        'Real-time weather data',
        'Multi-location tracking',
        'Interactive weather maps',
        '5-day forecast display'
      ],
      link: 'https://github.com/hs-2428/weather-dashboard'
    },
    {
      title: 'YouTube Liked Videos Remover',
      year: 'Jul 2025',
      description: 'Automation tool to bulk remove liked videos from YouTube, helping users manage their liked videos collection efficiently.',
      tech: ['Python', 'YouTube API', 'Selenium', 'OAuth'],
      highlights: [
        'Bulk video management',
        'YouTube API integration',
        'Automated cleanup',
        'User authentication'
      ],
      link: 'https://github.com/hs-2428/youtube-liked-videos-remover'
    },
    {
      title: 'AI Summarizer (Mac)',
      year: 'Jul 2025',
      description: 'macOS application that uses AI to summarize text content, making it easy to extract key information from documents and articles.',
      tech: ['Python', 'NLP', 'macOS', 'OpenAI'],
      highlights: [
        'Text summarization',
        'macOS native integration',
        'Multiple summary lengths',
        'Fast processing'
      ],
      link: 'https://github.com/hs-2428/ai-summarizer'
    },
    {
      title: 'Link Manager',
      year: 'Jul 2025',
      description: 'Web-based link management tool for organizing and accessing multiple links efficiently with categorization and search.',
      tech: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
      highlights: [
        'Link organization',
        'Category management',
        'Quick search',
        'Clean UI/UX'
      ],
      link: 'https://github.com/hs-2428/link-manager'
    },
    {
      title: 'Proxy Server with IDS',
      year: 'Sep 2025',
      description: 'Advanced proxy server implementation with integrated intrusion detection system for network security monitoring.',
      tech: ['Python', 'Networking', 'Security', 'IDS'],
      highlights: [
        'Intrusion detection',
        'Network monitoring',
        'Security alerts',
        'Traffic analysis'
      ],
      link: 'https://github.com/hs-2428/Proxy-Server-with-Intrusion-Detection'
    }
  ]

  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold mb-20 text-center"
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
              className="bg-gray-100 dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-300 dark:border-white/10 cursor-pointer hover:border-gray-400 dark:hover:border-white/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-white/5 px-3 py-1 rounded-full">
                  {project.year}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 rounded-full border border-blue-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {selectedProject === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-300 dark:border-white/10 pt-4 mt-4"
                >
                  <h4 className="font-semibold mb-2 text-sm text-gray-700 dark:text-gray-300">Key Highlights:</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View on GitHub
                    </a>
                  )}
                </motion.div>
              )}

              <div className="mt-4 text-sm text-gray-500">
                {selectedProject === index ? 'Click to collapse' : 'Click to expand'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
