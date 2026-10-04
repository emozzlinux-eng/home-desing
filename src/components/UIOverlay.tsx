import { floors, allRooms, Room, getRoomById } from '../data/floorPlans'

interface UIProps {
  selectedRoom: string | null
  onSelectRoom: (id: string | null) => void
  isFirstPerson: boolean
  onToggleFirstPerson: () => void
  timeOfDay: number
  onTimeChange: (t: number) => void
  showWireframe: boolean
  onToggleWireframe: () => void
  floorVisibility: Record<string, boolean>
  onToggleFloor: (id: string) => void
  roomEdits: Record<string, { wallColor: string; floorColor: string }>
  onEditRoom: (id: string, edits: { wallColor?: string; floorColor?: string }) => void
  playerPos: [number, number, number]
  viewMode: 'exterior' | 'cutaway' | 'xray'
  onViewMode: (mode: 'exterior' | 'cutaway' | 'xray') => void
}

const wallColors = ['#e8e0d0', '#d4c4a8', '#f5f0e8', '#3a3a3a', '#2a2a2a', '#1a1a2e', '#4a3010', '#8b6914', '#c4a882', '#555']
const floorColors = ['#c4a882', '#d4c4a8', '#e8e0d0', '#1a1a1a', '#333', '#8b6914', '#4a3010', '#2a2a2a', '#0f0f1f', '#555']

export default function UIOverlay({
  selectedRoom,
  onSelectRoom,
  isFirstPerson,
  onToggleFirstPerson,
  timeOfDay,
  onTimeChange,
  showWireframe,
  onToggleWireframe,
  floorVisibility,
  onToggleFloor,
  roomEdits,
  onEditRoom,
  playerPos,
  viewMode,
  onViewMode,
}: UIProps) {
  const room = selectedRoom ? getRoomById(selectedRoom) : null
  const currentEdit = selectedRoom ? roomEdits[selectedRoom] : null

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-auto">
        {/* Title */}
        <div className="bg-black/70 backdrop-blur-md rounded-xl px-5 py-3 border border-white/10">
          <h1 className="text-white text-lg font-light tracking-wider">LUXURY RESIDENCE</h1>
          <p className="text-gray-400 text-xs mt-0.5">50ft × 75ft • 4 Levels • Smart Home</p>
        </div>

        {/* View Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewMode('exterior')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'exterior' ? 'bg-white text-black' : 'bg-black/70 text-white border border-white/10 hover:bg-white/10'
            }`}
          >
            Exterior
          </button>
          <button
            onClick={() => onViewMode('cutaway')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'cutaway' ? 'bg-white text-black' : 'bg-black/70 text-white border border-white/10 hover:bg-white/10'
            }`}
          >
            Cutaway
          </button>
          <button
            onClick={() => onViewMode('xray')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'xray' ? 'bg-white text-black' : 'bg-black/70 text-white border border-white/10 hover:bg-white/10'
            }`}
          >
            X-Ray
          </button>
        </div>
      </div>

      {/* Left Panel - Floor Navigation */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-auto">
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-3 border border-white/10 space-y-2">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2 px-1">Floors</p>
          {floors.slice().reverse().map((floor) => (
            <button
              key={floor.id}
              onClick={() => onToggleFloor(floor.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                floorVisibility[floor.id]
                  ? 'bg-purple-600/50 text-white border border-purple-400/30'
                  : 'bg-white/5 text-gray-500 border border-transparent hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{floor.name}</span>
                <span className="text-xs opacity-60">L{floor.level}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Room List */}
      <div className="absolute right-4 top-20 bottom-20 w-64 pointer-events-auto overflow-hidden">
        <div className="bg-black/70 backdrop-blur-md rounded-xl border border-white/10 h-full flex flex-col">
          <div className="p-3 border-b border-white/10">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Rooms</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {allRooms.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelectRoom(r.id === selectedRoom ? null : r.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedRoom === r.id
                    ? 'bg-orange-500/30 text-white border border-orange-400/30'
                    : 'text-gray-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{floors.find(f => f.id === r.floor)?.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="bg-black/70 backdrop-blur-md rounded-xl px-6 py-3 border border-white/10 flex items-center gap-6">
          {/* Time of Day */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-xs">🌅</span>
            <input
              type="range"
              min="0"
              max="100"
              value={timeOfDay}
              onChange={(e) => onTimeChange(Number(e.target.value))}
              className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <span className="text-gray-400 text-xs">🌙</span>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10" />

          {/* First Person Toggle */}
          <button
            onClick={onToggleFirstPerson}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isFirstPerson
                ? 'bg-green-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isFirstPerson ? '🚶 Walking' : '👁 Orbit'}
          </button>

          {/* Wireframe */}
          <button
            onClick={onToggleWireframe}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${
              showWireframe ? 'bg-cyan-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🔲
          </button>
        </div>
      </div>

      {/* First Person Instructions */}
      {isFirstPerson && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
            <p className="text-gray-300 text-xs text-center">
              Click to lock mouse • WASD to move • Space/Shift up/down • Mouse to look
            </p>
            <p className="text-gray-500 text-xs text-center mt-1">
              Position: {playerPos.map(p => p.toFixed(1)).join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* Crosshair for first person */}
      {isFirstPerson && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-6 h-6 border-2 border-white/50 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </div>
      )}

      {/* Room Edit Panel */}
      {selectedRoom && room && (
        <div className="absolute bottom-24 left-4 pointer-events-auto">
          <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/10 w-72">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">{room.name}</h3>
              <button onClick={() => onSelectRoom(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <p className="text-gray-400 text-sm mb-3">{room.description}</p>
            
            {/* Wall Color */}
            <div className="mb-3">
              <p className="text-gray-400 text-xs mb-1.5">Wall Material</p>
              <div className="flex gap-1.5 flex-wrap">
                {wallColors.map((color) => (
                  <button
                    key={`wall-${color}`}
                    onClick={() => onEditRoom(selectedRoom, { wallColor: color })}
                    className={`w-7 h-7 rounded-md border-2 transition-all ${
                      currentEdit?.wallColor === color ? 'border-white scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Floor Color */}
            <div>
              <p className="text-gray-400 text-xs mb-1.5">Floor Material</p>
              <div className="flex gap-1.5 flex-wrap">
                {floorColors.map((color) => (
                  <button
                    key={`floor-${color}`}
                    onClick={() => onEditRoom(selectedRoom, { floorColor: color })}
                    className={`w-7 h-7 rounded-md border-2 transition-all ${
                      currentEdit?.floorColor === color ? 'border-white scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Room Info */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-500">Size</div>
                <div className="text-gray-300">{room.size[0]}m × {room.size[2]}m</div>
                <div className="text-gray-500">Height</div>
                <div className="text-gray-300">{room.size[1]}m</div>
                <div className="text-gray-500">Floor</div>
                <div className="text-gray-300">{floors.find(f => f.id === room.floor)?.name}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Home Status */}
      <div className="absolute top-20 left-4 pointer-events-auto">
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-3 border border-white/10">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Smart Home</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gray-300 text-xs">All Systems Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-gray-300 text-xs">Climate: 22°C</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-gray-300 text-xs">Solar: 4.2kW</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-gray-300 text-xs">Security: Armed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
