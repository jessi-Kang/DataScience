import Hero from './components/Hero'
import Timeline from './components/Timeline'
import CaseStudies from './components/CaseStudies'
import AiDemo from './components/AiDemo'
import Contact from './components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <Hero />
      <Timeline />
      <CaseStudies />
      <AiDemo />
      <Contact />
    </div>
  )
}

export default App
