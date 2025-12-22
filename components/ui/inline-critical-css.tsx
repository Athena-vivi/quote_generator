"use client"

import { useEffect } from 'react'

// 内联关键CSS到head
export const InlineCriticalCSS = () => {
  useEffect(() => {
    // Add marker for diagnosis
    const marker = document.createElement('div');
    marker.setAttribute('data-critical-css', 'loaded');
    marker.style.display = 'none';
    document.head.appendChild(marker);

    const criticalCSS = `
      /* Critical CSS for above-the-fold content */
      :root {
        --color-amber-50: #fef3c7;
        --color-gray-800: #1f2937;
      }

      * {
        box-sizing: border-box;
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        background-color: var(--color-amber-50);
        color: var(--color-gray-800);
        -webkit-font-smoothing: antialiased;
      }

      .dark body {
        background-color: #111827;
        color: #f3f4f6;
      }

      /* Loading indicator */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }

      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* Essential utility classes */
      .min-h-screen { min-height: 100vh; }
      .flex { display: flex; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .text-center { text-align: center; }
      .relative { position: relative; }
      .z-10 { z-index: 10; }
      .transition-colors { transition-property: color, background-color, border-color; }
      .transition-all { transition-property: all; }
      .duration-300 { transition-duration: 300ms; }
    `

    // 创建style元素并添加到head
    const styleElement = document.createElement('style')
    styleElement.textContent = criticalCSS
    styleElement.setAttribute('data-critical', 'true')
    document.head.appendChild(styleElement)

    // 清理函数
    return () => {
      const existingStyle = document.querySelector('style[data-critical="true"]')
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  return null
}