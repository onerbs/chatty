import React, {useState} from 'react'
import {isDarkMode, toggleDarkMode} from '../lib/theme'

export default function ToggleDarkMode() {
  const [isDark, setDark] = useState(isDarkMode())

  return (
    <span
      title="Toggle Dark Mode"
      onClick={() => setDark(toggleDarkMode())}
    >
      {isDark ? '🌚' : '🌞'}
    </span>
  )
}
