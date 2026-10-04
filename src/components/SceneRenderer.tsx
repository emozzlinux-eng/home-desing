import { useEffect, useRef } from 'react'
import { Scene } from '../data/scenes'

interface SceneRendererProps {
  scene: Scene
  progress: number
  isPlaying: boolean
}

export default function SceneRenderer({ scene, progress, isPlaying }: SceneRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    let animId: number
    let time = 0

    const render = () => {
      time += 0.016
      ctx.clearRect(0, 0, width, height)

      switch (scene.type) {
        case 'intro':
          renderIntro(ctx, width, height, time, progress)
          break
        case 'gradient':
          renderGradient(ctx, width, height, time, progress)
          break
        case 'particles':
          renderParticles(ctx, width, height, time, progress)
          break
        case 'finale':
          renderFinale(ctx, width, height, time, progress)
          break
        case 'space':
          renderSpace(ctx, width, height, time, progress)
          break
        case 'nebula':
          renderNebula(ctx, width, height, time, progress)
          break
        case 'planet':
          renderPlanet(ctx, width, height, time, progress)
          break
        case 'starfield':
          renderStarfield(ctx, width, height, time, progress)
          break
        case 'ocean':
          renderOcean(ctx, width, height, time, progress)
          break
        case 'waves':
          renderWaves(ctx, width, height, time, progress)
          break
        case 'underwater':
          renderUnderwater(ctx, width, height, time, progress)
          break
        case 'sunset':
          renderSunset(ctx, width, height, time, progress)
          break
        case 'forest':
          renderForest(ctx, width, height, time, progress)
          break
        case 'mountains':
          renderMountains(ctx, width, height, time, progress)
          break
        case 'aurora':
          renderAurora(ctx, width, height, time, progress)
          break
        case 'city':
          renderCity(ctx, width, height, time, progress)
          break
        case 'neon':
          renderNeon(ctx, width, height, time, progress)
          break
        case 'skyline':
          renderSkyline(ctx, width, height, time, progress)
          break
        case 'traffic':
          renderTraffic(ctx, width, height, time, progress)
          break
        default:
          renderDefault(ctx, width, height, time, progress)
      }

      if (isPlaying) {
        animId = requestAnimationFrame(render)
      }
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [scene.type, progress, isPlaying])

  return (
    <div className="absolute inset-0 z-10">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ imageRendering: 'auto' }}
      />
      {/* Transition overlay */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500"
        style={{ opacity: progress < 5 ? 1 - progress / 5 : progress > 95 ? (progress - 95) / 5 : 0 }}
      />
    </div>
  )
}

// Scene renderers
function renderIntro(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: number) {
  // Dark background with moving gradient
  const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w * 0.7)
  grad.addColorStop(0, `hsl(${260 + Math.sin(t) * 20}, 80%, 15%)`)
  grad.addColorStop(1, '#000000')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Animated rings
  for (let i = 0; i < 5; i++) {
    const radius = 50 + i * 60 + Math.sin(t + i) * 20
    const alpha = 0.3 - i * 0.05
    ctx.beginPath()
    ctx.arc(w/2, h/2, radius * (p / 100), 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`
    ctx.lineWidth = 2
    ctx.stroke()
  }

  // Center glow
  const centerGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, 100)
  centerGrad.addColorStop(0, `rgba(168, 85, 247, ${0.5 * Math.sin(t * 2) + 0.5})`)
  centerGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = centerGrad
  ctx.fillRect(0, 0, w, h)

  // Floating particles
  for (let i = 0; i < 30; i++) {
    const x = (Math.sin(t * 0.5 + i * 1.3) * 0.5 + 0.5) * w
    const y = (Math.cos(t * 0.3 + i * 0.7) * 0.5 + 0.5) * h
    const size = 1 + Math.sin(t + i) * 0.5
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(t + i) * 0.2})`
    ctx.fill()
  }
}

