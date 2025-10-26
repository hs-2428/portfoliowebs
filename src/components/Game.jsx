import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Game = () => {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45) // Increased time for complexity
  const [isPlaying, setIsPlaying] = useState(false)
  const [targets, setTargets] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [combo, setCombo] = useState(0)
  const [lastHitTime, setLastHitTime] = useState(0)

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false)
      setGameOver(true)
    }
  }, [isPlaying, timeLeft])

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        // Random target types with different behaviors
        const targetType = Math.random()
        const newTarget = {
          id: Date.now() + Math.random(),
          x: Math.random() * 75 + 10, // Keep away from edges
          y: Math.random() * 55 + 10,
          size: Math.random() * 25 + 25, // 25-50px for touch-friendly sizes
          type: targetType < 0.6 ? 'normal' : targetType < 0.85 ? 'bonus' : 'speed',
          lifetime: targetType < 0.85 ? 2500 : 1500, // Speed targets disappear faster
        }
        setTargets((prev) => [...prev, newTarget].slice(-8)) // Max 8 targets at once
        
        setTimeout(() => {
          setTargets((prev) => prev.filter((t) => t.id !== newTarget.id))
        }, newTarget.lifetime)
      }, 600) // Spawn faster for more complexity
      
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  // Reset combo if player is too slow
  useEffect(() => {
    if (combo > 0 && Date.now() - lastHitTime > 2000) {
      setCombo(0)
    }
  }, [lastHitTime, combo])

  const handleTargetClick = (target) => {
    setTargets((prev) => prev.filter((t) => t.id !== target.id))
    
    // Calculate points based on size and type
    const sizeBonus = Math.round(100 / target.size)
    const typeMultiplier = target.type === 'bonus' ? 3 : target.type === 'speed' ? 2 : 1
    
    // Combo system - extra points for consecutive hits
    const now = Date.now()
    const newCombo = now - lastHitTime < 1000 ? combo + 1 : 1
    setCombo(newCombo)
    setLastHitTime(now)
    
    const comboMultiplier = 1 + (newCombo * 0.2)
    const points = Math.round(sizeBonus * typeMultiplier * comboMultiplier)
    
    setScore((prev) => prev + points)
  }

  const startGame = () => {
    setScore(0)
    setTimeLeft(45)
    setTargets([])
    setIsPlaying(true)
    setGameOver(false)
    setCombo(0)
    setLastHitTime(0)
  }

  return (
    <section id="game" className="min-h-screen py-20 px-6 relative z-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold mb-12 text-center"
        >
          Quick Game Break
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-100 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-300 dark:border-white/10 overflow-hidden">
            <div className="bg-gray-200 dark:bg-white/5 p-4 flex justify-between items-center border-b border-gray-300 dark:border-white/10">
              <div className="flex flex-col">
                <div className="text-2xl font-bold">Score: {score}</div>
                {combo > 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-sm font-bold text-orange-500"
                  >
                    Combo x{combo}! 🔥
                  </motion.div>
                )}
              </div>
              <div className="text-xl font-mono">⏱️ {timeLeft}s</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium text-white text-sm sm:text-base"
              >
                {isPlaying ? 'Restart' : 'Start'}
              </motion.button>
            </div>

            <div className="relative w-full h-[450px] sm:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-900 dark:to-slate-800 touch-none">
              {!isPlaying && !gameOver && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">Advanced Target Practice</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Click targets before they disappear!</p>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                      <p>🔴 Normal targets = Base points</p>
                      <p>🟡 Bonus targets (yellow) = 3x points</p>
                      <p>⚡ Speed targets (moving) = 2x points</p>
                      <p>🔥 Build combos for multipliers!</p>
                    </div>
                  </div>
                </div>
              )}

              {gameOver && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-center bg-white/10 backdrop-blur-md p-12 rounded-2xl border border-white/20">
                    <h3 className="text-4xl font-bold mb-4">Game Over!</h3>
                    <p className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      {score}
                    </p>
                    <p className="text-gray-400 mb-6">
                      {score > 500 ? 'Amazing!' : score > 300 ? 'Great job!' : 'Keep practicing!'}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium"
                    >
                      Play Again
                    </motion.button>
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                {targets.map((target) => {
                  // Different colors and animations based on type
                  const getTargetStyle = () => {
                    switch(target.type) {
                      case 'bonus':
                        return {
                          gradient: 'from-yellow-400 to-orange-400',
                          shadow: 'shadow-yellow-500/50',
                          ring: 'border-yellow-300'
                        }
                      case 'speed':
                        return {
                          gradient: 'from-cyan-400 to-blue-500',
                          shadow: 'shadow-cyan-500/50',
                          ring: 'border-cyan-300'
                        }
                      default:
                        return {
                          gradient: 'from-red-500 to-orange-500',
                          shadow: 'shadow-red-500/50',
                          ring: 'border-red-300'
                        }
                    }
                  }
                  
                  const style = getTargetStyle()
                  
                  return (
                    <motion.div
                      key={target.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        // Moving animation for speed targets
                        x: target.type === 'speed' ? [0, 20, -20, 0] : 0,
                        y: target.type === 'speed' ? [0, -15, 15, 0] : 0,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `${target.x}%`,
                        top: `${target.y}%`,
                        width: `${target.size}px`,
                        height: `${target.size}px`,
                      }}
                    >
                      {/* Expanded touch-friendly area - 60% larger */}
                      <div 
                        className="absolute inset-0 -m-[30%]"
                        onClick={() => handleTargetClick(target)}
                        onTouchStart={(e) => {
                          e.preventDefault()
                          handleTargetClick(target)
                        }}
                      />
                      
                      <div className="relative w-full h-full pointer-events-none">
                        <motion.div
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${style.gradient} ${style.shadow} shadow-lg group-hover:shadow-2xl transition-shadow duration-200`}
                          animate={{ rotate: 360 }}
                          transition={{ rotate: { duration: target.type === 'speed' ? 1 : 2, repeat: Infinity, ease: 'linear' } }}
                        />
                        
                        {/* Center dot */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        
                        {/* Hover/touch indicator ring */}
                        <motion.div
                          className={`absolute inset-0 rounded-full border-2 ${style.ring} opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200`}
                          style={{ margin: '-4px' }}
                        />
                        
                        {/* Type indicator */}
                        {target.type !== 'normal' && (
                          <div className="absolute -top-1 -right-1 text-xs">
                            {target.type === 'bonus' ? '⭐' : '⚡'}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-6">
            Click targets quickly to score points. Smaller targets give more points!
          </p>
        </div>
      </div>
    </section>
  )
}

export default Game
