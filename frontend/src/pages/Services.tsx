import React, { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  HStack,
  Button,
} from '@chakra-ui/react';
import PhoneNumber from '../components/PhoneNumber';
import { usePage, useGlobalSettings, useServices } from '../hooks/useDirectus';
import { updateSEOTags, createPageSEO } from '../utils/seo';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  applications: string[];
  route: string;
}

const services: Service[] = [
  {
    id: 'commercial-industrial',
    title: 'Commercial & Industrial',
    description: 'Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.',
    image: '/assets/images/commercial-industrial.jpg',
    features: [
      'Licensed contractor since 1989',
      'Industrial grade equipment',
      'Safety compliant processes',
      'Scheduled completion',
      'Professional manpower'
    ],
    applications: [
      'Warehouse cleaning',
      'Machinery degreasing',
      'Parking garage restoration',
      'Equipment maintenance',
      'Facility preparation'
    ],
    route: '/soda-blasting/commercial-industrial'
  },
  {
    id: 'automotive',
    title: 'Automotive',
    description: 'Gentle yet effective paint and coating removal for classic cars, motorcycles, and automotive parts without damaging the underlying metal.',
    image: '/assets/images/automotive-1.jpg',
    features: [
      'Paint stripping without warping',
      'Chrome and trim safe',
      'No media embedment',
      'Preserves original surfaces',
      'Fast and efficient'
    ],
    applications: [
      'Classic car restoration',
      'Motorcycle refinishing',
      'Automotive parts cleaning',
      'Engine compartment cleaning',
      'Wheel and rim restoration'
    ],
    route: '/soda-blasting/automotive-soda-blasting'
  },
  {
    id: 'food-processing',
    title: 'Food Processing Equipment',
    description: 'FDA-compliant cleaning of food processing equipment and facilities ensuring the highest standards of cleanliness and safety.',
    image: '/assets/images/food-processing-equipment.jpg',
    features: [
      'FDA compliant process',
      'Food grade sodium bicarbonate',
      'No chemical residue',
      'Sanitization ready',
      'USDA approved'
    ],
    applications: [
      'Processing equipment',
      'Conveyor systems',
      'Storage tanks',
      'Production lines',
      'Commercial kitchens'
    ],
    route: '/soda-blasting/food-processing-equipment'
  },
  {
    id: 'fire-damage',
    title: 'Fire & Water Damage',
    description: 'Restoration services for fire and water damaged structures, removing smoke, soot, and contaminants safely and effectively.',
    image: '/assets/images/fire-damage.jpg',
    features: [
      'Smoke and soot removal',
      'Odor elimination',
      'Surface restoration',
      'Non-toxic process',
      'Insurance approved'
    ],
    applications: [
      'Fire damaged buildings',
      'Smoke remediation',
      'Soot removal',
      'Structural cleaning',
      'Content restoration'
    ],
    route: '/soda-blasting/fire-and-water-damage-restoration-soda-blasting'
  },
  {
    id: 'aircraft',
    title: 'Aircraft',
    description: 'Specialized aircraft cleaning and maintenance services meeting aviation industry standards for safety and precision.',
    image: '/assets/images/aircraft.jpg',
    features: [
      'Aviation industry approved',
      'Non-sparking process',
      'Precision cleaning',
      'No substrate damage',
      'Quick turnaround'
    ],
    applications: [
      'Aircraft paint removal',
      'Engine cleaning',
      'Landing gear maintenance',
      'Corrosion removal',
      'Surface preparation'
    ],
    route: '/soda-blasting/airplane-soda-blasting'
  },
  {
    id: 'log-homes',
    title: 'Log Homes',
    description: 'Gentle cleaning and restoration of log homes and wood structures, removing stains and preparing surfaces for new finishes.',
    image: '/assets/images/log-homes.jpg',
    features: [
      'Wood-safe cleaning',
      'Stain removal',
      'Surface preparation',
      'Preserves wood integrity',
      'Eco-friendly process'
    ],
    applications: [
      'Log home exteriors',
      'Deck restoration',
      'Fence cleaning',
      'Wood siding',
      'Timber structures'
    ],
    route: '/soda-blasting/log-home-soda-blasting'
  },
  {
    id: 'marine',
    title: 'Boat & Marine',
    description: 'Marine vessel cleaning and restoration services for boats, yachts, and marine equipment with environmentally safe methods.',
    image: '/assets/images/boat-1.jpg',
    features: [
      'Hull cleaning and preparation',
      'Eco-friendly marine safe',
      'Fiberglass friendly',
      'No hull damage',
      'Antifouling removal'
    ],
    applications: [
      'Boat hull cleaning',
      'Yacht maintenance',
      'Marine equipment',
      'Dock and pier cleaning',
      'Propeller restoration'
    ],
    route: '/soda-blasting/boat-and-marine-soda-blasting'
  }
];

