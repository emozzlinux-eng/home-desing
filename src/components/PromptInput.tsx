import { useState } from 'react'

interface PromptInputProps {
  onSubmit: (prompt: string) => void
}

const suggestions = [
  'A journey through deep space and galaxies',
  'Underwater ocean adventure with marine life',
  'Enchanted forest with magical creatures',
  'Cyberpunk city at night with neon lights',
  'Northern lights dancing over mountains',
]

export default function PromptInput({ onSubmit }: PromptInputProps) {
  const [prompt, setPrompt] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      setIsAnimating(true)
      setTimeout(() => onSubmit(prompt.trim()), 1500)
    }
  }

  const handleSuggestion = (suggestion: string) => {
    setPrompt(suggestion)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-2xl w-full transition-all duration-1000 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-2xl">🎬</span>
            <span className="text-purple-300 text-sm font-medium">AI Video Creator</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Create Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Video</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            Describe your vision and watch it come to life with stunning animated scenes
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-2 shadow-2xl shadow-purple-900/20">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your video... (e.g., 'A journey through space with colorful nebulae')"
              className="w-full bg-transparent text-white placeholder-gray-500 p-4 pb-14 resize-none outline-none text-lg min-h-[120px]"
              rows={3}
            />
            <div className="flex items-center justify-between p-2 pt-0">
              <span className="text-gray-500 text-sm">
                {prompt.length > 0 && `${prompt.length} characters`}
              </span>
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
              >
                <span>Generate Video</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        {/* Suggestions */}
        <div className="mt-8">
          <p className="text-gray-500 text-sm mb-3 text-center">Try one of these:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(suggestion)}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-purple-500/50 text-gray-300 hover:text-white rounded-full text-sm transition-all duration-200 hover:scale-105"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Loading overlay */}
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white text-lg font-medium">Generating your video...</p>
              <p className="text-gray-400 text-sm mt-1">Creating animated scenes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
