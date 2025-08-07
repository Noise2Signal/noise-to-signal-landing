'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Mail, Bell, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      console.log('Email submitted:', email)
      setIsSubmitted(true)
      setEmail('')
    }
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
            <Link href="/" className="relative group">
              <Image 
                src="/logo-primary.png" 
                alt="Noise 2 Signal" 
                width={200} 
                height={80}
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
            </Link>
            <Link 
              href="/"
              className="flex items-center text-sm font-medium tracking-wide uppercase hover:text-[#1C5C35] transition-all duration-300 group"
              style={{ color: '#0A1D36' }}
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              BACK TO HOME
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1C5C35] to-[#1C5C35]/50 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
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
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-30"
              style={{
                backgroundColor: '#1C5C35',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
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

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Logo */}
          <div className="mb-8 group">
            <Image 
              src="/logo-secondary.png" 
              alt="Signal" 
              width={120} 
              height={60}
              className="mx-auto mb-8 h-16 w-auto transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C5C35]/20 via-transparent to-[#1C5C35]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight relative group" style={{ color: '#0A1D36' }}>
            <span className="relative inline-block">
              SIGNAL INCOMING
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1C5C35]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
            </span>
          </h1>

          <h2 className="text-3xl md:text-4xl font-medium mb-8 tracking-wide" style={{ color: '#1A1A1A' }}>
            TOOLS LAUNCHING SOON
          </h2>

          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light" style={{ color: '#0A1D36' }}>
            We're putting the finishing touches on our AI-powered tools. Be the first to know when they're ready to cut through the noise.
          </p>

          {/* Notification Card */}
          <Card className="max-w-2xl mx-auto border-2 relative overflow-hidden group" style={{ borderColor: '#1C5C35' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1C5C35]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1C5C35] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            
            <CardHeader className="text-center relative z-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative group/icon" style={{ backgroundColor: '#1C5C35' }}>
                <Bell className="h-8 w-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" style={{ color: '#F9F9F7' }} />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1C5C35] to-[#1C5C35]/70 opacity-0 group/icon-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-wide mb-2" style={{ color: '#0A1D36' }}>
                GET NOTIFIED FIRST
              </CardTitle>
              <p className="text-base" style={{ color: '#1A1A1A' }}>
                Join our signal list and be among the first to access our AI tools when they launch.
              </p>
            </CardHeader>

            <CardContent className="relative z-10">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 text-base py-3 border-2 transition-all duration-300 focus:shadow-lg focus:shadow-[#1C5C35]/20"
                      style={{ borderColor: '#1C5C35', color: '#0A1D36' }}
                    />
                    <Button 
                      type="submit" 
                      className="text-sm font-medium tracking-wide uppercase px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group/submit"
                      style={{ backgroundColor: '#1C5C35', color: '#F9F9F7' }}
                    >
                      <span className="relative z-10">NOTIFY ME</span>
                      <Zap className="ml-2 h-4 w-4 relative z-10 group-hover/submit:rotate-12 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1C5C35] to-[#1C5C35]/80 opacity-0 group-hover/submit:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </div>
                  <p className="text-sm opacity-70" style={{ color: '#1A1A1A' }}>
                    No spam. Just signal. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse" style={{ backgroundColor: '#1C5C35' }}>
                    <Mail className="h-8 w-8" style={{ color: '#F9F9F7' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-wide" style={{ color: '#0A1D36' }}>
                    SIGNAL RECEIVED
                  </h3>
                  <p className="text-base mb-4" style={{ color: '#1A1A1A' }}>
                    You're on the list! We'll notify you as soon as our tools are ready.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="text-sm font-medium tracking-wide uppercase transition-all duration-300"
                    style={{ borderColor: '#1C5C35', color: '#1C5C35' }}
                  >
                    ADD ANOTHER EMAIL
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Feature Preview */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "DATA ANALYSER", desc: "AI-powered insights from your data" },
              { title: "QUIZ FRAMEWORK", desc: "Modular quiz building system" },
              { title: "TODO TRACKER", desc: "Smart task organization with AI" }
            ].map((tool, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-[#1C5C35]/20 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
                <h4 className="text-sm font-bold tracking-wide mb-2" style={{ color: '#0A1D36' }}>
                  {tool.title}
                </h4>
                <p className="text-xs opacity-70" style={{ color: '#1A1A1A' }}>
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
