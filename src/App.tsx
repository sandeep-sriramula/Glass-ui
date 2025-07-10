import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  GlassCard, 
  GlassButton, 
  GlassInput, 
  GlassModal, 
  GlassNav,
  GlassRealisticButton 
} from './components/GlassComponents'
import { 
  GlassSlider, 
  GlassToggle, 
  GlassProgress, 
  GlassSelect, 
  GlassTabs 
} from './components/GlassControls'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [toggleValue, setToggleValue] = useState(false)
  const [progressValue, setProgressValue] = useState(75)
  const [selectValue, setSelectValue] = useState('')
  const [activeTab, setActiveTab] = useState('components')

  const navItems = [
    { label: 'Home', href: '#', active: true },
    { label: 'Components', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Examples', href: '#' }
  ]

  const selectOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ]

  const tabs = [
    {
      id: 'components',
      label: 'Components',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Basic Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassButton onClick={() => setModalOpen(true)}>
              Open Modal
            </GlassButton>
            <GlassButton variant="secondary">
              Enhanced Glass Effect
            </GlassButton>
            <GlassButton variant="outline">
              Outline Button
            </GlassButton>
            <GlassRealisticButton>
              Realistic Glass
            </GlassRealisticButton>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-medium text-white mb-3">Button Comparison</h4>
            <div className="flex flex-wrap gap-4">
              <GlassButton variant="primary">Primary</GlassButton>
              <GlassButton variant="secondary">Secondary (Enhanced)</GlassButton>
              <GlassButton variant="outline">Outline</GlassButton>
              <GlassRealisticButton>Realistic Glass</GlassRealisticButton>
            </div>
          </div>
          
          {/* Glass Refraction Showcase */}
          <div className="mt-8">
            <h4 className="text-lg font-medium text-white mb-4">Glass Refraction Effect</h4>
            <div className="relative bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl p-8 overflow-hidden">
              {/* Colorful background elements */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-pink-400/10 rounded-full blur-xl"></div>
              
              {/* Main showcase content */}
              <div className="relative z-10 text-center">
                <p className="text-white/70 mb-6 text-lg">
                  Hover over the button below to see realistic glass refraction effects
                </p>
                <p className="text-white/50 mb-8 text-sm max-w-md mx-auto">
                  Experience authentic glass morphism with smooth animations and light interactions
                </p>
                
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Background text behind the button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-white/40 text-lg font-medium tracking-wide">
                        Experience Glass Refraction
                      </span>
                    </div>
                    
                    {/* The glass button with no visible text */}
                    <GlassRealisticButton>
                      <span className="opacity-0">Experience Glass Refraction</span>
                    </GlassRealisticButton>
                  </div>
                </div>
                
                <p className="text-white/40 mt-6 text-xs">
                  Watch the prismatic light effects and smooth glass transitions
                </p>
              </div>
            </div>
          </div>
          <GlassInput 
            placeholder="Enter some text..." 
            className="w-full"
          />
        </div>
      )
    },
    {
      id: 'controls',
      label: 'Controls',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Interactive Controls</h3>
          <GlassSlider
            value={sliderValue}
            onChange={setSliderValue}
            label="Slider Control"
          />
          <GlassToggle
            checked={toggleValue}
            onChange={setToggleValue}
            label="Toggle Switch"
          />
          <GlassProgress
            value={progressValue}
            label="Progress Bar"
          />
          <div className="flex space-x-2">
            <GlassButton 
              onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
              variant="outline"
            >
              -10
            </GlassButton>
            <GlassButton 
              onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
              variant="outline"
            >
              +10
            </GlassButton>
          </div>
          <GlassSelect
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            placeholder="Choose a framework"
          />
        </div>
      )
    },
    {
      id: 'showcase',
      label: 'Showcase',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Glass UI Showcase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <GlassCard key={i} className="p-4">
                <h4 className="text-white font-medium mb-2">Card {i}</h4>
                <p className="text-white/70 text-sm">
                  Beautiful glass morphism effect with hover animations.
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen p-8">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center mb-8"
      >
        <GlassNav items={navItems} />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-white mb-4">
          Glass UI
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {' '}Components
          </span>
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Beautiful glass morphism UI components built with React, Framer Motion, and Tailwind CSS.
          Test and explore various glass effects and interactions.
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-6xl mx-auto"
      >
        <GlassTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
      >
        <GlassCard className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
            className="text-3xl font-bold text-white mb-2"
          >
            15+
          </motion.div>
          <p className="text-white/70">Glass Components</p>
        </GlassCard>
        
        <GlassCard className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: 'spring' }}
            className="text-3xl font-bold text-white mb-2"
          >
            100%
          </motion.div>
          <p className="text-white/70">TypeScript</p>
        </GlassCard>
        
        <GlassCard className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.0, type: 'spring' }}
            className="text-3xl font-bold text-white mb-2"
          >
            ∞
          </motion.div>
          <p className="text-white/70">Possibilities</p>
        </GlassCard>
      </motion.div>

      {/* Modal */}
      <GlassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Glass Modal"
      >
        <div className="space-y-4">
          <p className="text-white/80">
            This is a beautiful glass modal with backdrop blur effects.
            You can put any content here!
          </p>
          <div className="flex space-x-3">
            <GlassButton onClick={() => setModalOpen(false)}>
              Close
            </GlassButton>
            <GlassButton variant="outline">
              Learn More
            </GlassButton>
          </div>
        </div>
      </GlassModal>
    </div>
  )
}

export default App
