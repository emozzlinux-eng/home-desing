import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { floors, allRooms, Room } from '../data/floorPlans'

interface BuildingProps {
  selectedRoom: string | null
  onSelectRoom: (id: string | null) => void
  timeOfDay: number
  showWireframe: boolean
  floorVisibility: Record<string, boolean>
}

// Materials
function useMaterials() {
  return useMemo(() => ({
    concrete: new THREE.MeshStandardMaterial({ color: '#e8e0d0', roughness: 0.8, metalness: 0.0 }),
    concreteDark: new THREE.MeshStandardMaterial({ color: '#3a3a3a', roughness: 0.7, metalness: 0.1 }),
    glass: new THREE.MeshPhysicalMaterial({ color: '#88ccee', roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.3, transmission: 0.8 }),
    glassDark: new THREE.MeshPhysicalMaterial({ color: '#334455', roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.4 }),
    wood: new THREE.MeshStandardMaterial({ color: '#8b6914', roughness: 0.6, metalness: 0.0 }),
    woodLight: new THREE.MeshStandardMaterial({ color: '#c4a882', roughness: 0.5, metalness: 0.0 }),
    woodDark: new THREE.MeshStandardMaterial({ color: '#4a3010', roughness: 0.6, metalness: 0.0 }),
    stone: new THREE.MeshStandardMaterial({ color: '#d4c4a8', roughness: 0.7, metalness: 0.0 }),
    stoneDark: new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.5, metalness: 0.1 }),
    metal: new THREE.MeshStandardMaterial({ color: '#444', roughness: 0.3, metalness: 0.8 }),
    metalDark: new THREE.MeshStandardMaterial({ color: '#222', roughness: 0.2, metalness: 0.9 }),
    floor: new THREE.MeshStandardMaterial({ color: '#c4a882', roughness: 0.4, metalness: 0.0 }),
    floorDark: new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.2, metalness: 0.3 }),
    floorTile: new THREE.MeshStandardMaterial({ color: '#e8e0d0', roughness: 0.3, metalness: 0.0 }),
    water: new THREE.MeshPhysicalMaterial({ color: '#2288aa', roughness: 0.0, metalness: 0.1, transparent: true, opacity: 0.7 }),
    grass: new THREE.MeshStandardMaterial({ color: '#2d5a27', roughness: 0.9, metalness: 0.0 }),
    highlight: new THREE.MeshStandardMaterial({ color: '#ff8800', roughness: 0.5, metalness: 0.0, emissive: '#ff6600', emissiveIntensity: 0.3 }),
    server: new THREE.MeshStandardMaterial({ color: '#1a1a2e', roughness: 0.3, metalness: 0.5 }),
    serverLight: new THREE.MeshStandardMaterial({ color: '#0066ff', emissive: '#0044cc', emissiveIntensity: 0.5, roughness: 0.3, metalness: 0.5 }),
    car: new THREE.MeshStandardMaterial({ color: '#111', roughness: 0.1, metalness: 0.9 }),
    carRed: new THREE.MeshStandardMaterial({ color: '#8b0000', roughness: 0.1, metalness: 0.8 }),
    carWhite: new THREE.MeshStandardMaterial({ color: '#eee', roughness: 0.1, metalness: 0.7 }),
    carBlue: new THREE.MeshStandardMaterial({ color: '#001144', roughness: 0.1, metalness: 0.8 }),
    led: new THREE.MeshStandardMaterial({ color: '#ffaa44', emissive: '#ff8822', emissiveIntensity: 1.0 }),
    ledBlue: new THREE.MeshStandardMaterial({ color: '#4488ff', emissive: '#2266dd', emissiveIntensity: 0.8 }),
    ledWarm: new THREE.MeshStandardMaterial({ color: '#ffcc88', emissive: '#ffaa44', emissiveIntensity: 0.6 }),
    pool: new THREE.MeshPhysicalMaterial({ color: '#1a6688', roughness: 0.0, metalness: 0.0, transparent: true, opacity: 0.8 }),
  }), [])
}

