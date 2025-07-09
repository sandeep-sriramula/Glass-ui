import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

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
  const variants = {
    primary: 'glass-button text-white hover:shadow-lg hover:shadow-white/20',
    secondary: 'backdrop-blur-lg bg-white/5 border border-white/10 text-white/90 hover:text-white relative overflow-hidden rounded-lg px-6 py-3 transition-all duration-300',
    outline: 'glass border-2 border-white/40 hover:border-white/60 rounded-lg px-6 py-3 text-white'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        variants[variant],
        'active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {/* Enhanced glass effects for secondary button */}
      {variant === 'secondary' && (
        <>
          {/* Inner light refraction */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/4 rounded-lg"
            whileHover={{ opacity: 1 }}
            initial={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Light streak effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-lg opacity-0"
            whileHover={{ 
              opacity: 1,
              x: ['-100%', '100%'],
            }}
            transition={{ 
              opacity: { duration: 0.3 },
              x: { duration: 0.8, ease: "easeInOut" }
            }}
          />
          
          {/* Subtle inner glow */}
          <motion.div
            className="absolute inset-0 rounded-lg shadow-inner"
            style={{
              boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.1)'
            }}
            whileHover={{
              boxShadow: 'inset 0 1px 4px rgba(255, 255, 255, 0.2), inset 0 -1px 4px rgba(0, 0, 0, 0.05)'
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Outer glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0"
            whileHover={{ opacity: 1 }}
            style={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.05)'
            }}
            transition={{ duration: 0.3 }}
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
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative group overflow-hidden rounded-3xl px-8 py-4 cursor-pointer',
        'backdrop-blur-xl bg-white/3 hover:bg-white/6',
        'border border-white/10 hover:border-white/20',
        'shadow-xl hover:shadow-2xl',
        'text-gray-800 hover:text-gray-700',
        'transition-all duration-300 ease-out',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      style={{
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `
      }}
    >
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
