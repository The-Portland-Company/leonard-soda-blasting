import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Text,
  Heading,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Image,
  Flex
} from '@chakra-ui/react';
import PhoneNumber from '../components/PhoneNumber';
import PageLoader from '../components/PageLoader';
import SEOHead from '../components/SEOHead';
import { usePage, useGlobalSettings } from '../hooks/useDirectus';

const FireWaterDamage: React.FC = () => {
  const { page, loading: pageLoading } = usePage('fire-water-damage');
  const { settings, loading: settingsLoading } = useGlobalSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    project: ''
  });

  const slideImages = [
    '/assets/images/fire-basement-before.jpg',
    '/assets/images/fire-basement-after.jpg',
    '/assets/images/fire-concrete-before.jpg',
    '/assets/images/fire-concrete-after.jpg',
    '/assets/images/fire-wall-before.jpg',
    '/assets/images/fire-wall-after.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <PageLoader loadingStates={[pageLoading, settingsLoading]}>
      <Box id="fire-water-damage-main">
        <SEOHead 
          title={page?.meta_title}
          metaDescription={page?.meta_description}
          defaultTitle="Fire & Water Damage Restoration - Leonard Soda Blasting"
          defaultDescription="Professional fire and water damage restoration using eco-friendly soda blasting. Remove smoke, soot, and contaminants safely."
          defaultKeywords="fire damage restoration, water damage, smoke removal, soot cleaning, damage restoration"
        />
      {/* Hero Section with Slideshow */}
      <Box 
        position="relative" 
        height="500px" 
        overflow="hidden"
        bg="#333333"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundImage={`url(${slideImages[currentSlide]})`}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        />
        <Container 
          position="relative" 
          zIndex={2} 
          height="100%" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
        >
          <Box textAlign="center" color="white">
            <Heading
              fontSize="41px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              color="white"
              lineHeight="1"
              textTransform="uppercase"
            >
              {page?.hero_title || page?.page_title || page?.title || "Fire & Water Damage"}
            </Heading>
          </Box>
        </Container>
        
        {/* Manual Navigation */}
        <HStack 
          position="absolute" 
          bottom="20px" 
          left="50%" 
          transform="translateX(-50%)" 
          gap={2}
        >
          {slideImages.map((_, index) => (
            <Box
              key={index}
              width="8px"
              height="8px"
              borderRadius="50%"
              bg={currentSlide === index ? "white" : "rgba(255,255,255,0.5)"}
              cursor="pointer"
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </HStack>
      </Box>

      <PhoneNumber />

      {/* Main Content Section */}
      <Box bg="#228b22" py={16}>
        <Container maxW="760px">
          <VStack gap={8} textAlign="center">
            <Heading
              fontSize="41px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              color="white"
              lineHeight="1"
              textTransform="uppercase"
            >
              Fire & Water Damage
            </Heading>
            <Text fontSize="24px" color="white" textAlign="left" maxW="760px">
              After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself. Even a minor house fire leaves behind a major mess and there's more to the destruction than meets the eye. There is the obvious fire damage plus smoke and water damage, not to mention the pervasive smell. Often there are repairs that need to be done and the first step is always to clean up the mess from both the fire and the process of putting it out.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* After the Fire Section */}
      <Box 
        backgroundImage="url(/assets/images/bg-3.jpg)"
        backgroundAttachment="fixed"
        backgroundSize="cover"
        backgroundPosition="center"
        py={16}
      >
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box>
              <Heading
                fontSize="41px"
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                color="#228b22"
                lineHeight="1"
                textTransform="uppercase"
                mb={6}
              >
                After the Fire
              </Heading>
              <Text fontSize="18px" color="#333333">
                When cleaning up after a fire and prepping for reconstruction many challenges will be encountered, such as the smell of smoke; soot and other residues; charred but salvageable rafters, beams, and flooring; and smoked up but salvageable fireplaces and basement walls.
              </Text>
            </Box>
            <Box textAlign="center">
              <Image 
                src="/assets/images/after-fire.jpg" 
                alt="After Fire Damage" 
                width="100%"
                height="auto"
                className="image-slide-right"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Soda Handles Issues Section */}
      <Box bg="#333333" py={16}>
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box textAlign="center">
              <Image 
                src="/assets/images/fire-brick-before-after.jpg" 
                alt="Fire Brick Before After" 
                width="100%"
                height="auto"
                className="image-slide-left"
              />
            </Box>
            <Box>
              <Heading
                fontSize="41px"
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                color="white"
                lineHeight="1"
                textTransform="uppercase"
                mb={6}
              >
                Soda Handles a Number of Issues
              </Heading>
              <Text fontSize="18px" color="white">
                Soda blasting is extremely effective way to handle the many different areas that need to be addressed after a fire. During fire restoration projects soda blasting is the preferred technique because it will effectively remove ash and soot from a sensitive substrate like wood or brick without damaging the surface. In addition, it also has the ability to neutralize most of the burn smell associated with structure fires.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Safe Non-Toxic Section */}
      <Box 
        backgroundImage="url(/assets/images/bg-3.jpg)"
        backgroundAttachment="fixed"
        backgroundSize="cover"
        backgroundPosition="center"
        py={16}
      >
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box>
              <Heading
                fontSize="41px"
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                color="#228b22"
                lineHeight="1"
                textTransform="uppercase"
                mb={6}
              >
                Safe, Non-Toxic & Thorough
              </Heading>
              <Text fontSize="18px" color="#333333">
                Baking soda blasting services are the method of the future when it comes to handling fire damage. Due to its low relative hardness of 2.5 and its exceptional odor neutralizing properties, baking soda blasting is a natural choice for restoration professionals. Leonard Soda Blasting is experienced in removing toxic residues, soot, and associated smells after a fire and we're happy to work with your insurance company to make sure that your home or business is clear of fire and smoke damage.
              </Text>
            </Box>
            <Box textAlign="center">
              <Image 
                src="/assets/images/water-before-after.jpg" 
                alt="Water Damage Before After" 
                width="100%"
                height="auto"
                className="image-slide-right"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Quote Form Section */}
      <Box bg="#228b22" py={16}>
        <Container maxW="730px">
          <VStack gap={8}>
            <Heading
              fontSize="41px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              color="white"
              lineHeight="1"
              textTransform="uppercase"
              textAlign="center"
            >
              Start a Quote Today
            </Heading>
            
            <Box as="form" onSubmit={handleSubmit} width="100%">
              <VStack gap={6}>
                <Flex gap={4} width="100%">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    bg="white"
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                    required
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    bg="white"
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                    required
                  />
                </Flex>
                
                <Input
                  name="email"
                  type="email"
                  placeholder="email@domain.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  bg="white"
                  color="black"
                  _placeholder={{ color: 'gray.500' }}
                  required
                />
                
                <Textarea
                  name="project"
                  placeholder="About My Project..."
                  value={formData.project}
                  onChange={handleInputChange}
                  bg="white"
                  color="black"
                  _placeholder={{ color: 'gray.500' }}
                  rows={6}
                />
                
                <Button
                  type="submit"
                  bg="white"
                  color="#228b22"
                  size="lg"
                  fontSize="16px"
                  fontWeight="bold"
                  px={8}
                >
                  Submit
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
    </PageLoader>
  );
};

export default FireWaterDamage;