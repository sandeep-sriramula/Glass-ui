<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Glass UI Components Project

This project focuses on creating beautiful glass morphism UI components using React, TypeScript, Tailwind CSS, and Framer Motion.

## Key Technologies
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling with custom glass effects
- **Framer Motion** for smooth animations and micro-interactions
- **Lucide React** for beautiful icons

## Design Principles
- **Glass Morphism**: Use backdrop-blur effects with subtle transparency
- **Smooth Animations**: All interactions should have smooth transitions
- **Accessibility**: Ensure proper focus states and keyboard navigation
- **Responsive Design**: Components should work on all screen sizes
- **Performance**: Optimize animations for 60fps performance

## Component Guidelines
- All components should accept className props for customization
- Use consistent naming with "Glass" prefix (e.g., GlassButton, GlassCard)
- Include proper TypeScript interfaces for all props
- Implement hover and focus states with Framer Motion
- Use CSS custom properties for dynamic styling when needed

## Styling Conventions
- Use Tailwind utilities with @apply in CSS when creating reusable styles
- Glass effects should use backdrop-blur-md or backdrop-blur-lg
- Transparency should be subtle (white/10, white/20, etc.)
- Borders should be semi-transparent (white/20, white/30)
- Hover effects should be subtle but noticeable

## Animation Guidelines
- Use Framer Motion for all animations
- Initial animations should be subtle (opacity, translateY)
- Hover effects should be quick (0.2-0.3s duration)
- Use spring animations for more organic feel
- Avoid excessive animations that might cause motion sickness

## File Structure
- `/src/components/` - All glass UI components
- `/src/lib/` - Utility functions and helpers
- `/src/styles/` - Custom CSS and Tailwind configurations
- Components should be organized by functionality (GlassComponents.tsx, GlassControls.tsx, etc.)

When suggesting improvements or new features, always consider the glass morphism aesthetic and ensure consistency with the existing design system.
