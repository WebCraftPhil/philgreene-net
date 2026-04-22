import type { ReactNode } from 'react'

interface LegalPageLayoutProps {
  title: string
  description: string
  lastUpdated: string
  children: ReactNode
}

export default function LegalPageLayout({
  title,
  description,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          <p className="text-muted-foreground">{description}</p>
        </header>
        {children}
      </article>
    </main>
  )
}
