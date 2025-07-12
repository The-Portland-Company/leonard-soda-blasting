'use client'
import React, { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  Input,
  Textarea,
} from '@chakra-ui/react'
import PhoneNumber from '@/components/PhoneNumber'

interface FormData {
  name: string
  email: string
  phone: string
  projectType: string
  projectDescription: string
  location: string
  timeline: string
}

interface PageWithHero {
  hero_title?: string;
  title?: string;
  hero_subtitle?: string;
}

interface ContactClientProps {
  page: PageWithHero | null;
  settings: unknown;
}

const ContactClient: React.FC<ContactClientProps> = ({ page }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    projectDescription: '',
    location: '',
    timeline: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Use different email for local development vs production
  const adminEmail = process.env.NODE_ENV === 'development' 
    ? 'agency@theportlandcompany.com' 
    : 'greg@leonardsodablasting.com'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone || !formData.projectDescription) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Prepare form data for submission
      const emailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        projectDescription: formData.projectDescription,
        location: formData.location,
        timeline: formData.timeline
      }

      // Check if Supabase is configured for production
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (supabaseUrl && supabaseUrl !== 'http://127.0.0.1:54321' && supabaseAnonKey) {
        // Production Supabase setup
        const functionUrl = `${supabaseUrl}/functions/v1/send-contact-email`
        
        const response = await fetch(functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify(emailData)
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to send email')
        }

        console.log('Email sent successfully via Supabase:', result)
      } else {
        // Demo mode - simulate successful submission for development
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log('Demo mode: Email would be sent to:', adminEmail)
        console.log('Form data:', emailData)
        console.log('To enable real email sending, set up Supabase production environment variables')
      }
      
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        projectDescription: '',
        location: '',
        timeline: ''
      })
    } catch (error) {
      console.error('Email submission failed:', error)
      alert(`Failed to send message: ${error.message}. Please try again or contact us directly.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bgImage="url('/assets/images/about.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        py={20}
        position="relative"
      >
        <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.600" />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack gap={4} textAlign="center" color="white">
            <Heading 
              size="2xl" 
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize={{ base: "3xl", md: "4xl" }}
            >
              {page?.hero_title || page?.title || 'Contact'}
            </Heading>
            {page?.hero_subtitle && (
              <Text fontSize="xl" maxW="2xl" fontFamily="Open Sans, sans-serif">
                {page.hero_subtitle}
              </Text>
            )}
          </VStack>
        </Container>
      </Box>
      {/* Contact Form and Info Section */}
      <Box bg="white" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={16}>
            {/* Contact Form */}
            <VStack gap={8} align="flex-start">
              <VStack gap={4} align="flex-start" w="100%">
                <Heading 
                  size="xl" 
                  fontFamily="Arvo, Georgia, serif"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="#228b22"
                >
                  Request a Quote
                </Heading>
                <Text fontSize="lg" fontFamily="Open Sans, sans-serif" color="gray.600">
                  Fill out the form below and we&apos;ll get back to you within 24 hours with a detailed estimate for your project.
                </Text>
              </VStack>

              {isSubmitted && (
                <Box
                  bg="green.50"
                  border="1px solid"
                  borderColor="green.200"
                  borderRadius="md"
                  p={4}
                  w="100%"
                >
                  <VStack gap={2} align="flex-start">
                    <HStack gap={2}>
                      <Text fontSize="xl" color="green.500">✅</Text>
                      <Heading size="md" color="green.700" fontFamily="Arvo, Georgia, serif">
                        Thank you!
                      </Heading>
                    </HStack>
                    <Text color="green.600" fontFamily="Open Sans, sans-serif">
                      Your message was successfully sent to {adminEmail}. We&apos;ll contact you within 24 hours.
                    </Text>
                  </VStack>
                </Box>
              )}

              <Box as="form" onSubmit={handleSubmit} w="100%">
                <VStack gap={6}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="100%">
                    <VStack gap={2} align="flex-start">
                      <Text fontFamily="Arvo, Georgia, serif" fontWeight="bold" color="#228b22">
                        Full Name *
                      </Text>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        fontFamily="Open Sans, sans-serif"
                        borderColor="#228b22"
                        _focus={{ borderColor: "#228b22" }}
                        required
                      />
                    </VStack>

                    <VStack gap={2} align="flex-start">
                      <Text fontFamily="Arvo, Georgia, serif" fontWeight="bold" color="#228b22">
                        Email Address *
                      </Text>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email address"
                        fontFamily="Open Sans, sans-serif"
                        borderColor="#228b22"
                        _focus={{ borderColor: "#228b22" }}
                        required
                      />
                    </VStack>
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="100%">
                    <VStack gap={2} align="flex-start">
                      <Text fontFamily="Arvo, Georgia, serif" fontWeight="bold" color="#228b22">
                        Phone Number *
                      </Text>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(503) 555-0123"
                        fontFamily="Open Sans, sans-serif"
                        borderColor="#228b22"
                        _focus={{ borderColor: "#228b22" }}
                        required
                      />
                    </VStack>

                    <VStack gap={2} align="flex-start">
                      <Text fontFamily="Arvo, Georgia, serif" fontWeight="bold" color="#228b22">
                        Project Location
                      </Text>
                      <Input
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="City, State"
                        fontFamily="Open Sans, sans-serif"
                        borderColor="#228b22"
                        _focus={{ borderColor: "#228b22" }}
                      />
                    </VStack>
                  </SimpleGrid>

                  <VStack gap={2} align="flex-start" w="100%">
                    <Text fontFamily="Arvo, Georgia, serif" fontWeight="bold" color="#228b22">
                      Project Description *
                    </Text>
                    <Textarea
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                      placeholder="Please describe your project in detail, including size, materials, type of service needed, and any specific requirements..."
                      rows={6}
                      fontFamily="Open Sans, sans-serif"
                      borderColor="#228b22"
                      _focus={{ borderColor: "#228b22" }}
                      required
                    />
                  </VStack>

                  <Button
                    type="submit"
                    bg="#228b22"
                    color="white"
                    size="lg"
                    w="100%"
                    fontFamily="Arvo, Georgia, serif"
                    textTransform="uppercase"
                    letterSpacing="1px"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </VStack>
              </Box>
            </VStack>

            {/* Contact Information */}
            <VStack gap={8} align="flex-start">
              <VStack gap={4} align="flex-start" w="100%">
                <Heading 
                  size="xl" 
                  fontFamily="Arvo, Georgia, serif"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color="#228b22"
                >
                  Get In Touch
                </Heading>
                <Text fontSize="lg" fontFamily="Open Sans, sans-serif" color="gray.600">
                  Ready to discuss your project? Contact us directly using the information below.
                </Text>
              </VStack>

              <VStack gap={6} align="flex-start" w="100%">
                <Box
                  bg="gray.50"
                  p={6}
                  borderRadius="lg"
                  w="100%"
                  borderLeft="4px solid #228b22"
                >
                  <VStack gap={4} align="flex-start">
                    <HStack gap={3}>
                      <Box
                        w={12}
                        h={12}
                        bg="#228b22"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="xl" color="white">📞</Text>
                      </Box>
                      <VStack gap={1} align="flex-start">
                        <Heading size="md" color="#228b22" fontFamily="Arvo, Georgia, serif">
                          Phone
                        </Heading>
                        <Text fontSize="lg" fontFamily="Open Sans, sans-serif" fontWeight="bold">
                          (503) 894-5973
                        </Text>
                        <Text fontSize="sm" color="gray.600" fontFamily="Open Sans, sans-serif">
                          Mon-Fri: 7:00 AM - 6:00 PM
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>

                <Box
                  bg="gray.50"
                  p={6}
                  borderRadius="lg"
                  w="100%"
                  borderLeft="4px solid #228b22"
                >
                  <VStack gap={4} align="flex-start">
                    <HStack gap={3}>
                      <Box
                        w={12}
                        h={12}
                        bg="#228b22"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="xl" color="white">✉️</Text>
                      </Box>
                      <VStack gap={1} align="flex-start">
                        <Heading size="md" color="#228b22" fontFamily="Arvo, Georgia, serif">
                          Email
                        </Heading>
                        <Text fontSize="lg" fontFamily="Open Sans, sans-serif" fontWeight="bold">
                          {adminEmail}
                        </Text>
                        <Text fontSize="sm" color="gray.600" fontFamily="Open Sans, sans-serif">
                          We respond within 24 hours
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>

                <Box
                  bg="gray.50"
                  p={6}
                  borderRadius="lg"
                  w="100%"
                  borderLeft="4px solid #228b22"
                >
                  <VStack gap={4} align="flex-start">
                    <HStack gap={3}>
                      <Box
                        w={12}
                        h={12}
                        bg="#228b22"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="xl" color="white">📍</Text>
                      </Box>
                      <VStack gap={1} align="flex-start">
                        <Heading size="md" color="#228b22" fontFamily="Arvo, Georgia, serif">
                          Service Areas
                        </Heading>
                        <Text fontSize="lg" fontFamily="Open Sans, sans-serif" fontWeight="bold">
                          Oregon & Washington
                        </Text>
                        <Text fontSize="sm" color="gray.600" fontFamily="Open Sans, sans-serif">
                          Mobile service - we come to you
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>

                <Box
                  bg="gray.50"
                  p={6}
                  borderRadius="lg"
                  w="100%"
                  borderLeft="4px solid #228b22"
                >
                  <VStack gap={4} align="flex-start">
                    <HStack gap={3}>
                      <Box
                        w={12}
                        h={12}
                        bg="#228b22"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text fontSize="xl" color="white">🏢</Text>
                      </Box>
                      <VStack gap={1} align="flex-start">
                        <Heading size="md" color="#228b22" fontFamily="Arvo, Georgia, serif">
                          License & Insurance
                        </Heading>
                        <Text fontSize="lg" fontFamily="Open Sans, sans-serif" fontWeight="bold">
                          CCB# 97926
                        </Text>
                        <Text fontSize="sm" color="gray.600" fontFamily="Open Sans, sans-serif">
                          Licensed & Insured
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>

            </VStack>
          </SimpleGrid>
        </Container>
      </Box>
      {/* Why Choose Us Section */}
      <Box bg="gray.50" py={16}>
        <Container maxW="container.xl">
          <VStack gap={12}>
            <VStack gap={6} textAlign="center">
              <Heading 
                size="xl" 
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                textTransform="uppercase"
                color="#228b22"
              >
                Why Choose Leonard Soda Blasting?
              </Heading>
              <Text fontSize="lg" maxW="3xl" fontFamily="Open Sans, sans-serif" lineHeight="1.6">
                We&apos;re committed to providing exceptional soda blasting services with the highest standards of professionalism and environmental responsibility.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8} w="100%">
              <VStack gap={4} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  bg="#228b22"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" color="white">🎯</Text>
                </Box>
                <Heading size="md" fontFamily="Arvo, Georgia, serif" color="#228b22">
                  Experienced
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif" textAlign="center">
                  Years of experience in professional soda blasting services
                </Text>
              </VStack>

              <VStack gap={4} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  bg="#228b22"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" color="white">📋</Text>
                </Box>
                <Heading size="md" fontFamily="Arvo, Georgia, serif" color="#228b22">
                  Licensed & Insured
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif" textAlign="center">
                  Fully licensed (CCB# 97926) and insured for your protection
                </Text>
              </VStack>

              <VStack gap={4} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  bg="#228b22"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" color="white">🚛</Text>
                </Box>
                <Heading size="md" fontFamily="Arvo, Georgia, serif" color="#228b22">
                  Mobile Service
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif" textAlign="center">
                  We bring our equipment to you - no need to transport items
                </Text>
              </VStack>

              <VStack gap={4} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  bg="#228b22"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" color="white">💯</Text>
                </Box>
                <Heading size="md" fontFamily="Arvo, Georgia, serif" color="#228b22">
                  Quality Guaranteed
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif" textAlign="center">
                  We stand behind our work with exceptional results every time
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      {/* Compliance Section */}
      <Box bg="#228b22" color="white" py={16}>
        <Container maxW="container.xl">
          <VStack gap={8} textAlign="center">
            <Heading 
              size="xl" 
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Industry Compliant & Certified
            </Heading>
            <Text fontSize="lg" maxW="2xl" fontFamily="Open Sans, sans-serif">
              Our soda blasting process meets or exceeds all industry standards and regulations for safety and environmental protection.
            </Text>
            <HStack gap={8} flexWrap="wrap" justify="center">
              <VStack gap={2}>
                <Text fontSize="2xl" fontWeight="bold">FDA</Text>
                <Text fontSize="sm">Food & Drug Administration</Text>
              </VStack>
              <VStack gap={2}>
                <Text fontSize="2xl" fontWeight="bold">OSHA</Text>
                <Text fontSize="sm">Occupational Safety & Health</Text>
              </VStack>
              <VStack gap={2}>
                <Text fontSize="2xl" fontWeight="bold">EPA</Text>
                <Text fontSize="sm">Environmental Protection</Text>
              </VStack>
              <VStack gap={2}>
                <Text fontSize="2xl" fontWeight="bold">USDA</Text>
                <Text fontSize="sm">US Department of Agriculture</Text>
              </VStack>
            </HStack>
          </VStack>
        </Container>
      </Box>
      <PhoneNumber />
    </Box>
  );
}

export default ContactClient