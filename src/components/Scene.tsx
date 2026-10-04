import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Sky } from '@react-three/drei'
import * as THREE from 'three'
import Building from './Building'
import FirstPersonControls from './FirstPersonControls'

interface SceneProps {
  selectedRoom: string | null
  onSelectRoom: (id: string | null) => void
  isFirstPerson: boolean
  timeOfDay: number
  showWireframe: boolean
  floorVisibility: Record<string, boolean>
  roomEdits: Record<string, { wallColor: string; floorColor: string }>
  onPositionChange: (pos: [number, number, number]) => void
  viewMode: 'exterior' | 'cutaway' | 'xray'
}

function Lighting({ timeOfDay }: { timeOfDay: number }) {
  const sunPosition = useMemo(() => {
    const angle = (timeOfDay / 100) * Math.PI
    return new THREE.Vector3(
      Math.cos(angle) * 100,
      Math.sin(angle) * 100 + 10,
      50
    )
  }, [timeOfDay])

  const intensity = Math.max(0.1, Math.sin((timeOfDay / 100) * Math.PI))
  const isNight = timeOfDay < 20 || timeOfDay > 80

  return (
    <>
      <ambientLight intensity={isNight ? 0.1 : 0.3 + intensity * 0.3} color={isNight ? '#4466aa' : '#ffffff'} />
      <directionalLight
        position={sunPosition.toArray()}
        intensity={intensity * 2}
        color={isNight ? '#6688cc' : '#fff5e0'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      {isNight && (
        <>
          <pointLight position={[0, 2, 9]} color="#ffcc88" intensity={1} distance={10} />
          <pointLight position={[0, -5, 0]} color="#ffaa44" intensity={0.5} distance={15} />
          <pointLight position={[0, -2, 0]} color="#ffcc88" intensity={0.5} distance={12} />
        </>
      )}
    </>
  )
}

function CameraController({ isFirstPerson, viewMode }: { isFirstPerson: boolean, viewMode: string }) {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)

  useFrame(() => {
    if (!isFirstPerson && controlsRef.current) {
      controlsRef.current.update()
    }
  })

  if (isFirstPerson) return null

  const target = viewMode === 'cutaway' 
    ? [0, 0, 0] as [number, number, number]
    : [0, 2, 0] as [number, number, number]

  const position = viewMode === 'cutaway'
    ? [20, 15, 20] as [number, number, number]
    : viewMode === 'xray'
    ? [0, 25, 0.1] as [number, number, number]
    : [25, 15, 25] as [number, number, number]

  return (
    <OrbitControls
      ref={controlsRef}
      target={target}
      enableDamping
      dampingFactor={0.05}
      minDistance={5}
      maxDistance={60}
      maxPolarAngle={Math.PI * 0.85}
    />
  )
}

export default function Scene({
  selectedRoom,
  onSelectRoom,
  isFirstPerson,
  timeOfDay,
  showWireframe,
  floorVisibility,
  roomEdits,
  onPositionChange,
  viewMode,
}: SceneProps) {
  const isNight = timeOfDay < 20 || timeOfDay > 80

  return (
    <Canvas
      shadows
      camera={{ position: [25, 15, 25], fov: 50, near: 0.1, far: 200 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: isNight ? '#0a0a1a' : '#87CEEB' }}
    >
      {/* Sky */}
      {!isNight && (
        <Sky
          sunPosition={[
            Math.cos((timeOfDay / 100) * Math.PI) * 100,
            Math.sin((timeOfDay / 100) * Math.PI) * 100 + 10,
            50
          ]}
          turbidity={8}
          rayleigh={2}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />
      )}

      {/* Fog */}
      <fog attach="fog" args={[isNight ? '#0a0a1a' : '#c8d8e8', 40, 100]} />

      {/* Lighting */}
      <Lighting timeOfDay={timeOfDay} />

      {/* Building */}
      <Building
        selectedRoom={selectedRoom}
        onSelectRoom={onSelectRoom}
        timeOfDay={timeOfDay}
        showWireframe={showWireframe}
        floorVisibility={floorVisibility}
      />

      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.4}
        scale={50}
        blur={2}
        far={20}
      />

      {/* Camera Controls */}
      <CameraController isFirstPerson={isFirstPerson} viewMode={viewMode} />

      {/* First Person Controls */}
      <FirstPersonControls
        enabled={isFirstPerson}
        speed={8}
        position={[0, 1.7, 12]}
        onPositionChange={onPositionChange}
      />
    </Canvas>
  )
}
