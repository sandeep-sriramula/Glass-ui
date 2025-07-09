# 🌟 Glass UI Components

A beautiful collection of glass morphism UI components built with React, TypeScript, Tailwind CSS, and Framer Motion. Perfect for testing and exploring modern glass effects and interactions.

## 🌐 Live Demo
**[🚀 View Live Demo](https://glass-ui-realistic.netlify.app/)**

![Glass UI Demo](https://img.shields.io/badge/Demo-Live-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4) ![Framer Motion](https://img.shields.io/badge/Framer-Motion-FF0080)

## ✨ Features

- 🎨 **Beautiful Glass Morphism Effects** - Stunning backdrop blur and transparency
- 🚀 **Smooth Animations** - Powered by Framer Motion for buttery smooth interactions
- 📱 **Responsive Design** - Works perfectly on all screen sizes
- 🎯 **TypeScript Ready** - Full type safety for robust development
- 🔧 **Customizable** - Easy to customize and extend components
- ⚡ **Performance Optimized** - 60fps animations and efficient rendering

## 🎮 Available Components

### Basic Components
- **GlassCard** - Beautiful glass cards with hover effects
- **GlassButton** - Interactive buttons with multiple variants
- **GlassInput** - Elegant input fields with focus animations
- **GlassModal** - Stunning modal dialogs
- **GlassNav** - Smooth navigation with active states

### Interactive Controls
- **GlassSlider** - Smooth range sliders with visual feedback
- **GlassToggle** - Animated toggle switches
- **GlassProgress** - Progress bars with smooth animations
- **GlassSelect** - Dropdown selects with smooth transitions
- **GlassTabs** - Tabbed interface with fluid animations

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` to see the glass UI in action!

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library

## 🎨 Design Philosophy

Our glass UI components follow these principles:

- **Subtle Transparency** - Using `white/10`, `white/20` for elegant glass effects
- **Backdrop Blur** - Leveraging CSS `backdrop-filter` for authentic glass morphism
- **Smooth Animations** - All interactions have buttery smooth transitions
- **Consistent Spacing** - Unified padding, margins, and sizing throughout
- **Accessibility First** - Proper focus states and keyboard navigation

## 🔧 Customization

All components accept a `className` prop for easy customization:

```tsx
<GlassButton className="your-custom-classes">
  Custom Button
</GlassButton>
```

## 🎯 Usage Examples

```tsx
import { GlassCard, GlassButton, GlassSlider } from './components/GlassComponents'

function MyComponent() {
  const [value, setValue] = useState(50)
  
  return (
    <GlassCard>
      <h3>Glass UI Example</h3>
      <GlassSlider 
        value={value} 
        onChange={setValue} 
        label="Opacity" 
      />
      <GlassButton onClick={() => console.log('Clicked!')}>
        Interact
      </GlassButton>
    </GlassCard>
  )
}
```

## 📦 Build

To build for production:

```bash
npm run build
```

---

**Happy coding with glass! ✨**

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
