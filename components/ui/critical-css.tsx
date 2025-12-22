"use client"

import { useEffect } from 'react'

// 内联关键CSS，避免渲染阻塞
export const CriticalCSS = () => {
  return (
    <style jsx global>{`
      /* Critical CSS for above-the-fold content */
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Loading skeleton styles */
      .skeleton {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: .5;
        }
      }

      /* Essential layout styles */
      .min-h-screen {
        min-height: 100vh;
      }

      .flex {
        display: flex;
      }

      .items-center {
        align-items: center;
      }

      .justify-center {
        justify-content: center;
      }

      /* Prevent flash of unstyled content */
      .font-sans {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      }
    `}</style>
  )
}