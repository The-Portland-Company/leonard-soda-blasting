'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from '@chakra-ui/react'
import PhoneNumber from '@/components/PhoneNumber'
import { config } from '@/lib/config'

interface GalleryItem {
  id: string
  src: string
  alt: string
  category: string
  title: string
  description: string
}

interface PageWithHero {
  hero_title?: string;
  title?: string;
  hero_subtitle?: string;
}

interface GalleryClientProps {
  page: PageWithHero | null;
  settings: unknown;
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    src: '/assets/images/automotive-1.webp',
    alt: 'Automotive restoration project',
    category: 'automotive',
    title: 'Classic Car Restoration',
    description: 'Complete paint stripping and surface preparation for vintage vehicle restoration.'
  },
  {
    id: '2',
    src: '/assets/images/aircraft.webp',
    alt: 'Aircraft cleaning project',
    category: 'aircraft',
    title: 'Aircraft Maintenance',
    description: 'Professional aircraft cleaning and surface preparation for maintenance work.'
  },
  {
    id: '3',
    src: '/assets/images/boat-1.webp',
    alt: 'Marine vessel cleaning',
    category: 'marine',
    title: 'Boat Hull Cleaning',
    description: 'Marine vessel hull cleaning and preparation for refinishing.'
  },
  {
    id: '4',
    src: '/assets/images/commercial.webp',
    alt: 'Commercial building cleaning',
    category: 'commercial',
    title: 'Commercial Building',
    description: 'Large-scale commercial building facade cleaning and restoration.'
  },
  {
    id: '5',
    src: '/assets/images/fire-damage.webp',
    alt: 'Fire damage restoration',
    category: 'restoration',
    title: 'Fire Damage Restoration',
    description: 'Smoke and soot removal from fire-damaged structures.'
  },
  {
    id: '6',
    src: '/assets/images/food-processing-equipment.webp',
    alt: 'Food processing equipment cleaning',
    category: 'industrial',
    title: 'Food Processing Equipment',
    description: 'FDA-compliant cleaning of food processing machinery and equipment.'
  },
  {
    id: '7',
    src: '/assets/images/log-homes.webp',
    alt: 'Log home restoration',
    category: 'residential',
    title: 'Log Home Restoration',
    description: 'Gentle cleaning and restoration of log home exteriors.'
  },
  {
    id: '8',
    src: '/assets/images/commercial-industrial.webp',
    alt: 'Industrial equipment cleaning',
    category: 'industrial',
    title: 'Industrial Equipment',
    description: 'Heavy-duty industrial equipment cleaning and surface preparation.'
  }
]

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'automotive', label: 'Automotive' },
  { key: 'aircraft', label: 'Aircraft' },
  { key: 'marine', label: 'Marine' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'industrial', label: 'Industrial' },
  { key: 'residential', label: 'Residential' },
  { key: 'restoration', label: 'Restoration' }
]

