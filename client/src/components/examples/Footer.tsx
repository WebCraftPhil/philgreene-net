import Footer from '../Footer'

export default function FooterExample() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-96 flex items-center justify-center">
        <p className="text-muted-foreground">Page content above footer...</p>
      </div>
      <Footer />
    </div>
  )
}