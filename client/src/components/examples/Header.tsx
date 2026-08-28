import Header from '../Header'

export default function HeaderExample() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 p-8">
        <p className="text-muted-foreground">Content below header</p>
      </div>
    </div>
  )
}
