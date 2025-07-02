import React, { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { Link as RouterLink } from 'react-router-dom';
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
} from '@chakra-ui/react';
import PhoneNumber from '../components/PhoneNumber';
import { usePage, useGlobalSettings } from '../hooks/useDirectus';
import { updateSEOTags, createPageSEO } from '../utils/seo';

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  location: string;
  timeline: string;
}

const Contact: React.FC = () => {
  const { page } = usePage('contact');
  const { settings } = useGlobalSettings();



  // Update SEO when data loads - but don't override the Helmet title
  useEffect(() => {
    if (page || settings) {
      const seoData = createPageSEO(page, settings);
      // Only update meta tags, not title (Helmet handles title)
      updateSEOTags({ ...seoData, title: undefined });
    }
  }, [page, settings]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    projectDescription: '',
    location: '',
    timeline: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.projectDescription) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        projectDescription: '',
        location: '',
        timeline: ''
      });
    }, 2000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box id="contact-main">
      <SEOHead
        title={page?.title}
        metaTitle={page?.meta_title}
        metaDescription={page?.meta_description}
        defaultTitle="Contact - Leonard Soda Blasting"
        defaultDescription="Contact Leonard Soda Blasting for a free quote on your cleaning and stripping project. Professional eco-friendly soda blasting services."
        defaultKeywords="contact soda blasting, Oregon Washington, professional cleaning services, licensed contractor"
      />
      {/* Hero Section */}
      <Box 
        id="hero-section"
        bgImage="url('/assets/images/about.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        py={20}
        position="relative"
      >
        <Box id="hero-overlay" position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.600" />
        <Container id="hero-container" maxW="container.xl" position="relative" zIndex={1}>
          <VStack id="hero-content" gap={4} textAlign="center" color="white">
            <Heading 
              size="2xl" 
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize={{ base: "3xl", md: "4xl" }}
            >
              Contact Us
            </Heading>
            <Text fontSize="xl" maxW="2xl" fontFamily="Open Sans, sans-serif">
              Get a free estimate for your soda blasting project
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Contact Form and Info Section */}
      <Box id="contact-form-section" bg="white" py={16}>
        <Container id="contact-form-container" maxW="container.xl">
          <SimpleGrid id="contact-grid" columns={{ base: 1, lg: 2 }} gap={16}>
            {/* Contact Form */}
            <VStack id="contact-form-column" gap={8} align="flex-start">
              <VStack id="form-header" gap={4} align="flex-start" w="100%">
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
                  Fill out the form below and we'll get back to you within 24 hours with a detailed estimate for your project.
                </Text>
              </VStack>

              {isSubmitted && (
                <Box
                  id="success-message"
                  bg="green.50"
                  border="1px solid"
                  borderColor="green.200"
                  borderRadius="md"
                  p={4}
                  w="100%"
                >
                  <VStack id="success-content" gap={2} align="flex-start">
                    <HStack id="success-icon" gap={2}>
                      <Text fontSize="xl" color="green.500">✅</Text>
                      <Heading size="md" color="green.700" fontFamily="Arvo, Georgia, serif">
                        Thank you!
                      </Heading>
                    </HStack>
                    <Text color="green.600" fontFamily="Open Sans, sans-serif">
                      Your message was successfully sent to {adminEmail}. We'll contact you within 24 hours.
                    </Text>
                  </VStack>
                </Box>
              )}

              <Box id="contact-form" as="form" onSubmit={handleSubmit} w="100%">
                <VStack id="form-fields" gap={6}>
                  <SimpleGrid id="name-email-fields" columns={{ base: 1, md: 2 }} gap={6} w="100%">
                    <VStack id="name-field" gap={2} align="flex-start">
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

                    <VStack id="email-field" gap={2} align="flex-start">
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

                  <SimpleGrid id="phone-location-fields" columns={{ base: 1, md: 2 }} gap={6} w="100%">
                    <VStack id="phone-field" gap={2} align="flex-start">
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

                    <VStack id="location-field" gap={2} align="flex-start">
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

                  <VStack id="description-field" gap={2} align="flex-start" w="100%">
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
                    loading={isSubmitting}
                    bg="#228b22"
                    color="white"
                    size="lg"
                    w="100%"
                    fontFamily="Arvo, Georgia, serif"
                    textTransform="uppercase"
                    letterSpacing="1px"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </VStack>
              </Box>
            </VStack>

            {/* Contact Information */}
            <VStack id="contact-info-column" gap={8} align="flex-start">
              <VStack id="contact-info-header" gap={4} align="flex-start" w="100%">
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

              <VStack id="contact-info-cards" gap={6} align="flex-start" w="100%">
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
                        <Heading className="contact-info-title">
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
                        <Heading className="contact-info-title">
                          Email
                        </Heading>
                        <Text fontSize="lg" fontFamily="Open Sans, sans-serif" fontWeight="bold">
                          greg@leonardsodablasting.com
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
                        <Heading className="contact-info-title">
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
                        <Heading className="contact-info-title">
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

              <Box id="additional-links" mt={4}>
                <Text fontSize="sm" color="gray.600" fontFamily="Open Sans, sans-serif" mb={4}>
                  Want to learn more about our services?
                </Text>
                <HStack id="service-links" gap={4}>
                  <RouterLink to="/services">
                    <Button
                      variant="outline"
                      borderColor="#228b22"
                      color="#228b22"
                      size="md"
                      fontFamily="Arvo, Georgia, serif"
                      textTransform="uppercase"
                    >
                      Our Services
                    </Button>
                  </RouterLink>
                  <RouterLink to="/gallery">
                    <Button
                      variant="outline"
                      borderColor="#228b22"
                      color="#228b22"
                      size="md"
                      fontFamily="Arvo, Georgia, serif"
                      textTransform="uppercase"
                    >
                      View Gallery
                    </Button>
                  </RouterLink>
                </HStack>
              </Box>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box id="why-choose-us-section" bg="gray.50" py={16}>
        <Container id="why-choose-us-container" maxW="container.xl">
          <VStack id="why-choose-us-content" gap={12}>
            <VStack id="why-choose-us-header" gap={6} textAlign="center">
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
                We're committed to providing exceptional soda blasting services with the highest standards of professionalism and environmental responsibility.
              </Text>
            </VStack>

            <SimpleGrid id="why-choose-us-grid" columns={{ base: 1, md: 2, lg: 4 }} gap={8} w="100%">
              <VStack id="experienced-benefit" gap={4} textAlign="center">
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

              <VStack id="licensed-benefit" gap={4} textAlign="center">
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

              <VStack id="mobile-benefit" gap={4} textAlign="center">
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

              <VStack id="quality-benefit" gap={4} textAlign="center">
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
      <Box id="compliance-section" bg="#228b22" color="white" py={16}>
        <Container id="compliance-container" maxW="container.xl">
          <VStack id="compliance-content" gap={8} textAlign="center">
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
            <HStack id="compliance-certifications" gap={8} flexWrap="wrap" justify="center">
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
};

export default Contact;