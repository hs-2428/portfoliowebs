import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const TimelineLine = () => {
  const [lineHeight, setLineHeight] = useState(0)
  const [lineTop, setLineTop] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [ballState, setBallState] = useState('hidden') // 'hidden', 'onLine', 'bouncing', 'merged'
  const [skillsCenter, setSkillsCenter] = useState(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const timelineSection = document.getElementById('timeline')
      const skillsSection = document.getElementById('skills')
      
      if (!timelineSection || !skillsSection) return

      const timelineRect = timelineSection.getBoundingClientRect()
      const skillsRect = skillsSection.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Set line position and height
      setLineTop(timelineSection.offsetTop)
      setLineHeight(timelineSection.offsetHeight)
  // compute skills center (absolute coords)
  const skillsCenterX = skillsSection.offsetLeft + skillsSection.offsetWidth / 2
  const skillsCenterY = skillsSection.offsetTop + skillsSection.offsetHeight / 2
  setSkillsCenter({ x: skillsCenterX, y: skillsCenterY })
      
      // Determine ball state and progress
      if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
        // In timeline section - ball moves along line
        const scrollInSection = windowHeight - timelineRect.top
        const progress = Math.max(0, Math.min(1, scrollInSection / timelineSection.offsetHeight))
        setScrollProgress(progress * 100)
        setBallState('onLine')
      } else if (timelineRect.bottom <= windowHeight && skillsRect.top < windowHeight * 0.9) {
        // Timeline ended, approaching skills - start bounce
        setScrollProgress(100)
        if (ballState !== 'bouncing' && ballState !== 'merged') {
          setBallState('bouncing')
        }
      } else if (timelineRect.bottom > windowHeight) {
        // Before timeline
        setScrollProgress(0)
        setBallState('hidden')
      } else if (timelineRect.top > windowHeight) {
        // Scrolled back up above timeline
        setScrollProgress(0)
        setBallState('hidden')
      } else if (skillsRect.bottom < 0) {
        // Scrolled past skills, reset for when scrolling back up
        setBallState('hidden')
        setScrollProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [ballState])

  return (
    <>
      {/* Faint vertical line visible through the Journey section */}
      {lineHeight > 0 && (
        <div
          className="fixed left-1/2 z-10 pointer-events-none transition-opacity duration-300"
          style={{
            top: `${lineTop}px`,
            height: `${lineHeight}px`,
            marginLeft: '-1px',
            width: '2px',
            background: isDark 
              ? 'linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0.35), rgba(255,255,255,0.18))'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.3), rgba(0,0,0,0.15))',
            opacity: lineTop > 0 ? 1 : 0
          }}
        >
          <div className="relative w-full h-full">
            <div
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transition-all duration-200"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>
        </div>
      )}
      {/* Ball states */}
      <AnimatePresence>
        {ballState === 'onLine' && (
          <motion.div
            key="ball-on-line"
            className="fixed left-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50 z-10 pointer-events-none"
            style={{ 
              top: `${lineTop}px`,
              marginLeft: '-8px',
              transform: `translateY(${(scrollProgress / 100) * lineHeight}px)`
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {ballState === 'bouncing' && (
          <motion.div
            key="ball-bouncing"
            className="fixed left-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50 z-20 pointer-events-none"
            style={{ 
              top: `${lineTop + lineHeight}px`,
              marginLeft: '-8px'
            }}
            initial={{ y: 0, scale: 1 }}
            animate={{ 
              y: [0, 150, 50, 120, 40, 100, 80],
              scale: [1, 0.8, 1.3, 0.9, 1.2, 0.95, 1.1]
            }}
            transition={{
              duration: 2,
              times: [0, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
              ease: [0.4, 0, 0.2, 1]
            }}
            onAnimationComplete={() => setBallState('merged')}
          />
        )}

          {ballState === 'merged' && skillsCenter && (
            <motion.div
              key="ball-merged"
              className="fixed w-4 h-4 rounded-full z-30 pointer-events-none"
              initial={{ x: '50%', y: lineTop + lineHeight, scale: 1, opacity: 1 }}
              animate={{
                x: skillsCenter.x - window.innerWidth / 2,
                y: skillsCenter.y,
                scale: 0.6,
                opacity: 0
              }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ left: '50%', marginLeft: '-8px', background: 'radial-gradient(circle, #fff, #d0d6ff)' }}
              onAnimationComplete={() => {
                // hide after merge
                setTimeout(() => setBallState('hidden'), 200)
              }}
            />
          )}
      </AnimatePresence>
    </>
  )
}

export default TimelineLine
