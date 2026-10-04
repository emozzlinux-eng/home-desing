import { useState, useEffect, useRef, useCallback } from 'react'
import VideoPlayer from './components/VideoPlayer'
import SceneRenderer from './components/SceneRenderer'
import PromptInput from './components/PromptInput'
import { scenes, Scene } from './data/scenes'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const [userPrompt, setUserPrompt] = useState('')
  const [activeScenes, setActiveScenes] = useState<Scene[]>(scenes)
  const [sceneProgress, setSceneProgress] = useState(0)
  const animFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const SCENE_DURATION = 5000 // 5 seconds per scene
  const totalDuration = activeScenes.length * SCENE_DURATION

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp
    const elapsed = timestamp - startTimeRef.current
    
    const totalProgress = Math.min((elapsed / totalDuration) * 100, 100)
    setProgress(totalProgress)
    
    const currentIdx = Math.min(
      Math.floor(elapsed / SCENE_DURATION),
      activeScenes.length - 1
    )
    setCurrentSceneIndex(currentIdx)
    
    const sceneElapsed = elapsed - (currentIdx * SCENE_DURATION)
    setSceneProgress(Math.min((sceneElapsed / SCENE_DURATION) * 100, 100))

    if (elapsed < totalDuration) {
      animFrameRef.current = requestAnimationFrame(animate)
    } else {
      setIsPlaying(false)
      setProgress(100)
    }
  }, [totalDuration, activeScenes.length])

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = 0
      animFrameRef.current = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(animFrameRef.current)
    }
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [isPlaying, animate])

  const handlePlay = () => {
    if (progress >= 100) {
      setProgress(0)
      setCurrentSceneIndex(0)
      setSceneProgress(0)
    }
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleRestart = () => {
    setProgress(0)
    setCurrentSceneIndex(0)
    setSceneProgress(0)
    startTimeRef.current = 0
    setIsPlaying(true)
  }

  const handleSeek = (value: number) => {
    setProgress(value)
    const targetTime = (value / 100) * totalDuration
    const idx = Math.min(Math.floor(targetTime / SCENE_DURATION), activeScenes.length - 1)
    setCurrentSceneIndex(idx)
    setSceneProgress(((targetTime - idx * SCENE_DURATION) / SCENE_DURATION) * 100)
    startTimeRef.current = performance.now() - targetTime
  }

  const handlePromptSubmit = (prompt: string) => {
    setUserPrompt(prompt)
    setShowPrompt(false)
    // Generate scenes based on prompt keywords
    const generatedScenes = generateScenesFromPrompt(prompt)
    setActiveScenes(generatedScenes)
    setProgress(0)
    setCurrentSceneIndex(0)
    setSceneProgress(0)
    setTimeout(() => setIsPlaying(true), 500)
  }

  const generateScenesFromPrompt = (prompt: string): Scene[] => {
    const lower = prompt.toLowerCase()
    const baseScenes: Scene[] = []
    
    if (lower.includes('space') || lower.includes('galaxy') || lower.includes('star')) {
      baseScenes.push(
        { id: 'space-intro', type: 'space', title: 'Deep Space', subtitle: prompt },
        { id: 'nebula', type: 'nebula', title: 'Cosmic Nebula', subtitle: 'Colors of the universe' },
        { id: 'planet', type: 'planet', title: 'New Worlds', subtitle: 'Beyond imagination' },
        { id: 'stars', type: 'starfield', title: 'Infinite Stars', subtitle: 'The journey continues' }
      )
    } else if (lower.includes('ocean') || lower.includes('sea') || lower.includes('water')) {
      baseScenes.push(
        { id: 'ocean-intro', type: 'ocean', title: 'Deep Ocean', subtitle: prompt },
        { id: 'waves', type: 'waves', title: 'Endless Waves', subtitle: 'Rhythm of the sea' },
        { id: 'underwater', type: 'underwater', title: 'Underwater World', subtitle: 'Life beneath' },
        { id: 'sunset-sea', type: 'sunset', title: 'Ocean Sunset', subtitle: 'Where sky meets sea' }
      )
    } else if (lower.includes('nature') || lower.includes('forest') || lower.includes('tree')) {
      baseScenes.push(
        { id: 'forest-intro', type: 'forest', title: 'Enchanted Forest', subtitle: prompt },
        { id: 'particles', type: 'particles', title: 'Nature\'s Magic', subtitle: 'Life in motion' },
        { id: 'mountains', type: 'mountains', title: 'Majestic Peaks', subtitle: 'Touching the sky' },
        { id: 'aurora', type: 'aurora', title: 'Northern Lights', subtitle: 'Dance of colors' }
      )
    } else if (lower.includes('city') || lower.includes('urban') || lower.includes('night')) {
      baseScenes.push(
        { id: 'city-intro', type: 'city', title: 'City Lights', subtitle: prompt },
        { id: 'neon', type: 'neon', title: 'Neon Dreams', subtitle: 'Electric nights' },
        { id: 'skyline', type: 'skyline', title: 'Skyline', subtitle: 'Reaching for the stars' },
        { id: 'traffic', type: 'traffic', title: 'Life in Motion', subtitle: 'The city never sleeps' }
      )
    } else {
      // Default cinematic scenes
      baseScenes.push(
        { id: 'intro', type: 'intro', title: prompt.slice(0, 40), subtitle: 'A Visual Journey' },
        { id: 'gradient', type: 'gradient', title: 'Colors in Motion', subtitle: 'Fluid dynamics' },
        { id: 'particles', type: 'particles', title: 'Particle Storm', subtitle: 'Chaos and beauty' },
        { id: 'finale', type: 'finale', title: 'The End', subtitle: 'Thanks for watching' }
      )
    }
    
    return baseScenes
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentTime = (progress / 100) * totalDuration

  if (showPrompt) {
    return <PromptInput onSubmit={handlePromptSubmit} />
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Video Display Area */}
      <div className="w-full max-w-5xl aspect-video relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl shadow-purple-900/20 border border-gray-800">
        {/* Scene Renderer */}
        <SceneRenderer 
          scene={activeScenes[currentSceneIndex]} 
          progress={sceneProgress}
          isPlaying={isPlaying}
        />

        {/* Scene Title Overlay */}
        <div className="absolute top-6 left-6 z-20">
          <h2 className="text-white text-2xl font-bold drop-shadow-lg animate-fade-in">
            {activeScenes[currentSceneIndex]?.title}
          </h2>
          <p className="text-gray-300 text-sm mt-1 drop-shadow-md">
            {activeScenes[currentSceneIndex]?.subtitle}
          </p>
        </div>

        {/* Scene Counter */}
        <div className="absolute top-6 right-6 z-20 bg-black/50 px-3 py-1 rounded-full">
          <span className="text-white text-sm">
            {currentSceneIndex + 1} / {activeScenes.length}
          </span>
        </div>

        {/* Play/Pause Overlay (center) */}
        {!isPlaying && progress < 100 && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 cursor-pointer" onClick={handlePlay}>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all hover:scale-110">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}

        {/* End Screen */}
        {progress >= 100 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/60 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-6xl mb-4">🎬</div>
              <h2 className="text-white text-3xl font-bold mb-2">Video Complete</h2>
              <p className="text-gray-400 mb-6">"{userPrompt}"</p>
              <div className="flex gap-4">
                <button 
                  onClick={handleRestart}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all hover:scale-105"
                >
                  ▶ Replay
                </button>
                <button 
                  onClick={() => { setShowPrompt(true); setIsPlaying(false); setProgress(0); }}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all hover:scale-105"
                >
                  ✨ New Video
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="w-full max-w-5xl mt-4 px-2">
        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-gray-800 rounded-full cursor-pointer group mb-3"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const percentage = (x / rect.width) * 100
            handleSeek(percentage)
          }}
        >
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {/* Scene markers */}
          {activeScenes.map((_, idx) => (
            <div 
              key={idx}
              className="absolute top-0 h-full w-0.5 bg-white/30"
              style={{ left: `${(idx / activeScenes.length) * 100}%` }}
            />
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button 
              onClick={isPlaying ? handlePause : handlePlay}
              className="text-white hover:text-purple-400 transition-colors"
            >
              {isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            {/* Restart */}
            <button 
              onClick={handleRestart}
              className="text-white hover:text-purple-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
            </button>

            {/* Time */}
            <span className="text-gray-400 text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* New Video */}
            <button 
              onClick={() => { setShowPrompt(true); setIsPlaying(false); setProgress(0); }}
              className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-1"
            >
              <span>✨</span> New Video
            </button>

            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-purple-400 transition-colors"
            >
              {isFullscreen ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Prompt Display */}
      {userPrompt && (
        <div className="mt-6 max-w-5xl w-full px-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Your prompt:</p>
            <p className="text-white mt-1">"{userPrompt}"</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
