"use client"

import { useEffect } from 'react'

// 字体预加载和异步加载
export const FontLoader = () => {
  useEffect(() => {
    // 使用 Web Font Loader 异步加载字体
    const webFontConfig = {
      google: {
        families: [
          'Crimson+Text:400,600:latin',
          'Open+Sans:400,600:latin'
        ]
      },
      timeout: 2000,
      active: () => {
        // 字体加载完成后的回调
        document.documentElement.classList.add('fonts-loaded')
      },
      inactive: () => {
        // 字体加载失败后的回调
        document.documentElement.classList.add('fonts-failed')
      }
    }

    // 动态加载 Web Font Loader
    const loadWebFontLoader = () => {
      const wf = document.createElement('script')
      wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
      wf.type = 'text/javascript'
      wf.async = 'true'
      wf.onload = () => {
        WebFont.load(webFontConfig)
      }
      document.head.appendChild(wf)
    }

    // 延迟加载字体，不阻塞首次渲染
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadWebFontLoader)
    } else {
      loadWebFontLoader()
    }

    // 预加载字体文件
    const fontFiles = [
      'https://fonts.gstatic.com/s/crimsontext/v14/wlp2gwHKFhkUvU4CNAnRURfk.woff2',
      'https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVQUwaEQbjA.woff2'
    ]

    fontFiles.forEach(fontUrl => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      link.href = fontUrl
      document.head.appendChild(link)
    })

    return () => {
      // 清理函数（如果组件卸载）
      const scripts = document.head.querySelectorAll('script[src*="webfont"]')
      scripts.forEach(script => script.remove())
    }
  }, [])

  return null
}