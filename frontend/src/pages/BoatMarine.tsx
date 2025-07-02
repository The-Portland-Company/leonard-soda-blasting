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
  Flex
} from '@chakra-ui/react';
import PhoneNumber from '../components/PhoneNumber';

const BoatMarine: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    project: ''
  });

  const slideImages = [
    '/assets/images/boat-before.jpg',
    '/assets/images/boat-after.jpg'
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
              Boat and Marine
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
              Boat & Marine Soda Blasting
            </Heading>
            <Text fontSize="24px" color="white" textAlign="left" maxW="760px">
              Caring for a boat is a constant process and even the best maintenance routine needs an occasional boost. When your vessel is ready for repairs, cleaning or repainting, look to Leonard's Soda Blasting to get the job done on time and within budget.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Soda Blasting Process Section */}
      <Box 
        backgroundImage="url(/assets/images/bg-3.jpg)"
        backgroundAttachment="fixed"
        backgroundSize="cover"
        backgroundPosition="center"
        py={16}
      >
        <Container maxW="760px">
          <Text fontSize="18px" color="#333333" textAlign="left">
            Soda Blasting is a high-pressure, air-driven and non-destructive method of cleaning and stripping paint from steel, fiberglass, aluminum, wood and other substrates using eco-friendly bicarbonate of soda. It's almost impossible to damage gelcoat when using soda. Removing multiple layers of old paint without harming the boat's substrate can be easily accomplished, leaving you with a vessel ready for restoration, repair or repainting.
          </Text>
        </Container>
      </Box>

      {/* Handling Blisters Section */}
      <Box 
        backgroundImage="url(/assets/images/bg-3.jpg)"
        backgroundAttachment="fixed"
        backgroundSize="cover"
        backgroundPosition="center"
        py={16}
      >
        <Container maxW="760px">
          <VStack gap={8}>
            <Heading
              fontSize="41px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              color="#228b22"
              lineHeight="1"
              textTransform="uppercase"
              textAlign="center"
            >
              Handling Blisters
            </Heading>
            <Text fontSize="18px" color="#333333" textAlign="left">
              One of the primary reasons for stripping a boat is blisters. Blisters are usually caused by osmotic intrusion of water into the hull. As water molecules enter the hull, they pick up acids and other chemicals that change their size, making the molecules larger and trapping them inside. Since these molecules are unable to find their way out, pressure builds up and the gelcoat is forced away from the fiberglass, forming a blister. If the blister breaks while underwater, it lets in even more water, and the blister goes deeper in.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* One Stop Care Section */}
      <Box bg="#333333" py={16}>
        <Container maxW="760px">
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
              One Stop Care
            </Heading>
            <Text fontSize="18px" color="white" textAlign="left">
              Blisters must be repaired. However, traditional blister repair involves grinding, sanding or sandblasting the hull. This process is time-consuming, labor intensive and, unless extreme care is taken, can result in severe or permanent damage to the gelcoat and fiberglass laminate. Unlike sanding or corrosive chemicals, soda blasting boats removes old coats of antifoulant and blisters quickly, without damaging non-blistered, bare gelcoat, and then properly prepares the surface for repair — all in one operation.
            </Text>
          </VStack>
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

export default BoatMarine;