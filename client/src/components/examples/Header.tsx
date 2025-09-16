import { useState } from 'react'
import Header from '../Header'

export default function HeaderExample() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onThemeToggle={() => {
          setIsDark(!isDark)
          console.log('Theme toggled:', !isDark ? 'dark' : 'light')
        }}
        isDark={isDark}
      />
      <div className="pt-20 p-8">
        <p className="text-muted-foreground">Content below header...</p>
      </div>
    </div>
  )
}