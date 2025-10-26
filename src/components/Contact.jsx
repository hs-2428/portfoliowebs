import { motion } from 'framer-motion'

const Contact = () => {
  const title = "Let's Connect"
  
  const letterVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
      rotateX: -90
    },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    })
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-6 flex items-center relative z-20 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-bold mb-12 text-center"
          style={{ perspective: "1000px" }}
        >
          {title.split('').map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={letterVariants}
              className="inline-block"
              style={{ transformOrigin: "top center" }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
        >
          <p className="text-xl text-gray-400 text-center mb-12">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.a
              href="mailto:harsh007@duck.com"
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-gray-400">harsh007@duck.com</p>
            </motion.a>

            <motion.a
              href="https://github.com/hs-2428"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-sm text-gray-400">hs-2428</p>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/harshnew/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-white/10 hover:border-green-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="font-semibold mb-2">LinkedIn</h3>
              <p className="text-sm text-gray-400">@harshnew</p>
            </motion.a>
          </div>

          <div className="text-center">
            <motion.a
              href="mailto:harsh007@duck.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium text-lg"
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>© 202x Harsh Sharma. Built with React & Framer Motion.</p>
        </footer>
      </div>
    </section>
  )
}

export default Contact