// Room component
function RoomMesh({ room, isSelected, onClick, materials, timeOfDay }: {
  room: Room
  isSelected: boolean
  onClick: () => void
  materials: ReturnType<typeof useMaterials>
  timeOfDay: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [w, h, d] = room.size
  const [x, y, z] = room.position

  useFrame(() => {
    if (meshRef.current && isSelected) {
      // Subtle pulse for selected room
    }
  })

  const wallMat = isSelected ? materials.highlight : 
    room.floor === 'basement2' ? materials.stoneDark :
    room.floor === 'basement1' && room.id === 'b1-server' ? materials.server :
    materials.concrete

  const floorMat = isSelected ? materials.highlight :
    room.floor === 'basement2' ? materials.floorDark :
    room.floor === 'ground' ? materials.floorTile :
    room.floor === 'first' ? materials.woodLight :
    materials.floor

  return (
    <group position={[x, y, z]}>
      {/* Floor */}
      <mesh position={[0, -h/2 + 0.05, 0]} receiveShadow onClick={onClick}>
        <boxGeometry args={[w, 0.1, d]} />
        <primitive object={floorMat} attach="material" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, h/2 - 0.05, 0]}>
        <boxGeometry args={[w, 0.1, d]} />
        <primitive object={materials.concrete} attach="material" />
      </mesh>

      {/* Walls */}
      {/* Front wall */}
      <mesh position={[0, 0, d/2]} onClick={onClick}>
        <boxGeometry args={[w, h, 0.2]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 0, -d/2]} onClick={onClick}>
        <boxGeometry args={[w, h, 0.2]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
      {/* Left wall */}
      <mesh position={[-w/2, 0, 0]} onClick={onClick}>
        <boxGeometry args={[0.2, h, d]} />
        <primitive object={wallMat} attach="material" />
      </mesh>
      {/* Right wall */}
      <mesh position={[w/2, 0, 0]} onClick={onClick}>
        <boxGeometry args={[0.2, h, d]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      {/* Glass panels for ground/first floor */}
      {(room.floor === 'ground' || room.floor === 'first') && (
        <>
          <mesh position={[0, 0, d/2 + 0.11]}>
            <boxGeometry args={[w * 0.7, h * 0.8, 0.02]} />
            <primitive object={materials.glass} attach="material" />
          </mesh>
        </>
      )}

      {/* LED strips */}
      <mesh position={[0, h/2 - 0.15, d/2 - 0.2]}>
        <boxGeometry args={[w - 0.5, 0.02, 0.02]} />
        <primitive object={materials.ledWarm} attach="material" />
      </mesh>
      <mesh position={[0, h/2 - 0.15, -d/2 + 0.2]}>
        <boxGeometry args={[w - 0.5, 0.02, 0.02]} />
        <primitive object={materials.ledWarm} attach="material" />
      </mesh>
    </group>
  )
}

// Car model
function Car({ position, color }: { position: [number, number, number], color: THREE.MeshStandardMaterial }) {
  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.8, 0.5, 4.2]} />
        <primitive object={color} attach="material" />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.8, -0.2]} castShadow>
        <boxGeometry args={[1.6, 0.5, 2.2]} />
        <primitive object={color} attach="material" />
      </mesh>
      {/* Windows */}
      <mesh position={[0, 0.85, -0.2]}>
        <boxGeometry args={[1.5, 0.4, 2.0]} />
        <meshPhysicalMaterial color="#112233" roughness={0.05} metalness={0.3} transparent opacity={0.7} />
      </mesh>
      {/* Wheels */}
      {[[-0.8, 0.15, 1.3], [0.8, 0.15, 1.3], [-0.8, 0.15, -1.3], [0.8, 0.15, -1.3]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[0, 0, Math.PI/2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#111" roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
      {/* Headlights */}
      <mesh position={[-0.6, 0.4, 2.1]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#fff" emissive="#ffffcc" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.6, 0.4, 2.1]}>
        <boxGeometry args={[0.3, 0.1, 0.05]} />
        <meshStandardMaterial color="#fff" emissive="#ffffcc" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

// Motorcycle
function Motorcycle({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} scale={0.7}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.4, 0.6, 1.8]} />
        <meshStandardMaterial color="#222" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.9, -0.3]}>
        <boxGeometry args={[0.3, 0.3, 0.8]} />
        <meshStandardMaterial color="#333" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Wheels */}
      <mesh position={[0, 0.25, 0.7]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.25, 0.08, 8, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.25, -0.7]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.25, 0.08, 8, 16]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
    </group>
  )
}

