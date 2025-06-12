import React, { useState } from 'react';
import {
  Box,
  Container,
  Text,
  Heading,
  VStack,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Flex
} from '@chakra-ui/react';
import PhoneNumber from '../components/PhoneNumber';

const AboutSodaBlasting: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    project: ''
  });
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL || 'agency@theportlandcompany.com';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Your message was successfully sent to ${adminEmail}. We'll get back to you within 24 hours.`);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      project: ''
    });
  };

  const benefits = [
    {
      title: "Soft Abrasive",
      description: "does not harm glass, ceramic, metal, etc."
    },
    {
      title: "Friable", 
      description: "breaks down on contact"
    },
    {
      title: "Non-Sparking",
      description: "does not create sparks or react to electricity"
    },
    {
      title: "Water Soluble",
      description: "easily dissolved or washed away with water."
    },
    {
      title: "Food Grade",
      description: "non-hazardous and safe if accidentally ingested"
    },
    {
      title: "Well known chemistry",
      description: "mostly benign"
    },
    {
      title: "Recognized as safe",
      description: "Can be used almost anywhere"
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bgImage="url('/assets/images/about.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        py={20}
        position="relative"
      >
        <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.600" />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <VStack gap={4} textAlign="center" color="white">
            <Heading 
              fontSize="41px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              color="white"
              lineHeight="1"
              textTransform="uppercase"
            >
              About Soda Blasting
            </Heading>
          </VStack>
        </Container>
      </Box>

      <PhoneNumber />

      {/* What is soda blasting Section */}
      <Box bg="#228b22" py={16}>
        <Container maxW="1200px">
          <VStack gap={8} textAlign="center">
            <Heading
              fontSize="41px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              color="white"
              lineHeight="1"
              textTransform="uppercase"
            >
              What is soda blasting?
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} alignItems="center" w="100%">
              <Box textAlign="left">
                <Text fontSize="24px" color="white">
                  Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating. The sodium bicarbonate and blasting machine work in unison to perform this removal process in a nondestructive manner. The soda blasting is usually done in open air, booth or cabinet. The Soda Blaster is ideal for cleaning all types of delicate equipment and surfaces. It eliminates sanding, soaking, scrubbing, and abrasive blasting.
                </Text>
              </Box>
              <Box textAlign="center">
                <iframe 
                  width="100%" 
                  height="300" 
                  src="https://www.youtube.com/embed/ePzq9tuW2m8?feature=oembed&modestbranding=1&rel=0" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen 
                  title="Soda Blasting Example"
                  style={{ border: 'none' }}
                />
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Soda is unique Section */}
      <Box 
        backgroundImage="url(/assets/images/bg-3.jpg)"
        backgroundAttachment="fixed"
        backgroundSize="cover"
        backgroundPosition="center"
        py={16}
      >
        <Container maxW="1200px">
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} alignItems="start">
            <Box gridColumn={{ base: "1", md: "1 / 3" }}>
              <Heading
                fontSize="41px"
                fontFamily="Arvo, Georgia, serif"
                fontWeight="bold"
                color="#228b22"
                lineHeight="1"
                textTransform="uppercase"
                mb={6}
              >
                Soda is unique in the world of soft abrasives
              </Heading>
              <VStack gap={4} align="start">
                <Text fontSize="18px" color="#333333">
                  Sodium bicarbonate abrasive, also known as baking soda, is the same material used in powder form for baking, in toothpastes, and in a number of other consumer products. The abrasive particles pulverize completely on impact to a fine dust.
                </Text>
                <Text fontSize="18px" color="#333333">
                  Sodium bicarbonate is soluble in water. Therefore, the abrasive will be dissolved or can be washed off after the blasting is completed. This reduces the amount of abrasive debris compared to the amount of material removed from the surface. If the cleaned surface is going to be painted, the sodium bicarbonate must be washed off. Hot water is most effective at dissolving sodium bicarbonate.
                </Text>
                <Text fontSize="18px" color="#333333">
                  Sodium bicarbonate has been used in architectural operations such as smoke, soot, and graffiti removal, and historic restorations. It finds uses in general plant maintenance, especially in the food industries. Sodium bicarbonate is non-sparking, so it is useful in natural gas and petroleum refining plants.
                </Text>
              </VStack>
            </Box>
            <Box>
              <VStack gap={6} align="stretch">
                {benefits.map((benefit, index) => (
                  <Box key={index} p={4} bg="white" borderRadius="md">
                    <Heading className="benefit-title">
                      {benefit.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.600" fontStyle="italic">
                      {benefit.description}
                    </Text>
                  </Box>
                ))}
              </VStack>
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

export default AboutSodaBlasting;