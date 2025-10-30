import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const { isDark, toggleTheme } = useTheme()

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'game', label: 'Game' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/20 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <ul className="flex items-center space-x-0.5 sm:space-x-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item, index) => (
              <li key={item.id} className="flex-shrink-0">
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap px-3 sm:px-4 py-2 rounded-lg border ${
                    activeSection === item.id 
                      ? 'text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 border-gray-400 dark:border-gray-500' 
                      : 'text-gray-600 dark:text-gray-300 bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(229, 231, 235, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              </li>
            ))}
          </ul>
          <div className="ml-auto flex-shrink-0">
            <motion.button
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: isDark 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.1)',
                border: isDark 
                  ? '1px solid rgba(255, 255, 255, 0.2)' 
                  : '1px solid rgba(0, 0, 0, 0.2)'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {isDark ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
