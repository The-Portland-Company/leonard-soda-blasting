'use client'

import React, { useState } from 'react';
import { Page } from '@/lib/directus';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Image,
  Button,
  Input,
  Textarea,
} from '@chakra-ui/react';
import PhoneNumber from '../PhoneNumber';

interface LogHomeProps {
  page?: Page | null;
}

const LogHomeClient: React.FC<LogHomeProps> = ({ page }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    project: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert(`Your message was successfully sent to ${adminEmail}. We'll get back to you within 24 hours.`);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        project: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Box id="log-home-main">
      
      {/* Hero Section */}
      <Box 
        bgImage="url('/assets/images/log-home-hero.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        py={20}
        position="relative"
        display={{ base: "none", lg: "block" }}
      >
        <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.400" />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack gap={4} textAlign="center" color="white">
            <Heading as="h1" color="white">
              {page?.title || 'Log Home Soda Blasting'}
            </Heading>
          </VStack>
        </Container>
      </Box>

      {/* Mobile Title */}
      <Box 
        bg="#333333" 
        color="white" 
        py={16} 
        textAlign="center"
        display={{ base: "block", lg: "none" }}
      >
        <Container maxW="container.xl">
          <Heading as="h1">
            {page?.title || 'Log Home Soda Blasting'}
          </Heading>
        </Container>
      </Box>

      <PhoneNumber />

      {/* Log Home Services Section */}
      <Box bg="#228b22" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="white"
              >
                Professional Log Home Restoration
              </Heading>
              <Text 
                fontSize="xl" 
                color="white" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                {page?.content || 'Leonard Soda Blasting specializes in log home restoration using gentle soda blasting techniques. Our process safely removes old stains, paints, and weathering without damaging the natural wood grain.'}
              </Text>
            </VStack>
            <Box textAlign="center">
              <Image 
                src="/assets/images/log-home-restoration.jpg"
                alt="Log Home Restoration"
                borderRadius="lg"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box 
        bgImage="url('/assets/images/bg-3.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        py={16}
        position="relative"
      >
        <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.300" />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack gap={8}>
            <Heading 
              as="h2"
              color="#228b22"
              textAlign="center"
            >
              Why Choose Soda Blasting for Log Homes?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="100%">
              <VStack 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                gap={4} 
                textAlign="center"
              >
                <Heading fontSize="1.3rem" color="#228b22" fontFamily="Arvo, Georgia, serif">
                  Preserves Wood Grain
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif">
                  Gentle process that maintains the natural beauty and texture of your log home.
                </Text>
              </VStack>
              <VStack 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                gap={4} 
                textAlign="center"
              >
                <Heading fontSize="1.3rem" color="#228b22" fontFamily="Arvo, Georgia, serif">
                  Eco-Friendly
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif">
                  Natural sodium bicarbonate is safe for the environment and your family.
                </Text>
              </VStack>
              <VStack 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                gap={4} 
                textAlign="center"
              >
                <Heading fontSize="1.3rem" color="#228b22" fontFamily="Arvo, Georgia, serif">
                  Complete Restoration
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif">
                  Removes years of weathering and prepares surfaces for new finishes.
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Services Section */}
      <Box bg="#333333" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="white"
              >
                Log Home Services We Provide
              </Heading>
              <VStack gap={4} align="flex-start">
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  • Stain and paint removal
                </Text>
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  • Weather damage restoration
                </Text>
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  • Mold and mildew removal
                </Text>
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  • Chinking and mortar cleaning
                </Text>
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  • Pre-stain surface preparation
                </Text>
              </VStack>
            </VStack>
            <Box textAlign="center">
              <Image 
                src="/assets/images/log-home-services.jpg"
                alt="Log Home Services"
                borderRadius="lg"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Process Section */}
      <Box 
        bgImage="url('/assets/images/bg-3.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        py={16}
        position="relative"
      >
        <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.300" />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box textAlign="center">
              <Image 
                src="/assets/images/log-home-process.jpg"
                alt="Log Home Restoration Process"
                borderRadius="lg"
              />
            </Box>
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="#228b22"
              >
                Our Restoration Process
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.800" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                We carefully assess your log home&apos;s condition and customize our soda blasting approach to restore your home&apos;s natural beauty while preserving its structural integrity. Our process removes years of weathering and prepares your logs for new protective finishes.
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Quote Section */}
      <Box bg="#228b22" py={16}>
        <Container maxW="container.xl">
          <VStack gap={8}>
            <Heading 
              as="h2"
              color="white"
              textAlign="center"
            >
              Get Your Log Home Restoration Quote
            </Heading>
            
            <Box maxW="730px" mx="auto" w="100%">
              <Box bg="white" p={8} borderRadius="lg">
                <Box as="form" onSubmit={handleSubmit}>
                  <VStack gap={6}>
                    <VStack gap={2} align="flex-start" w="100%">
                      <Text 
                        fontFamily="Arvo, Georgia, serif"
                        fontWeight="bold"
                        color="#228b22"
                      >
                        Name *
                      </Text>
                      <HStack gap={4} w="100%">
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          fontFamily="Open Sans, sans-serif"
                          borderColor="#228b22"
                          _focus={{ borderColor: "#228b22" }}
                          required
                        />
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          fontFamily="Open Sans, sans-serif"
                          borderColor="#228b22"
                          _focus={{ borderColor: "#228b22" }}
                          required
                        />
                      </HStack>
                    </VStack>

                    <VStack gap={2} align="flex-start" w="100%">
                      <Text 
                        fontFamily="Arvo, Georgia, serif"
                        fontWeight="bold"
                        color="#228b22"
                      >
                        Email Address *
                      </Text>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@domain.com"
                        fontFamily="Open Sans, sans-serif"
                        borderColor="#228b22"
                        _focus={{ borderColor: "#228b22" }}
                        required
                      />
                    </VStack>

                    <VStack gap={2} align="flex-start" w="100%">
                      <Text 
                        fontFamily="Arvo, Georgia, serif"
                        fontWeight="bold"
                        color="#228b22"
                      >
                        About My Project
                      </Text>
                      <Textarea
                        name="project"
                        value={formData.project}
                        onChange={handleInputChange}
                        placeholder="Tell us about your log home restoration project..."
                        rows={6}
                        fontFamily="Open Sans, sans-serif"
                        borderColor="#228b22"
                        _focus={{ borderColor: "#228b22" }}
                      />
                    </VStack>

                    <Button
                      type="submit"
                      bg="#228b22"
                      color="white"
                      size="lg"
                      fontFamily="Arvo, Georgia, serif"
                      textTransform="uppercase"
                      fontWeight="bold"
                      letterSpacing="1px"
                      loading={isSubmitting}
                      w="full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Get Quote"}
                    </Button>
                  </VStack>
                </Box>
              </Box>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default LogHomeClient;