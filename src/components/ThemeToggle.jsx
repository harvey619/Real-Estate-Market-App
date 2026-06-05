import { useEffect, useState } from 'react'

// Small visual toggle that flips a data-theme attribute on <html>.
function ThemeToggle() {
  const [dark, setDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark'
  )

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <button
      className="themeToggle"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <span className="themeToggleTrack">
        <span className="themeToggleThumb">{dark ? '🌙' : '☀️'}</span>
      </span>
    </button>
  )
}

export default ThemeToggle