// Server rack
function ServerRack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.6, 2, 0.8]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Server lights */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0.31, -0.8 + i * 0.22, 0]}>
          <boxGeometry args={[0.02, 0.05, 0.05]} />
          <meshStandardMaterial 
            color={i % 3 === 0 ? '#00ff44' : i % 3 === 1 ? '#0088ff' : '#ff8800'}
            emissive={i % 3 === 0 ? '#00ff44' : i % 3 === 1 ? '#0088ff' : '#ff8800'}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// Furniture components
function FurnitureSet({ room, materials }: { room: Room, materials: ReturnType<typeof useMaterials> }) {
  const [x, y, z] = room.position
  const [w, h, d] = room.size

  switch(room.id) {
    case 'b2-garage':
      return (
        <group position={[x, y - h/2 + 0.1, z]}>
          {/* Cars - 20 vehicles in rows */}
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => {
              const colors = [materials.car, materials.carRed, materials.carWhite, materials.carBlue]
              const cx = -4.5 + col * 3
              const cz = -8 + row * 4
              return <Car key={`car-${row}-${col}`} position={[cx, 0, cz]} color={colors[(row + col) % 4]} />
            })
          )}
          {/* Motorcycles */}
          {Array.from({ length: 5 }).map((_, i) => (
            <Motorcycle key={`moto-${i}`} position={[5, 0, -6 + i * 3]} />
          ))}
          {/* Floor markings */}
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => (
              <mesh key={`mark-${row}-${col}`} position={[-4.5 + col * 3, 0.01, -8 + row * 4]} rotation={[-Math.PI/2, 0, 0]}>
                <planeGeometry args={[2.2, 4.5]} />
                <meshStandardMaterial color="#333" roughness={0.3} metalness={0.2} />
              </mesh>
            ))
          )}
        </group>
      )
    
    case 'b1-server':
      return (
        <group position={[x, y, z]}>
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 3 }).map((_, col) => (
              <ServerRack key={`srv-${row}-${col}`} position={[-1.5 + col * 1.5, 0, -1.5 + row * 1.5]} />
            ))
          )}
          {/* Blue ambient glow */}
          <pointLight position={[0, 1, 0]} color="#0066ff" intensity={2} distance={8} />
        </group>
      )

    case 'b1-gallery':
      return (
        <group position={[x, y, z]}>
          {/* Glass floor viewing panel */}
          <mesh position={[0, -h/2 + 0.05, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[5, 7]} />
            <meshPhysicalMaterial color="#88ccee" transparent opacity={0.2} roughness={0} metalness={0.1} />
          </mesh>
          {/* Glass balustrade */}
          <mesh position={[0, 0.5, 3.5]}>
            <boxGeometry args={[5, 1, 0.05]} />
            <meshPhysicalMaterial color="#aaddff" transparent opacity={0.15} roughness={0} />
          </mesh>
          {/* Floating staircase */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`step-${i}`} position={[-2, -h/2 + i * 0.4, -3 + i * 0.5]} castShadow>
              <boxGeometry args={[1.2, 0.08, 0.5]} />
              <primitive object={materials.woodDark} attach="material" />
            </mesh>
          ))}
        </group>
      )

    case 'g-foyer':
      return (
        <group position={[x, y, z]}>
          {/* Sculptural staircase */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI
            const sx = Math.cos(angle) * 1.5
            const sz = Math.sin(angle) * 1.5
            return (
              <mesh key={`stair-${i}`} position={[sx, -h/2 + i * 0.28, sz]} castShadow>
                <boxGeometry args={[1.2, 0.08, 0.4]} />
                <primitive object={materials.stone} attach="material" />
              </mesh>
            )
          })}
          {/* Central column */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, h, 16]} />
            <primitive object={materials.metal} attach="material" />
          </mesh>
        </group>
      )

    case 'g-living':
      return (
        <group position={[x, y - h/2 + 0.1, z]}>
          {/* Sofa */}
          <mesh position={[0, 0.3, -1]} castShadow>
            <boxGeometry args={[3, 0.6, 1]} />
            <meshStandardMaterial color="#8a7a6a" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.6, -1.4]} castShadow>
            <boxGeometry args={[3, 0.4, 0.2]} />
            <meshStandardMaterial color="#8a7a6a" roughness={0.8} />
          </mesh>
          {/* Coffee table */}
          <mesh position={[0, 0.2, 0.5]} castShadow>
            <boxGeometry args={[1.5, 0.05, 0.8]} />
            <primitive object={materials.stone} attach="material" />
          </mesh>
          <mesh position={[0, 0.1, 0.5]}>
            <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
            <primitive object={materials.metal} attach="material" />
          </mesh>
        </group>
      )

    case 'g-kitchen':
      return (
        <group position={[x, y - h/2 + 0.1, z]}>
          {/* Kitchen island */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[2.5, 0.9, 1.2]} />
            <primitive object={materials.stone} attach="material" />
          </mesh>
          {/* Counter top */}
          <mesh position={[0, 0.92, 0]}>
            <boxGeometry args={[2.6, 0.04, 1.3]} />
            <meshStandardMaterial color="#f5f0e8" roughness={0.2} metalness={0.1} />
          </mesh>
          {/* Wall cabinets */}
          <mesh position={[0, 1.5, -2.5]}>
            <boxGeometry args={[4, 1, 0.4]} />
            <primitive object={materials.woodLight} attach="material" />
          </mesh>
          {/* Base cabinets */}
          <mesh position={[0, 0.4, -2.5]}>
            <boxGeometry args={[4, 0.8, 0.6]} />
            <primitive object={materials.woodLight} attach="material" />
          </mesh>
        </group>
      )

    case 'f-master':
      return (
        <group position={[x, y - h/2 + 0.1, z]}>
          {/* King bed */}
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[2.2, 0.5, 2.5]} />
            <meshStandardMaterial color="#f5f0e8" roughness={0.9} />
          </mesh>
          {/* Headboard */}
          <mesh position={[0, 0.8, -1.2]} castShadow>
            <boxGeometry args={[2.4, 1.2, 0.1]} />
            <primitive object={materials.woodDark} attach="material" />
          </mesh>
          {/* Nightstands */}
          <mesh position={[-1.5, 0.25, -0.5]} castShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <primitive object={materials.woodLight} attach="material" />
          </mesh>
          <mesh position={[1.5, 0.25, -0.5]} castShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <primitive object={materials.woodLight} attach="material" />
          </mesh>
        </group>
      )

    case 'f-master-bath':
      return (
        <group position={[x, y - h/2 + 0.1, z]}>
          {/* Freestanding bathtub */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <boxGeometry args={[1.8, 0.6, 0.8]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.1} metalness={0.1} />
          </mesh>
          {/* Vanity */}
          <mesh position={[0, 0.4, -1.5]}>
            <boxGeometry args={[2, 0.8, 0.5]} />
            <primitive object={materials.woodLight} attach="material" />
          </mesh>
          {/* Mirror */}
          <mesh position={[0, 1.2, -1.7]}>
            <boxGeometry args={[1.5, 1, 0.05]} />
            <meshStandardMaterial color="#ddd" roughness={0.0} metalness={0.9} />
          </mesh>
        </group>
      )

    case 'b1-gym':
      return (
        <group position={[x, y - h/2 + 0.1, z]}>
          {/* Treadmill */}
          <mesh position={[-1, 0.4, 0]} castShadow>
            <boxGeometry args={[0.8, 0.8, 1.8]} />
            <meshStandardMaterial color="#333" roughness={0.5} metalness={0.3} />
          </mesh>
          {/* Weight rack */}
          <mesh position={[1.5, 0.8, -1]}>
            <boxGeometry args={[0.3, 1.6, 1.5]} />
            <primitive object={materials.metal} attach="material" />
          </mesh>
          {/* Mirror wall */}
          <mesh position={[-2.3, 1, 0]}>
            <boxGeometry args={[0.05, 2.5, 4]} />
            <meshStandardMaterial color="#ccc" roughness={0.0} metalness={0.9} />
          </mesh>
        </group>
      )

    case 'b1-gaming':
      return (
        <group position={[x, y - h/2 + 0.1, z]}>
          {/* Gaming desk */}
          <mesh position={[0, 0.4, -1.5]}>
            <boxGeometry args={[3, 0.05, 0.8]} />
            <primitive object={materials.woodDark} attach="material" />
          </mesh>
          {/* Monitors */}
          {[-0.8, 0, 0.8].map((mx, i) => (
            <mesh key={i} position={[mx, 0.8, -1.8]}>
              <boxGeometry args={[0.7, 0.4, 0.05]} />
              <meshStandardMaterial color="#111" emissive="#2244ff" emissiveIntensity={0.3} />
            </mesh>
          ))}
          {/* Racing simulator */}
          <mesh position={[0, 0.3, 1.5]} castShadow>
            <boxGeometry args={[1.5, 0.6, 2]} />
            <meshStandardMaterial color="#222" roughness={0.5} metalness={0.3} />
          </mesh>
          {/* Purple ambient */}
          <pointLight position={[0, 2, 0]} color="#8800ff" intensity={1} distance={6} />
        </group>
      )

    case 'b1-cinema':
      return (
        <group position={[x, y - h/2 + 0.1, z]}>
          {/* Screen */}
          <mesh position={[0, 1, -2.5]}>
            <boxGeometry args={[4, 2.2, 0.1]} />
            <meshStandardMaterial color="#111" emissive="#112244" emissiveIntensity={0.2} />
          </mesh>
          {/* Seats */}
          {Array.from({ length: 3 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => (
              <mesh key={`seat-${row}-${col}`} position={[-1.5 + col * 1, 0.3 + row * 0.15, -0.5 + row * 1.2]} castShadow>
                <boxGeometry args={[0.8, 0.6, 0.8]} />
                <meshStandardMaterial color="#2a1a1a" roughness={0.9} />
              </mesh>
            ))
          )}
        </group>
      )

    case 'g-dining':
      return (
        <group position={[x, y - h/2 + 0.1, z]}>
          {/* Dining table */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[2.5, 0.05, 1.2]} />
            <primitive object={materials.woodDark} attach="material" />
          </mesh>
          {/* Table legs */}
          {[[-1, -0.4], [1, -0.4], [-1, 0.4], [1, 0.4]].map(([lx, lz], i) => (
            <mesh key={i} position={[lx, 0.2, lz]}>
              <boxGeometry args={[0.05, 0.4, 0.05]} />
              <primitive object={materials.metal} attach="material" />
            </mesh>
          ))}
          {/* Chairs */}
          {Array.from({ length: 6 }).map((_, i) => {
            const side = i < 3 ? -1 : 1
            const offset = (i % 3) - 1
            return (
              <mesh key={i} position={[offset * 0.8, 0.25, side * 0.9]} castShadow>
                <boxGeometry args={[0.4, 0.5, 0.4]} />
                <meshStandardMaterial color="#6a5a4a" roughness={0.7} />
              </mesh>
            )
          })}
          {/* Pendant light */}
          <mesh position={[0, 2.5, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 0.2, 16]} />
            <primitive object={materials.metal} attach="material" />
          </mesh>
          <pointLight position={[0, 2.3, 0]} color="#ffcc88" intensity={2} distance={5} />
        </group>
      )

    case 'r-solar':
      return (
        <group position={[x, y + 0.5, z]}>
          {/* Solar panels */}
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <mesh key={`panel-${row}-${col}`} position={[-5 + col * 2, 0.3, -8 + row * 4]} rotation={[-0.3, 0, 0]}>
                <boxGeometry args={[1.8, 0.05, 1]} />
                <meshStandardMaterial color="#1a1a3a" roughness={0.2} metalness={0.5} />
              </mesh>
            ))
          )}
        </group>
      )

    default:
      return null
  }
}