function renderGradient(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  // Animated gradient mesh
  const colors = [
    { x: Math.sin(t * 0.7) * w * 0.3 + w * 0.3, y: Math.cos(t * 0.5) * h * 0.3 + h * 0.3, color: 'rgba(168, 85, 247, 0.4)' },
    { x: Math.cos(t * 0.6) * w * 0.3 + w * 0.7, y: Math.sin(t * 0.8) * h * 0.3 + h * 0.5, color: 'rgba(236, 72, 153, 0.4)' },
    { x: Math.sin(t * 0.4) * w * 0.2 + w * 0.5, y: Math.cos(t * 0.9) * h * 0.3 + h * 0.7, color: 'rgba(59, 130, 246, 0.4)' },
  ]

  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, w, h)

  colors.forEach(({ x, y, color }) => {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 200)
    grad.addColorStop(0, color)
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  })

  // Grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
  ctx.lineWidth = 1
  for (let i = 0; i < w; i += 40) {
    ctx.beginPath()
    ctx.moveTo(i + Math.sin(t + i * 0.01) * 5, 0)
    ctx.lineTo(i + Math.sin(t + i * 0.01 + 2) * 5, h)
    ctx.stroke()
  }
}

function renderParticles(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.fillRect(0, 0, w, h)

  // Particle system
  for (let i = 0; i < 100; i++) {
    const angle = (i / 100) * Math.PI * 2 + t * 0.5
    const radius = 50 + Math.sin(t * 2 + i * 0.5) * 100 + i * 1.5
    const x = w / 2 + Math.cos(angle) * radius
    const y = h / 2 + Math.sin(angle) * radius
    const size = 2 + Math.sin(t * 3 + i) * 1.5
    const hue = (i * 3.6 + t * 50) % 360

    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.8)`
    ctx.fill()

    // Trail
    ctx.beginPath()
    ctx.moveTo(x, y)
    const prevAngle = angle - 0.1
    const prevX = w / 2 + Math.cos(prevAngle) * (radius - 5)
    const prevY = h / 2 + Math.sin(prevAngle) * (radius - 5)
    ctx.lineTo(prevX, prevY)
    ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.3)`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Center vortex
  const vortexGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, 80)
  vortexGrad.addColorStop(0, `rgba(168, 85, 247, ${0.3 + Math.sin(t * 3) * 0.1})`)
  vortexGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = vortexGrad
  ctx.beginPath()
  ctx.arc(w/2, h/2, 80, 0, Math.PI * 2)
  ctx.fill()
}

function renderFinale(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, p: number) {
  // Dark elegant background
  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, '#0f0520')
  grad.addColorStop(0.5, '#1a0530')
  grad.addColorStop(1, '#0f0520')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Rising particles
  for (let i = 0; i < 50; i++) {
    const x = (i / 50) * w + Math.sin(t + i) * 20
    const y = h - ((t * 30 + i * 20) % (h + 50))
    const size = 1 + Math.sin(t + i * 0.5) * 0.5
    const alpha = Math.max(0, 1 - y / h)
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(168, 85, 247, ${alpha * 0.6})`
    ctx.fill()
  }

  // Spotlight
  const spotGrad = ctx.createRadialGradient(w/2, h * 0.4, 0, w/2, h * 0.4, 200)
  spotGrad.addColorStop(0, `rgba(255, 255, 255, ${0.1 * (p / 100)})`)
  spotGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = spotGrad
  ctx.fillRect(0, 0, w, h)
}

function renderSpace(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  ctx.fillStyle = '#000011'
  ctx.fillRect(0, 0, w, h)

  // Stars
  for (let i = 0; i < 200; i++) {
    const x = (i * 137.5 + t * 10) % w
    const y = (i * 97.3) % h
    const brightness = 0.3 + Math.sin(t * 2 + i) * 0.3
    const size = 0.5 + Math.sin(t + i * 0.3) * 0.5
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
    ctx.fill()
  }

  // Distant galaxy
  const galaxyGrad = ctx.createRadialGradient(w * 0.7, h * 0.3, 0, w * 0.7, h * 0.3, 150)
  galaxyGrad.addColorStop(0, 'rgba(100, 50, 200, 0.3)')
  galaxyGrad.addColorStop(0.5, 'rgba(50, 20, 100, 0.1)')
  galaxyGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = galaxyGrad
  ctx.fillRect(0, 0, w, h)
}

function renderNebula(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  ctx.fillStyle = '#050010'
  ctx.fillRect(0, 0, w, h)

  // Nebula clouds
  const nebulaColors = [
    { x: w * 0.3 + Math.sin(t * 0.3) * 50, y: h * 0.4, r: 200, color: 'rgba(200, 50, 100, 0.15)' },
    { x: w * 0.6 + Math.cos(t * 0.4) * 30, y: h * 0.5, r: 180, color: 'rgba(50, 100, 200, 0.15)' },
    { x: w * 0.5, y: h * 0.6 + Math.sin(t * 0.5) * 40, r: 160, color: 'rgba(100, 50, 200, 0.12)' },
  ]

  nebulaColors.forEach(({ x, y, r, color }) => {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, color)
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  })

  // Stars in nebula
  for (let i = 0; i < 100; i++) {
    const x = (i * 73.7) % w
    const y = (i * 51.3) % h
    const twinkle = Math.sin(t * 3 + i * 2) * 0.5 + 0.5
    ctx.beginPath()
    ctx.arc(x, y, 0.5 + twinkle, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.8})`
    ctx.fill()
  }
}

