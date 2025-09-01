'use client'

import React, { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react'

interface Point {
  x: number
  y: number
}


export interface CanvasRef {
  undo: () => void
  redo: () => void
  save: () => void
  clear: () => void
}
interface ColoringCanvasProps {
  selectedColor: string
  selectedTool: string
  brushSize: number
  selectedTemplate: string | null
}

const ColoringCanvas = forwardRef<CanvasRef, ColoringCanvasProps>(({
  selectedColor,
  selectedTool,
  brushSize,
  selectedTemplate,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyStep, setHistoryStep] = useState(-1)

  const saveState = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setHistory(prev => {
      const newHistory = prev.slice(0, historyStep + 1)
      newHistory.push(imageData)
      return newHistory
    })
    setHistoryStep(prev => prev + 1)
  }, [historyStep])

  const loadTemplate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !selectedTemplate) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
      
      // Save state after selectedTemplate loads
      setTimeout(() => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        setHistory([imageData])
        setHistoryStep(0)
      }, 0)
    }
    img.src = selectedTemplate
  }, [selectedTemplate])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Initialize with white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    if (selectedTemplate) {
      loadTemplate()
    } else {
      // Initialize history with blank canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setHistory([imageData])
      setHistoryStep(0)
    }
  }, [selectedTemplate, loadTemplate])

  const getToolSize = (tool: string) => {
    switch (tool) {
      case 'brush': return 8
      case 'crayon': return 15
      case 'marker': return 20
      default: return 8
    }
  }

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const getTouchPos = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const touch = e.touches[0] || e.changedTouches[0]

    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const pos = getMousePos(e)
    draw(pos.x, pos.y, true)
  }

  const draw = (x: number, y: number, isStart: boolean = false) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = selectedColor
    ctx.fillStyle = selectedColor
    ctx.lineWidth = getToolSize(selectedTool)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (selectedTool === 'crayon') {
      ctx.globalAlpha = 0.7
    } else if (selectedTool === 'marker') {
      ctx.globalAlpha = 0.8
    } else {
      ctx.globalAlpha = 1
    }

    if (isStart) {
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveState()
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const pos = getMousePos(e)
    draw(pos.x, pos.y)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setIsDrawing(true)
    const pos = getTouchPos(e)
    draw(pos.x, pos.y, true)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return
    const pos = getTouchPos(e)
    draw(pos.x, pos.y)
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (isDrawing) {
      setIsDrawing(false)
      saveState()
    }
  }

  const undo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const newStep = historyStep - 1
      setHistoryStep(newStep)
      const imageData = history[newStep]
      ctx.putImageData(imageData, 0, 0)
    }
  }

  const redo = () => {
    if (historyStep < history.length - 1) {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const newStep = historyStep + 1
      setHistoryStep(newStep)
      const imageData = history[newStep]
      ctx.putImageData(imageData, 0, 0)
    }
  }

  const save = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'my-coloring.png'
    link.href = canvas.toDataURL()
    link.click()
  }


  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Save state after clearing
    setTimeout(() => saveState(), 0)
  }

  useImperativeHandle(ref, () => ({
    undo,
    redo,
    save,
    clear
  }));

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-4 border-4 border-purple-300">
      <canvas
        ref={canvasRef}
        className="border-4 border-dashed border-pink-300 rounded-2xl cursor-crosshair w-full max-w-4xl"
        onMouseDown={startDrawing}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ maxHeight: '500px', touchAction: 'none' }}
      />
    </div>
  )
})
ColoringCanvas.displayName = 'ColoringCanvas'

export default ColoringCanvas
