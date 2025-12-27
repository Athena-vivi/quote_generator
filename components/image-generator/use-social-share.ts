import { useState, useCallback } from "react"

interface Quote {
  reference: string
  content: string
}

interface UseSocialShareParams {
  quote: Quote
  downloadImage: () => Promise<void>
  generatedImageUrl: string | null
}

interface UseSocialShareReturn {
  showShareMenu: boolean
  showInstagramOpenButton: boolean
  toastMessage: string | null
  setShowShareMenu: (show: boolean) => void
  shareImage: () => Promise<void>
  handleShareToWhatsApp: () => Promise<void>
  handleShareToFacebook: () => Promise<void>
  handleShareToX: () => Promise<void>
  handleShareToInstagram: () => Promise<void>
  forceOpenInstagram: () => void
}

const nativeAppLinks = {
  whatsapp: (text: string) => `whatsapp://send?text=${encodeURIComponent(text)}`,
  facebook: () => `fb://sharer/`,
  x: (text: string) => `twitter://post?message=${encodeURIComponent(text)}`,
  instagram: () => `instagram://app`,
}

const webFallbackLinks = {
  whatsapp: (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`,
  facebook: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  x: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
  instagram: () => `https://www.instagram.com/`,
}

export function useSocialShare({
  quote,
  downloadImage,
  generatedImageUrl,
}: UseSocialShareParams): UseSocialShareReturn {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showInstagramOpenButton, setShowInstagramOpenButton] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  const showToast = useCallback((message: string) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }, [])

  const copyQuoteText = useCallback(async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    try {
      await navigator.clipboard.writeText(quoteText)
      return true
    } catch (error) {
      console.warn('Failed to copy quote text:', error)
      return false
    }
  }, [quote])

  const smartRedirect = useCallback((nativeUrl: string, webUrl: string) => {
    const appOpened = { value: false }

    setTimeout(() => {
      if (!appOpened.value) {
        window.location.href = webUrl
      }
    }, 2000)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        appOpened.value = true
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    window.location.href = nativeUrl

    setTimeout(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }, 2500)
  }, [])

  const handleShareToWhatsApp = useCallback(async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    setShowShareMenu(false)

    if (isMobile) {
      smartRedirect(
        nativeAppLinks.whatsapp(quoteText),
        webFallbackLinks.whatsapp(quoteText)
      )
    } else {
      window.open(webFallbackLinks.whatsapp(quoteText), '_blank', 'width=600,height=600')
    }
  }, [quote, copyQuoteText, isMobile, smartRedirect])

  const handleShareToFacebook = useCallback(async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    setShowShareMenu(false)

    const shareUrl = window.location.href

    if (isMobile) {
      smartRedirect(
        nativeAppLinks.facebook(),
        webFallbackLinks.facebook(shareUrl)
      )
    } else {
      window.open(webFallbackLinks.facebook(shareUrl), '_blank', 'width=600,height=400')
    }
  }, [quote, copyQuoteText, isMobile, smartRedirect])

  const handleShareToX = useCallback(async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    setShowShareMenu(false)

    if (isMobile) {
      smartRedirect(
        nativeAppLinks.x(quoteText),
        webFallbackLinks.x(quoteText)
      )
    } else {
      window.open(webFallbackLinks.x(quoteText), '_blank', 'width=600,height=400')
    }
  }, [quote, copyQuoteText, isMobile, smartRedirect])

  const handleShareToInstagram = useCallback(async () => {
    const quoteText = `"${quote.content}" — ${quote.reference}`
    await copyQuoteText()
    setShowShareMenu(false)

    if (isMobile) {
      showToast("Image saved to gallery. Please select it in Instagram.")
      await downloadImage()

      setTimeout(() => {
        const nativeUrl = nativeAppLinks.instagram()
        const webUrl = webFallbackLinks.instagram()
        setShowInstagramOpenButton(true)
        window.location.href = nativeUrl

        setTimeout(() => {
          if (showInstagramOpenButton) {
            window.location.href = webUrl
          }
        }, 2500)
      }, 300)
    } else {
      showToast("Image downloaded. Upload it to Instagram manually.")
      await downloadImage()
      // Desktop: Open Instagram in new tab after short delay
      setTimeout(() => {
        window.open(webFallbackLinks.instagram(), '_blank')
      }, 1000)
    }
  }, [quote, copyQuoteText, isMobile, showToast, downloadImage, showInstagramOpenButton])

  const forceOpenInstagram = useCallback(() => {
    setShowInstagramOpenButton(false)
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

    if (isAndroid) {
      const intentUrl = 'intent://instagram.com/#Intent;package=com.instagram.android;scheme=https;end'
      window.location.href = intentUrl
    } else if (isIOS) {
      window.location.href = 'instagram://camera'
      setTimeout(() => {
        window.location.href = 'instagram://app'
      }, 1500)
    } else {
      window.location.href = 'instagram://app'
    }
  }, [])

  const shareImage = useCallback(async () => {
    // This function is handled by the parent component with canvas ref
    setShowShareMenu(true)
  }, [])

  return {
    showShareMenu,
    showInstagramOpenButton,
    toastMessage,
    setShowShareMenu,
    shareImage,
    handleShareToWhatsApp,
    handleShareToFacebook,
    handleShareToX,
    handleShareToInstagram,
    forceOpenInstagram,
  }
}