function renderPlanet(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  ctx.fillStyle = '#000008'
  ctx.fillRect(0, 0, w, h)

  // Stars background
  for (let i = 0; i < 100; i++) {
    const x = (i * 97.3) % w
    const y = (i * 61.7) % h
    ctx.beginPath()
    ctx.arc(x, y, 0.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(t + i) * 0.2})`
    ctx.fill()
  }

  // Planet
  const px = w * 0.5
  const py = h * 0.5
  const pr = 80

  // Planet body
  const planetGrad = ctx.createRadialGradient(px - 20, py - 20, 0, px, py, pr)
  planetGrad.addColorStop(0, '#4a90d9')
  planetGrad.addColorStop(0.7, '#1a4a8a')
  planetGrad.addColorStop(1, '#0a1a3a')
  ctx.beginPath()
  ctx.arc(px, py, pr, 0, Math.PI * 2)
  ctx.fillStyle = planetGrad
  ctx.fill()

  // Atmosphere glow
  const atmoGrad = ctx.createRadialGradient(px, py, pr - 5, px, py, pr + 20)
  atmoGrad.addColorStop(0, 'rgba(100, 180, 255, 0.3)')
  atmoGrad.addColorStop(1, 'transparent')
  ctx.beginPath()
  ctx.arc(px, py, pr + 20, 0, Math.PI * 2)
  ctx.fillStyle = atmoGrad
  ctx.fill()

  // Ring
  ctx.beginPath()
  ctx.ellipse(px, py, pr * 1.8, pr * 0.3, Math.sin(t * 0.2) * 0.1, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(200, 200, 255, 0.3)'
  ctx.lineWidth = 3
  ctx.stroke()
}

function renderStarfield(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  ctx.fillStyle = '#000005'
  ctx.fillRect(0, 0, w, h)

  // Warp speed stars
  for (let i = 0; i < 150; i++) {
    const speed = (t * 50 + i * 30) % 500
    const angle = (i / 150) * Math.PI * 2
    const dist = speed
    const x = w / 2 + Math.cos(angle) * dist
    const y = h / 2 + Math.sin(angle) * dist
    const length = Math.min(speed * 0.1, 20)
    
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x - Math.cos(angle) * length, y - Math.sin(angle) * length)
    const alpha = Math.min(speed / 200, 1)
    ctx.strokeStyle = `rgba(200, 200, 255, ${alpha})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Center glow
  const centerGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, 50)
  centerGrad.addColorStop(0, 'rgba(200, 200, 255, 0.3)')
  centerGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = centerGrad
  ctx.fillRect(0, 0, w, h)
}

