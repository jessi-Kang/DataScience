import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from './ui/SectionWrapper'
import { generatePromptDesign } from '../api/anthropic'

export default function AiDemo() {
  const [form, setForm] = useState({ personality: '', tone: '', purpose: '' })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.personality || !form.tone || !form.purpose) return

    setLoading(true)
    setError('')
    setResult('')

    try {
      const text = await generatePromptDesign(form)
      setResult(text)
    } catch (err) {
      setError(err.message || '요청 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors'

  return (
    <SectionWrapper id="ai-demo">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">AI Demo</h2>
      <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
        캐릭터 설정을 입력하면, PM이 설계한 프롬프트 구조를 확인할 수 있습니다.
      </p>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm text-gray-400 mb-1">성격</label>
            <input
              type="text"
              placeholder="예: 밝고 긍정적인, 차분하고 지적인"
              value={form.personality}
              onChange={(e) => setForm({ ...form, personality: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">말투</label>
            <input
              type="text"
              placeholder="예: 반말, 존댓말, 사투리"
              value={form.tone}
              onChange={(e) => setForm({ ...form, tone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">목적</label>
            <input
              type="text"
              placeholder="예: 심리 상담, 학습 도우미, 엔터테인먼트"
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              className={inputClass}
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-3 bg-accent hover:bg-accent-light text-white font-medium rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? '설계 중...' : '프롬프트 설계하기'}
          </motion.button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-300 text-sm"
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-3 bg-accent/10 border-b border-gray-700">
                <p className="text-accent text-sm font-medium">
                  💡 PM이 이렇게 설계했습니다
                </p>
              </div>
              <div className="p-5 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {result}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  )
}
