import { useState } from 'react'
import { motion } from 'framer-motion'
import { verifyAccessToken, createVisitorSession } from '../utils/crypto'

export default function AuthGate({ onSuccess }) {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token.trim()) return
    setLoading(true)
    setError('')

    // small delay to prevent brute force timing
    await new Promise((r) => setTimeout(r, 300))

    if (verifyAccessToken(token.trim())) {
      createVisitorSession()
      onSuccess()
    } else {
      setError('유효하지 않거나 만료된 접속 코드입니다.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white">포트폴리오 접속</h2>
            <p className="text-gray-400 text-sm mt-2">접속 코드를 입력해 주세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={token}
                onChange={(e) => { setToken(e.target.value); setError('') }}
                placeholder="접속 코드 입력"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-center tracking-widest font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 placeholder:text-gray-600 placeholder:tracking-normal placeholder:font-sans"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading || !token.trim()}
              className="w-full py-3 bg-accent hover:bg-accent-light disabled:bg-gray-700 disabled:text-gray-500 text-white font-medium rounded-lg transition-colors cursor-pointer"
            >
              {loading ? '확인 중...' : '접속'}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-4">
          접속 코드는 관리자에게 문의하세요
        </p>
      </motion.div>
    </div>
  )
}
