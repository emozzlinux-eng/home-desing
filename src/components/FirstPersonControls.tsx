import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FirstPersonControlsProps {
  enabled: boolean
  speed: number
  position: [number, number, number]
  onPositionChange: (pos: [number, number, number]) => void
}

export default function FirstPersonControls({ enabled, speed, position, onPositionChange }: FirstPersonControlsProps) {
  const { camera, gl } = useThree()
  const keys = useRef<Record<string, boolean>>({})
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const velocity = useRef(new THREE.Vector3())
  const isLocked = useRef(false)

  useEffect(() => {
    camera.position.set(...position)
    euler.current.setFromQuaternion(camera.quaternion)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => { keys.current[e.code] = true }
    const handleKeyUp = (e: KeyboardEvent) => { keys.current[e.code] = false }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isLocked.current) return
      euler.current.y -= e.movementX * 0.002
      euler.current.x -= e.movementY * 0.002
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x))
      camera.quaternion.setFromEuler(euler.current)
    }

    const handleClick = () => {
      gl.domElement.requestPointerLock()
    }

    const handleLockChange = () => {
      isLocked.current = document.pointerLockElement === gl.domElement
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    document.addEventListener('mousemove', handleMouseMove)
    gl.domElement.addEventListener('click', handleClick)
    document.addEventListener('pointerlockchange', handleLockChange)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      document.removeEventListener('mousemove', handleMouseMove)
      gl.domElement.removeEventListener('click', handleClick)
      document.removeEventListener('pointerlockchange', handleLockChange)
      if (document.pointerLockElement) {
        document.exitPointerLock()
      }
    }
  }, [enabled, camera, gl])

  useFrame((_, delta) => {
    if (!enabled) return

    const direction = new THREE.Vector3()
    const right = new THREE.Vector3()
    
    camera.getWorldDirection(direction)
    direction.y = 0
    direction.normalize()
    
    right.crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize()

    velocity.current.set(0, 0, 0)

    if (keys.current['KeyW'] || keys.current['ArrowUp']) velocity.current.add(direction)
    if (keys.current['KeyS'] || keys.current['ArrowDown']) velocity.current.sub(direction)
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) velocity.current.sub(right)
    if (keys.current['KeyD'] || keys.current['ArrowRight']) velocity.current.add(right)
    if (keys.current['Space']) velocity.current.y += 1
    if (keys.current['ShiftLeft']) velocity.current.y -= 1

    if (velocity.current.length() > 0) {
      velocity.current.normalize().multiplyScalar(speed * delta)
      camera.position.add(velocity.current)
      onPositionChange([camera.position.x, camera.position.y, camera.position.z])
    }
  })

  return null
}
