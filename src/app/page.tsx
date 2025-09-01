'use client';

import { useState, useRef, useEffect } from 'react';
import ColoringCanvas, { CanvasRef } from '@/components/ColoringCanvas';
import ToolSelector from '@/components/ToolSelector';
import ColorPalette from '@/components/ColorPalette';
import ActionButtons from '@/components/ActionButtons';
import TemplateSelector from '@/components/TemplateSelector';


// Component to handle desktop shortcut instructions without hydration issues
function DesktopInstructions() {
  const [instructions, setInstructions] = useState('Loading instructions for your device...');

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();
    let instructionText = '';
    
    // Detect OS and Browser
    const isWindows = platform.includes('win');
    const isMac = platform.includes('mac');
    const isLinux = platform.includes('linux');
    const isAndroid = userAgent.includes('android');
    const isIOS = /ipad|iphone|ipod/.test(userAgent);
    
    const isChrome = userAgent.includes('chrome') && !userAgent.includes('edg');
    const isFirefox = userAgent.includes('firefox');
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
    const isEdge = userAgent.includes('edg');
    
    if (isIOS && isSafari) {
      instructionText = `
        <strong>📱 iOS Safari:</strong><br>
        1. Tap the Share button (square with arrow) at the bottom<br>
        2. Scroll down and tap "Add to Home Screen"<br>
        3. Tap "Add" to confirm<br>
        4. The app icon will appear on your home screen!
      `;
    } else if (isAndroid && isChrome) {
      instructionText = `
        <strong>📱 Android Chrome:</strong><br>
        1. Tap the three dots menu (⋮) in the top right<br>
        2. Tap "Add to Home screen"<br>
        3. Edit the name if desired, then tap "Add"<br>
        4. Tap "Add" again to confirm<br>
        5. The app icon will appear on your home screen!
      `;
    } else if (isWindows && isChrome) {
      instructionText = `
        <strong>💻 Windows Chrome:</strong><br>
        1. Click the three dots menu (⋮) in the top right<br>
        2. Go to "More tools" → "Create shortcut"<br>
        3. Check "Open as window" for app-like experience<br>
        4. Click "Create" - shortcut appears on desktop!<br><br>
        <strong>Alternative:</strong> Drag the URL from address bar to desktop
      `;
    } else if (isWindows && isEdge) {
      instructionText = `
        <strong>💻 Windows Edge:</strong><br>
        1. Click the three dots menu (...) in the top right<br>
        2. Select "Apps" → "Install this site as an app"<br>
        3. Click "Install" to add to Start Menu and desktop<br><br>
        <strong>Alternative:</strong> Right-click on desktop → New → Shortcut → paste URL
      `;
    } else if (isWindows && isFirefox) {
      instructionText = `
        <strong>💻 Windows Firefox:</strong><br>
        1. Drag the URL from the address bar to your desktop<br>
        2. Or right-click on desktop → New → Shortcut<br>
        3. Paste the website URL and click Next<br>
        4. Name it "Coloring Book App" and click Finish
      `;
    } else if (isMac && isChrome) {
      instructionText = `
        <strong>🖥️ Mac Chrome:</strong><br>
        1. Click the three dots menu (⋮) in the top right<br>
        2. Go to "More tools" → "Create shortcut"<br>
        3. Check "Open as window" for app-like experience<br>
        4. Click "Create" - shortcut appears on desktop!<br><br>
        <strong>Alternative:</strong> Drag URL from address bar to desktop
      `;
    } else if (isMac && isSafari) {
      instructionText = `
        <strong>🖥️ Mac Safari:</strong><br>
        1. Drag the URL from the address bar to your desktop<br>
        2. Or go to File → Add to Dock (for dock shortcut)<br>
        3. The shortcut will open in Safari when clicked
      `;
    } else if (isLinux && isChrome) {
      instructionText = `
        <strong>🐧 Linux Chrome:</strong><br>
        1. Click the three dots menu (⋮) in the top right<br>
        2. Go to "More tools" → "Create shortcut"<br>
        3. Check "Open as window" for app-like experience<br>
        4. Click "Create" - shortcut appears on desktop!
      `;
    } else if (isLinux && isFirefox) {
      instructionText = `
        <strong>🐧 Linux Firefox:</strong><br>
        1. Drag the URL from address bar to desktop<br>
        2. Or create a .desktop file manually<br>
        3. Right-click desktop → Create Document → Empty Document<br>
        4. Name it "coloring-app.desktop" and add shortcut content
      `;
    } else {
      instructionText = `
        <strong>🌐 General Instructions:</strong><br>
        1. <strong>Chrome/Edge:</strong> Menu → More tools → Create shortcut<br>
        2. <strong>Firefox:</strong> Drag URL from address bar to desktop<br>
        3. <strong>Safari:</strong> Drag URL to desktop or use Share → Add to Home Screen<br>
        4. <strong>Mobile:</strong> Use browser menu → "Add to Home Screen"<br><br>
        <em>Your system: ${navigator.platform} - ${navigator.userAgent.split(' ')[0]}</em>
      `;
    }
    
    setInstructions(instructionText);
  }, []);

  return (
    <div 
      className="text-sm text-gray-800" 
      dangerouslySetInnerHTML={{ __html: instructions }}
    />
  );
}

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('#ff6b6b');
  const [selectedTool, setSelectedTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(10);
  const [showTemplates, setShowTemplates] = useState(true);
  const [showDesktopInstructions, setShowDesktopInstructions] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const canvasRef = useRef<CanvasRef>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 p-4">

      {/* Template Selection Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-purple-600">
              🌟 My First e-Colouring Book 🌟
            </h2>
            <TemplateSelector 
              onTemplateSelect={(template) => {
                setSelectedTemplate(template);
                setShowTemplates(false);
              }}
              onClose={() => setShowTemplates(false)}
            />
            
            {/* Footer inside modal */}
            <div className="text-center mt-6 pt-4 border-t border-purple-200">
              <p className="text-lg text-blue-600 font-medium mb-2">
                Have fun coloring! 🌟 Share your masterpiece with family! 👨‍👩‍👧‍👦
              </p>
              <p className="text-sm text-blue-500 font-medium">
                💡 This website is best viewed on a tablet/PC in landscape mode for the optimal coloring experience
              </p>

            {/* Add to Desktop for Easy Access */}
            <div className="mt-4 pt-4 border-t border-purple-200">
              <button 
                className="w-full p-4 text-left hover:bg-purple-50 transition-colors duration-200 rounded-2xl border border-purple-200"
                onClick={() => setShowDesktopInstructions(!showDesktopInstructions)}
              >
                <h4 className="text-lg font-bold text-center text-purple-600 flex items-center justify-center">
                  📱 Add to Desktop for Easy Access! 📱
                  <span className={`ml-2 transform transition-transform duration-200 ${showDesktopInstructions ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </h4>
              </button>
              {showDesktopInstructions && (
                <div className="px-4 pb-4 mt-2">
                  <div className="text-center">
                    <p className="text-sm text-gray-700 mb-3">
                      Save this coloring app to your desktop for quick access anytime!
                    </p>
                    <div className="bg-blue-50 rounded-xl p-3 text-left">
                      <DesktopInstructions />
                    </div>
                  </div>
                </div>
              )}
            </div>
            </div>
        </div>
      </div>
      )}

      {/* Main App Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Tools and Colors */}
          <div className="lg:col-span-1 space-y-4">
            {/* Tool Selector */}
            <div className="bg-white rounded-3xl p-4 shadow-lg border-4 border-purple-200">
              <ToolSelector
                selectedTool={selectedTool}
                onToolChange={setSelectedTool}
                brushSize={brushSize}
                onBrushSizeChange={setBrushSize}
              />
            </div>

            {/* Color Palette */}
            <div className="bg-white rounded-3xl p-4 shadow-lg border-4 border-pink-200">
              <ColorPalette
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />
            </div>

          </div>

          {/* Main Canvas Area */}
          <div className="lg:col-span-3">
            <div className="flex justify-center items-center mb-4">
              <ActionButtons
                onBack={() => setShowTemplates(true)}
                onUndo={() => canvasRef.current?.undo()}
                onRedo={() => canvasRef.current?.redo()}
                onSave={() => canvasRef.current?.save()}
                onClear={() => canvasRef.current?.clear()}
              />
            </div>
            <div className="bg-white rounded-3xl p-4 shadow-lg border-4 border-blue-200">
              <ColoringCanvas
                ref={canvasRef}
                selectedColor={selectedColor}
                selectedTool={selectedTool}
                brushSize={brushSize}
                selectedTemplate={selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-lg text-blue-600 font-medium mb-2 drop-shadow-lg">
          Have fun coloring! 🌟 Share your masterpiece with family! 👨‍👩‍👧‍👦
        </p>
        <p className="text-sm text-blue-500 font-medium drop-shadow-lg">
          💡 This website is best viewed on a tablet/PC in landscape mode for the optimal coloring experience
        </p>
      </div>

    </div>
  );
}
