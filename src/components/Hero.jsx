import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  const nameRef = useRef(null)

  useEffect(() => {
    const name = nameRef.current
    if (!name) return

    const handleMouseMove = (e) => {
      const letters = name.querySelectorAll('.letter')
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - x, 2) + Math.pow(e.clientY - y, 2)
        )
        
        const maxDistance = 200
        const scale = Math.max(1, 1 + (maxDistance - Math.min(distance, maxDistance)) / maxDistance * 0.5)
        const weight = Math.min(900, 400 + (maxDistance - Math.min(distance, maxDistance)) / maxDistance * 500)
        
        letter.style.transform = `scale(${scale})`
        letter.style.fontWeight = weight
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const name = "Harsh.Sharma"
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            ref={nameRef}
            className="text-7xl md:text-9xl font-bold mb-6 select-none"
            style={{ letterSpacing: '0.05em' }}
          >
            {name.split('').map((char, i) => (
              <span
                key={i}
                className="letter inline-block transition-all duration-100"
                style={{ transformOrigin: 'center' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Curious Mind & Developer
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
          >
            Explore My Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
