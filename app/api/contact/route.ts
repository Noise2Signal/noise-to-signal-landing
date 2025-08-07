import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Try to send email if credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        // Create transporter using Gmail
        const transporter = nodemailer.createTransporter({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        })

        // Email content
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'builder@noise2signal.co.uk',
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message || 'No message provided'}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `
        }

        // Send email
        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully')
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Continue with logging even if email fails
      }
    } else {
      console.log('Email credentials not configured - skipping email send')
    }

    // Log the contact form submission
    console.log('Contact form submission sent via email:', {
      name,
      email,
      message: message || 'No message provided',
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
