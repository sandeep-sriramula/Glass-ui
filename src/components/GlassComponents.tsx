import { motion } from 'framer-motion'
import { cn } from '../lib/utils'
import { useState, useEffect } from 'react'

// Custom hook for mobile detection with iPhone-specific handling
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isIPhone, setIsIPhone] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const iPhone = /iPhone/i.test(navigator.userAgent)
      setIsMobile(mobile)
      setIsIPhone(iPhone)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return { isMobile, isIPhone }
}

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={cn(
        'glass-card relative overflow-hidden',
        'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

interface GlassButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  disabled?: boolean
}

export const GlassButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className, 
  disabled = false 
}: GlassButtonProps) => {
  const { isMobile, isIPhone } = useMobile()
  
  const variants = {
    primary: 'glass-button text-white hover:shadow-lg hover:shadow-white/20',
    secondary: 'text-white/90 hover:text-white relative overflow-hidden rounded-3xl px-8 py-4 transition-all duration-100',
    outline: isIPhone 
      ? 'backdrop-blur-none border rounded-lg px-6 py-3 text-white transition-all duration-200'
      : isMobile 
      ? 'backdrop-blur-sm border rounded-lg px-6 py-3 text-white transition-all duration-200'
      : 'glass border-2 border-white/40 hover:border-white/60 rounded-lg px-6 py-3 text-white'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        variants[variant],
        'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'secondary' && 'shadow-xl hover:shadow-2xl',
        className
      )}
      style={{
        boxShadow: variant === 'secondary' 
          ? '0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)'
          : undefined,
        ...(variant === 'outline' && isIPhone ? {
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
          borderColor: 'rgba(255, 255, 255, 0.08)',
        } : {}),
        ...(variant === 'outline' && isMobile && !isIPhone ? {
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderColor: 'rgba(255, 255, 255, 0.10)',
        } : {}),
      }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {/* Ultra-fast convex glass - minimal effects for performance */}
      {variant === 'secondary' && (
        <>
          {/* Simple glass base */}
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10"
            style={{ willChange: 'transform' }}
          />

          {/* Single animated highlight */}
          <motion.div
            className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
            initial={{ opacity: 0.3 }}
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.1 }}
            style={{
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 30%)',
              willChange: 'opacity',
            }}
          />

          {/* Bottom edge reflection */}
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
            style={{
              background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, transparent 15%)',
              opacity: 0.5,
            }}
          />
        </>
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

interface GlassInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: string
  className?: string
}

export const GlassInput = ({ 
  placeholder, 
  value, 
  onChange, 
  type = 'text', 
  className 
}: GlassInputProps) => {
  return (
    <motion.input
      whileFocus={{ scale: 1.02 }}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(
        'glass-input w-full text-white placeholder-white/60',
        className
      )}
    />
  )
}

interface GlassModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export const GlassModal = ({ isOpen, onClose, title, children }: GlassModalProps) => {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </motion.div>
    </motion.div>
  )
}

interface GlassNavProps {
  items: { label: string; href: string; active?: boolean }[]
  className?: string
}

export const GlassNav = ({ items, className }: GlassNavProps) => {
  return (
    <nav className={cn('glass-nav', className)}>
      <ul className="flex space-x-8">
        {items.map((item, index) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <a
              href={item.href}
              className={cn(
                'text-white/80 hover:text-white transition-colors duration-300 relative',
                item.active && 'text-white'
              )}
            >
              {item.label}
              {item.active && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white rounded-full"
                />
              )}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  )
}

interface GlassRealisticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export const GlassRealisticButton = ({ 
  children, 
  onClick, 
  className, 
  disabled = false 
}: GlassRealisticButtonProps) => {
  const { isMobile, isIPhone } = useMobile()
  
  return (
    <motion.button
      whileHover={isMobile ? {} : { scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative group overflow-hidden rounded-3xl px-8 py-4 cursor-pointer',
        isIPhone ? 'border' : 
        isMobile ? 'backdrop-blur-sm border' : 
        'backdrop-blur-xl border hover:border-white/20',
        isMobile ? 'shadow-md' : 'shadow-xl hover:shadow-2xl',
        'text-gray-800 hover:text-gray-700',
        'transition-all duration-300 ease-out',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      style={{
        backgroundColor: isIPhone 
          ? 'rgba(255, 255, 255, 0.02)'
          : isMobile 
          ? 'rgba(255, 255, 255, 0.03)'
          : 'rgba(255, 255, 255, 0.03)',
        borderColor: isIPhone 
          ? 'rgba(255, 255, 255, 0.10)'
          : isMobile 
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(255, 255, 255, 0.10)',
        boxShadow: isIPhone 
          ? '0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
          : isMobile 
          ? '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
          : `0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
        willChange: 'transform'
      }}
    >
      {/* Simplified glass surface for mobile */}
      {isIPhone ? (
        // Ultra-minimal effects for iPhone
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)',
          }}
        />
      ) : isMobile ? (
        // Reduced effects for other mobile devices
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          }}
        />
      ) : (
        // Full effects for desktop
        <>
          {/* Uniform glass surface */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%)',
            }}
            whileHover={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.05) 100%)',
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Enhanced edge highlight with more reflection */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)',
            }}
            whileHover={{
              background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.12) 45%, transparent 75%)',
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Additional edge reflection */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.08) 100%)',
            }}
            whileHover={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, transparent 30%, transparent 70%, rgba(255, 255, 255, 0.12) 100%)',
            }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
      
      {/* Content */}
      <motion.span 
        className="relative z-10 font-medium tracking-wide"
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}

interface GlassMinimalButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
}

export const GlassMinimalButton = ({ 
  children, 
  onClick, 
  className, 
  disabled = false,
  icon 
}: GlassMinimalButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative group overflow-hidden rounded-3xl px-8 py-4 cursor-pointer',
        'backdrop-blur-xl bg-white/8 hover:bg-white/12',
        'border border-white/20 hover:border-white/30',
        'shadow-xl hover:shadow-2xl',
        'text-gray-700 hover:text-gray-600',
        'transition-all duration-300 ease-out',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center gap-3',
        className
      )}
      style={{
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.12),
          inset 0 1px 0 rgba(255, 255, 255, 0.15)
        `
      }}
    >
      {/* Uniform glass surface */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
        }}
        whileHover={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Simple top edge highlight */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.12) 0%, transparent 65%)',
        }}
        whileHover={{
          background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.18) 0%, transparent 70%)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-3 font-medium">
        {icon && (
          <span className="text-lg opacity-70">
            {icon}
          </span>
        )}
        {children}
      </span>
    </motion.button>
  )
}
