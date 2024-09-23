"use client"

import React, { useState, useRef, useEffect } from 'react'

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down'
  pauseOnHover?: boolean
  height?: string
}

export default function Marquee({
  children,
  speed = 30,
  direction = 'up',
  pauseOnHover = true,
  height = '100px',
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [children])

  const containerStyle: React.CSSProperties = {
    overflow: 'hidden',
    height,
    position: 'relative',
  }

  const contentStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    animation: `marquee ${contentHeight / speed}s linear infinite ${direction === 'up' ? '' : 'reverse'}`,
    animationPlayState: isPaused ? 'paused' : 'running',
  }

  return (
    <div
      className="bg-background text-foreground"
      style={containerStyle}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div ref={contentRef} style={contentStyle}>
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  )
}