const GalleryClient: React.FC<GalleryClientProps> = ({ page }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        bgImage="url('/assets/images/about.webp')"
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
              size="2xl" 
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize={{ base: "3xl", md: "4xl" }}
            >
              {page?.hero_title || page?.title || 'Gallery'}
            </Heading>
            {page?.hero_subtitle && (
              <Text fontSize="xl" maxW="2xl" fontFamily="Open Sans, sans-serif">
                {page.hero_subtitle}
              </Text>
            )}
          </VStack>
        </Container>
      </Box>

      {/* Filter Section */}
      <Box bg="gray.50" py={8}>
        <Container maxW="container.xl">
          <VStack gap={6}>
            <Heading 
              size="lg" 
              textAlign="center"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
              color="#228b22"
            >
              Filter by Category
            </Heading>
            
            <HStack 
              gap={4} 
              flexWrap="wrap" 
              justify="center"
              align="center"
            >
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "solid" : "outline"}
                  colorScheme={selectedCategory === category.key ? "green" : "gray"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.key)}
                  fontFamily="Arvo, Georgia, serif"
                  textTransform="uppercase"
                  letterSpacing="1px"
                  fontSize="xs"
                  bg={selectedCategory === category.key ? "#228b22" : "white"}
                  color={selectedCategory === category.key ? "white" : "#228b22"}
                  borderColor="#228b22"
                >
                  {category.label}
                </Button>
              ))}
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Gallery Grid */}
      <Box bg="white" py={16}>
        <Container maxW="container.xl">
          <VStack gap={12}>
            <Text 
              textAlign="center" 
              fontSize="lg" 
              color="gray.600"
              fontFamily="Open Sans, sans-serif"
            >
              Showing {filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.key === selectedCategory)?.label}`}
            </Text>
            
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }} 
              gap={8} 
              w="100%"
            >
              {filteredItems.map((item) => (
                <Box
                  key={item.id}
                  bg="white"
                  borderRadius="lg"
                  overflow="hidden"
                  cursor="pointer"
                  onClick={() => setSelectedImage(item)}
                  _hover={{ boxShadow: 'lg' }}
                >
                  <Box position="relative" overflow="hidden">
                    <Image 
                      src={item.src} 
                      alt={item.alt}
                      width={400}
                      height={300}
                      style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                    />
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      w="100%"
                      h="100%"
                      bg="blackAlpha.400"
                      opacity={0}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      _hover={{ opacity: 1 }}
                      transition="opacity 0.3s"
                    >
                      <Text 
                        color="white" 
                        fontSize="lg" 
                        fontWeight="bold"
                        textAlign="center"
                        fontFamily="Arvo, Georgia, serif"
                        textTransform="uppercase"
                      >
                        View Details
                      </Text>
                    </Box>
                  </Box>
                  
                  <Box p={6}>
                    <VStack gap={3} align="flex-start">
                      <Heading 
                        size="md" 
                        color="#228b22"
                        fontFamily="Arvo, Georgia, serif"
                        fontWeight="bold"
                      >
                        {item.title}
                      </Heading>
                      <Text 
                        fontSize="sm" 
                        color="gray.600"
                        fontFamily="Open Sans, sans-serif"
                        lineHeight="1.6"
                      >
                        {item.description}
                      </Text>
                      <Text 
                        fontSize="xs" 
                        color="#228b22"
                        fontWeight="bold"
                        textTransform="uppercase"
                        letterSpacing="1px"
                        fontFamily="Arvo, Georgia, serif"
                      >
                        {categories.find(c => c.key === item.category)?.label}
                      </Text>
                    </VStack>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Modal for Image Details */}
      {selectedImage && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.800"
          zIndex={1000}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => setSelectedImage(null)}
        >
          <Box
            bg="white"
            borderRadius="lg"
            overflow="hidden"
            maxW="800px"
            maxH="90vh"
            m={4}
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              width={800}
              height={500}
              style={{ objectFit: 'cover', width: '100%', maxHeight: '500px' }}
            />
            <Box p={6}>
              <VStack gap={4} align="flex-start">
                <Heading 
                  size="lg" 
                  color="#228b22"
                  fontFamily="Arvo, Georgia, serif"
                  fontWeight="bold"
                >
                  {selectedImage.title}
                </Heading>
                <Text 
                  fontSize="md" 
                  color="gray.700"
                  fontFamily="Open Sans, sans-serif"
                  lineHeight="1.6"
                >
                  {selectedImage.description}
                </Text>
                <HStack justify="space-between" w="100%">
                  <Text 
                    fontSize="sm" 
                    color="#228b22"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="1px"
                    fontFamily="Arvo, Georgia, serif"
                  >
                    {categories.find(c => c.key === selectedImage.category)?.label}
                  </Text>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="green"
                    onClick={() => setSelectedImage(null)}
                    fontFamily="Arvo, Georgia, serif"
                    textTransform="uppercase"
                    borderColor="#228b22"
                    color="#228b22"
                  >
                    Close
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </Box>
      )}

      {/* Contact CTA Section */}
      <Box bg="gray.100" py={16}>
        <Container maxW="container.xl">
          <VStack gap={8} textAlign="center">
            <Heading 
              size="xl" 
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
              color="#228b22"
            >
              Ready to Start Your Project?
            </Heading>
            <Text fontSize="lg" maxW="2xl" fontFamily="Open Sans, sans-serif">
              Contact Leonard Soda Blasting today to discuss your cleaning project and see how our eco-friendly soda blasting services can deliver exceptional results for your specific needs.
            </Text>
            <VStack gap={4}>
              <Text fontSize="2xl" fontWeight="bold" color="#228b22">
                📞 (503) 894-5973
              </Text>
              <Text fontSize="lg" color="#228b22">
                {config.adminEmail}
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Box>
      
      <PhoneNumber />
    </Box>
  )
}

export default GalleryClient