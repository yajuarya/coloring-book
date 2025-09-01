'use client'

import React from 'react'

interface ToolSelectorProps {
  selectedTool: string
  onToolChange: (tool: string) => void
  brushSize: number
  onBrushSizeChange: (size: number) => void
}

const ToolSelector: React.FC<ToolSelectorProps> = ({ selectedTool, onToolChange, brushSize, onBrushSizeChange }) => {
  const tools = [
    { 
      id: 'brush', 
      name: '🖌️ Brush', 
      icon: '🖌️',
      description: 'Paint brush'
    },
    { 
      id: 'crayon', 
      name: '🖍️ Crayon', 
      icon: '🖍️',
      description: 'Waxy crayon'
    },
    { 
      id: 'marker', 
      name: '🖊️ Marker', 
      icon: '🖊️',
      description: 'Thick marker'
    }
  ]

  return (
    <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-3xl p-3 shadow-2xl border-4 border-yellow-300">
      <div className="flex flex-wrap gap-2 justify-center">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            className={`
              flex flex-col items-center p-3 rounded-2xl border-4 transition-all duration-200 transform hover:scale-110
              ${selectedTool === tool.id 
                ? 'bg-white border-purple-500 shadow-xl scale-105' 
                : 'bg-white/80 border-gray-300 hover:border-purple-300'
              }
            `}
          >
            <div className="text-4xl mb-1">{tool.icon}</div>
            <span className="text-base font-bold text-purple-800">{tool.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ToolSelector
