'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { getFileUrl } from '@/lib/directus';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  VStack,
  AspectRatio,
} from '@chakra-ui/react';
import PhoneNumber from '../PhoneNumber';
import { Page, GlobalSettings, Testimonial } from '@/lib/directus';

interface HomeClientProps {
  page: Page | null;
  settings: GlobalSettings | null;
  testimonials: Testimonial[] | null;
}

// Map service titles to IDs
const getServiceIdByTitle = (title: string): number => {
  const titleMapping: { [key: string]: number } = {
    'Automotive': 1,
    'Aircraft': 2,
    'Marine & Boat': 3,
    'Commercial & Industrial': 4,
    'Food Processing Equipment': 5,
    'Fire & Water Damage': 6,
    'Log Homes': 7
  };
  
  return titleMapping[title] || 4; // Default to Commercial & Industrial
};

// Map service page IDs to actual URLs
const getServiceUrl = (servicePageId: number): string => {
  const serviceMapping: { [key: number]: string } = {
    1: '/soda-blasting/automotive-soda-blasting',
    2: '/soda-blasting/airplane-soda-blasting',
    3: '/soda-blasting/boat-and-marine-soda-blasting',
    4: '/soda-blasting/commercial-industrial',
    5: '/soda-blasting/food-processing-equipment',
    6: '/soda-blasting/fire-and-water-damage-restoration-soda-blasting',
    7: '/soda-blasting/log-home-soda-blasting',
    8: '/soda-blasting/airplane-soda-blasting',  // Aircraft
    9: '/soda-blasting/boat-and-marine-soda-blasting',  // Marine & Boat
    10: '/soda-blasting/fire-and-water-damage-restoration-soda-blasting',  // Fire & Water Damage
    11: '/soda-blasting/food-processing-equipment',  // Food Processing Equipment
    12: '/soda-blasting/log-home-soda-blasting'  // Log Homes
  };
  
  return serviceMapping[servicePageId] || '/contact';
};

// Provide default descriptions for services
const getServiceDescription = (service: any): string => {
  // Default descriptions based on service title
  const defaultDescriptions: { [key: string]: string } = {
    'Log Homes': 'Gentle restoration of log homes and cabins. Our eco-friendly soda blasting safely removes old stains, paints, and weathering without damaging the natural wood grain.',
    'Aircraft': 'Professional aircraft cleaning and surface preparation. Safe, non-abrasive process perfect for aviation maintenance and restoration.',
    'Marine & Boat': 'Complete boat and marine vessel cleaning. Remove barnacles, paint, and corrosion while preserving the underlying surface.',
    'Fire & Water Damage': 'Emergency restoration services for fire and water damaged structures. Fast, effective cleanup and surface preparation.',
    'Food Processing Equipment': 'FDA-compliant cleaning of food processing machinery. Safe, thorough cleaning that meets all food safety standards.'
  };
  
  // Check if service has meaningful text (not placeholder text)
  if (service.text && !service.text.includes('text...') && service.text.trim().length > 10) {
    return service.text;
  }
  
  return defaultDescriptions[service.title] || '';
};

