import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  useBreakpointValue,
  Button,
} from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

  return (
    <Box>
      {/* Main Header */}
      <Box bg="blackAlpha.800" color="white" py={4} position="sticky" top={0} zIndex={1000}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Text 
              fontSize="16px" 
              fontWeight="bold" 
              color="white"
              fontFamily="Arvo, Georgia, serif"
              textTransform="uppercase"
              letterSpacing="0.5px"
            >
              Leonard Soda Blasting
            </Text>
            {!isMobile && (
              <HStack gap={8}>
                <RouterLink 
                  to="/" 
                  style={{
                    color: 'white',
                    fontFamily: 'Arvo, Georgia, serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  Home
                </RouterLink>
                <RouterLink 
                  to="/about-soda-blasting" 
                  style={{
                    color: 'white',
                    fontFamily: 'Arvo, Georgia, serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  About Soda Blasting
                </RouterLink>
                <Box position="relative" 
                     onMouseEnter={() => setServicesMenuOpen(true)}
                     onMouseLeave={() => setServicesMenuOpen(false)}>
                  <RouterLink 
                    to="/services" 
                    style={{
                      color: 'white',
                      fontFamily: 'Arvo, Georgia, serif',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontSize: '14px',
                        textDecoration: 'none'
                    }}
                  >
                    Services ▼
                  </RouterLink>
                  
                  {servicesMenuOpen && (
                    <Box
                      position="absolute"
                      top="100%"
                      left="0"
                      bg="white"
                      borderRadius="md"
                      py={4}
                      px={0}
                      minW="250px"
                      zIndex={1000}
                      mt={0}
                      _before={{
                        content: '""',
                        position: "absolute",
                        top: "-8px",
                        left: "0",
                        right: "0",
                        height: "8px",
                        bg: "transparent"
                      }}
                    >
                      <VStack gap={0} align="stretch">
                        <RouterLink to="/soda-blasting/commercial-industrial" style={{ textDecoration: 'none' }}>
                          <Text
                            px={4}
                            py={2}
                            color="#228b22"
                            fontFamily="Open Sans, sans-serif"
                            fontSize="sm"
                            cursor="pointer"
                          >
                            Commercial & Industrial
                          </Text>
                        </RouterLink>
                        <RouterLink to="/soda-blasting/automotive-soda-blasting" style={{ textDecoration: 'none' }}>
                          <Text
                            px={4}
                            py={2}
                            color="#228b22"
                            fontFamily="Open Sans, sans-serif"
                            fontSize="sm"
                            cursor="pointer"
                          >
                            Automotive
                          </Text>
                        </RouterLink>
                        <RouterLink to="/soda-blasting/food-processing-equipment" style={{ textDecoration: 'none' }}>
                          <Text
                            px={4}
                            py={2}
                            color="#228b22"
                            fontFamily="Open Sans, sans-serif"
                            fontSize="sm"
                            cursor="pointer"
                          >
                            Food Processing Equipment
                          </Text>
                        </RouterLink>
                        <RouterLink to="/soda-blasting/fire-and-water-damage-restoration-soda-blasting" style={{ textDecoration: 'none' }}>
                          <Text
                            px={4}
                            py={2}
                            color="#228b22"
                            fontFamily="Open Sans, sans-serif"
                            fontSize="sm"
                            cursor="pointer"
                          >
                            Fire & Water Damage
                          </Text>
                        </RouterLink>
                        <RouterLink to="/soda-blasting/airplane-soda-blasting" style={{ textDecoration: 'none' }}>
                          <Text
                            px={4}
                            py={2}
                            color="#228b22"
                            fontFamily="Open Sans, sans-serif"
                            fontSize="sm"
                            cursor="pointer"
                          >
                            Aircraft
                          </Text>
                        </RouterLink>
                        <RouterLink to="/soda-blasting/log-home-soda-blasting" style={{ textDecoration: 'none' }}>
                          <Text
                            px={4}
                            py={2}
                            color="#228b22"
                            fontFamily="Open Sans, sans-serif"
                            fontSize="sm"
                            cursor="pointer"
                          >
                            Log Homes
                          </Text>
                        </RouterLink>
                        <RouterLink to="/soda-blasting/boat-and-marine-soda-blasting" style={{ textDecoration: 'none' }}>
                          <Text
                            px={4}
                            py={2}
                            color="#228b22"
                            fontFamily="Open Sans, sans-serif"
                            fontSize="sm"
                            cursor="pointer"
                          >
                            Boat and Marine
                          </Text>
                        </RouterLink>
                      </VStack>
                    </Box>
                  )}
                </Box>
                <RouterLink 
                  to="/gallery" 
                  style={{
                    color: 'white',
                    fontFamily: 'Arvo, Georgia, serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  Project Gallery
                </RouterLink>
                <RouterLink 
                  to="/contact" 
                  style={{
                    color: 'white',
                    fontFamily: 'Arvo, Georgia, serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '14px',
                    textDecoration: 'none'
                  }}
                >
                  Contact
                </RouterLink>
              </HStack>
            )}
            {isMobile && (
              <Button
                variant="ghost"
                color="white"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                ☰
              </Button>
            )}
          </Flex>
        </Container>
        
        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <Box bg="rgba(0,0,0,0.95)" color="white" p={4}>
            <VStack gap={4} align="stretch">
              <RouterLink to="/" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                Home
              </RouterLink>
              <RouterLink to="/about-soda-blasting" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                About Soda Blasting
              </RouterLink>
              <RouterLink to="/services" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                Services
              </RouterLink>
              <Text fontWeight="bold" color="green.200">Specialized Services:</Text>
              <VStack gap={2} align="stretch" pl={4}>
                <RouterLink to="/soda-blasting/commercial-industrial" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                  Commercial & Industrial
                </RouterLink>
                <RouterLink to="/soda-blasting/automotive-soda-blasting" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                  Automotive
                </RouterLink>
                <RouterLink to="/soda-blasting/food-processing-equipment" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                  Food Processing Equipment
                </RouterLink>
                <RouterLink to="/soda-blasting/fire-and-water-damage-restoration-soda-blasting" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                  Fire & Water Damage
                </RouterLink>
                <RouterLink to="/soda-blasting/airplane-soda-blasting" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                  Aircraft
                </RouterLink>
                <RouterLink to="/soda-blasting/log-home-soda-blasting" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                  Log Homes
                </RouterLink>
                <RouterLink to="/soda-blasting/boat-and-marine-soda-blasting" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                  Boat and Marine
                </RouterLink>
              </VStack>
              <RouterLink to="/gallery" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                Project Gallery
              </RouterLink>
              <RouterLink to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'white' }}>
                Contact
              </RouterLink>
            </VStack>
          </Box>
        )}
      </Box>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <Box bg="gray.900" color="white" py={12}>
        <Container maxW="container.xl">
          <VStack gap={6} textAlign="center">
            <Heading 
              size="md" 
              fontSize="20px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
              color="#228b22"
            >
              Leonard Soda Blasting
            </Heading>
            <VStack gap={3} fontSize="sm" fontFamily="Open Sans, sans-serif">
              <Text>CCB# 97926</Text>
              <Text>Serving Oregon & Washington</Text>
              <Text>📞 (503) 894-5973</Text>
              <Link href="mailto:greg@leonardsodablasting.com" color="#228b22">
                greg@leonardsodablasting.com
              </Link>
              <Text fontWeight="bold" color="#228b22">
                FDA, OSHA, EPA, USDA COMPLIANT
              </Text>
            </VStack>
            <Text fontSize="xs" color="gray.400" mt={4}>
              © 2024 Leonard Soda Blasting. All rights reserved.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;