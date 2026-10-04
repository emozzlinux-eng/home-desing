export interface Room {
  id: string
  name: string
  floor: string
  position: [number, number, number]
  size: [number, number, number] // width, height, depth
  color: string
  wallColor: string
  floorColor: string
  type: 'room' | 'hallway' | 'stairwell' | 'void'
  furniture?: string[]
  description: string
}

export interface Floor {
  id: string
  name: string
  level: number
  y: number
  height: number
  rooms: Room[]
}

// Plot: 15m x 23m (50ft x 75ft)
const PLOT_W = 15
const PLOT_D = 23
const FLOOR_H = 3.2
const WALL_T = 0.25

export const floors: Floor[] = [
  {
    id: 'basement2',
    name: 'B2 — Automotive Vault',
    level: -2,
    y: -7,
    height: 4,
    rooms: [
      { id: 'b2-garage', name: 'Automotive Gallery', floor: 'basement2', position: [0, -7, 0], size: [14, 4, 22], color: '#1a1a1a', wallColor: '#2a2a2a', floorColor: '#1a1a1a', type: 'room', furniture: ['cars', 'motorcycles'], description: '20-car showroom with polished concrete floors' },
      { id: 'b2-workshop', name: 'Workshop & Detailing', floor: 'basement2', position: [6, -7, -9], size: [4, 4, 4], color: '#222', wallColor: '#333', floorColor: '#1a1a1a', type: 'room', furniture: ['workshop'], description: 'Professional car detailing bay' },
      { id: 'b2-storage', name: 'Parts & Tyre Storage', floor: 'basement2', position: [-6, -7, -9], size: [4, 4, 4], color: '#222', wallColor: '#333', floorColor: '#1a1a1a', type: 'room', furniture: ['storage'], description: 'Organized spare parts storage' },
      { id: 'b2-ramp', name: 'Vehicle Ramp', floor: 'basement2', position: [0, -7, 11], size: [5, 4, 2], color: '#333', wallColor: '#444', floorColor: '#2a2a2a', type: 'room', furniture: [], description: 'Wide vehicle access ramp' },
    ]
  },
  {
    id: 'basement1',
    name: 'B1 — Lifestyle Level',
    level: -1,
    y: -3.5,
    height: 3.5,
    rooms: [
      { id: 'b1-bedroom', name: 'Private Bedroom Suite', floor: 'basement1', position: [-5, -3.5, -8], size: [5, 3.5, 6], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#c4a882', type: 'room', furniture: ['bed', 'wardrobe'], description: 'Luxury private bedroom with ensuite' },
      { id: 'b1-office', name: 'Executive Office', floor: 'basement1', position: [5, -3.5, -8], size: [5, 3.5, 6], color: '#f5f0e8', wallColor: '#d4c4a8', floorColor: '#8b6914', type: 'room', furniture: ['desk', 'shelves'], description: 'Minimal executive office overlooking car gallery' },
      { id: 'b1-server', name: 'Server Laboratory', floor: 'basement1', position: [-5, -3.5, 0], size: [5, 3.5, 5], color: '#0a0a1a', wallColor: '#1a1a2e', floorColor: '#0f0f1f', type: 'room', furniture: ['servers'], description: 'Glass-enclosed professional server room' },
      { id: 'b1-gym', name: 'Premium Gym', floor: 'basement1', position: [5, -3.5, 0], size: [5, 3.5, 5], color: '#f0f0f0', wallColor: '#e0e0e0', floorColor: '#333', type: 'room', furniture: ['gym'], description: 'Full-height mirrors, premium equipment' },
      { id: 'b1-gaming', name: 'Gaming Room', floor: 'basement1', position: [-5, -3.5, 7], size: [5, 3.5, 6], color: '#1a0a2e', wallColor: '#2a1a3e', floorColor: '#1a1a2a', type: 'room', furniture: ['gaming'], description: 'High-end gaming PCs and racing simulator' },
      { id: 'b1-cinema', name: 'Home Cinema', floor: 'basement1', position: [5, -3.5, 7], size: [5, 3.5, 6], color: '#0a0a0a', wallColor: '#1a1a1a', floorColor: '#111', type: 'room', furniture: ['cinema'], description: 'Luxury home cinema with large screen' },
      { id: 'b1-gallery', name: 'Car Viewing Gallery', floor: 'basement1', position: [0, -3.5, 0], size: [6, 3.5, 8], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#c4a882', type: 'void', furniture: ['gallery'], description: 'Glass viewing gallery overlooking automotive vault' },
    ]
  },
  {
    id: 'ground',
    name: 'Ground Floor — Main Residence',
    level: 0,
    y: 0,
    height: 3.5,
    rooms: [
      { id: 'g-foyer', name: 'Grand Entrance Foyer', floor: 'ground', position: [0, 0, 9], size: [6, 3.5, 4], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#d4c4a8', type: 'hallway', furniture: ['foyer'], description: 'Double-height entrance with sculptural staircase' },
      { id: 'g-living', name: 'Formal Living Room', floor: 'ground', position: [-5, 0, 4], size: [5, 3.5, 6], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#c4a882', type: 'room', furniture: ['sofa', 'table'], description: 'Elegant formal living with pool view' },
      { id: 'g-family', name: 'Family Lounge', floor: 'ground', position: [5, 0, 4], size: [5, 3.5, 6], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#c4a882', type: 'room', furniture: ['sofa', 'tv'], description: 'Relaxed family entertainment space' },
      { id: 'g-dining', name: 'Dining Area', floor: 'ground', position: [0, 0, 4], size: [4, 3.5, 6], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#d4c4a8', type: 'room', furniture: ['dining'], description: 'Large formal dining for 12 guests' },
      { id: 'g-kitchen', name: 'Designer Kitchen', floor: 'ground', position: [-5, 0, -3], size: [5, 3.5, 6], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#d4c4a8', type: 'room', furniture: ['kitchen'], description: 'Large island, walk-in pantry, premium appliances' },
      { id: 'g-service', name: 'Service Kitchen', floor: 'ground', position: [5, 0, -3], size: [5, 3.5, 6], color: '#f0f0f0', wallColor: '#e0e0e0', floorColor: '#ccc', type: 'room', furniture: ['service'], description: 'Separate dirty/service kitchen' },
      { id: 'g-guest', name: 'Guest Bedroom', floor: 'ground', position: [-5, 0, -9], size: [5, 3.5, 4], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#c4a882', type: 'room', furniture: ['bed'], description: 'Ensuite guest bedroom suite' },
      { id: 'g-library', name: 'Library', floor: 'ground', position: [5, 0, -9], size: [5, 3.5, 4], color: '#f5f0e8', wallColor: '#d4c4a8', floorColor: '#8b6914', type: 'room', furniture: ['books'], description: 'Quiet reading room with natural wood' },
    ]
  },
  {
    id: 'first',
    name: 'First Floor — Private Level',
    level: 1,
    y: 3.5,
    height: 3.2,
    rooms: [
      { id: 'f-master', name: 'Master Bedroom Suite', floor: 'first', position: [-4, 3.5, 6], size: [7, 3.2, 8], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#c4a882', type: 'room', furniture: ['master-bed'], description: 'Luxury master with sitting area and balcony' },
      { id: 'f-master-bath', name: 'Spa Master Bathroom', floor: 'first', position: [-4, 3.5, -1], size: [7, 3.2, 4], color: '#f0ece4', wallColor: '#d4c4a8', floorColor: '#e8e0d0', type: 'room', furniture: ['bath'], description: 'Freestanding tub, rain shower, double vanity' },
      { id: 'f-bed2', name: 'Bedroom 2', floor: 'first', position: [5, 3.5, 6], size: [5, 3.2, 5], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#c4a882', type: 'room', furniture: ['bed'], description: 'Ensuite bedroom suite' },
      { id: 'f-bed3', name: 'Bedroom 3', floor: 'first', position: [5, 3.5, 0], size: [5, 3.2, 5], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#c4a882', type: 'room', furniture: ['bed'], description: 'Ensuite bedroom suite' },
      { id: 'f-bed4', name: 'Bedroom 4', floor: 'first', position: [5, 3.5, -6], size: [5, 3.2, 5], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#c4a882', type: 'room', furniture: ['bed'], description: 'Ensuite bedroom suite' },
      { id: 'f-lounge', name: 'Family Lounge', floor: 'first', position: [-4, 3.5, -5], size: [7, 3.2, 4], color: '#f5f0e8', wallColor: '#e8e0d0', floorColor: '#c4a882', type: 'room', furniture: ['sofa'], description: 'Private family lounge area' },
      { id: 'f-study', name: 'Study Area', floor: 'first', position: [0, 3.5, -9], size: [5, 3.2, 3], color: '#f5f0e8', wallColor: '#d4c4a8', floorColor: '#8b6914', type: 'room', furniture: ['desk'], description: 'Homework and study area' },
    ]
  },
  {
    id: 'rooftop',
    name: 'Rooftop — Service Level',
    level: 2,
    y: 6.7,
    height: 1.5,
    rooms: [
      { id: 'r-solar', name: 'Solar Array', floor: 'rooftop', position: [0, 6.7, 0], size: [14, 1.5, 22], color: '#2a2a3a', wallColor: '#3a3a4a', floorColor: '#4a4a5a', type: 'room', furniture: ['solar'], description: 'Solar panels, battery storage, HVAC' },
    ]
  }
]

export const allRooms: Room[] = floors.flatMap(f => f.rooms)

export const getFloorById = (id: string) => floors.find(f => f.id === id)
export const getRoomById = (id: string) => allRooms.find(r => r.id === id)
