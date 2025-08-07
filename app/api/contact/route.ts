import { NextRequest, NextResponse } from 'next/server'

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

    // Log the contact form submission (in production, you'd send this to a database or email service)
    console.log('Contact form submission:', {
      name,
      email,
      message: message || 'No message provided',
      timestamp: new Date().toISOString()
    })

    // In a real application, you would:
    // 1. Send an email notification to your team
    // 2. Store the contact in a database
    // 3. Send a confirmation email to the user
    // 4. Integrate with a CRM system

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