// Exterior elements
function Exterior({ materials }: { materials: ReturnType<typeof useMaterials> }) {
  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <primitive object={materials.grass} attach="material" />
      </mesh>

      {/* Driveway */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.01, 16]}>
        <planeGeometry args={[6, 10]} />
        <meshStandardMaterial color="#555" roughness={0.8} />
      </mesh>

      {/* Swimming pool */}
      <group position={[0, -0.3, -14]}>
        <mesh>
          <boxGeometry args={[8, 0.6, 4]} />
          <meshStandardMaterial color="#334455" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[7.5, 0.1, 3.5]} />
          <primitive object={materials.pool} attach="material" />
        </mesh>
      </group>

      {/* Pool deck */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.02, -12]}>
        <planeGeometry args={[10, 2]} />
        <primitive object={materials.stone} attach="material" />
      </mesh>

      {/* Landscaping - trees */}
      {[[-10, 5], [10, 5], [-10, -10], [10, -10], [-8, 15], [8, 15]].map(([tx, tz], i) => (
        <group key={`tree-${i}`} position={[tx, 0, tz]}>
          <mesh position={[0, 2, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 4, 8]} />
            <primitive object={materials.woodDark} attach="material" />
          </mesh>
          <mesh position={[0, 4.5, 0]} castShadow>
            <sphereGeometry args={[1.5, 8, 8]} />
            <meshStandardMaterial color="#2d5a27" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Water feature at entrance */}
      <group position={[3, 0, 12]}>
        <mesh>
          <boxGeometry args={[2, 0.3, 4]} />
          <meshStandardMaterial color="#444" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.8, 0.05, 3.8]} />
          <primitive object={materials.water} attach="material" />
        </mesh>
      </group>

      {/* Entrance door */}
      <mesh position={[0, 1.5, 11.6]} castShadow>
        <boxGeometry args={[2, 3, 0.15]} />
        <primitive object={materials.woodDark} attach="material" />
      </mesh>

      {/* Exterior walls - main building envelope */}
      {/* Front facade */}
      <mesh position={[0, 1.75, 11.5]}>
        <boxGeometry args={[15.5, 3.5, 0.3]} />
        <primitive object={materials.concrete} attach="material" />
      </mesh>
      {/* Back facade */}
      <mesh position={[0, 1.75, -11.5]}>
        <boxGeometry args={[15.5, 3.5, 0.3]} />
        <primitive object={materials.concrete} attach="material" />
      </mesh>
      {/* Left facade */}
      <mesh position={[-7.6, 1.75, 0]}>
        <boxGeometry args={[0.3, 3.5, 23]} />
        <primitive object={materials.concrete} attach="material" />
      </mesh>
      {/* Right facade */}
      <mesh position={[7.6, 1.75, 0]}>
        <boxGeometry args={[0.3, 3.5, 23]} />
        <primitive object={materials.concrete} attach="material" />
      </mesh>

      {/* Roof overhang */}
      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[16, 0.2, 24]} />
        <primitive object={materials.concreteDark} attach="material" />
      </mesh>

      {/* Guest parking */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[-10, 0.01, 12]}>
        <planeGeometry args={[5, 6]} />
        <meshStandardMaterial color="#555" roughness={0.8} />
      </mesh>

      {/* Landscape lighting */}
      {[[-6, 12], [6, 12], [-6, -12], [6, -12]].map(([lx, lz], i) => (
        <pointLight key={`ext-light-${i}`} position={[lx, 0.5, lz]} color="#ffcc88" intensity={0.5} distance={5} />
      ))}
    </group>
  )
}

export default function Building({ selectedRoom, onSelectRoom, timeOfDay, showWireframe, floorVisibility }: BuildingProps) {
  const materials = useMaterials()

  return (
    <group>
      <Exterior materials={materials} />
      
      {floors.map((floor) => {
        if (!floorVisibility[floor.id]) return null
        return (
          <group key={floor.id}>
            {floor.rooms.map((room) => (
              <group key={room.id}>
                <RoomMesh
                  room={room}
                  isSelected={selectedRoom === room.id}
                  onClick={() => onSelectRoom(room.id === selectedRoom ? null : room.id)}
                  materials={materials}
                  timeOfDay={timeOfDay}
                />
                <FurnitureSet room={room} materials={materials} />
              </group>
            ))}
          </group>
        )
      })}

      {/* Wireframe overlay */}
      {showWireframe && (
        <group>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[15, 10, 23]} />
            <meshBasicMaterial wireframe color="#00ff88" />
          </mesh>
        </group>
      )}
    </group>
  )
}
