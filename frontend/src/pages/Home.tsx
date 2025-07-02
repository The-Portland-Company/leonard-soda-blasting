import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
  Link,
  AspectRatio,
} from '@chakra-ui/react';
import PhoneNumber from '../components/PhoneNumber';
import { usePage, useGlobalSettings, useServices, useTestimonials } from '../hooks/useDirectus';
import { updateSEOTags, createPageSEO } from '../utils/seo';

// Static service data as fallback
const fallbackServices = [
  {
    id: 'commercial-industrial',
    title: 'Commercial & Industrial',
    description: 'Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.',
    image: '/assets/images/commercial-industrial.jpg',
    route: '/soda-blasting/commercial-industrial'
  },
  {
    id: 'automotive',
    title: 'Automotive',
    description: 'Gentle yet effective paint and coating removal for classic cars, motorcycles, and automotive parts without damaging the underlying metal.',
    image: '/assets/images/automotive-1.jpg',
    route: '/soda-blasting/automotive-soda-blasting'
  },
  {
    id: 'food-processing',
    title: 'Food Processing Equipment',
    description: 'FDA-compliant cleaning of food processing equipment and facilities ensuring the highest standards of cleanliness and safety.',
    image: '/assets/images/food-processing-equipment.jpg',
    route: '/soda-blasting/food-processing-equipment'
  },
  {
    id: 'fire-damage',
    title: 'Fire & Water Damage',
    description: 'Restoration services for fire and water damaged structures, removing smoke, soot, and contaminants safely and effectively.',
    image: '/assets/images/fire-damage.jpg',
    route: '/soda-blasting/fire-and-water-damage-restoration-soda-blasting'
  },
  {
    id: 'aircraft',
    title: 'Aircraft',
    description: 'Specialized aircraft cleaning and maintenance services meeting aviation industry standards for safety and precision.',
    image: '/assets/images/aircraft.jpg',
    route: '/soda-blasting/airplane-soda-blasting'
  },
  {
    id: 'marine',
    title: 'Boat & Marine',
    description: 'Marine vessel cleaning and restoration services for boats, yachts, and marine equipment with environmentally safe methods.',
    image: '/assets/images/boat-1.jpg',
    route: '/soda-blasting/boat-and-marine-soda-blasting'
  }
];

