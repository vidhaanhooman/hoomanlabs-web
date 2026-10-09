"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Playback for one call: real <audio> when the file exists, otherwise a silent
 * preview clock so the transcript can still be followed. Spread `audioProps`
 * onto an <audio> element.
 */
export function useCallPlayback(src: string, duration: number) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [hasAudio, setHasAudio] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)

  // Silent preview clock when there's no audio file.
  useEffect(() => {
    if (hasAudio || !playing) return
    const t = setInterval(() => {
      setTime((s) => {
        const next = s + 0.1
        if (next >= duration) {
          setPlaying(false)
          return duration
        }
        return next
      })
    }, 100)
    return () => clearInterval(t)
  }, [hasAudio, playing, duration])

  async function toggle() {
    if (playing) {
      audioRef.current?.pause()
      setPlaying(false)
      return
    }
    const restart = time >= duration
    if (restart) setTime(0)
    if (hasAudio && audioRef.current) {
      try {
        if (restart) audioRef.current.currentTime = 0
        await audioRef.current.play()
        setPlaying(true)
        return
      } catch {
        setHasAudio(false)
      }
    }
    setPlaying(true)
  }

  function seek(seconds: number) {
    setTime(seconds)
    if (hasAudio && audioRef.current) audioRef.current.currentTime = seconds
  }

  const audioProps = {
    ref: audioRef,
    src,
    preload: "metadata" as const,
    onError: () => setHasAudio(false),
    onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement>) => setTime(e.currentTarget.currentTime),
    onEnded: () => setPlaying(false),
  }

  return { playing, time, hasAudio, toggle, seek, audioProps }
}
