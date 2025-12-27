import { Check, Instagram, MessageCircle, Facebook, Youtube } from "lucide-react"

interface ShareMenuOverlayProps {
  showShareMenu: boolean
  setShowShareMenu: (show: boolean) => void
  showInstagramOpenButton: boolean
  toastMessage: string | null
  handleShareToWhatsApp: () => void
  handleShareToFacebook: () => void
  handleShareToX: () => void
  handleShareToInstagram: () => void
  forceOpenInstagram: () => void
}

export function ShareMenuOverlay({
  showShareMenu,
  setShowShareMenu,
  showInstagramOpenButton,
  toastMessage,
  handleShareToWhatsApp,
  handleShareToFacebook,
  handleShareToX,
  handleShareToInstagram,
  forceOpenInstagram,
}: ShareMenuOverlayProps) {
  if (!showShareMenu && !toastMessage && !showInstagramOpenButton) {
    return null
  }

  return (
    <>
      {/* Share Menu - Mobile Bottom Sheet */}
      {showShareMenu && (
        <>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setShowShareMenu(false)} />
          {/* Mobile Version */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-amber-200/50 dark:border-amber-500/20 rounded-t-3xl p-6 safe-area-inset-bottom">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-1.5 bg-amber-300/50 dark:bg-amber-600/50 rounded-full" />
            </div>
            <h3 className="text-xl font-serif font-semibold text-amber-900 dark:text-amber-300 text-center mb-6">Share to Social Media</h3>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <button onClick={handleShareToWhatsApp} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-serif">WhatsApp</span>
              </button>
              <button onClick={handleShareToFacebook} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                  <Facebook className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-serif">Facebook</span>
              </button>
              <button onClick={handleShareToX} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-stone-700 to-black flex items-center justify-center shadow-lg">
                  <Youtube className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-serif">X</span>
              </button>
              <button onClick={handleShareToInstagram} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-amber-100/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg">
                  <Instagram className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xs font-serif">Instagram</span>
              </button>
            </div>
            <p className="text-center text-xs font-serif text-stone-500 dark:text-stone-400 italic">
              Quote copied • Image saved for Instagram
            </p>
            <button onClick={() => setShowShareMenu(false)} className="w-full mt-4 py-3 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-xl">
              Cancel
            </button>
          </div>

          {/* Desktop Version - Popup centered */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-amber-200/50 dark:border-amber-500/20 rounded-3xl p-8 shadow-2xl dark:shadow-[0_0_60px_rgba(212,175,55,0.2)] min-w-[480px]">
            <h3 className="text-2xl font-serif font-semibold text-amber-900 dark:text-amber-300 text-center mb-2">Share Divine Art</h3>
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400 text-center mb-6">Choose a platform to share your masterpiece</p>

            <div className="grid grid-cols-4 gap-6 mb-6">
              <button onClick={handleShareToWhatsApp} className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:shadow-green-500/40 group-hover:scale-110 transition-all">
                  <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">WhatsApp</span>
              </button>
              <button onClick={handleShareToFacebook} className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/40 group-hover:scale-110 transition-all">
                  <Facebook className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Facebook</span>
              </button>
              <button onClick={handleShareToX} className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-stone-700 to-black flex items-center justify-center shadow-lg group-hover:shadow-stone-600/40 group-hover:scale-110 transition-all">
                  <Youtube className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">X</span>
              </button>
              <button onClick={handleShareToInstagram} className="group flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-amber-100/50 dark:hover:bg-amber-950/30 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-pink-500/40 group-hover:scale-110 transition-all">
                  <Instagram className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Instagram</span>
              </button>
            </div>

            <p className="text-center text-xs font-serif text-stone-500 dark:text-stone-400 italic mb-4">
              Quote has been copied to clipboard • Image will be saved for Instagram
            </p>

            <button onClick={() => setShowShareMenu(false)} className="w-full py-3 bg-gradient-to-r from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-700 hover:from-stone-200 hover:to-stone-300 dark:hover:from-stone-700 dark:hover:to-stone-600 text-stone-700 dark:text-stone-300 rounded-xl font-semibold transition-all">
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span className="font-serif text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Instagram Fallback Button */}
      {showInstagramOpenButton && (
        <button
          onClick={forceOpenInstagram}
          className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2"
        >
          <Instagram className="w-5 h-5" />
          <span>Open Instagram</span>
        </button>
      )}
    </>
  )
}
