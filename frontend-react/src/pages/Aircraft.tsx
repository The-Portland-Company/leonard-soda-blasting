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
import PageTitle from '../components/PageTitle';
import { usePage, useGlobalSettings } from '../hooks/useDirectus';

const Aircraft: React.FC = () => {
  const { page } = usePage('aircraft-soda-blasting');
  // const { settings } = useGlobalSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    project: ''
  });

  const slideImages = [
    '/assets/images/airplane_before.jpg',
    '/assets/images/airplane_after.jpg'
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
    <Box id="aircraft-main">
      <PageTitle pageSlug="aircraft-soda-blasting" />
      
      {/* Hero Section with Slideshow */}
      <Box 
        id="hero-section"
        position="relative" 
        height="500px" 
        overflow="hidden"
        bg="#333333"
      >
        <Box
          id="hero-background"
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
          id="hero-container"
          position="relative" 
          zIndex={2} 
          height="100%" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
        >
          <Box id="hero-content" textAlign="center" color="white">
            <Heading
              fontSize="41px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              color="white"
              lineHeight="1"
              textTransform="uppercase"
            >
              {page?.hero_title || page?.title || "Aircraft"}
            </Heading>
          </Box>
        </Container>
        
        {/* Manual Navigation */}
        <HStack 
          id="hero-navigation"
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
      <Box id="main-content-section" bg="#228b22" py={16}>
        <Container id="main-content-container" maxW="760px">
          <VStack id="main-content" gap={8} textAlign="center">
            <Heading
              fontSize="41px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              color="white"
              lineHeight="1"
              textTransform="uppercase"
            >
              {page?.hero_title || page?.title || "Aircraft Soda Blasting"}
            </Heading>
            <Text fontSize="24px" color="white" textAlign="left" maxW="760px">
              {page?.hero_subtitle || "Today's aviation requires the latest in technology as well as an awareness of environmental concerns, especially when it comes to cleaning planes and parts. Not only are chemical strippers and sanding slow but they also can often require toxic and expensive cleanup themselves. Soda blasting removes all coatings and simple water can be used to clean up afterwards and since applications do not require prewashing and masking there are no size limits for parts being stripped."}
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Professional Work Section */}
      <Box 
        id="professional-work-section"
        backgroundImage="url(/assets/images/bg-3.jpg)"
        backgroundAttachment="fixed"
        backgroundSize="cover"
        backgroundPosition="center"
        py={16}
      >
        <Container id="professional-work-container" maxW="1200px">
          <SimpleGrid id="professional-work-grid" columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box id="professional-work-text">
              <Heading
                fontSize="41px"
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                color="#228b22"
                lineHeight="1"
                textTransform="uppercase"
                mb={6}
              >
                Professional Work Done on Schedule
              </Heading>
              <Text fontSize="18px" color="#333333">
                Leonard soda blasting can meet your needs within the fixed and rotor wing marketplace and let you take advantage of the unique properties of soda blasting. We can speed the process of your major and minor repairs, alterations and modifications to sheet metal and composites. Our reputation for on time delivery and unmatched quality has made us the premier soda blasting service.
              </Text>
            </Box>
            <Box id="professional-work-image" textAlign="center">
              <Image 
                src="/assets/images/dc-10.jpg" 
                alt="DC-10 Aircraft" 
                width="100%"
                height="auto"
                className="image-slide-right"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Safe Process Section */}
      <Box id="safe-process-section" bg="#333333" py={16}>
        <Container id="safe-process-container" maxW="1200px">
          <SimpleGrid id="safe-process-grid" columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box id="safe-process-image" textAlign="center">
              <Image 
                src="/assets/images/airplane-detail.jpg" 
                alt="Airplane Detail" 
                width="100%"
                height="auto"
                className="image-slide-left"
              />
            </Box>
            <Box id="safe-process-text">
              <Heading
                fontSize="41px"
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                color="white"
                lineHeight="1"
                textTransform="uppercase"
                mb={6}
              >
                Safe, Non-Toxic Process
              </Heading>
              <Text fontSize="18px" color="white">
                Soda blasting technology employs the extraordinary physical characteristics of the sodium bicarbonate crystal. It has other chemical benefits and properties such as a benign nature, low pH and water solubility and these have contributed to its successful application and preferred use on high-value parts and critical components. Baking soda is water soluble making cleanup and surface preparation faster and easier than with errant media that may form a light dusting or collect in blind holes of recessed areas. Baking soda is the only soft-abrasive material that allows for complete removal by simply rinsing with water. Soda blasting has filled a very important niche within the aerospace industry.
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Quote Form Section */}
      <Box id="quote-form-section" bg="#228b22" py={16}>
        <Container id="quote-form-container" maxW="730px">
          <VStack id="quote-form-content" gap={8}>
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
            
            <Box id="quote-form" as="form" onSubmit={handleSubmit} width="100%">
              <VStack id="form-fields" gap={6}>
                <Flex id="name-fields" gap={4} width="100%">
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
  );
};

export default Aircraft;