const HomeClient: React.FC<HomeClientProps> = ({ page, settings, testimonials }) => {
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  // Mark initial load as complete and prevent animation re-runs
  useEffect(() => {
    // Mark initial load complete after a short delay to allow animations to finish
    const timer = setTimeout(() => {
      setInitialLoadComplete(true);
      // Add a class to body to prevent future animations
      document.body.classList.add('animations-complete');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Get services from the Home page services_cards field  
  const displayServices = page?.services_cards;

  // Get content sections
  const heroSection = page?.content_sections?.find(section => section.type === 'hero');
  const aboutSection = page?.content_sections?.find(section => section.type === 'about_process');
  const latestWorkSection = page?.content_sections?.find(section => section.type === 'latest_work');
  const testimonialSection = page?.content_sections?.find(section => section.type === 'testimonial');
  
  const featuredTestimonial = testimonials?.[0];

  return (
    <Box id="home-main">
      {/* Hero Section with Video Background */}
      <Box 
        id="hero-section"
        position="relative" 
        height={{ base: "40vh", md: "50vh" }}
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <AspectRatio ratio={16/9} position="absolute" top={0} left={0} w="100%" h="100%" zIndex={-1}>
          <video 
            autoPlay 
            loop 
            muted 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="/assets/videos/food-equipment.mp4" type="video/mp4" />
          </video>
        </AspectRatio>
        <Box 
          id="hero-overlay"
          position="absolute" 
          top={0} 
          left={0} 
          w="100%" 
          h="100%" 
          bg="blackAlpha.400"
          zIndex={1}
        />
      </Box>
      <PhoneNumber phoneNumber={settings?.phone_number} />
      {/* Main Content Section */}
      <Box 
        id="main-content-section"
        py={16}
        position="relative"
      >
        <NextImage
          src="/assets/images/bg-3.jpg"
          alt="Background"
          fill
          style={{
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            backgroundAttachment: 'fixed',
          }}
          quality={100}
          priority
          fetchPriority="high"
        />
        <Box id="main-content-overlay" position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.300" zIndex={0} />
        <Container id="main-content-container" maxW="container.xl" position="relative" zIndex={1}>
          <VStack id="main-content-stack" gap={12}>
            {(page?.hero_title || heroSection?.title || page?.title) && (
              <Heading 
                size="xl" 
                textAlign="center" 
                color="white"
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                textTransform="uppercase"
                fontSize={{ base: "2xl", md: "3xl" }}
                mb={8}
              >
                {page?.hero_title || heroSection?.title || page?.title}
              </Heading>
            )}

            {/* Services Grid */}
            <VStack gap={8} w="100%">
              {displayServices && displayServices.length > 0 && (
                <SimpleGrid 
                  id="services-grid" 
                  columns={{ base: 1, md: 3 }} 
                  gap={8} 
                  w="100%"
                  key={`services-${displayServices.length}-${initialLoadComplete}`}
                >
                {displayServices.map((service, index) => {
                  const imageSrc = service.image 
                    ? getFileUrl(service.image) 
                    : null;
                  
                  return (
                    <VStack 
                      key={`${service.title}-${index}`}
                      id={`service-card-${index}`}
                      bg="white" 
                      p={6} 
                      borderRadius="lg" 
                      gap={4} 
                      textAlign="center"
                    >
                      {imageSrc && (
                        <Image 
                          src={imageSrc}
                          alt={service.title}
                          borderRadius="md"
                          w="100%"
                          h="auto"
                          aspectRatio={4/3}
                          objectFit="cover"
                          />
                      )}
                      <Link href={getServiceUrl(service.service_page || getServiceIdByTitle(service.title))}>
                        <Heading fontSize="1.1rem" color="#228b22" fontFamily="Arvo, Georgia, serif" _hover={{ textDecoration: "underline" }}>
                          {service.title}
                        </Heading>
                      </Link>
                      <Text 
                        fontSize="sm"
                        fontFamily="Open Sans, sans-serif"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {getServiceDescription(service)}
                      </Text>
                    </VStack>
                  );
                })}
                </SimpleGrid>
              )}
            </VStack>
          </VStack>
        </Container>
      </Box>
      {/* How does soda blasting work section */}
      {aboutSection && (
        <Box id="about-section" bg="#228b22" color="white" py={16}>
          <Container id="about-container" maxW="container.xl">
            <SimpleGrid id="about-grid" columns={{ base: 1, md: 2 }} gap={12} alignItems="center">
              <Box id="about-image-container">
                <Image 
                  src="/assets/images/about.jpg" 
                  alt="Soda blasting process"
                  borderRadius="lg"
                  w="100%"
                  className="image-slide-left"
                />
              </Box>
              <VStack id="about-content" gap={6} align="flex-start">
                {aboutSection.title && (
                  <Heading 
                    size="2xl" 
                    fontFamily="Arvo, Georgia, serif"
                    fontWeight="bold"
                    textTransform="uppercase"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    color="white"
                  >
                    {aboutSection.title}
                  </Heading>
                )}
                {aboutSection.content && (
                  <Text fontSize="lg" fontFamily="Open Sans, sans-serif" lineHeight="1.6">
                    {aboutSection.content}
                  </Text>
                )}
                {aboutSection?.content && aboutSection.content.includes('\n') && 
                  aboutSection.content.split('\n').slice(1).map((paragraph, index) => (
                    <Text key={index} fontSize="lg" fontFamily="Open Sans, sans-serif" lineHeight="1.6">
                      {paragraph}
                    </Text>
                  ))
                }
              </VStack>
            </SimpleGrid>
          </Container>
        </Box>
      )}
      {/* Latest Work section */}
      {latestWorkSection && (
        <Box id="latest-work-section" bg="gray.700" color="white" py={16}>
          <Container id="latest-work-container" maxW="container.xl">
            <VStack id="latest-work-content" gap={8}>
              {latestWorkSection.title && (
                <Heading 
                  size="xl" 
                  textAlign="center"
                  fontFamily="Arvo, Georgia, serif"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  {latestWorkSection.title}
                </Heading>
              )}
              {latestWorkSection.content && (
                <Text textAlign="center" maxW="2xl" fontFamily="Open Sans, sans-serif">
                  {latestWorkSection.content}
                </Text>
              )}
              {settings?.social_instagram && (
                <Button 
                  as="a"
                  size="lg"
                  bg="green.500"
                  color="white"
                  _hover={{ bg: "green.600" }}
                  {...({ href: settings.social_instagram, target: "_blank", rel: "noopener noreferrer" } as Record<string, string>)}
                >
                  Follow on Instagram
                </Button>
              )}
            </VStack>
          </Container>
        </Box>
      )}
      {/* Testimonial section */}
      {(featuredTestimonial || testimonialSection) && (
        <Box 
          id="testimonial-section"
          bgImage="url('/assets/images/quotebg.jpg')"
          backgroundAttachment={{ base: "scroll", md: "fixed" }}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          py={20}
          position="relative"
          overflow="hidden"
        >
          <Box 
            id="testimonial-overlay"
            position="absolute" 
            top={0} 
            left={0} 
            w="100%" 
            h="100%" 
            bg="blackAlpha.600"
          />
          <Container id="testimonial-container" maxW="container.lg" position="relative" zIndex={1}>
            <VStack id="testimonial-content" gap={8} textAlign="center">
              {(featuredTestimonial?.quote || testimonialSection?.content) && (
                <Text 
                  fontSize={{ base: "18px", md: "24px", lg: "32px" }}
                  fontFamily="Arvo, Georgia, serif"
                  color="white"
                  lineHeight="1.4"
                  fontStyle="italic"
                  textShadow="2px 2px 4px rgba(0,0,0,0.5)"
                >
                  &quot;{featuredTestimonial?.quote || testimonialSection?.content}&quot;
                </Text>
              )}
              {featuredTestimonial?.client_name && (
                <VStack 
                  id="testimonial-author"
                  gap={2}
                >
                  <Text 
                    fontSize="lg" 
                    fontWeight="bold" 
                    color="white"
                    fontFamily="Arvo, Georgia, serif"
                    textShadow="1px 1px 2px rgba(0,0,0,0.7)"
                  >
                    {featuredTestimonial.client_name}
                  </Text>
                </VStack>
              )}
            </VStack>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default HomeClient;
