/** Check if the dark mode is currently active. */
export function isDarkMode(): boolean {
  return localStorage.DARK_MODE === 'true'
}

/**
 * Toggle the current dark mode status.
 * @return The new status
 */
export function toggleDarkMode(): boolean {
  const status = !isDarkMode()
  setDarkMode(status)
  return status
}

/**
 * Detect the current browser theme.
 */
export function detectCurrentTheme(): void {
  if (localStorage.DARK_MODE === 'false') return
  const QUERY = '(prefers-color-scheme: dark)'
  setDarkMode(isDarkMode() || matchMedia(QUERY).matches)
}

/** Set the dark mode status to the provided one. */
function setDarkMode(status: boolean): void {
  localStorage.DARK_MODE = status
  const ROOT = document.documentElement
  if (status) {
    ROOT.setAttribute('data-theme', 'dark')
  } else {
    ROOT.removeAttribute('data-theme')
  }
}
