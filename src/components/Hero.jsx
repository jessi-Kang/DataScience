import { motion } from 'framer-motion'
import TypingAnimation from './ui/TypingAnimation'

export default function Hero() {
  const scrollToCases = () => {
    document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent pointer-events-none" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-accent text-sm md:text-base font-medium tracking-wider uppercase mb-6"
      >
        PM Portfolio
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl"
      >
        <TypingAnimation
          text="ML로 행동을 예측하고, LLM으로 대화를 설계합니다"
          speed={60}
        />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 text-gray-400 text-base md:text-lg max-w-2xl"
      >
        데이터로 행동을 예측하고, 점점 더 사람에 가까운 AI를 만들어온 PM
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToCases}
        className="mt-10 px-8 py-3 bg-accent hover:bg-accent-light text-white font-medium rounded-full transition-colors cursor-pointer"
      >
        케이스 보기
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