const Home: React.FC = () => {
  const { page } = usePage('home');
  const { settings } = useGlobalSettings();
  const { services } = useServices();
  const { testimonials } = useTestimonials(true); // Get featured testimonials
  
  // Use fallback services if dynamic services are empty
  const displayServices = services.length > 0 ? services : fallbackServices;
  
  // Debug: Force title update immediately when component mounts
  useEffect(() => {
    console.log('Home component mounted, setting title...');
    document.title = "Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping";
    console.log('Document title is now:', document.title);
  }, []);
  

  // Update SEO when data loads - but don't override the Helmet title
  useEffect(() => {
    if (page || settings) {
      const seoData = createPageSEO(
        page, 
        settings, 
        "Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping",
        "Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning."
      );
      // Only update meta tags, not title (Helmet handles title)
      updateSEOTags({ ...seoData, title: undefined });
    }
  }, [page, settings]);

  // Get content sections
  const heroSection = page?.content_sections?.find(section => section.type === 'hero');
  const servicesSection = page?.content_sections?.find(section => section.type === 'services_grid');
  const aboutSection = page?.content_sections?.find(section => section.type === 'about_process');
  const latestWorkSection = page?.content_sections?.find(section => section.type === 'latest_work');
  const testimonialSection = page?.content_sections?.find(section => section.type === 'testimonial');
  
  const featuredTestimonial = testimonials?.[0];

  return (
    <Box>
      <Helmet>
        <title>Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping</title>
        <meta name="description" content="Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning." />
      </Helmet>
      {/* Hero Section with Video Background */}
      <Box 
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
        bgImage="url('/assets/images/bg-3.jpg')"
        backgroundAttachment={{ base: "scroll", md: "fixed" }}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        py={16}
        position="relative"
      >
        <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.300" />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack gap={12}>
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
              {heroSection?.title || page?.hero_title || "100% Eco-Friendly Cleaning and Stripping"}
            </Heading>

            {/* Services Grid */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="100%">
              {displayServices.slice(0, 6).map((service, index) => (
                <VStack 
                  key={service.id}
                  bg="white" 
                  p={6} 
                  borderRadius="lg" 
                  gap={4} 
                  textAlign="center"
                >
                  <Image 
                    src={'featured_image' in service && service.featured_image 
                      ? `http://localhost:8055/assets/${service.featured_image}` 
                      : 'image' in service ? service.image : '/assets/images/commercial.jpg'} 
                    alt={service.title}
                    borderRadius="md"
                    w="100%"
                    h="200px"
                    objectFit="cover"
                  />
                  <Heading size="md" color="#228b22" fontFamily="Arvo, Georgia, serif">
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
                    {service.description}
                  </Text>
                  <RouterLink to={'route' in service ? service.route : `/services/${service.slug}`}>
                    <Text color="#228b22" fontWeight="bold" fontFamily="Arvo, Georgia, serif">
                      More Info →
                    </Text>
                  </RouterLink>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* How does soda blasting work section */}
      <Box bg="#228b22" color="white" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={12} alignItems="center">
            <Box>
              <Image 
                src="/assets/images/about.jpg" 
                alt="Soda blasting process"
                borderRadius="lg"
                w="100%"
                className="image-slide-left"
              />
            </Box>
            <VStack gap={6} align="flex-start">
              <Heading 
                size="2xl" 
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                textTransform="uppercase"
                fontSize={{ base: "2xl", md: "3xl" }}
                color="white"
              >
                {aboutSection?.title || "How does soda blasting work?"}
              </Heading>
              <Text fontSize="lg" fontFamily="Open Sans, sans-serif" lineHeight="1.6">
                {aboutSection?.content || "Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating."}
              </Text>
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

      {/* Latest Work section */}
      <Box bg="gray.700" color="white" py={16}>
        <Container maxW="container.xl">
          <VStack gap={8}>
            <Heading 
              size="xl" 
              textAlign="center"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {latestWorkSection?.title || "Latest Work"}
            </Heading>
            <Text textAlign="center" maxW="2xl" fontFamily="Open Sans, sans-serif">
              {latestWorkSection?.content || "Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting."}
            </Text>
            <Button 
              asChild
              colorPalette="green"
              size="lg"
            >
              <a 
                href={settings?.social_instagram || "https://www.instagram.com/leonardsodablasting/"} 
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow on Instagram
              </a>
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Testimonial section */}
      <Box 
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
          position="absolute" 
          top={0} 
          left={0} 
          w="100%" 
          h="100%" 
          bg="blackAlpha.600"
        />
        <Container maxW="container.lg" position="relative" zIndex={1}>
          <VStack gap={8} textAlign="center">
            <Text 
              fontSize={{ base: "18px", md: "24px", lg: "32px" }}
              fontFamily="Arvo, Georgia, serif"
              color="white"
              lineHeight="1.4"
              fontStyle="italic"
              textShadow="2px 2px 4px rgba(0,0,0,0.5)"
            >
              "{featuredTestimonial?.quote || testimonialSection?.content || "Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."}"
            </Text>
            <VStack 
              gap={2}
            >
              <Text 
                fontSize="lg" 
                fontWeight="bold" 
                color="white"
                fontFamily="Arvo, Georgia, serif"
                textShadow="1px 1px 2px rgba(0,0,0,0.7)"
              >
                {featuredTestimonial?.client_name || "Jim Clarke"}
              </Text>
              <Text 
                fontSize="md" 
                color="gray.200"
                fontFamily="Open Sans, sans-serif"
                textShadow="1px 1px 2px rgba(0,0,0,0.7)"
              >
                {featuredTestimonial?.client_title && featuredTestimonial?.client_company 
                  ? `${featuredTestimonial.client_title}, ${featuredTestimonial.client_company}`
                  : "President, Northwest Restoration"}
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;