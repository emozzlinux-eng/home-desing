import { useState, useCallback, Suspense } from 'react'
import Scene from './components/Scene'
import UIOverlay from './components/UIOverlay'
import { floors } from './data/floorPlans'

function LoadingScreen() {
  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h2 className="text-white text-2xl font-light tracking-wider mb-2">LOADING RESIDENCE</h2>
        <p className="text-gray-400 text-sm">Preparing 3D architectural visualization...</p>
        <div className="mt-6 flex items-center gap-3 justify-center">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-100" />
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-200" />
        </div>
      </div>
    </div>
  )
}

function App() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [isFirstPerson, setIsFirstPerson] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState(65) // Golden hour
  const [showWireframe, setShowWireframe] = useState(false)
  const [floorVisibility, setFloorVisibility] = useState<Record<string, boolean>>(
    Object.fromEntries(floors.map(f => [f.id, true]))
  )
  const [roomEdits, setRoomEdits] = useState<Record<string, { wallColor: string; floorColor: string }>>({})
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 1.7, 12])
  const [viewMode, setViewMode] = useState<'exterior' | 'cutaway' | 'xray'>('exterior')

  const handleToggleFloor = useCallback((id: string) => {
    setFloorVisibility(prev => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const handleEditRoom = useCallback((id: string, edits: { wallColor?: string; floorColor?: string }) => {
    setRoomEdits(prev => ({
      ...prev,
      [id]: { ...prev[id], wallColor: '#e8e0d0', floorColor: '#c4a882', ...edits }
    }))
  }, [])

  const handlePositionChange = useCallback((pos: [number, number, number]) => {
    setPlayerPos(pos)
  }, [])

  return (
    <div className="w-screen h-screen overflow-hidden bg-black relative">
      <Suspense fallback={<LoadingScreen />}>
        <Scene
          selectedRoom={selectedRoom}
          onSelectRoom={setSelectedRoom}
          isFirstPerson={isFirstPerson}
          timeOfDay={timeOfDay}
          showWireframe={showWireframe}
          floorVisibility={floorVisibility}
          roomEdits={roomEdits}
          onPositionChange={handlePositionChange}
          viewMode={viewMode}
        />
      </Suspense>

      <UIOverlay
        selectedRoom={selectedRoom}
        onSelectRoom={setSelectedRoom}
        isFirstPerson={isFirstPerson}
        onToggleFirstPerson={() => setIsFirstPerson(!isFirstPerson)}
        timeOfDay={timeOfDay}
        onTimeChange={setTimeOfDay}
        showWireframe={showWireframe}
        onToggleWireframe={() => setShowWireframe(!showWireframe)}
        floorVisibility={floorVisibility}
        onToggleFloor={handleToggleFloor}
        roomEdits={roomEdits}
        onEditRoom={handleEditRoom}
        playerPos={playerPos}
        viewMode={viewMode}
        onViewMode={setViewMode}
      />
    </div>
  )
}

export default App
