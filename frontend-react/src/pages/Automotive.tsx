import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Button,
  Input,
  Textarea,
  Flex,
} from '@chakra-ui/react';
import PhoneNumber from '../components/PhoneNumber';
import PageTitle from '../components/PageTitle';
import { usePage, useGlobalSettings } from '../hooks/useDirectus';
// Using simple arrows instead of icons to avoid dependency issues

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  project: string;
}

const Automotive: React.FC = () => {
  const { page } = usePage('automotive-soda-blasting');
  // const { settings } = useGlobalSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    project: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

  const slideshowImages = [
    { src: '/assets/images/bronco-before.jpg', alt: 'Bronco Before Restoration' },
    { src: '/assets/images/bronco-primed.jpg', alt: 'Bronco Primed' },
    { src: '/assets/images/bronco-after.jpg', alt: 'Bronco After Restoration' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert(`Your message was successfully sent to ${adminEmail}. We'll get back to you within 24 hours.`);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        project: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };


  return (
    <Box id="automotive-main">
      <PageTitle pageSlug="automotive-soda-blasting" />
      
      {/* Restoration Slideshow */}
      <Box 
        id="hero-section"
        position="relative" 
        w="100%" 
        h="600px" 
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Background Slideshow */}
        <Image 
          src={slideshowImages[currentSlide].src}
          alt={slideshowImages[currentSlide].alt}
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          objectFit="cover"
          zIndex={1}
        />
        
        {/* Dark overlay for text readability */}
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          w="100%" 
          h="100%" 
          bg="blackAlpha.500"
          zIndex={2}
        />
        
        {/* Content */}
        <Container maxW="container.xl" position="relative" zIndex={3}>
          <VStack gap={8} textAlign="center" color="white">
            <Heading 
              fontSize="41px" 
              fontFamily="Arvo, Georgia, serif" 
              fontWeight="bold"
              textTransform="uppercase"
              lineHeight="1"
            >
              {page?.hero_title || page?.title || "Automotive"}
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              {page?.hero_subtitle || "Gentle, eco-friendly soda blasting that preserves your vehicle's integrity"}
            </Text>
          </VStack>
        </Container>

        {/* Navigation Arrows */}
        <Button
          position="absolute"
          left="20px"
          top="50%"
          transform="translateY(-50%)"
          bg="rgba(0,0,0,0.5)"
          color="white"
          onClick={prevSlide}
          size="md"
          borderRadius="full"
          minW="50px"
          h="50px"
          zIndex={4}
        >
          ←
        </Button>
        <Button
          position="absolute"
          right="20px"
          top="50%"
          transform="translateY(-50%)"
          bg="rgba(0,0,0,0.5)"
          color="white"
          onClick={nextSlide}
          size="md"
          borderRadius="full"
          minW="50px"
          h="50px"
          zIndex={4}
        >
          →
        </Button>

        <Flex
          position="absolute"
          bottom="30px"
          left="50%"
          transform="translateX(-50%)"
          gap={3}
          zIndex={4}
        >
          {slideshowImages.map((_, index) => (
            <Box
              key={index}
              w="15px"
              h="15px"
              borderRadius="50%"
              bg={currentSlide === index ? "white" : "rgba(255,255,255,0.5)"}
              cursor="pointer"
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </Flex>
      </Box>

      <PhoneNumber />

      {/* Main Headline */}
      <Box bg="#228b22" py={12}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} w="100%" alignItems="center">
            <VStack gap={4} align="flex-start">
              <Heading 
                fontSize="41px" 
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                color="white"
                lineHeight="1"
                textTransform="uppercase"
              >
                Automobile Soda Blasting
              </Heading>
              <Text fontSize="24px" color="white" textAlign="left">
                Soda blasting offers the most effective method for stripping your car, truck, RV, or any vehicle project. Whether you need to strip off paint, primer, body filler, undercoating, rust, or the toughest powder coating, soda blasting will remove it all and leave your metal substrate completely intact and ready for the next step in your restoration.
              </Text>
            </VStack>
            <Box>
              <Image 
                src="/assets/images/automotive-1.jpg" 
                alt="Automotive restoration project"
                borderRadius="lg"
                className="image-slide-right"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Safe and Effective Section */}
      <Box bg="gray.100" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={12} alignItems="center">
            <Image 
              src="/assets/images/chalk-marks.jpg" 
              alt="Factory chalk marks visible after soda blasting process"
              borderRadius="lg"
              w="100%"
              className="image-slide-left"
            />

            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="#228b22"
              >
                Safe and Effective
              </Heading>
              <Text fontSize="lg" fontFamily="Open Sans, sans-serif" lineHeight="1.6">
                Soda restores to a factory finish as you can see from these factory chalk marks visible after the soda blasting process.
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Professional Section */}
      <Box bg="gray.700" py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={12} alignItems="center">
            <VStack gap={6} align="flex-start">
              <Heading 
                as="h2"
                color="white"
              >
                Completely Professional from Beginning to End
              </Heading>
              <Text fontSize="lg" fontFamily="Open Sans, sans-serif" lineHeight="1.6" color="white">
                We have a 16'×36′ blast shop located in Sherwood, Oregon for even your largest vehicles. We can also trailer projects if necessary. Priming is available.
              </Text>
            </VStack>

            <Image 
              src="/assets/images/auto-pg-img-2.jpg" 
              alt="Professional automotive blast shop"
              borderRadius="lg"
              w="100%"
              className="image-slide-right"
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Quote Form Section */}
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
              Get a Free Quote
            </Heading>
            
            <Box 
              bg="white" 
              p={8} 
              borderRadius="lg" 
              w="100%" 
              maxW="600px"
            >
              <form onSubmit={handleSubmit}>
                <VStack gap={6}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="100%">
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.300"
                      color="black"
                      _placeholder={{ color: 'gray.500' }}
                      required
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      bg="gray.50"
                      border="1px solid"
                      borderColor="gray.300"
                      color="black"
                      _placeholder={{ color: 'gray.500' }}
                      required
                    />
                  </SimpleGrid>
                  
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.300"
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                    required
                  />
                  
                  <Textarea
                    name="project"
                    placeholder="About My Project..."
                    value={formData.project}
                    onChange={handleInputChange}
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.300"
                    color="black"
                    _placeholder={{ color: 'gray.500' }}
                    rows={6}
                  />
                  
                  <Button
                    type="submit"
                    bg="#228b22"
                    color="white"
                    size="lg"
                    fontSize="16px"
                    fontWeight="bold"
                    loading={isSubmitting}
                    loadingText="Submitting..."
                    px={8}
                  >
                    Submit
                  </Button>
                </VStack>
              </form>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Automotive;