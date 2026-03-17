import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import CaseStudies from './components/CaseStudies'
import Contact from './components/Contact'
import Admin from './components/Admin'
import AuthGate from './components/AuthGate'
import AdminLogin from './components/AdminLogin'
import { isVisitorSessionValid, isAdminSessionValid } from './utils/crypto'

function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin')
  const [visitorAuth, setVisitorAuth] = useState(isVisitorSessionValid)
  const [adminAuth, setAdminAuth] = useState(isAdminSessionValid)

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Admin route
  if (isAdmin) {
    if (!adminAuth) {
      return <AdminLogin onSuccess={() => setAdminAuth(true)} />
    }
    return <Admin />
  }

  // Visitor route - require access token
  if (!visitorAuth) {
    return <AuthGate onSuccess={() => setVisitorAuth(true)} />
  }

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
