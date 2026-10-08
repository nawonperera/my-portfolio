import { useRef, useEffect, useState, useCallback } from 'react'

const MODES = [
  { key: 'spotlight', label: 'Spotlight', icon: '🔦' },
  { key: 'wipe', label: 'Wipe', icon: '✂️' },
  { key: 'fade', label: 'Fade', icon: '🌫️' },
]

const BRUSH_SIZES = [80, 140, 200, 280]

export default function HoverReveal() {
  const stageRef = useRef(null)
  const [mode, setMode] = useState('spotlight')
  const [brushIdx, setBrushIdx] = useState(1)
  const [hovered, setHovered] = useState(false)

  const brushRadius = hovered ? BRUSH_SIZES[brushIdx] : 0

  const updateXY = useCallback((clientX, clientY) => {
    const stage = stageRef.current
    if (!stage) return
    const b = stage.getBoundingClientRect()
    if (mode === 'wipe') {
      const pct = ((clientX - b.left) / b.width) * 100
      stage.style.setProperty('--x', `${pct}%`)
    } else {
      stage.style.setProperty('--x', `${clientX - b.left}px`)
    }
    stage.style.setProperty('--y', `${clientY - b.top}px`)
  }, [mode])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const onMove = (e) => updateXY(e.clientX, e.clientY)
    const onEnter = () => setHovered(true)
    const onLeave = () => {
      setHovered(false)
      if (mode === 'wipe') stage.style.setProperty('--x', '50%')
    }
    const onTouch = (e) => {
      e.preventDefault()
      const t = e.touches[0]
      updateXY(t.clientX, t.clientY)
    }
    const onTouchS = () => setHovered(true)
    const onTouchE = () => setHovered(false)

    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerenter', onEnter)
    stage.addEventListener('pointerleave', onLeave)
    stage.addEventListener('touchmove', onTouch, { passive: false })
    stage.addEventListener('touchstart', onTouchS)
    stage.addEventListener('touchend', onTouchE)
    return () => {
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerenter', onEnter)
      stage.removeEventListener('pointerleave', onLeave)
      stage.removeEventListener('touchmove', onTouch)
      stage.removeEventListener('touchstart', onTouchS)
      stage.removeEventListener('touchend', onTouchE)
    }
  }, [mode, updateXY])

  useEffect(() => {
    const stage = stageRef.current
    if (stage) stage.style.setProperty('--r', `${brushRadius}px`)
  }, [brushRadius])

  const getMask = () => {
    if (mode === 'spotlight') return `radial-gradient(circle var(--r) at var(--x) var(--y), #000 62%, transparent 100%)`
    if (mode === 'wipe') return `linear-gradient(to right, #000 var(--x), transparent var(--x))`
    if (mode === 'fade') return `radial-gradient(ellipse 80% 80% at var(--x) var(--y), #000 30%, transparent 80%)`
    return 'none'
  }
  const mask = getMask()

  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      <svg
        viewBox="0 0 520 480"
        fill="none"
        aria-hidden="true"
        className={[
          'pointer-events-none absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] z-10',
          'transition-opacity duration-300',
          hovered ? 'opacity-100 animate-[spider-arcs-pulse_1.8s_ease-in-out_infinite]' : 'opacity-0',
        ].join(' ')}
      >
        <path d="M480 20 Q440 120 360 200" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M500 60 Q450 160 350 240" stroke="#e63946" strokeWidth="2" strokeLinecap="round" />
        <path d="M510 110 Q470 200 380 270" stroke="#e63946" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M490 160 Q460 230 400 290" stroke="#spidey-gold" strokeWidth="1.5" strokeLinecap="round" style={{ stroke: '#f4a261' }} />
        <path d="M460 200 Q445 255 415 305" strokeWidth="1" strokeLinecap="round" style={{ stroke: '#f4a261' }} />
        <path d="M30 460 Q80 360 160 280" stroke="#e63946" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 420 Q70 330 170 260" stroke="#e63946" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50 440 Q100 360 175 300" strokeWidth="1" strokeLinecap="round" style={{ stroke: '#f4a261' }} />
      </svg>

      <div className={[
        'absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none',
        'flex items-center gap-1.5 px-4 py-1.5 rounded-full',
        'bg-black/75 backdrop-blur-md border border-spidey-red/40',
        'text-xs font-semibold tracking-wide text-spidey-light/85',
        'transition-all duration-300',
        hovered ? 'opacity-0 -translate-y-1.5' : 'opacity-100',
      ].join(' ')}>
        <span className="animate-bounce text-sm">👆</span>
        hover to reveal
      </div>

      <div
        ref={stageRef}
        className="relative w-full overflow-hidden rounded-2xl cursor-crosshair"
        style={{
          aspectRatio: '3/4',
          '--x': '50%',
          '--y': '50%',
          '--r': `${brushRadius}px`,
          boxShadow: '0 0 0 1px rgba(230,57,70,0.25), 0 24px 60px rgba(0,0,0,0.6), 0 0 80px rgba(230,57,70,0.08)',
        }}
      >
        <img
          src="/HoverImg/Masked Me.jpg"
          alt="Nawon Perera"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-top block"
          style={{ zIndex: 1 }}
        />

        <img
          src="/HoverImg/Full Image.jpeg"
          alt="Nawon Perera — professional"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover block"
          style={{
            zIndex: 2,
            maskImage: mask,
            WebkitMaskImage: mask,
            objectPosition: 'center 5px',
            transition: mode === 'spotlight' ? '--r 0.38s cubic-bezier(.2,.8,.3,1)' : 'none',
          }}
        />

        <span
          className={[
            'absolute bottom-4 right-4 z-[5] text-[0.65rem] font-bold tracking-widest uppercase',
            'px-3 py-1 rounded-full bg-spidey-red/85 text-white',
            'transition-all duration-300',
            hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
          ].join(' ')}
        >
          professional
        </span>
      </div>


    </div>
  )
}
