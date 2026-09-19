import { useState, useRef, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Sound context to allow any component to play sounds
const SoundContext = createContext(null)

export const useSound = () => useContext(SoundContext)

// AudioContext-based sound generation (no external files needed)
const createAudioContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  return new AudioContext()
}

const sounds = {
  thwip: (ctx) => {
    // Quick snappy "thwip" sound
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(3000, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1)
    
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(2000, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15)
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  },

  click: (ctx) => {
    // Subtle click/snap
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05)
    
    gain.gain.setValueAtTime(0.06, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
    
    osc.connect(gain)
    gain.connect(ctx.destination)
    
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)
  },

  whoosh: (ctx) => {
    // Whoosh/swipe sound for transitions
    const bufferSize = ctx.sampleRate * 0.3
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1000, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + 0.15)
    filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.3)
    filter.Q.value = 2
    
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
    
    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    
    noise.start(ctx.currentTime)
  },

  snap: (ctx) => {
    // Satisfying snap for filter buttons
    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()
    
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(1200, ctx.currentTime)
    osc1.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08)
    
    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(2400, ctx.currentTime)
    osc2.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.06)
    
    gain.gain.setValueAtTime(0.06, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
    
    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(ctx.destination)
    
    osc1.start(ctx.currentTime)
    osc2.start(ctx.currentTime)
    osc1.stop(ctx.currentTime + 0.08)
    osc2.stop(ctx.currentTime + 0.08)
  },

  konami: (ctx) => {
    // Epic ascending sound for konami code
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.type = 'square'
      osc.frequency.value = freq
      
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1)
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + i * 0.1 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2)
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.start(ctx.currentTime + i * 0.1)
      osc.stop(ctx.currentTime + i * 0.1 + 0.2)
    })
  },
}

export const SoundProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(false)
  const audioCtxRef = useRef(null)

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  const play = useCallback((soundName) => {
    if (!enabled) return
    try {
      const ctx = getAudioContext()
      if (sounds[soundName]) {
        sounds[soundName](ctx)
      }
    } catch (e) {
      // Silently fail — audio is non-critical
    }
  }, [enabled, getAudioContext])

  const toggle = useCallback(() => {
    setEnabled(prev => {
      if (!prev) {
        // Play a test sound when enabling
        try {
          const ctx = getAudioContext()
          sounds.snap(ctx)
        } catch (e) {}
      }
      return !prev
    })
  }, [getAudioContext])

  return (
    <SoundContext.Provider value={{ play, enabled, toggle }}>
      {children}
    </SoundContext.Provider>
  )
}

// Sound toggle button component
const SoundToggle = () => {
  const { enabled, toggle } = useSound()

  return (
    <motion.button
      onClick={toggle}
      className={`fixed bottom-8 left-8 w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg z-50 transition-all duration-300 border-2 ${
        enabled 
          ? 'bg-spidey-red/20 border-spidey-red text-white' 
          : 'bg-white/5 border-white/20 text-gray-500'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={enabled ? 'Mute sounds' : 'Enable sounds'}
      animate={{
        boxShadow: enabled 
          ? '0 0 20px rgba(230, 57, 70, 0.4)' 
          : '0 0 10px rgba(255, 255, 255, 0.1)',
      }}
    >
      {enabled ? '🔊' : '🔇'}
    </motion.button>
  )
}

export default SoundToggle
