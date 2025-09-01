'use client'

import React from 'react'

interface ActionButtonsProps {
  onBack: () => void
  onUndo: () => void
  onRedo: () => void
  onSave: () => void
  onClear: () => void
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onBack, onUndo, onRedo, onSave, onClear }) => {
  const buttons = [
    {
      id: 'back',
      label: 'Back',
      icon: '🏠',
      emoji: '⬅️',
      color: 'from-purple-400 to-pink-600',
      hoverColor: 'hover:from-purple-500 hover:to-pink-700',
      action: onBack
    },
    {
      id: 'undo',
      label: 'Undo',
      icon: '↶',
      emoji: '⏪',
      color: 'from-blue-400 to-blue-600',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700',
      action: onUndo
    },
    {
      id: 'redo',
      label: 'Redo',
      icon: '↷',
      emoji: '⏩',
      color: 'from-green-400 to-green-600',
      hoverColor: 'hover:from-green-500 hover:to-green-700',
      action: onRedo
    },
    {
      id: 'save',
      label: 'Save',
      icon: '💾',
      emoji: '📁',
      color: 'from-purple-400 to-purple-600',
      hoverColor: 'hover:from-purple-500 hover:to-purple-700',
      action: onSave
    },
    {
      id: 'clear',
      label: 'Clear',
      icon: '🗑️',
      emoji: '✨',
      color: 'from-red-400 to-red-600',
      hoverColor: 'hover:from-red-500 hover:to-red-700',
      action: onClear
    }
  ]

  return (
    <div className="bg-gradient-to-r from-indigo-200 to-blue-200 rounded-3xl p-3 shadow-2xl border-4 border-indigo-300">
      <div className="flex flex-wrap gap-4 justify-center">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={button.action}
            className={`
              flex flex-col items-center p-3 rounded-2xl border-4 border-white
              bg-gradient-to-br ${button.color} ${button.hoverColor}
              transition-all duration-200 transform hover:scale-110 active:scale-95
              shadow-xl hover:shadow-2xl text-white
            `}
          >
            <div className="text-4xl mb-2">{button.icon}</div>
            <span className="text-lg font-bold">{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ActionButtons
