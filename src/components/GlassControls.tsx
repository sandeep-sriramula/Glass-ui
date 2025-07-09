import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../lib/utils'

interface GlassSliderProps {
  min?: number
  max?: number
  value: number
  onChange: (value: number) => void
  className?: string
  label?: string
}

export const GlassSlider = ({ 
  min = 0, 
  max = 100, 
  value, 
  onChange, 
  className, 
  label 
}: GlassSliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="text-white/80 text-sm">{label}</label>}
      <div className="relative">
        <div className="glass h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <motion.div
          className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg -translate-y-1/2"
          style={{ left: `${percentage}%` }}
          animate={{ x: '-50%' }}
          whileHover={{ scale: 1.2 }}
          whileDrag={{ scale: 1.3 }}
        />
      </div>
      <div className="text-white/60 text-xs text-center">{value}</div>
    </div>
  )
}

interface GlassToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
}

export const GlassToggle = ({ checked, onChange, label, className }: GlassToggleProps) => {
  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <motion.button
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-12 h-6 rounded-full glass transition-all duration-300',
          checked ? 'bg-blue-500/30' : 'bg-white/10'
        )}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
          animate={{ x: checked ? 26 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
      {label && <span className="text-white/80">{label}</span>}
    </div>
  )
}

interface GlassProgressProps {
  value: number
  max?: number
  className?: string
  label?: string
  showPercentage?: boolean
}

export const GlassProgress = ({ 
  value, 
  max = 100, 
  className, 
  label, 
  showPercentage = true 
}: GlassProgressProps) => {
  const percentage = (value / max) * 100

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex justify-between items-center">
        {label && <span className="text-white/80 text-sm">{label}</span>}
        {showPercentage && (
          <span className="text-white/60 text-sm">{Math.round(percentage)}%</span>
        )}
      </div>
      <div className="glass h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

interface GlassSelectProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const GlassSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option', 
  className 
}: GlassSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className={cn('relative', className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-input w-full flex justify-between items-center"
        whileHover={{ scale: 1.01 }}
      >
        <span className={cn(
          selectedOption ? 'text-white' : 'text-white/60'
        )}>
          {selectedOption?.label || placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-white/60"
        >
          ▼
        </motion.span>
      </motion.button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 glass rounded-lg overflow-hidden z-10"
        >
          {options.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors"
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              {option.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  )
}

interface GlassTabsProps {
  tabs: { id: string; label: string; content: React.ReactNode }[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export const GlassTabs = ({ tabs, activeTab, onChange, className }: GlassTabsProps) => {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="glass rounded-lg p-2 flex space-x-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-4 py-2 rounded-md transition-all duration-300 relative',
              activeTab === tab.id 
                ? 'text-white bg-white/20' 
                : 'text-white/60 hover:text-white hover:bg-white/10'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/20 rounded-md"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
      
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card"
      >
        {tabs.find(tab => tab.id === activeTab)?.content}
      </motion.div>
    </div>
  )
}