function renderOcean(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  // Sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5)
  skyGrad.addColorStop(0, '#0a1628')
  skyGrad.addColorStop(1, '#1a3a5c')
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, w, h * 0.5)

  // Ocean
  const oceanGrad = ctx.createLinearGradient(0, h * 0.5, 0, h)
  oceanGrad.addColorStop(0, '#0a2a4a')
  oceanGrad.addColorStop(1, '#001020')
  ctx.fillStyle = oceanGrad
  ctx.fillRect(0, h * 0.5, w, h * 0.5)

  // Waves
  for (let layer = 0; layer < 5; layer++) {
    ctx.beginPath()
    const baseY = h * 0.5 + layer * 20
    ctx.moveTo(0, baseY)
    for (let x = 0; x <= w; x += 5) {
      const y = baseY + Math.sin(x * 0.02 + t * (1 + layer * 0.3) + layer) * (5 + layer * 2)
      ctx.lineTo(x, y)
    }
    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.closePath()
    ctx.fillStyle = `rgba(10, 40, 80, ${0.3 + layer * 0.1})`
    ctx.fill()
  }

  // Moon reflection
  const moonX = w * 0.7
  const moonY = h * 0.2
  ctx.beginPath()
  ctx.arc(moonX, moonY, 30, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 255, 230, 0.9)'
  ctx.fill()

  // Reflection on water
  for (let i = 0; i < 20; i++) {
    const rx = moonX + Math.sin(t * 2 + i) * (i * 3)
    const ry = h * 0.5 + i * 10 + Math.sin(t + i) * 3
    ctx.beginPath()
    ctx.ellipse(rx, ry, 10 - i * 0.3, 2, 0, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 200, ${0.3 - i * 0.015})`
    ctx.fill()
  }
}

function renderWaves(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  const grad = ctx.createLinearGradient(0, 0, 0, h)
  grad.addColorStop(0, '#001830')
  grad.addColorStop(1, '#003060')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Multiple wave layers
  for (let layer = 0; layer < 8; layer++) {
    ctx.beginPath()
    const baseY = h * 0.3 + layer * (h * 0.08)
    ctx.moveTo(0, baseY)
    for (let x = 0; x <= w; x += 3) {
      const y = baseY + 
        Math.sin(x * 0.01 + t * (0.5 + layer * 0.2)) * (15 + layer * 5) +
        Math.sin(x * 0.02 + t * 0.8 + layer) * (8 + layer * 2)
      ctx.lineTo(x, y)
    }
    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.closePath()
    
    const hue = 200 + layer * 5
    const lightness = 20 + layer * 3
    ctx.fillStyle = `hsla(${hue}, 70%, ${lightness}%, 0.4)`
    ctx.fill()
  }
}

function renderUnderwater(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  // Deep blue gradient
  const grad = ctx.createLinearGradient(0, 0, 0, h)
  grad.addColorStop(0, '#003355')
  grad.addColorStop(0.5, '#001a33')
  grad.addColorStop(1, '#000a1a')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Light rays from above
  for (let i = 0; i < 5; i++) {
    const x = w * 0.2 + i * w * 0.15 + Math.sin(t * 0.5 + i) * 20
    ctx.beginPath()
    ctx.moveTo(x - 10, 0)
    ctx.lineTo(x + 30, h)
    ctx.lineTo(x - 30, h)
    ctx.closePath()
    ctx.fillStyle = `rgba(100, 200, 255, ${0.03 + Math.sin(t + i) * 0.01})`
    ctx.fill()
  }

  // Bubbles
  for (let i = 0; i < 30; i++) {
    const x = (i * 47.3 + Math.sin(t + i) * 20) % w
    const y = h - ((t * 20 + i * 30) % (h + 50))
    const size = 3 + Math.sin(i) * 2
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(150, 220, 255, ${0.3 + Math.sin(t + i) * 0.1})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Fish silhouettes
  for (let i = 0; i < 5; i++) {
    const fx = ((t * 30 + i * 200) % (w + 100)) - 50
    const fy = h * 0.3 + i * h * 0.12 + Math.sin(t + i * 2) * 20
    ctx.beginPath()
    ctx.ellipse(fx, fy, 15, 6, 0, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(50, 100, 150, 0.5)`
    ctx.fill()
    // Tail
    ctx.beginPath()
    ctx.moveTo(fx - 15, fy)
    ctx.lineTo(fx - 25, fy - 8)
    ctx.lineTo(fx - 25, fy + 8)
    ctx.closePath()
    ctx.fill()
  }
}

