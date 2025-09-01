'use client'

import React from 'react'

interface TemplateSelectorProps {
  onTemplateSelect: (template: string | null) => void
  onClose?: () => void
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onTemplateSelect, onClose }) => {
  const templates = [
    {
      id: 'blank',
      name: 'Blank Canvas',
      emoji: '🎨',
      description: 'Start fresh!',
      template: null
    },
    {
      id: 'cat',
      name: 'Cute Cat',
      emoji: '🐱',
      description: 'Meow!',
      template: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="black" stroke-width="3">
            <!-- Cat head -->
            <circle cx="200" cy="200" r="80"/>
            <!-- Cat ears -->
            <polygon points="140,140 120,100 160,120"/>
            <polygon points="260,140 280,100 240,120"/>
            <!-- Cat eyes -->
            <circle cx="170" cy="180" r="15"/>
            <circle cx="230" cy="180" r="15"/>
            <!-- Cat nose -->
            <polygon points="200,200 190,210 210,210"/>
            <!-- Cat mouth -->
            <path d="M 200,210 Q 180,230 160,220"/>
            <path d="M 200,210 Q 220,230 240,220"/>
            <!-- Cat whiskers -->
            <line x1="120" y1="190" x2="160" y2="185"/>
            <line x1="120" y1="210" x2="160" y2="210"/>
            <line x1="240" y1="185" x2="280" y2="190"/>
            <line x1="240" y1="210" x2="280" y2="210"/>
          </g>
        </svg>
      `)
    },
    {
      id: 'flower',
      name: 'Pretty Flower',
      emoji: '🌸',
      description: 'Bloom!',
      template: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="black" stroke-width="3">
            <!-- Flower center -->
            <circle cx="200" cy="200" r="30"/>
            <!-- Flower petals -->
            <ellipse cx="200" cy="140" rx="25" ry="40"/>
            <ellipse cx="260" cy="200" rx="40" ry="25"/>
            <ellipse cx="200" cy="260" rx="25" ry="40"/>
            <ellipse cx="140" cy="200" rx="40" ry="25"/>
            <ellipse cx="235" cy="165" rx="30" ry="35" transform="rotate(45 235 165)"/>
            <ellipse cx="235" cy="235" rx="30" ry="35" transform="rotate(-45 235 235)"/>
            <ellipse cx="165" cy="235" rx="30" ry="35" transform="rotate(45 165 235)"/>
            <ellipse cx="165" cy="165" rx="30" ry="35" transform="rotate(-45 165 165)"/>
            <!-- Stem -->
            <line x1="200" y1="260" x2="200" y2="350"/>
            <!-- Leaves -->
            <ellipse cx="180" cy="300" rx="15" ry="25" transform="rotate(-30 180 300)"/>
            <ellipse cx="220" cy="320" rx="15" ry="25" transform="rotate(30 220 320)"/>
          </g>
        </svg>
      `)
    },
    {
      id: 'house',
      name: 'Happy House',
      emoji: '🏠',
      description: 'Home sweet home!',
      template: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="black" stroke-width="3">
            <!-- House base -->
            <rect x="120" y="200" width="160" height="120"/>
            <!-- Roof -->
            <polygon points="100,200 200,120 300,200"/>
            <!-- Door -->
            <rect x="170" y="250" width="40" height="70"/>
            <circle cx="200" cy="285" r="3"/>
            <!-- Windows -->
            <rect x="140" y="220" width="30" height="30"/>
            <rect x="230" y="220" width="30" height="30"/>
            <line x1="155" y1="220" x2="155" y2="250"/>
            <line x1="140" y1="235" x2="170" y2="235"/>
            <line x1="245" y1="220" x2="245" y2="250"/>
            <line x1="230" y1="235" x2="260" y2="235"/>
            <!-- Chimney -->
            <rect x="240" y="140" width="20" height="40"/>
            <!-- Sun -->
            <circle cx="320" cy="80" r="25"/>
            <line x1="320" y1="40" x2="320" y2="50"/>
            <line x1="320" y1="110" x2="320" y2="120"/>
            <line x1="280" y1="80" x2="290" y2="80"/>
            <line x1="350" y1="80" x2="360" y2="80"/>
          </g>
        </svg>
      `)
    },
    {
      id: 'butterfly',
      name: 'Beautiful Butterfly',
      emoji: '🦋',
      description: 'Flutter by!',
      template: 'data:image/svg+xml;base64,' + btoa(`
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="black" stroke-width="3">
            <!-- Butterfly body -->
            <ellipse cx="200" cy="200" rx="8" ry="60"/>
            <!-- Top wings -->
            <ellipse cx="160" cy="160" rx="40" ry="50"/>
            <ellipse cx="240" cy="160" rx="40" ry="50"/>
            <!-- Bottom wings -->
            <ellipse cx="170" cy="230" rx="30" ry="40"/>
            <ellipse cx="230" cy="230" rx="30" ry="40"/>
            <!-- Wing patterns -->
            <circle cx="160" cy="150" r="8"/>
            <circle cx="240" cy="150" r="8"/>
            <circle cx="170" cy="220" r="6"/>
            <circle cx="230" cy="220" r="6"/>
            <!-- Antennae -->
            <path d="M 195,140 Q 185,120 180,110"/>
            <path d="M 205,140 Q 215,120 220,110"/>
            <circle cx="180" cy="110" r="3"/>
            <circle cx="220" cy="110" r="3"/>
          </g>
        </svg>
      `)
    }
  ]

  return (
    <div className="bg-gradient-to-r from-green-200 to-teal-200 rounded-3xl p-6 shadow-2xl border-4 border-green-300">
      <h3 className="text-2xl font-bold text-purple-800 mb-4 text-center">
        📚 Choose a Template!
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template.template)}
            className="flex flex-col items-center p-4 bg-white rounded-2xl border-4 border-gray-300 hover:border-purple-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="text-5xl mb-2">{template.emoji}</div>
            <span className="text-lg font-bold text-purple-800">{template.name}</span>
            <span className="text-sm text-purple-600">{template.description}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector
