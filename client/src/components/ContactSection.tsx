import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Send, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  User, 
  Briefcase,
  CheckCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // todo: remove mock functionality
    setTimeout(() => {
      console.log('Form submitted:', formData)
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      })
      setFormData({ name: '', email: '', projectType: '', budget: '', message: '' })
      setIsSubmitting(false)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'me@philgreene.net',
      description: 'Drop me a line anytime'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      description: 'Available for remote work worldwide'
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: '< 24 hours',
      description: 'I typically respond quickly'
    }
  ]

  const projectTypes = [
    'Web Development',
    'Data Analysis',
    'Machine Learning',
    'Full-Stack Application',
    'Data Visualization',
    'API Development',
    'Other'
  ]

  const budgetRanges = [
    'Under $5k',
    '$5k - $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k+',
    'Let\'s discuss'
  ]

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-6">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can create something amazing together.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
            
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <Card key={index} className="hover-elevate border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{info.label}</h4>
                        <p className="text-primary font-medium">{info.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-border/50">
              <h4 className="font-semibold text-foreground mb-3">Why Work With Me?</h4>
              <div className="space-y-2">
                {[
                  'Fast & reliable delivery',
                  'Clear communication',
                  'Modern best practices',
                  'Post-launch support'
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-card-foreground flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  Start Your Project
                </CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you within 24 hours with a detailed proposal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="John Doe"
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Project Type</Label>
                      <Select 
                        value={formData.projectType} 
                        onValueChange={(value) => handleInputChange('projectType', value)}
                      >
                        <SelectTrigger data-testid="select-project-type">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget Range</Label>
                      <Select 
                        value={formData.budget} 
                        onValueChange={(value) => handleInputChange('budget', value)}
                      >
                        <SelectTrigger data-testid="select-budget">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                      rows={5}
                      required
                      data-testid="textarea-message"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full group" 
                    disabled={isSubmitting}
                    data-testid="button-submit-contact"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}