function renderSunset(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  // Sunset sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6)
  skyGrad.addColorStop(0, '#1a0530')
  skyGrad.addColorStop(0.3, '#4a1060')
  skyGrad.addColorStop(0.6, '#cc4400')
  skyGrad.addColorStop(0.8, '#ff8800')
  skyGrad.addColorStop(1, '#ffcc44')
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, w, h * 0.6)

  // Sun
  const sunY = h * 0.45 + Math.sin(t * 0.2) * 5
  const sunGrad = ctx.createRadialGradient(w * 0.5, sunY, 0, w * 0.5, sunY, 60)
  sunGrad.addColorStop(0, 'rgba(255, 200, 50, 1)')
  sunGrad.addColorStop(0.5, 'rgba(255, 150, 0, 0.8)')
  sunGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = sunGrad
  ctx.beginPath()
  ctx.arc(w * 0.5, sunY, 60, 0, Math.PI * 2)
  ctx.fill()

  // Water
  const waterGrad = ctx.createLinearGradient(0, h * 0.6, 0, h)
  waterGrad.addColorStop(0, '#cc6600')
  waterGrad.addColorStop(0.3, '#663300')
  waterGrad.addColorStop(1, '#1a0a00')
  ctx.fillStyle = waterGrad
  ctx.fillRect(0, h * 0.6, w, h * 0.4)

  // Water waves
  for (let layer = 0; layer < 6; layer++) {
    ctx.beginPath()
    const baseY = h * 0.6 + layer * 15
    ctx.moveTo(0, baseY)
    for (let x = 0; x <= w; x += 4) {
      const y = baseY + Math.sin(x * 0.02 + t * (0.8 + layer * 0.2)) * (3 + layer)
      ctx.lineTo(x, y)
    }
    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.closePath()
    ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + layer * 0.05})`
    ctx.fill()
  }

  // Sun reflection
  for (let i = 0; i < 15; i++) {
    const rx = w * 0.5 + Math.sin(t * 2 + i) * (i * 5)
    const ry = h * 0.6 + i * 8
    ctx.beginPath()
    ctx.ellipse(rx, ry, 15 - i * 0.5, 2, 0, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 200, 50, ${0.3 - i * 0.02})`
    ctx.fill()
  }
}

