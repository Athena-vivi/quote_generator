"use client"

import { useEffect } from 'react'

// 字体预加载和异步加载
export const FontLoader = () => {
  useEffect(() => {
    // Add marker for diagnosis
    const marker = document.createElement('div');
    marker.setAttribute('data-font-loader', 'loaded');
    marker.style.display = 'none';
    document.head.appendChild(marker);

    // 使用 Web Font Loader 异步加载字体
    const webFontConfig = {
      google: {
        families: [
          'Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap',
          'Open+Sans:wght@400;600;700&display=swap'
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

    // 移除硬编码的字体文件预加载，让 Web Font Loader 处理
    // 避免版本不匹配导致的 404 错误

    return () => {
      // 清理函数（如果组件卸载）
      const scripts = document.head.querySelectorAll('script[src*="webfont"]')
      scripts.forEach(script => script.remove())
    }
  }, [])

  return null
}