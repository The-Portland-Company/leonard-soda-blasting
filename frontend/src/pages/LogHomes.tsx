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

const LogHomes: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    project: ''
  });

  const slideImages = [
    '/assets/images/imag0265.jpg',
    '/assets/images/imag0266.jpg',
    '/assets/images/log-home-header.jpg'
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
    <Box>
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
              Log Homes
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
              Soda Blasting for Log Homes
            </Heading>
            <Text fontSize="24px" color="white" textAlign="left" maxW="760px">
              Log houses are more than just four walls and a roof – they're a home that adds immensely to day to day life. Taking care of your log home is a labor of love, and most owners know that these unique, charming log buildings are fairly high maintenance. We at Leonard Soda Blasting know that your home is special and we're ready to help keep it in great shape.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Stripping & Prepping Section */}
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
                Stripping & Prepping
              </Heading>
              <Text fontSize="18px" color="#333333">
                When it comes to stripping off old stain or paint and getting ready to repaint or seal your log home, it's worth doing it right. Stripping is undoubtedly the most labor intensive part of the process and this is where Leonard Soda Blasting can help make the job easy and affordable, as well as eco-friendly. Licensed contractors since 1989, Leonard Soda Blasting will use baking soda blasting to remove any previous coating, oil, grease and mill glaze from the logs of your home. Because soda cleans up with water, the whole process is non-toxic and non-hazardous.
              </Text>
            </Box>
            <Box textAlign="center">
              <Image 
                src="/assets/images/imag0259-1024x760.jpg" 
                alt="Log Home Preparation" 
                width="100%"
                height="auto"
                className="image-slide-right"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Removes Mold & Mildew Section */}
      <Box bg="#333333" py={16}>
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center">
            <Box textAlign="center">
              <Image 
                src="/assets/images/imag0265-760x1024.jpg" 
                alt="Log Home Treatment" 
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
                Removes Mold & Mildew
              </Heading>
              <Text fontSize="18px" color="white">
                Any cleaning requirements required by stain manufacturers for their warranties will be more than met by the job done by the professionals here at Leonard Soda Blasting. A positive side effect of soda blasting is the removal of mold, mildew and stains from the wood surface, allowing the natural beauty of the wood to once more shine through. In addition to the beauty, there is a practical reason for keeping the logs in your home free of too many layers of old stain and sealer. Logs need to breath or they will eventually rot and a routine blasting and resealing/staining of your log home will make sure that it lasts for a long time. Give us a call here at Leonard Soda Blasting and tell us about your home.
              </Text>
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
  );
};

export default LogHomes;