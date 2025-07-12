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

interface FireWaterDamageProps {
  page?: Page | null;
}

const FireWaterDamageClient: React.FC<FireWaterDamageProps> = ({ page }) => {
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
    <Box id="fire-water-damage-main">
      
      {/* Hero Section */}
      <Box 
        bgImage="url('/assets/images/fire-damage.jpg')"
        backgroundPosition="top"
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
              {page?.title || 'Fire & Water Damage Restoration'}
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
            {page?.title || 'Fire & Water Damage Restoration'}
          </Heading>
        </Container>
      </Box>

      <PhoneNumber />

      {/* Restoration Services Section */}
      <Box bg="#228b22" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="white"
              >
                Professional Damage Restoration
              </Heading>
              <Text 
                fontSize="xl" 
                color="white" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                {page?.content || 'Leonard Soda Blasting specializes in fire and water damage restoration using eco-friendly soda blasting techniques. Our gentle process effectively removes smoke, soot, and water damage without further harming your property.'}
              </Text>
            </VStack>
            <Box textAlign="center">
              <Image 
                src="/assets/images/fire-damage.jpg"
                alt="Fire and Water Damage Restoration"
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
              Why Choose Soda Blasting for Restoration?
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
                  Odor Removal
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif">
                  Effectively removes smoke odors and water damage smells from surfaces and materials.
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
                  Gentle Process
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif">
                  Won&apos;t damage delicate surfaces or create additional harm to fire-damaged materials.
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
                  Fast Results
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif">
                  Quick restoration process to get your property back to normal faster.
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
                Restoration Services We Provide
              </Heading>
              <VStack gap={4} align="flex-start">
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  • Smoke and soot removal
                </Text>
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  • Water damage restoration
                </Text>
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  • Structural cleaning
                </Text>
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  • Odor elimination
                </Text>
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  • Surface preparation for repairs
                </Text>
              </VStack>
            </VStack>
            <Box textAlign="center">
              <Image 
                src="/assets/images/after-fire.jpg"
                alt="Damage Restoration Services"
                borderRadius="lg"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Emergency Services */}
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
                src="/assets/images/fire-damage.jpg"
                alt="Emergency Services"
                borderRadius="lg"
              />
            </Box>
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="#228b22"
              >
                Emergency Response Available
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.800" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                We understand that fire and water damage require immediate attention. Leonard Soda Blasting offers emergency response services to help minimize further damage and begin the restoration process as quickly as possible.
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
              Get Your Restoration Quote
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
                        placeholder="Tell us about your fire or water damage restoration needs..."
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

export default FireWaterDamageClient;