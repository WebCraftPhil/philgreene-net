import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import ContactSection from '../ContactSection'

export default function ContactSectionExample() {
  return (
    <TooltipProvider>
      <ContactSection />
      <Toaster />
    </TooltipProvider>
  )
}