function renderForest(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  // Forest background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h)
  bgGrad.addColorStop(0, '#0a1a0a')
  bgGrad.addColorStop(0.5, '#0a2a0a')
  bgGrad.addColorStop(1, '#051005')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, w, h)

  // Trees
  for (let i = 0; i < 15; i++) {
    const tx = (i / 15) * w + Math.sin(i * 3) * 30
    const th = 100 + Math.sin(i * 2) * 50
    const tw = 20 + Math.sin(i) * 10
    
    // Trunk
    ctx.fillStyle = `rgba(40, 25, 10, 0.8)`
    ctx.fillRect(tx - 5, h - th, 10, th)
    
    // Canopy
    ctx.beginPath()
    ctx.arc(tx, h - th, tw + Math.sin(t + i) * 3, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(20, ${60 + i * 5}, 20, 0.7)`
    ctx.fill()
  }

  // Fireflies
  for (let i = 0; i < 20; i++) {
    const fx = (Math.sin(t * 0.5 + i * 1.7) * 0.5 + 0.5) * w
    const fy = (Math.cos(t * 0.3 + i * 2.3) * 0.5 + 0.5) * h
    const glow = Math.sin(t * 3 + i * 4) * 0.5 + 0.5
    
    const fireflyGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, 10)
    fireflyGrad.addColorStop(0, `rgba(200, 255, 100, ${glow * 0.8})`)
    fireflyGrad.addColorStop(1, 'transparent')
    ctx.fillStyle = fireflyGrad
    ctx.fillRect(fx - 10, fy - 10, 20, 20)
  }

  // Fog
  for (let i = 0; i < 3; i++) {
    const fogGrad = ctx.createRadialGradient(
      w * (0.3 + i * 0.2) + Math.sin(t * 0.2 + i) * 50, 
      h * 0.7, 
      0,
      w * (0.3 + i * 0.2), 
      h * 0.7, 
      150
    )
    fogGrad.addColorStop(0, 'rgba(100, 150, 100, 0.05)')
    fogGrad.addColorStop(1, 'transparent')
    ctx.fillStyle = fogGrad
    ctx.fillRect(0, 0, w, h)
  }
}

function renderMountains(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  // Sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6)
  skyGrad.addColorStop(0, '#0a0a2e')
  skyGrad.addColorStop(1, '#1a1a4e')
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, w, h)

  // Stars
  for (let i = 0; i < 80; i++) {
    const x = (i * 97) % w
    const y = (i * 53) % (h * 0.4)
    ctx.beginPath()
    ctx.arc(x, y, 0.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(t * 2 + i) * 0.3})`
    ctx.fill()
  }

  // Mountain layers
  for (let layer = 0; layer < 4; layer++) {
    ctx.beginPath()
    const baseY = h * 0.4 + layer * h * 0.12
    ctx.moveTo(0, h)
    
    for (let x = 0; x <= w; x += 3) {
      const mountainHeight = 
        Math.sin(x * 0.005 + layer * 2) * 80 +
        Math.sin(x * 0.01 + layer) * 40 +
        Math.sin(x * 0.02 + layer * 3) * 20
      const y = baseY - Math.abs(mountainHeight)
      ctx.lineTo(x, y)
    }
    
    ctx.lineTo(w, h)
    ctx.closePath()
    
    const darkness = 10 + layer * 8
    ctx.fillStyle = `rgb(${darkness}, ${darkness + 5}, ${darkness + 15})`
    ctx.fill()
  }

  // Snow caps
  ctx.beginPath()
  for (let x = 0; x <= w; x += 3) {
    const mountainHeight = Math.sin(x * 0.005) * 80 + Math.sin(x * 0.01) * 40
    const y = h * 0.4 - Math.abs(mountainHeight)
    if (mountainHeight < -60) {
      ctx.moveTo(x, y)
      ctx.lineTo(x, y + 5)
    }
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
  ctx.lineWidth = 2
  ctx.stroke()
}

function renderAurora(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  // Night sky
  ctx.fillStyle = '#050520'
  ctx.fillRect(0, 0, w, h)

  // Stars
  for (let i = 0; i < 100; i++) {
    const x = (i * 83.7) % w
    const y = (i * 47.3) % h
    ctx.beginPath()
    ctx.arc(x, y, 0.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(t + i) * 0.2})`
    ctx.fill()
  }

  // Aurora bands
  for (let band = 0; band < 5; band++) {
    ctx.beginPath()
    const baseY = h * 0.2 + band * 30
    
    for (let x = 0; x <= w; x += 3) {
      const y = baseY + 
        Math.sin(x * 0.008 + t * 0.5 + band * 0.5) * 40 +
        Math.sin(x * 0.015 + t * 0.8 + band) * 20
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    
    for (let x = w; x >= 0; x -= 3) {
      const y = baseY + 50 +
        Math.sin(x * 0.008 + t * 0.5 + band * 0.5 + 1) * 40 +
        Math.sin(x * 0.015 + t * 0.8 + band + 1) * 20
      ctx.lineTo(x, y)
    }
    
    ctx.closePath()
    
    const hue = 120 + band * 20 + Math.sin(t * 0.3) * 20
    ctx.fillStyle = `hsla(${hue}, 80%, 50%, ${0.1 - band * 0.01})`
    ctx.fill()
  }

  // Ground silhouette
  ctx.beginPath()
  ctx.moveTo(0, h)
  for (let x = 0; x <= w; x += 5) {
    const y = h * 0.85 + Math.sin(x * 0.01) * 10 + Math.sin(x * 0.03) * 5
    ctx.lineTo(x, y)
  }
  ctx.lineTo(w, h)
  ctx.closePath()
  ctx.fillStyle = '#050510'
  ctx.fill()
}

function renderCity(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  // Night sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h)
  skyGrad.addColorStop(0, '#0a0a1a')
  skyGrad.addColorStop(1, '#1a1a2e')
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, w, h)

  // Buildings
  for (let i = 0; i < 20; i++) {
    const bx = i * (w / 20)
    const bw = w / 20 - 2
    const bh = 50 + Math.random() * 150 + Math.sin(i * 3) * 50
    const by = h - bh

    ctx.fillStyle = `rgb(${15 + i * 2}, ${15 + i * 2}, ${25 + i * 3})`
    ctx.fillRect(bx, by, bw, bh)

    // Windows
    for (let wy = by + 10; wy < h - 10; wy += 12) {
      for (let wx = bx + 3; wx < bx + bw - 3; wx += 8) {
        const lit = Math.sin(wx * 0.1 + wy * 0.1 + t) > 0.3
        if (lit) {
          ctx.fillStyle = `rgba(255, 230, 150, ${0.5 + Math.sin(t + wx + wy) * 0.2})`
          ctx.fillRect(wx, wy, 4, 6)
        }
      }
    }
  }

  // City glow
  const glowGrad = ctx.createRadialGradient(w/2, h, 0, w/2, h, h * 0.5)
  glowGrad.addColorStop(0, 'rgba(255, 200, 100, 0.1)')
  glowGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = glowGrad
  ctx.fillRect(0, 0, w, h)
}

function renderNeon(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  ctx.fillStyle = '#0a0010'
  ctx.fillRect(0, 0, w, h)

  // Neon grid floor
  const horizon = h * 0.5
  for (let i = 0; i < 20; i++) {
    const y = horizon + i * i * 1.5
    if (y > h) break
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    const alpha = 0.3 - i * 0.015
    ctx.strokeStyle = `rgba(255, 0, 255, ${alpha})`
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Vertical grid lines (perspective)
  for (let i = -10; i <= 10; i++) {
    ctx.beginPath()
    const x = w / 2 + i * 50
    ctx.moveTo(w / 2 + i * 5, horizon)
    ctx.lineTo(x, h)
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  // Neon signs
  const signs = [
    { x: w * 0.2, y: h * 0.3, text: '◆', color: '#ff00ff' },
    { x: w * 0.8, y: h * 0.25, text: '★', color: '#00ffff' },
    { x: w * 0.5, y: h * 0.15, text: '◇', color: '#ffff00' },
  ]

  signs.forEach(({ x, y, text, color }) => {
    const glow = Math.sin(t * 3) * 0.3 + 0.7
    ctx.font = '40px Arial'
    ctx.fillStyle = color
    ctx.globalAlpha = glow
    ctx.fillText(text, x, y)
    ctx.globalAlpha = 1
    
    // Glow effect
    const signGrad = ctx.createRadialGradient(x + 15, y - 10, 0, x + 15, y - 10, 40)
    signGrad.addColorStop(0, `${color}33`)
    signGrad.addColorStop(1, 'transparent')
    ctx.fillStyle = signGrad
    ctx.fillRect(x - 25, y - 50, 80, 80)
  })

  // Moving light streaks
  for (let i = 0; i < 5; i++) {
    const sx = ((t * 100 + i * 200) % (w + 200)) - 100
    const sy = horizon + 20 + i * 30
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.lineTo(sx + 60, sy)
    ctx.strokeStyle = `rgba(255, ${i * 50}, 255, 0.5)`
    ctx.lineWidth = 2
    ctx.stroke()
  }
}

function renderSkyline(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  // Twilight sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h)
  skyGrad.addColorStop(0, '#1a0530')
  skyGrad.addColorStop(0.4, '#3a1060')
  skyGrad.addColorStop(0.7, '#cc4400')
  skyGrad.addColorStop(1, '#ff8800')
  ctx.fillStyle = skyGrad
  ctx.fillRect(0, 0, w, h)

  // Skyline silhouette
  ctx.beginPath()
  ctx.moveTo(0, h)
  
  const buildings = [
    { x: 0, h: 0.4 }, { x: 0.05, h: 0.5 }, { x: 0.1, h: 0.45 },
    { x: 0.15, h: 0.6 }, { x: 0.2, h: 0.55 }, { x: 0.25, h: 0.7 },
    { x: 0.3, h: 0.65 }, { x: 0.35, h: 0.8 }, { x: 0.4, h: 0.75 },
    { x: 0.45, h: 0.85 }, { x: 0.5, h: 0.9 }, { x: 0.55, h: 0.85 },
    { x: 0.6, h: 0.7 }, { x: 0.65, h: 0.75 }, { x: 0.7, h: 0.6 },
    { x: 0.75, h: 0.65 }, { x: 0.8, h: 0.5 }, { x: 0.85, h: 0.55 },
    { x: 0.9, h: 0.45 }, { x: 0.95, h: 0.4 }, { x: 1, h: 0.35 },
  ]

  buildings.forEach(({ x, h: bh }) => {
    ctx.lineTo(x * w, h * (1 - bh * 0.5))
  })
  
  ctx.lineTo(w, h)
  ctx.closePath()
  ctx.fillStyle = '#0a0510'
  ctx.fill()

  // Building lights
  buildings.forEach(({ x, h: bh }) => {
    for (let i = 0; i < 5; i++) {
      const lx = x * w + Math.sin(i * 3 + x * 10) * 5
      const ly = h * (1 - bh * 0.5) + i * 15 + 10
      if (Math.sin(t + x * 10 + i) > 0) {
        ctx.fillStyle = `rgba(255, 230, 150, ${0.5 + Math.sin(t * 2 + i) * 0.2})`
        ctx.fillRect(lx, ly, 3, 4)
      }
    }
  })
}

function renderTraffic(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  ctx.fillStyle = '#0a0a15'
  ctx.fillRect(0, 0, w, h)

  // Road
  ctx.fillStyle = '#1a1a25'
  ctx.fillRect(0, h * 0.6, w, h * 0.4)

  // Road lines
  for (let i = 0; i < 20; i++) {
    const lx = ((i * 80 - t * 100) % (w + 80)) - 40
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.fillRect(lx, h * 0.78, 40, 3)
  }

  // Car lights (red tail lights going right)
  for (let i = 0; i < 8; i++) {
    const cx = ((t * 60 + i * 150) % (w + 100)) - 50
    const cy = h * 0.7
    
    // Car body
    ctx.fillStyle = 'rgba(30, 30, 40, 0.8)'
    ctx.fillRect(cx - 15, cy - 5, 30, 10)
    
    // Tail lights
    ctx.beginPath()
    ctx.arc(cx - 15, cy, 3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)'
    ctx.fill()
    
    // Light trail
    const trailGrad = ctx.createLinearGradient(cx - 60, cy, cx - 15, cy)
    trailGrad.addColorStop(0, 'transparent')
    trailGrad.addColorStop(1, 'rgba(255, 0, 0, 0.3)')
    ctx.fillStyle = trailGrad
    ctx.fillRect(cx - 60, cy - 2, 45, 4)
  }

  // Headlights (going left)
  for (let i = 0; i < 6; i++) {
    const cx = w - ((t * 80 + i * 180) % (w + 100)) + 50
    const cy = h * 0.85
    
    ctx.fillStyle = 'rgba(30, 30, 40, 0.8)'
    ctx.fillRect(cx - 15, cy - 5, 30, 10)
    
    ctx.beginPath()
    ctx.arc(cx + 15, cy, 3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 200, 0.9)'
    ctx.fill()
    
    // Headlight beam
    const beamGrad = ctx.createRadialGradient(cx + 15, cy, 0, cx + 15, cy, 60)
    beamGrad.addColorStop(0, 'rgba(255, 255, 200, 0.2)')
    beamGrad.addColorStop(1, 'transparent')
    ctx.fillStyle = beamGrad
    ctx.fillRect(cx - 45, cy - 30, 120, 60)
  }
}

function renderDefault(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, _p: number) {
  // Default abstract scene
  const grad = ctx.createLinearGradient(0, 0, w, h)
  grad.addColorStop(0, `hsl(${t * 20 % 360}, 50%, 10%)`)
  grad.addColorStop(1, `hsl(${(t * 20 + 180) % 360}, 50%, 5%)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Abstract shapes
  for (let i = 0; i < 10; i++) {
    const x = w * 0.5 + Math.cos(t * 0.5 + i * 0.6) * 150
    const y = h * 0.5 + Math.sin(t * 0.7 + i * 0.8) * 100
    const size = 30 + Math.sin(t + i) * 15
    
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    const hue = (i * 36 + t * 30) % 360
    ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.2)`
    ctx.fill()
  }
}
