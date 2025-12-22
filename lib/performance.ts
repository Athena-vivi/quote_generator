// Performance monitoring utilities
export const reportWebVitals = (metric: any) => {
  // Send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      })
    }

    // Example: Send to custom analytics
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: metric.name,
          value: metric.value,
          id: metric.id,
          url: window.location.href,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {
        // Ignore analytics errors
      })
    }
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric)
  }
}

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/fonts/crimson-text-v14-latin-regular.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    { href: '/api/verses/daily', as: 'fetch' },
  ]

  criticalResources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource.href
    link.as = resource.as as any
    if (resource.type) link.type = resource.type
    if (resource.crossOrigin) link.crossOrigin = resource.crossOrigin
    document.head.appendChild(link)
  })
}

// Optimized scroll behavior
export const smoothScroll = (element: HTMLElement, options?: ScrollIntoViewOptions) => {
  const defaultOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
    ...options
  }

  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    element.scrollIntoView(defaultOptions)
  })
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Intersection Observer for animations
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  }

  return new IntersectionObserver(callback, defaultOptions)
}

// Optimized image loading with blur data
export const getBlurDataURL = (width: number = 10, height: number = 10) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#fef3c7')
  gradient.addColorStop(1, '#f59e0b')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL('image/jpeg', 0.1)
}

// Performance mark
export const markPerformance = (name: string) => {
  if (typeof window !== 'undefined' && window.performance) {
    window.performance.mark(name)
  }
}

// Performance measure
export const measurePerformance = (name: string, startMark: string, endMark?: string) => {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      window.performance.measure(name, startMark, endMark)
      const measures = window.performance.getEntriesByName(name, 'measure')
      return measures[0]?.duration || 0
    } catch (error) {
      console.error('Performance measure failed:', error)
      return 0
    }
  }
  return 0
}