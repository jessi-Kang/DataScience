import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import CaseStudies from './components/CaseStudies'
import Contact from './components/Contact'
import Admin from './components/Admin'

function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin')

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (isAdmin) return <Admin />

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <Hero />
      <Timeline />
      <CaseStudies />
      <Contact />
    </div>
  )
}

export default App
