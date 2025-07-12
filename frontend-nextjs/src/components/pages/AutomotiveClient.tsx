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

interface AutomotiveProps {
  page?: Page | null;
}

const AutomotiveClient: React.FC<AutomotiveProps> = ({ page }) => {
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
    <Box id="automotive-main">
      
      {/* Hero Section */}
      <Box 
        bgImage="url('https://leonardsodablasting.com/wp-content/uploads/2017/04/bronco-primed.jpg')"
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
              {page?.title || 'Automotive Soda Blasting'}
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
            {page?.title || 'Automotive Soda Blasting'}
          </Heading>
        </Container>
      </Box>

      <PhoneNumber />

      {/* Main Content */}
      <Box bg="#228b22" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="white"
              >
                Professional Automotive Restoration
              </Heading>
              <Text 
                fontSize="xl" 
                color="white" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                {page?.content || 'Leonard Soda Blasting specializes in automotive restoration using eco-friendly soda blasting techniques. Our gentle process removes paint, rust, and coatings without damaging the underlying metal.'}
              </Text>
            </VStack>
            <Box textAlign="center">
              <Image 
                src="https://leonardsodablasting.com/wp-content/uploads/2017/04/auto-pg-img-2.jpg"
                alt="Automotive Soda Blasting"
                borderRadius="lg"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Safe and Effective Section */}
      <Box py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box textAlign="center">
              <Image 
                src="https://leonardsodablasting.com/wp-content/uploads/2017/04/chalk-marks.jpg"
                alt="Safe and Effective"
                borderRadius="lg"
              />
            </Box>
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="#228b22"
              >
                Safe and Effective
              </Heading>
              <Text 
                fontSize="xl" 
                color="gray.700" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                Soda restores to a factory finish as you can see from these factory chalk marks visible after the soda blasting process.
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Completely Professional Section */}
      <Box bg="#228b22" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="white"
              >
                Completely Professional from Beginning to End
              </Heading>
              <Text 
                fontSize="xl" 
                color="white" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                We have a 16’×36′ blast shop located in Sherwood, Oregon for even your largest vehicles. We can also trailer projects if necessary. Priming is available.
              </Text>
            </VStack>
            <Box textAlign="center">
              <Image 
                src="https://leonardsodablasting.com/wp-content/uploads/2017/04/auto-pg-img-2.jpg"
                alt="Completely Professional"
                borderRadius="lg"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Safe and Effective Section */}
      <Box py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box textAlign="center">
              <Image 
                src="https://leonardsodablasting.com/wp-content/uploads/2017/04/chalk-marks.jpg"
                alt="Safe and Effective"
                borderRadius="lg"
              />
            </Box>
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="#228b22"
              >
                Safe and Effective
              </Heading>
              <Text 
                fontSize="xl" 
                color="gray.700" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                Soda restores to a factory finish as you can see from these factory chalk marks visible after the soda blasting process.
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Completely Professional Section */}
      <Box bg="#228b22" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="white"
              >
                Completely Professional from Beginning to End
              </Heading>
              <Text 
                fontSize="xl" 
                color="white" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                We have a 16’×36′ blast shop located in Sherwood, Oregon for even your largest vehicles. We can also trailer projects if necessary. Priming is available.
              </Text>
            </VStack>
            <Box textAlign="center">
              <Image 
                src="https://leonardsodablasting.com/wp-content/uploads/2017/04/auto-pg-img-2.jpg"
                alt="Completely Professional"
                borderRadius="lg"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Services Section */}
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
              Our Automotive Services
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
                  Paint Removal
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif">
                  Gentle removal of old paint without damaging the underlying metal surface.
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
                  Rust Treatment
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif">
                  Effective rust removal while preserving the integrity of your vehicle&apos;s body.
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
                  Engine Cleaning
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif">
                  Safe degreasing and cleaning of engine components without damage.
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
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
              Get Your Automotive Project Quote
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
                        placeholder="Tell us about your automotive project..."
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

export default AutomotiveClient;