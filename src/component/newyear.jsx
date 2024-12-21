'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const calculateTimeLeft = () => {
  const now = new Date()
  const nextYear = new Date(now.getFullYear() + 1, 0, 1)
  const difference = nextYear.getTime() - now.getTime()

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 }
}

const CountdownUnit = ({ value, label }) => (
  <motion.div
    className="flex flex-col items-center justify-center bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 w-24 h-24"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.span 
      className="text-4xl font-bold text-white"
      key={value}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {value}
    </motion.span>
    <span className="text-sm text-white opacity-80">{label}</span>
  </motion.div>
)

export default function NewYearCountdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 animate-gradient-x">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-8 animate-pulse">
          New Year Countdown
        </h1>
        <div className="flex space-x-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  )
}
