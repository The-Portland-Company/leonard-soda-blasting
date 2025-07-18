'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Page } from '@/lib/directus';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Input,
  Textarea,
} from '@chakra-ui/react';
import PhoneNumber from '../PhoneNumber';
import { config } from '@/lib/config';

interface CommercialIndustrialProps {
  page?: Page | null;
}

const CommercialIndustrial: React.FC<CommercialIndustrialProps> = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    project: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const adminEmail = config.adminEmail;


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
    <Box id="commercial-industrial-main">
      
      {/* Hero Section with Slider */}
      <Box 
        bgImage="url('/assets/images/commercial-industrial.webp')"
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
              Commercial & Industrial
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
            Commercial & Industrial
          </Heading>
        </Container>
      </Box>

      <PhoneNumber />

      {/* Commercial Soda Blasting Section */}
      <Box bg="#228b22" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="white"
              >
                Commercial Soda Blasting
              </Heading>
              <Text 
                        fontSize="xl" 
                        color="white" 
                        lineHeight="1.6"
                      >
                The commercial/industrial sandblaster category covers a broad range of markets and services, 
                including media blasting of warehouses, wastewater treatment facilities, parking garages, 
                machinery and equipment.
              </Text>
            </VStack>
            <Box textAlign="center">
              <Box borderRadius="lg" overflow="hidden">
                <Image 
                  src="/assets/images/commercial-industrial.webp"
                  alt="Commercial Soda Blasting"
                  width={600}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Protect Your Investment Section */}
      <Box 
        bgImage="url('/assets/images/bg-3.webp')"
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
                src="/assets/images/commercial-industrial.webp"
                alt="Industrial Equipment"
              />
            </Box>
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="#228b22"
              >
                Protect Your Investment
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.800" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                It is critical that you choose the right commercial/industrial sandblasting contractor who can 
                meet your specific needs and safety requirements. Greg Leonard has been a licensed contractor 
                since 1989 and you can be sure you&apos;re working with a professional with a history of high quality work.
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Clean & Degrease Safely Section */}
      <Box bg="#333333" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="white"
              >
                Clean & Degrease Safely
              </Heading>
              <VStack gap={4} align="flex-start">
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  We use soda blast media in a process similar to sandblasting. However unlike sandblasting, 
                  soda has no hard dust particles to affect operating parts. The process is gentle enough to 
                  remove the coating without harming the substrate and virtually any coating can be removed 
                  from most any surface.
                </Text>
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  Soda is an extremely versatile abrasive that can be used on the toughest of coatings and 
                  the most sensitive of surfaces. It&apos;s an effective method for degreasing equipment and at 
                  only 2.5 on the Moh&apos;s hardness scale soda will not wear even the most sensitive surface. 
                  This makes it excellent for cleaning critical components with machined tolerances or detailed 
                  contours that must be maintained.
                </Text>
                <Text 
                  fontSize="lg" 
                  color="white" 
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  Soda can be used without damage or distortion to ferrous and non-ferrous metals and soda 
                  can be used safely around pumps, seals, bearings, and even rotating equipment without causing damage.
                </Text>
              </VStack>
            </VStack>
            <Box textAlign="center">
              <Image 
                src="/assets/images/food-processing-equipment.webp"
                alt="Equipment Cleaning"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Professional Work Section */}
      <Box 
        bgImage="url('/assets/images/bg-3.webp')"
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
                src="/assets/images/water-before-after.webp"
                alt="Before and After"
              />
            </Box>
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="#228b22"
              >
                Professional Work
              </Heading>
              <Text 
                fontSize="lg" 
                color="gray.800" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
              >
                With Leonard Soda Blasting you&apos;re assured to get the right manpower on your job you need them: 
                day, night weekends or tomorrow. We pride ourselves in the ability to complete large sandblasting 
                jobs in a short period of time.
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Right Media Section */}
      <Box bg="#333333" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="white"
              >
                The Right Media for the Right Job
              </Heading>
              <Text 
                fontSize="lg" 
                color="white" 
                fontFamily="Open Sans, sans-serif"
                lineHeight="1.6"
                maxW="840px"
              >
                Not only do we use soda for blasting, but actually we work with a whole host of media, from sand 
                and walnut shells to glass beads. Each media has its role depending on the job. Soda we found to 
                be the most universally applicable, but in certain situations there is something better to 
                accomplish your goals—and we are prepared.
              </Text>
              <Text 
                fontSize="xl" 
                color="white" 
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
              >
                What can <Text as="span" color="#228b22">Leonard Soda Blasting</Text> do for you?
              </Text>
            </VStack>
            <Box textAlign="center">
              <Image 
                src="/assets/images/commercial.webp"
                alt="Media Blasting"
              />
            </Box>
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
              Start a Quote Today
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
                        placeholder="About My Project..."
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
                      textTransform="uppercase"
                      fontWeight="bold"
                      letterSpacing="1px"
                      loading={isSubmitting}
                      w="full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
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

export default CommercialIndustrial;