const Services: React.FC = () => {
  const { page } = usePage('services');
  const { settings } = useGlobalSettings();
  // TODO: implement dynamic services when needed
  // const { services: dynamicServices } = useServices();

  // Debug: Force title update immediately when component mounts


  // Update SEO when data loads - but don't override the Helmet title
  useEffect(() => {
    if (page || settings) {
      const seoData = createPageSEO(page, settings);
      // Only update meta tags, not title (Helmet handles title)
      updateSEOTags({ ...seoData, title: undefined });
    }
  }, [page, settings]);

  return (
    <Box id="services-main">
      <SEOHead
        title={page?.title}
        metaTitle={page?.meta_title}
        metaDescription={page?.meta_description}
        defaultTitle="Services - Leonard Soda Blasting"
        defaultDescription="Professional soda blasting services for commercial, automotive, marine, aircraft, and industrial applications."
        defaultKeywords="soda blasting services, commercial cleaning, automotive restoration, marine cleaning, aircraft cleaning, industrial cleaning"
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
              Our Services
            </Heading>
            <Text fontSize="xl" maxW="2xl" fontFamily="Open Sans, sans-serif">
              Professional soda blasting services across multiple industries and applications
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Services Overview */}
      <Box id="services-overview-section" bg="white" py={16}>
        <Container id="services-overview-container" maxW="container.xl">
          <VStack id="services-overview-content" gap={12}>
            <VStack id="services-overview-text" gap={6} textAlign="center">
              <Heading 
                size="xl" 
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                textTransform="uppercase"
                color="#228b22"
              >
                Why Choose Soda Blasting?
              </Heading>
              <Text fontSize="lg" maxW="3xl" fontFamily="Open Sans, sans-serif" lineHeight="1.6">
                Soda blasting is the environmentally safe, non-destructive cleaning method that effectively removes coatings, 
                contaminants, and buildup without damaging underlying surfaces. Our FDA, OSHA, EPA, and USDA compliant process 
                is perfect for delicate restoration work and heavy-duty industrial cleaning alike.
              </Text>
            </VStack>

            <SimpleGrid id="benefits-grid" columns={{ base: 1, md: 2, lg: 4 }} gap={8} w="100%">
              <VStack id="benefit-eco-friendly" gap={4} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  bg="#228b22"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" color="white">🌱</Text>
                </Box>
                <Heading size="md" fontFamily="Arvo, Georgia, serif" color="#228b22">
                  Eco-Friendly
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif" textAlign="center">
                  100% environmentally safe sodium bicarbonate process
                </Text>
              </VStack>

              <VStack id="benefit-non-destructive" gap={4} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  bg="#228b22"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" color="white">🛡️</Text>
                </Box>
                <Heading size="md" fontFamily="Arvo, Georgia, serif" color="#228b22">
                  Non-Destructive
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif" textAlign="center">
                  Gentle process that won't damage underlying surfaces
                </Text>
              </VStack>

              <VStack id="benefit-compliant" gap={4} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  bg="#228b22"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" color="white">✅</Text>
                </Box>
                <Heading size="md" fontFamily="Arvo, Georgia, serif" color="#228b22">
                  Compliant
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif" textAlign="center">
                  FDA, OSHA, EPA, and USDA approved process
                </Text>
              </VStack>

              <VStack id="benefit-efficient" gap={4} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  bg="#228b22"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" color="white">⚡</Text>
                </Box>
                <Heading size="md" fontFamily="Arvo, Georgia, serif" color="#228b22">
                  Efficient
                </Heading>
                <Text fontSize="sm" fontFamily="Open Sans, sans-serif" textAlign="center">
                  Fast, effective cleaning with minimal cleanup required
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box id="services-grid-section" bg="gray.50" py={16}>
        <Container id="services-grid-container" maxW="container.xl">
          <VStack id="services-grid-content" gap={12}>
            <Heading 
              size="xl" 
              textAlign="center"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
              color="#228b22"
            >
              Our Specialized Services
            </Heading>
            
            <SimpleGrid 
              id="services-grid"
              columns={{ base: 1, md: 2 }} 
              gap={12} 
              w="100%"
            >
              {services.map((service) => (
                <Box
                  key={service.id}
                  id={`service-card-${service.id}`}
                  bg="white"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    w="100%"
                    h="300px"
                    objectFit="cover"
                  />
                  
                  <Box id={`service-content-${service.id}`} p={8}>
                    <VStack id={`service-details-${service.id}`} gap={6} align="flex-start">
                      <Heading 
                        size="lg" 
                        color="#228b22"
                        fontFamily="Arvo, Georgia, serif"
                        fontWeight="bold"
                      >
                        {service.title}
                      </Heading>
                      
                      <Text 
                        fontSize="md" 
                        color="gray.700"
                        fontFamily="Open Sans, sans-serif"
                        lineHeight="1.6"
                      >
                        {service.description}
                      </Text>

                      <SimpleGrid id={`service-features-${service.id}`} columns={2} gap={6} w="100%">
                        <VStack id={`service-features-list-${service.id}`} gap={3} align="flex-start">
                          <Heading size="sm" fontFamily="Arvo, Georgia, serif" color="#228b22">
                            Key Features:
                          </Heading>
                          <VStack id={`service-features-items-${service.id}`} gap={2} align="flex-start">
                            {service.features.slice(0, 3).map((feature, index) => (
                              <HStack key={index} align="center" fontSize="sm" fontFamily="Open Sans, sans-serif">
                                <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                                <Text>{feature}</Text>
                              </HStack>
                            ))}
                          </VStack>
                        </VStack>

                        <VStack id={`service-applications-list-${service.id}`} gap={3} align="flex-start">
                          <Heading size="sm" fontFamily="Arvo, Georgia, serif" color="#228b22">
                            Applications:
                          </Heading>
                          <VStack id={`service-applications-items-${service.id}`} gap={2} align="flex-start">
                            {service.applications.slice(0, 3).map((application, index) => (
                              <HStack key={index} align="center" fontSize="sm" fontFamily="Open Sans, sans-serif">
                                <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                                <Text>{application}</Text>
                              </HStack>
                            ))}
                          </VStack>
                        </VStack>
                      </SimpleGrid>

                      <RouterLink to={service.route}>
                        <Button
                          bg="#228b22"
                          color="white"
                          size="md"
                          fontFamily="Arvo, Georgia, serif"
                          textTransform="uppercase"
                          letterSpacing="1px"
                        >
                          Learn More
                        </Button>
                      </RouterLink>
                    </VStack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Service Areas */}
      <Box id="service-areas-section" bg="white" py={16}>
        <Container id="service-areas-container" maxW="container.xl">
          <VStack id="service-areas-content" gap={12}>
            <VStack id="service-areas-header" gap={6} textAlign="center">
              <Heading 
                size="xl" 
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                textTransform="uppercase"
                color="#228b22"
              >
                Service Areas
              </Heading>
              <Text fontSize="lg" maxW="3xl" fontFamily="Open Sans, sans-serif" lineHeight="1.6">
                Leonard Soda Blasting proudly serves Oregon and Washington with mobile soda blasting services. 
                We bring our equipment directly to your location for maximum convenience.
              </Text>
            </VStack>

            <SimpleGrid id="service-areas-grid" columns={{ base: 1, md: 2 }} gap={12} alignItems="center">
              <VStack id="oregon-coverage" gap={6} align="flex-start">
                <Heading size="lg" fontFamily="Arvo, Georgia, serif" color="#228b22">
                  Oregon Coverage:
                </Heading>
                <VStack id="oregon-areas" gap={3} align="flex-start" fontSize="lg" fontFamily="Open Sans, sans-serif">
                  <HStack align="center">
                    <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                    <Text>Portland Metro Area</Text>
                  </HStack>
                  <HStack align="center">
                    <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                    <Text>Salem and Surrounding Areas</Text>
                  </HStack>
                  <HStack align="center">
                    <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                    <Text>Central Oregon</Text>
                  </HStack>
                  <HStack align="center">
                    <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                    <Text>Coastal Regions</Text>
                  </HStack>
                  <HStack align="center">
                    <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                    <Text>Eugene and Southern Oregon</Text>
                  </HStack>
                </VStack>
              </VStack>

              <VStack id="washington-coverage" gap={6} align="flex-start">
                <Heading size="lg" fontFamily="Arvo, Georgia, serif" color="#228b22">
                  Washington Coverage:
                </Heading>
                <VStack id="washington-areas" gap={3} align="flex-start" fontSize="lg" fontFamily="Open Sans, sans-serif">
                  <HStack align="center">
                    <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                    <Text>Southwest Washington</Text>
                  </HStack>
                  <HStack align="center">
                    <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                    <Text>Vancouver and Clark County</Text>
                  </HStack>
                  <HStack align="center">
                    <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                    <Text>Olympia Region</Text>
                  </HStack>
                  <HStack align="center">
                    <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                    <Text>Tacoma Area</Text>
                  </HStack>
                  <HStack align="center">
                    <Box w={2} h={2} bg="#228b22" borderRadius="full" />
                    <Text>Custom Travel Available</Text>
                  </HStack>
                </VStack>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Contact CTA Section */}
      <Box id="contact-cta-section" bg="#228b22" color="white" py={16}>
        <Container id="contact-cta-container" maxW="container.xl">
          <VStack id="contact-cta-content" gap={8} textAlign="center">
            <Heading 
              size="xl" 
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Ready to Get Started?
            </Heading>
            <Text fontSize="lg" maxW="2xl" fontFamily="Open Sans, sans-serif">
              Contact Leonard Soda Blasting today for a free estimate on your project. We'll discuss your specific needs 
              and provide expert recommendations for the best approach to your cleaning challenge.
            </Text>
            <VStack id="contact-info" gap={4}>
              <Text fontSize="2xl" fontWeight="bold">
                📞 (503) 894-5973
              </Text>
              <Text fontSize="lg">
                greg@leonardsodablasting.com
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                CCB# 97926 • Licensed & Insured
              </Text>
            </VStack>
            <HStack id="cta-buttons" gap={4} mt={4}>
              <RouterLink to="/gallery">
                <Button
                  variant="outline"
                  borderColor="white"
                  color="white"
                  size="lg"
                  fontFamily="Arvo, Georgia, serif"
                  textTransform="uppercase"
                >
                  View Our Work
                </Button>
              </RouterLink>
              <RouterLink to="/about-soda-blasting">
                <Button
                  bg="white"
                  color="#228b22"
                  size="lg"
                  fontFamily="Arvo, Georgia, serif"
                  textTransform="uppercase"
                >
                  Learn About Soda Blasting
                </Button>
              </RouterLink>
            </HStack>
          </VStack>
        </Container>
      </Box>
      
      <PhoneNumber />
    </Box>
  );
};

export default Services;