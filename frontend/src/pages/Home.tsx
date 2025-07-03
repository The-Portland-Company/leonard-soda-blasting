import React, { useEffect, useState } from 'react';
import SEOHead from '../components/SEOHead';
import { Link as RouterLink } from 'react-router-dom';
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
  Flex,
} from '@chakra-ui/react';
import PhoneNumber from '../components/PhoneNumber';
import { usePage, useGlobalSettings, useTestimonials } from '../hooks/useDirectus';
import { addDebugSuffix } from '../utils/debug';


import PageLoader from '../components/PageLoader';

const Home: React.FC = () => {
  const { page, loading: pageLoading, error: pageError } = usePage('home');
  const { settings, loading: settingsLoading, error: settingsError } = useGlobalSettings();
  const { testimonials, loading: testimonialsLoading, error: testimonialsError } = useTestimonials(); // Get all testimonials
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
  const servicesSection = page?.content_sections?.find(section => section.type === 'services_grid');
  const aboutSection = page?.content_sections?.find(section => section.type === 'about_process');
  const latestWorkSection = page?.content_sections?.find(section => section.type === 'latest_work');
  const testimonialSection = page?.content_sections?.find(section => section.type === 'testimonial');
  
  const featuredTestimonial = testimonials?.[0];

  if (pageError || settingsError || testimonialsError) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>Error loading page content. Please try again later.</Text>
      </Flex>
    );
  }

  return (
    <PageLoader loadingStates={[pageLoading, settingsLoading, testimonialsLoading]}>
      <Box id="home-main">
        <SEOHead
          title={page?.meta_title}
          metaDescription={page?.meta_description}
          defaultTitle="Leonard Soda Blasting"
          defaultDescription="Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning."
          defaultKeywords="soda blasting, eco-friendly cleaning, automotive restoration, paint removal, industrial cleaning"
        />
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

      <PhoneNumber />

      {/* Main Content Section */}
      <Box 
        id="main-content-section"
        bgImage="url('/assets/images/bg-3.jpg')"
        backgroundAttachment={{ base: "scroll", md: "fixed" }}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        py={16}
        position="relative"
      >
        <Box id="main-content-overlay" position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.300" />
        <Container id="main-content-container" maxW="container.xl" position="relative" zIndex={1}>
          <VStack id="main-content-stack" gap={12}>
            {(heroSection?.title || page?.page_title) && (
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
                {addDebugSuffix(
                  heroSection?.title || page?.page_title || page?.title, 
                  heroSection?.title ? 'heroSection.title' : (page?.page_title ? 'page_title' : 'title'),
                  !!(heroSection?.title || page?.page_title)
                )}
              </Heading>
            )}

            {/* Services Grid */}
            <VStack gap={8} w="100%">
              {servicesSection?.title && (
                <Heading 
                  size="xl" 
                  textAlign="center" 
                  color="white"
                  fontFamily="Arvo, Georgia, serif"
                  fontWeight="bold"
                  textTransform="uppercase"
                  fontSize={{ base: "xl", md: "2xl" }}
                >
                  {servicesSection.title}
                </Heading>
              )}
              {servicesSection?.content && (
                <Text 
                  textAlign="center" 
                  color="white"
                  fontFamily="Open Sans, sans-serif"
                  fontSize="lg"
                  maxW="2xl"
                >
                  {servicesSection.content}
                </Text>
              )}
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
                    ? `http://localhost:8055/assets/${service.image}` 
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
                        loading="lazy"
                      />
                    )}
                    <Heading fontSize="1.1rem" color="#228b22" fontFamily="Arvo, Georgia, serif">
                      {service.title}
                    </Heading>
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
                      {service.text}
                    </Text>
                    {service.service_page && (
                      <RouterLink to={`/pages/${service.service_page}`}>
                        <Text color="#228b22" fontWeight="bold" fontFamily="Arvo, Georgia, serif">
                          More Info →
                        </Text>
                      </RouterLink>
                    )}
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
                  asChild
                  colorPalette="green"
                  size="lg"
                >
                  <a 
                    href={settings.social_instagram} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow on Instagram
                  </a>
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
                  "{featuredTestimonial?.quote || testimonialSection?.content}"
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
    </PageLoader>
  );
};

export default Home;