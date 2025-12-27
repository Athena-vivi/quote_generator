import { Loader2, Download, Copy, Check, Share2 } from "lucide-react"

interface ActionButtonGroupProps {
  isMobile?: boolean
  isComposing: boolean
  isSharing: boolean
  fontsLoaded: boolean
  copied: boolean
  downloadImage: () => void
  copyToClipboard: () => void
  shareImage: () => void
}

export function ActionButtonGroup({
  isMobile = false,
  isComposing,
  isSharing,
  fontsLoaded,
  copied,
  downloadImage,
  copyToClipboard,
  shareImage,
}: ActionButtonGroupProps) {
  // Mobile button styles
  const mobileBtnClass = "flex-1 min-h-[44px] bg-gradient-to-r from-amber-500 to-amber-600 text-white font-serif font-semibold rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50"
  const mobileCopyBtnClass = "flex-1 min-h-[44px] bg-gradient-to-r from-amber-400 to-amber-500 text-white font-serif font-semibold rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50"
  const mobileShareBtnClass = "flex-1 min-h-[44px] bg-gradient-to-br from-amber-400 to-yellow-500 text-white font-serif font-bold rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50"

  // Desktop button styles
  const desktopBtnClass = "min-h-[44px] px-5 bg-white/70 dark:bg-white/15 hover:bg-white/90 dark:hover:bg-white/25 text-amber-900 dark:text-amber-100 font-serif font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 flex-1 border border-white/10 dark:border-white/5"

  return (
    <div className={`flex items-center ${isMobile ? 'justify-between gap-2' : 'justify-center gap-3'}`}>
      {/* Download Button */}
      <button
        onClick={downloadImage}
        disabled={isComposing || !fontsLoaded}
        className={isMobile ? mobileBtnClass : desktopBtnClass}
      >
        {isComposing ? (
          <Loader2 className={isMobile ? "w-4 h-4 animate-spin" : "w-4 h-4 animate-spin"} />
        ) : (
          <Download className={isMobile ? "w-4 h-4" : "w-4 h-4"} />
        )}
        <span className={isMobile ? "text-xs" : ""}>
          {isComposing ? (isMobile ? "Processing" : "Processing...") : "Download"}
        </span>
      </button>

      {/* Copy Button */}
      <button
        onClick={copyToClipboard}
        disabled={isComposing || !fontsLoaded}
        className={isMobile ? mobileCopyBtnClass : desktopBtnClass}
      >
        {copied ? (
          <Check className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />
        ) : (
          <Copy className={isMobile ? "w-3.5 h-3.5" : "w-4 h-4"} />
        )}
        <span className={isMobile ? "text-xs" : ""}>
          {copied ? (isMobile ? "Copied!" : "Copied!") : "Copy"}
        </span>
      </button>

      {/* Share Button */}
      <button
        onClick={shareImage}
        disabled={isSharing || isComposing || !fontsLoaded}
        className={isMobile ? mobileShareBtnClass : desktopBtnClass}
      >
        {isSharing ? (
          <Loader2 className={isMobile ? "w-4 h-4 animate-spin" : "w-4 h-4 animate-spin"} />
        ) : (
          <Share2 className={isMobile ? "w-4 h-4" : "w-4 h-4"} />
        )}
        <span className={isMobile ? "text-xs" : ""}>
          {isSharing ? (isMobile ? "Sharing" : "Sharing...") : "Share"}
        </span>
      </button>
    </div>
  )
}
