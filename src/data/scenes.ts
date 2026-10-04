export interface Scene {
  id: string
  type: string
  title: string
  subtitle: string
}

export const scenes: Scene[] = [
  { id: 'intro', type: 'intro', title: 'Welcome', subtitle: 'A Cinematic Experience' },
  { id: 'gradient', type: 'gradient', title: 'Colors in Motion', subtitle: 'Fluid dynamics of light' },
  { id: 'particles', type: 'particles', title: 'Particle Storm', subtitle: 'Chaos creates beauty' },
  { id: 'finale', type: 'finale', title: 'The End', subtitle: 'Thanks for watching' },
]
