// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

interface ContactFormData {
  name: string
  email: string
  phone: string
  projectType?: string
  projectDescription: string
  location?: string
  timeline?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    // Validate Resend API key
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }

    // Parse request body
    const formData: ContactFormData = await req.json()
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.projectDescription) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, email, phone, projectDescription' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    }

    // Determine recipient email based on environment
    const isDevelopment = Deno.env.get('ENVIRONMENT') === 'development'
    
    // For Resend testing without verified domain, send to verified email
    // Change this to the actual recipient email once domain is verified
    const recipientEmail = 'leonardsodablasting@theportlandcompany.com' // Resend verified email
    
    // Will use these once domain is verified:
    // const recipientEmail = isDevelopment 
    //   ? 'agency@theportlandcompany.com' 
    //   : 'greg@leonardsodablasting.com'

    // Create email content
    const emailSubject = `New Contact Form Submission from ${formData.name}`
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #228b22;">New Contact Form Submission</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Contact Information</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>
          ${formData.location ? `<p><strong>Location:</strong> ${formData.location}</p>` : ''}
          ${formData.timeline ? `<p><strong>Timeline:</strong> ${formData.timeline}</p>` : ''}
        </div>

        ${formData.projectType ? `
        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3>Project Type</h3>
          <p>${formData.projectType}</p>
        </div>
        ` : ''}

        <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
          <h3>Project Description</h3>
          <p style="white-space: pre-wrap;">${formData.projectDescription}</p>
        </div>

        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">
            This email was sent from the Leonard Soda Blasting contact form.
            <br>Submitted on: ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST
          </p>
        </div>
      </div>
    `

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Using Resend's default domain until leonardsodablasting.com is verified
        to: recipientEmail,
        subject: emailSubject,
        html: emailHtml,
        reply_to: formData.email, // Allow easy reply to the contact
        tags: [
          { name: 'source', value: 'contact-form' },
          { name: 'environment', value: isDevelopment ? 'development' : 'production' }
        ]
      }),
    })

    const resendData = await resendResponse.json()

    if (!resendResponse.ok) {
      console.error('Resend API error:', resendData)
      throw new Error(`Email sending failed: ${resendData.message || 'Unknown error'}`)
    }

    console.log('Email sent successfully:', resendData)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        emailId: resendData.id,
        sentTo: recipientEmail
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email', 
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      }
    )
  }
})

/* To invoke locally:

  1. Set up environment variables in .env file:
     RESEND_API_KEY=your_resend_api_key
     ENVIRONMENT=development

  2. Run `supabase start` and `supabase functions serve --env-file .env`
  
  3. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-contact-email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "(503) 555-1234",
      "projectDescription": "Test message",
      "location": "Portland, OR"
    }'

*/