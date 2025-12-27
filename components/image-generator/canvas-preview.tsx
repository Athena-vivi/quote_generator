import { Palette } from "lucide-react"
import { useRef } from "react"
import { ActionButtonGroup } from "./ActionButtonGroup"

interface CanvasPreviewProps {
  generatedImageUrl: string | null
  isGenerating: boolean
  isComposing: boolean
  isSharing: boolean
  fontsLoaded: boolean
  copied: boolean
  hasInput: boolean
  previewCanvasRef?: React.RefObject<HTMLCanvasElement>
  downloadImage: () => void
  copyToClipboard: () => void
  shareImage: () => void
}

export function CanvasPreview({
  generatedImageUrl,
  isGenerating,
  isComposing,
  isSharing,
  fontsLoaded,
  copied,
  hasInput,
  previewCanvasRef,
  downloadImage,
  copyToClipboard,
  shareImage,
}: CanvasPreviewProps) {
  // Use internal ref if not provided
  const internalRef = useRef<HTMLCanvasElement>(null)
  const canvasRef = previewCanvasRef || internalRef

  return (
    <div className="order-1 md:order-2 w-full md:w-[60%] flex flex-col min-h-0">
      {generatedImageUrl ? (
        <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-4 bg-gradient-to-br from-amber-50/80 via-white/60 to-amber-100/70 dark:from-stone-900/60 dark:via-black/40 dark:to-amber-950/50 rounded-3xl border-2 border-amber-200/50 dark:border-amber-500/15 shadow-inner dark:shadow-[0_0_60px_rgba(212,175,55,0.15)] relative">

          {/* Canvas */}
          <div className="relative w-full max-w-md md:max-w-lg aspect-square">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 to-amber-50/40 dark:from-stone-800/70 dark:to-amber-950/50 rounded-2xl shadow-2xl"></div>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/30 dark:ring-amber-400/15"></div>
            <canvas
              ref={canvasRef}
              width={1024}
              height={1024}
              className="relative w-full h-full object-contain rounded-2xl shadow-2xl dark:shadow-[0_0_30px_rgba(212,175,55,0.1)] z-10"
            />
          </div>

          {/* Desktop Toolbar */}
          <div className="hidden md:block mt-4">
            <ActionButtonGroup
              isComposing={isComposing}
              isSharing={isSharing}
              fontsLoaded={fontsLoaded}
              copied={copied}
              downloadImage={downloadImage}
              copyToClipboard={copyToClipboard}
              shareImage={shareImage}
            />
          </div>
        </div>
      ) : isGenerating ? (
        /* Loading State */
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/80 via-white/60 to-amber-100/70 dark:from-stone-900/60 dark:via-black/40 dark:to-amber-950/50 rounded-3xl p-4 md:p-8 border-2 border-amber-200/50 dark:border-amber-500/15 shadow-inner dark:shadow-[0_0_60px_rgba(212,175,55,0.15)] min-h-[300px]">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-2 border-amber-400/30 border-t-amber-500/80 animate-spin"></div>
            <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50 flex items-center justify-center shadow-lg">
              <Palette className="w-8 h-8 md:w-12 md:h-12 text-amber-600 dark:text-amber-400 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-semibold text-amber-900 dark:text-amber-200 mb-2">Crafting Your Divine Masterpiece</h3>
          <p className="text-sm md:text-base font-serif text-amber-700/70 dark:text-amber-400/60 italic mb-4">"Every stroke of light is a prayer"</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse animation-delay-400"></div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-stone-100/60 to-amber-50/40 dark:from-stone-900/40 dark:to-amber-950/20 rounded-3xl p-2 md:p-8 border-2 border-amber-200/50 dark:border-amber-500/15 shadow-inner min-h-[200px] md:min-h-[300px] backdrop-blur-sm">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-amber-400/15 dark:bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
            <Palette className="relative w-12 h-12 md:w-20 md:h-20 text-amber-400/60 dark:text-amber-500/50" />
          </div>
          <p className="text-base md:text-2xl font-serif font-semibold text-stone-700 dark:text-zinc-300 mb-2">Your Canvas Awaits</p>
          <p className="text-sm md:text-base font-serif text-stone-500 dark:text-zinc-500 mb-4">Describe your sacred vision below and let divine art emerge</p>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
            hasInput
              ? 'bg-amber-100/80 dark:bg-amber-950/40 border-amber-300/50 dark:border-amber-500/30 shadow-lg shadow-amber-500/20'
              : 'bg-stone-100/50 dark:bg-stone-800/30 border-stone-200/40 dark:border-stone-700/20'
          }`}>
            <div className={`w-2 h-2 rounded-full transition-all ${
              hasInput
                ? 'bg-amber-500 dark:bg-amber-400 animate-pulse shadow-lg shadow-amber-500/50'
                : 'bg-stone-400 dark:bg-stone-600'
            }`}></div>
            <span className={`text-xs md:text-sm font-serif transition-colors ${
              hasInput
                ? 'text-amber-800 dark:text-amber-300 font-medium'
                : 'text-stone-500 dark:text-stone-500'
            }`}>{hasInput ? 'Ready to generate!' : 'Ready to create'}</span>
          </div>
        </div>
      )}
    </div>
  )
}
