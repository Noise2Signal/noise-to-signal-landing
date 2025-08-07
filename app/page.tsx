'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Zap, Users, Building2, BarChart3, FileQuestion, CheckSquare, Mail, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particlePositions, setParticlePositions] = useState<{left: string, top: string}[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Generate random positions for floating particles only on client
    const arr = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }));
    setParticlePositions(arr);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Show success message
        setIsSubmitted(true)
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        })
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        console.error('Failed to submit form')
        alert('Failed to submit form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit form. Please try again.')
    }
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#F9F9F7' }}>
      {/* Animated cursor follower */}
      <div 
        className="fixed pointer-events-none z-0 opacity-20"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, rgba(28, 92, 53, 0.1) 0%, transparent 70%)`,
          borderRadius: '50%',
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="relative group">
              <Image 
                src="/logo-primary.png" 
                alt="Noise 2 Signal" 
                width={200} 
                height={80}
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['What We Do', 'Tools', 'Contact'].map((item, index) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item === 'What We Do' ? 'what-we-do' : item === 'Tools' ? 'resources' : 'contact')}
                  className="relative text-sm font-medium tracking-wide uppercase hover:text-[#1C5C35] transition-all duration-300 group"
                  style={{ color: '#0A1D36' }}
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1C5C35] to-[#1C5C35]/50 group-hover:w-full transition-all duration-300" />
                  <div className="absolute inset-0 bg-[#1C5C35]/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(28, 92, 53, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(28, 92, 53, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particlePositions.map((pos, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-30"
              style={{
                backgroundColor: '#1C5C35',
                left: pos.left,
                top: pos.top,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Subtle noise pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #E63946 1px, transparent 1px),
                             radial-gradient(circle at 40% 20%, #E63946 1px, transparent 1px),
                             radial-gradient(circle at 60% 80%, #E63946 1px, transparent 1px),
                             radial-gradient(circle at 80% 30%, #E63946 1px, transparent 1px)`,
            backgroundSize: '100px 100px, 150px 150px, 120px 120px, 80px 80px'
          }} />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-8 group">
            <Image 
              src="/logo-secondary.png" 
              alt="Noise 2 Signal" 
              width={120} 
              height={60}
              className="mx-auto mb-8 h-16 w-auto transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C5C35]/20 via-transparent to-[#1C5C35]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight relative group" style={{ color: '#0A1D36' }}>
            <span className="relative inline-block">
              NOISE 2 SIGNAL
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1C5C35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
            </span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-medium mb-8 tracking-wide relative" style={{ color: '#1A1A1A' }}>
            <span className="relative">
              IGNORE THE NOISE.
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#E63946] to-transparent group-hover:w-full transition-all duration-1000" />
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed font-light" style={{ color: '#0A1D36' }}>
            Cut through the AI hype. Build faster with ready-to-go workflows, templates, and backend support that actually work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-sm font-medium tracking-wide uppercase px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1C5C35]/25 relative overflow-hidden group"
              style={{ backgroundColor: '#1C5C35', color: '#F9F9F7' }}
              onClick={() => scrollToSection('resources')}
            >
              <span className="relative z-10">EXPLORE TOOLS</span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C5C35] to-[#1C5C35]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-sm font-medium tracking-wide uppercase px-8 py-6 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              style={{ 
                borderColor: '#0A1D36', 
                color: '#0A1D36',
                backgroundColor: 'transparent'
              }}
              onClick={() => scrollToSection('contact')}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">GET IN TOUCH</span>
              <div className="absolute inset-0 bg-[#0A1D36] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Button>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-20 bg-white relative">
        {/* Subtle data flow lines */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1000 800">
            <path d="M0,400 Q250,200 500,400 T1000,400" stroke="#1C5C35" strokeWidth="1" fill="none" opacity="0.3">
              <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="10s" repeatCount="indefinite" />
            </path>
            <path d="M0,200 Q250,400 500,200 T1000,200" stroke="#1C5C35" strokeWidth="1" fill="none" opacity="0.2">
              <animate attributeName="stroke-dasharray" values="1000,0;0,1000;1000,0" dur="15s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight relative group" style={{ color: '#0A1D36' }}>
              WHAT WE DO
              <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-[#1C5C35]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
            </h2>
            <p className="text-xl md:text-2xl mb-4 font-light" style={{ color: '#1A1A1A' }}>
              We cut through the AI noise to help you build what actually matters — fast.
            </p>
            <p className="text-lg" style={{ color: '#0A1D36' }}>
              From workflows to mentorship, we deliver clarity, speed, and real output.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "BUILD WITH YOU",
                content: [
                  "Done-for-you AI workflows and implementation",
                  "Automations, integrations, and full-stack flows built for your tools",
                  "24–48 hour turnaround for n8n, Replit, and AI stack workflows",
                  "From solo operators to lean teams. We ship. You scale."
                ]
              },
              {
                icon: Users,
                title: "BUILD BESIDE YOU",
                content: [
                  "Mentorship, cohorts, and hands-on learning",
                  "Learn by building: real projects, real tools",
                  "Get unstuck with guidance from people who've done it before"
                ]
              },
              {
                icon: Building2,
                title: "BUILD FOR OTHERS",
                content: [
                  "White-label delivery and backend support for agencies",
                  "Bring AI to your clients without building an in-house team"
                ]
              }
            ].map((pillar, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-all duration-500 hover:scale-105 relative overflow-hidden group" style={{ borderColor: '#1C5C35' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1C5C35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1C5C35] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative group/icon" style={{ backgroundColor: '#1C5C35' }}>
                    <pillar.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" style={{ color: '#F9F9F7' }} />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1C5C35] to-[#1C5C35]/70 opacity-0 group/icon-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold tracking-wide" style={{ color: '#0A1D36' }}>
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <CardDescription className="text-base space-y-3" style={{ color: '#1A1A1A' }}>
                    {pillar.content.map((item, i) => (
                      <div key={i} className={i === pillar.content.length - 1 ? "font-semibold" : ""} style={i === pillar.content.length - 1 ? { color: '#0A1D36' } : {}}>
                        {item}
                      </div>
                    ))}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="resources" className="py-20 relative" style={{ backgroundColor: '#F9F9F7' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#1C5C35]/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-[#1C5C35]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight relative" style={{ color: '#0A1D36' }}>
              SIGNAL TOOLS
            </h2>
            <p className="text-lg" style={{ color: '#1A1A1A' }}>
              Clarity is leverage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart3, title: "DATA ANALYSER", desc: "Add your data to this tool and use AI to analyse trends, insights, or anomalies — without writing a line of code.", cta: "USE TOOL" },
              { icon: FileQuestion, title: "QUIZ FRAMEWORK", desc: "A reusable and modular framework to build any quiz — from personality assessments to onboarding flows.", cta: "FORK FRAMEWORK" },
              { icon: CheckSquare, title: "TODO LIST TRACKER", desc: "Drop in your chaotic to-do list, and let AI file it into categories and update your Notion tracker.", cta: "TRY IT OUT" }
            ].map((tool, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-white relative overflow-hidden group" style={{ borderColor: '#1C5C35' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1C5C35]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-[#1C5C35]/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative group/tool" style={{ backgroundColor: '#1C5C35' }}>
                    <tool.icon className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" style={{ color: '#F9F9F7' }} />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#1C5C35] to-[#1C5C35]/70 opacity-0 group/tool-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardTitle className="text-xl font-bold tracking-wide" style={{ color: '#0A1D36' }}>
                    {tool.title}
                  </CardTitle>
                  <CardDescription style={{ color: '#1A1A1A' }}>
                    {tool.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <Link href="/tools/under-construction">
                    <Button className="w-full text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group/btn" style={{ backgroundColor: '#1C5C35', color: '#F9F9F7' }}>
                      <span className="relative z-10">{tool.cta}</span>
                      <ExternalLink className="ml-2 h-4 w-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1C5C35] via-[#1C5C35]/90 to-[#1C5C35] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white relative">
        {/* Subtle circuit pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, #1C5C35 1px, transparent 1px),
              linear-gradient(#1C5C35 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ color: '#0A1D36' }}>
              LET'S BUILD SOMETHING THAT WORKS
            </h2>
            <p className="text-xl" style={{ color: '#1A1A1A' }}>
              Want to work together, feature a tool, or just jam ideas?<br />
              Send us a message — we'd love to hear from you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <Card className="border-2 relative overflow-hidden group" style={{ borderColor: '#1C5C35' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C5C35]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl font-bold tracking-wide" style={{ color: '#0A1D36' }}>
                  GET IN TOUCH
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="text-base py-3 border-2 transition-all duration-300 focus:shadow-lg focus:shadow-[#1C5C35]/20"
                        style={{ borderColor: '#1C5C35', color: '#0A1D36' }}
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="text-base py-3 border-2 transition-all duration-300 focus:shadow-lg focus:shadow-[#1C5C35]/20"
                        style={{ borderColor: '#1C5C35', color: '#0A1D36' }}
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message (Optional)"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        className="text-base border-2 transition-all duration-300 focus:shadow-lg focus:shadow-[#1C5C35]/20"
                        style={{ borderColor: '#1C5C35', color: '#0A1D36' }}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full text-sm font-medium tracking-wide uppercase py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group/submit"
                      style={{ backgroundColor: '#1C5C35', color: '#F9F9F7' }}
                    >
                      <span className="relative z-10">SUBMIT</span>
                      <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover/submit:translate-x-1 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1C5C35] to-[#1C5C35]/80 opacity-0 group-hover/submit:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse" style={{ backgroundColor: '#1C5C35' }}>
                      <Mail className="h-8 w-8" style={{ color: '#F9F9F7' }} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 tracking-wide" style={{ color: '#0A1D36' }}>
                      THANK YOU!
                    </h3>
                    <p className="text-base mb-4" style={{ color: '#1A1A1A' }}>
                      Your contact information has been submitted successfully. We'll get back to you soon!
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="text-sm font-medium tracking-wide uppercase transition-all duration-300"
                      style={{ borderColor: '#1C5C35', color: '#1C5C35' }}
                    >
                      SEND ANOTHER MESSAGE
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>


          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative overflow-hidden" style={{ backgroundColor: '#0A1D36' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #1C5C35 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'gridMove 30s linear infinite reverse'
          }} />
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Image 
              src="/logo-secondary.png" 
              alt="Noise 2 Signal" 
              width={40} 
              height={20}
              className="h-6 w-auto mr-4 opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
            <p className="text-sm font-medium tracking-wide" style={{ color: '#F9F9F7' }}>
              FIND THE SIGNAL. IGNORE THE NOISE.
            </p>
          </div>
          <p className="text-xs opacity-60" style={{ color: '#F9F9F7' }}>
            © 2025 Noise 2 Signal. Clarity in Chaos.
          </p>
        </div>
              </footer>

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}
