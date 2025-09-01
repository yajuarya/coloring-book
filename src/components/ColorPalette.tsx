'use client'

import React from 'react'

interface ColorPaletteProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onColorChange }) => {
  const colors = [
    { name: 'Red', value: '#FF4444', emoji: '❤️' },
    { name: 'Blue', value: '#4444FF', emoji: '💙' },
    { name: 'Green', value: '#44FF44', emoji: '💚' },
    { name: 'Yellow', value: '#FFFF44', emoji: '💛' },
    { name: 'Purple', value: '#AA44FF', emoji: '💜' },
    { name: 'Orange', value: '#FF8844', emoji: '🧡' },
    { name: 'Pink', value: '#FF44AA', emoji: '💗' },
    { name: 'Brown', value: '#8B4513', emoji: '🤎' },
    { name: 'Black', value: '#000000', emoji: '🖤' },
    { name: 'Gray', value: '#888888', emoji: '🩶' }
  ]

  return (
    <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-3xl p-6 shadow-2xl border-4 border-pink-300">
      <div className="grid grid-cols-5 gap-4">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`
              flex flex-col items-center p-4 rounded-2xl border-4 transition-all duration-200 transform hover:scale-110
              ${selectedColor === color.value 
                ? 'border-white shadow-2xl scale-105 ring-4 ring-yellow-400' 
                : 'border-gray-300 hover:border-white'
              }
            `}
            style={{ backgroundColor: color.value }}
          >
            <div className="text-3xl mb-1 drop-shadow-lg">{color.emoji}</div>
            <span className="text-sm font-bold text-white drop-shadow-lg bg-black/30 px-2 py-1 rounded-full">
              {color.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorPalette
