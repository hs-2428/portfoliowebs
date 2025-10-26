import { useEffect, useState, useCallback, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const TargetCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isOverText, setIsOverText] = useState(false)
  const { isDark } = useTheme()
  const rafId = useRef(null)
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  const updatePosition = useCallback((x, y) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x - 16}px, ${y - 16}px)`
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      
      rafId.current = requestAnimationFrame(() => {
        updatePosition(e.clientX, e.clientY)
        
        // Simplified hover detection - less frequent checks
        const element = e.target
        const isTextElement = 
          element.tagName === 'BUTTON' || 
          element.tagName === 'A' || 
          element.closest('button') !== null ||
          element.closest('a') !== null
        
        setIsOverText(isTextElement)
      })
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [updatePosition])

  return (
    <>
      {/* Main cursor - optimized with direct DOM manipulation */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full transition-opacity duration-200"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%)',
          border: isDark 
            ? '2px solid rgba(255, 255, 255, 0.8)'
            : '2px solid rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          willChange: 'transform',
        }}
      />
      
      {/* Center dot - optimized */}
      <div
        ref={dotRef}
        className={`fixed w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] ${
          isDark ? 'bg-white' : 'bg-black'
        }`}
        style={{
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  )
}

export default TargetCursor
