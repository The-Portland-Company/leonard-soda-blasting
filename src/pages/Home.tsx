import React, { useEffect } from 'react';
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
import { usePage, useGlobalSettings } from '../hooks/useDirectus';

const Home: React.FC = () => {
  const { page } = usePage('home');
  const { settings } = useGlobalSettings();
  
  useEffect(() => {
    document.title = page?.meta_title || settings.site_title || "Leonard Soda Blasting";
  }, [page, settings]);

  return (
    <Box>
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
              100% Eco-Friendly Cleaning and Stripping
            </Heading>

            {/* First Row of Services */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="100%">
              <VStack 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                gap={4} 
                textAlign="center"
              >
                <Image 
                  src="/assets/images/commercial.jpg" 
                  alt="Commercial & Industrial"
                  borderRadius="md"
                  w="100%"
                  h="300px"
                  objectFit="cover"
                />
                <Heading size="md" color="green.500">
                  Commercial & Industrial
                </Heading>
                <Text fontSize="sm">
                  We can clean your equipment without harming the surfaces, and in many cases without even stopping your machines.
                </Text>
                <Link color="green.500" href="/services">
                  More Info →
                </Link>
              </VStack>

              <VStack 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                gap={4} 
                textAlign="center"
              >
                <Image 
                  src="/assets/images/automotive-1.jpg" 
                  alt="Automotive"
                  borderRadius="md"
                  w="100%"
                  h="300px"
                  objectFit="cover"
                />
                <Heading size="md" color="green.500">
                  Automotive
                </Heading>
                <Text fontSize="sm">
                  Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.
                </Text>
                <Link color="green.500" href="/soda-blasting/automobile-soda-blasting">
                  More Info →
                </Link>
              </VStack>

              <VStack 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                gap={4} 
                textAlign="center"
              >
                <Image 
                  src="/assets/images/food-processing-equipment.jpg" 
                  alt="Food Processing Equipment"
                  borderRadius="md"
                  w="100%"
                  h="300px"
                  objectFit="cover"
                />
                <Heading size="md" color="green.500">
                  Food Processing Equipment
                </Heading>
                <Text fontSize="sm">
                  Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.
                </Text>
                <Link color="green.500" href="/soda-blasting/food-processing-equipment">
                  More Info →
                </Link>
              </VStack>
            </SimpleGrid>

            {/* Second Row of Services */}
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="100%">
              <VStack 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                gap={4} 
                textAlign="center"
              >
                <Image 
                  src="/assets/images/fire-damage.jpg" 
                  alt="Fire & Water Damage"
                  borderRadius="md"
                  w="100%"
                  h="300px"
                  objectFit="cover"
                />
                <Heading size="md" color="green.500">
                  Fire & Water Damage
                </Heading>
                <Text fontSize="sm">
                  After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.
                </Text>
                <Link color="green.500" href="/soda-blasting/fire-water-damage-restoration">
                  More Info →
                </Link>
              </VStack>

              <VStack 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                gap={4} 
                textAlign="center"
              >
                <Image 
                  src="/assets/images/aircraft.jpg" 
                  alt="Aircraft"
                  borderRadius="md"
                  w="100%"
                  h="300px"
                  objectFit="cover"
                />
                <Heading size="md" color="green.500">
                  Aircraft
                </Heading>
                <Text fontSize="sm">
                  Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.
                </Text>
                <Link color="green.500" href="/soda-blasting/airplane-soda-blasting">
                  More Info →
                </Link>
              </VStack>

              <VStack 
                bg="white" 
                p={6} 
                borderRadius="lg" 
                gap={4} 
                textAlign="center"
              >
                <Image 
                  src="/assets/images/boat-1.jpg" 
                  alt="Boat & Marine"
                  borderRadius="md"
                  w="100%"
                  h="300px"
                  objectFit="cover"
                />
                <Heading size="md" color="green.500">
                  Boat & Marine
                </Heading>
                <Text fontSize="sm">
                  One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.
                </Text>
                <Link color="green.500" href="/soda-blasting/boat-and-marine-soda-blasting">
                  More Info →
                </Link>
              </VStack>
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
                How does soda blasting work?
              </Heading>
              <Text fontSize="lg" fontFamily="Open Sans, sans-serif" lineHeight="1.6">
                Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating.
              </Text>
              <Text fontSize="lg" fontFamily="Open Sans, sans-serif" lineHeight="1.6">
                The sodium bicarbonate and blasting machine work in unison to perform this removal process in a nondestructive manner. The soda blasting is usually done in open air, booth or cabinet. The Soda Blaster is ideal for cleaning all types of delicate equipment and surfaces. It eliminates sanding, soaking, scrubbing, and abrasive blasting.
              </Text>
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
              Latest Work
            </Heading>
            <Text textAlign="center" maxW="2xl" fontFamily="Open Sans, sans-serif">
              Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting.
            </Text>
            <Button 
              asChild
              colorPalette="green"
              size="lg"
            >
              <a 
                href="https://www.instagram.com/leonardsodablasting/" 
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
              "Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team."
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
                Jim Clarke
              </Text>
              <Text 
                fontSize="md" 
                color="gray.200"
                fontFamily="Open Sans, sans-serif"
                textShadow="1px 1px 2px rgba(0,0,0,0.7)"
              >
                President, Northwest Restoration
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;