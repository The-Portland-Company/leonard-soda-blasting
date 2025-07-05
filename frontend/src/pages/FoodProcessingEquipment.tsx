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
import PageTitle from '../components/PageTitle';
import { usePage, useGlobalSettings } from '../hooks/useDirectus';

const FoodProcessingEquipment: React.FC = () => {
  const { page, loading: pageLoading } = usePage('food-processing-equipment');
  const { settings, loading: settingsLoading } = useGlobalSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    project: ''
  });

  const slideImages = [
    '/assets/images/food-processing-before-1024x760.jpg',
    '/assets/images/food-processing-after-1024x760.jpg'
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
      <Box id="food-processing-equipment-main">
        <PageTitle pageSlug="food-processing-equipment" />
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
              {page?.hero_title || page?.title}
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
              width="12px"
              height="12px"
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
              Food Processing Equipment
            </Heading>
            <Text fontSize="24px" color="white" textAlign="left" maxW="760px">
              Soda blasting is perfect for cleaning food processing equipment and machinery and offers a range of benefits over other cleaning methods. Baking soda itself is a food item, which makes it the perfect environmentally friendly solution to clean equipment used in food processing and food preparation.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Benefits Section */}
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
                Soda Blasting is Fast, Thorough and Effective
              </Heading>
              <VStack gap={4} align="start">
                <Text fontSize="18px" color="#333333">
                  Removes limescale from cooking and boiling equipment. Also removes heavy baked-on carbon deposits, oil residues, organic residues, grease, wax and protein buildups.
                </Text>
                <Text fontSize="18px" color="#333333">
                  Safely cleans copper, stainless steel, aluminum, ceramic tile, mixing tanks, steam tubes, galvanized steel, heat exchangers, cooking kettles, baking molds and trays, plastic and nylon components.
                </Text>
              </VStack>
            </Box>
            <Box textAlign="center">
              <iframe 
                src="https://player.vimeo.com/video/211538006?dnt=1&app_id=122963" 
                width="100%" 
                height="300" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                title="Soda Blast Pipe Cleaning"
                style={{ border: 'none' }}
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Clean & Degrease Section */}
      <Box bg="#333333" py={16}>
        <Container maxW="1200px">
          <VStack gap={12}>
            <Heading
              fontSize="41px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              color="white"
              lineHeight="1"
              textTransform="uppercase"
              textAlign="center"
            >
              Clean & Degrease Safely
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
              <Box textAlign="center">
                <Image 
                  src="/assets/images/mohs.jpg" 
                  alt="Mohs Scale" 
                  width="100%"
                  height="auto"
                  className="image-slide-left"
                />
              </Box>
              <Box>
                <VStack gap={4} align="start">
                  <Text fontSize="18px" color="white">
                    We use soda blast media in a process similar to sandblasting. However unlike sandblasting, soda has no hard dust particles to affect operating parts. The process is gentle enough to remove the coating without harming the substrate and virtually any coating can be removed from most any surface.
                  </Text>
                  <Text fontSize="18px" color="white">
                    Soda is an extremely versatile abrasive that can be used on the toughest of coatings and the most sensitive of surfaces. It's an effective method for degreasing equipment and at only 2.5 on the Moh's hardness scale soda will not wear even the most sensitive surface. This makes it excellent for cleaning critical components with machined tolerances or detailed contours that must be maintained. Soda can be used without damage or distortion to ferrous and non-ferrous metals and soda can be used safely around pumps, seals, bearings, and even rotating equipment without causing damage.
                  </Text>
                </VStack>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Non-Toxic Section */}
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
                Non-Toxic, Easy Cleanup
              </Heading>
              <VStack gap={4} align="start">
                <Text fontSize="18px" color="#333333">
                  The sodium bicarbonate media used for soda blasting is non-toxic and can be washed away with water at the end of the cleaning process. Take a look at your equipment and consider how much easier it would be to clean it with a safe, non-hazardous cleaning process that is not only quick but surprisingly affordable.
                </Text>
                <Heading
                  fontSize="35px"
                  fontFamily="Arvo, Georgia, serif"
                  fontWeight="bold"
                  color="#228b22"
                  lineHeight="1"
                  textTransform="uppercase"
                >
                  FDA, OSHA, EPA and USDA Compliant
                </Heading>
              </VStack>
            </Box>
            <Box textAlign="center">
              <Image 
                src="/assets/images/food-processing-equipment.jpg" 
                alt="Food Processing Equipment" 
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

export default FoodProcessingEquipment;