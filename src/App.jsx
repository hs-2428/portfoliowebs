import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Game from './components/Game'
import Contact from './components/Contact'
import TargetCursor from './components/TargetCursor'

function App() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <TargetCursor />
      <Navigation />
      <Hero />
      <Skills />
      <Projects />
      <Game />
      <Contact />
    </div>
  )
}

export default App
