import React, { useState, useEffect } from 'react';
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
  IconButton,
} from '@chakra-ui/react';
import { useGlobalSettings, useNavigation } from '../hooks/useDirectus';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  
  const { settings } = useGlobalSettings();
  const { navigation } = useNavigation();

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset mobile services expanded when menu closes
      setMobileServicesExpanded(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
              {settings.site_title}
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
              <IconButton
                className="mobile-menu-button"
                aria-label="Toggle mobile menu"
                variant="ghost"
                color="white"
                size="md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                _hover={{ bg: 'whiteAlpha.200' }}
                _active={{ bg: 'whiteAlpha.300' }}
              >
                <Box
                  w="24px"
                  h="18px"
                  position="relative"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box
                    w="100%"
                    h="2px"
                    bg="white"
                    borderRadius="1px"
                    transform={mobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'}
                    transition="all 0.3s ease"
                  />
                  <Box
                    w="100%"
                    h="2px"
                    bg="white"
                    borderRadius="1px"
                    opacity={mobileMenuOpen ? 0 : 1}
                    transition="all 0.3s ease"
                  />
                  <Box
                    w="100%"
                    h="2px"
                    bg="white"
                    borderRadius="1px"
                    transform={mobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'}
                    transition="all 0.3s ease"
                  />
                </Box>
              </IconButton>
            )}
          </Flex>
        </Container>
        
        {/* Mobile Menu Overlay */}
        {isMobile && (
          <Box
            className="mobile-menu"
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(0,0,0,0.85)"
            zIndex={999}
            transform={mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'}
            transition="transform 0.3s ease-in-out"
            backdropFilter="blur(10px)"
          >
            {/* Mobile Menu Content */}
            <Box
              bg="blackAlpha.900"
              w="80%"
              maxW="300px"
              h="100vh"
              pt="80px"
              px={6}
              pb={6}
              transform={mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'}
              transition="transform 0.3s ease-in-out 0.1s"
              overflowY="auto"
              borderRight="1px solid"
              borderColor="whiteAlpha.200"
            >
              <VStack gap={0} align="stretch">
                {/* Main Navigation Items */}
                <RouterLink 
                  to="/" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Box
                    py={4}
                    px={4}
                    color="white"
                    fontFamily="Arvo, Georgia, serif"
                    textTransform="uppercase"
                    letterSpacing="1px"
                    fontSize="16px"
                    fontWeight="bold"
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.100"
                    _hover={{ bg: 'whiteAlpha.100' }}
                    transition="all 0.2s ease"
                  >
                    Home
                  </Box>
                </RouterLink>

                <RouterLink 
                  to="/about-soda-blasting" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Box
                    py={4}
                    px={4}
                    color="white"
                    fontFamily="Arvo, Georgia, serif"
                    textTransform="uppercase"
                    letterSpacing="1px"
                    fontSize="16px"
                    fontWeight="bold"
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.100"
                    _hover={{ bg: 'whiteAlpha.100' }}
                    transition="all 0.2s ease"
                  >
                    About Soda Blasting
                  </Box>
                </RouterLink>

                {/* Services - Collapsible Menu */}
                <Box borderBottom="1px solid" borderColor="whiteAlpha.100">
                  {/* Services Parent Item */}
                  <Box
                    py={4}
                    px={4}
                    color="white"
                    fontFamily="Arvo, Georgia, serif"
                    textTransform="uppercase"
                    letterSpacing="1px"
                    fontSize="16px"
                    fontWeight="bold"
                    _hover={{ bg: 'whiteAlpha.100' }}
                    transition="all 0.2s ease"
                    cursor="pointer"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                  >
                    <Text>Services</Text>
                    <Text
                      transform={mobileServicesExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}
                      transition="transform 0.3s ease"
                      fontSize="14px"
                    >
                      ▶
                    </Text>
                  </Box>

                  {/* Services Submenu - Collapsible */}
                  <Box
                    maxHeight={mobileServicesExpanded ? "500px" : "0px"}
                    overflow="hidden"
                    transition="max-height 0.4s ease-in-out"
                  >
                    <VStack gap={0} align="stretch">
                      {/* Services Overview Link */}
                      <RouterLink 
                        to="/services" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Box
                          py={3}
                          px={8}
                          color="#228b22"
                          fontFamily="Arvo, Georgia, serif"
                          textTransform="uppercase"
                          letterSpacing="1px"
                          fontSize="14px"
                          fontWeight="bold"
                          borderBottom="1px solid"
                          borderColor="whiteAlpha.50"
                          _hover={{ bg: 'whiteAlpha.50', color: 'white' }}
                          transition="all 0.2s ease"
                        >
                          Services Overview
                        </Box>
                      </RouterLink>

                      {/* Specialized Services */}
                      <RouterLink 
                        to="/soda-blasting/commercial-industrial" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Box
                          py={3}
                          px={8}
                          color="whiteAlpha.900"
                          fontFamily="Open Sans, sans-serif"
                          fontSize="14px"
                          borderBottom="1px solid"
                          borderColor="whiteAlpha.50"
                          _hover={{ bg: 'whiteAlpha.50', color: '#228b22' }}
                          transition="all 0.2s ease"
                        >
                          Commercial & Industrial
                        </Box>
                      </RouterLink>

                      <RouterLink 
                        to="/soda-blasting/automotive-soda-blasting" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Box
                          py={3}
                          px={8}
                          color="whiteAlpha.900"
                          fontFamily="Open Sans, sans-serif"
                          fontSize="14px"
                          borderBottom="1px solid"
                          borderColor="whiteAlpha.50"
                          _hover={{ bg: 'whiteAlpha.50', color: '#228b22' }}
                          transition="all 0.2s ease"
                        >
                          Automotive
                        </Box>
                      </RouterLink>

                      <RouterLink 
                        to="/soda-blasting/food-processing-equipment" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Box
                          py={3}
                          px={8}
                          color="whiteAlpha.900"
                          fontFamily="Open Sans, sans-serif"
                          fontSize="14px"
                          borderBottom="1px solid"
                          borderColor="whiteAlpha.50"
                          _hover={{ bg: 'whiteAlpha.50', color: '#228b22' }}
                          transition="all 0.2s ease"
                        >
                          Food Processing Equipment
                        </Box>
                      </RouterLink>

                      <RouterLink 
                        to="/soda-blasting/fire-and-water-damage-restoration-soda-blasting" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Box
                          py={3}
                          px={8}
                          color="whiteAlpha.900"
                          fontFamily="Open Sans, sans-serif"
                          fontSize="14px"
                          borderBottom="1px solid"
                          borderColor="whiteAlpha.50"
                          _hover={{ bg: 'whiteAlpha.50', color: '#228b22' }}
                          transition="all 0.2s ease"
                        >
                          Fire & Water Damage
                        </Box>
                      </RouterLink>

                      <RouterLink 
                        to="/soda-blasting/airplane-soda-blasting" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Box
                          py={3}
                          px={8}
                          color="whiteAlpha.900"
                          fontFamily="Open Sans, sans-serif"
                          fontSize="14px"
                          borderBottom="1px solid"
                          borderColor="whiteAlpha.50"
                          _hover={{ bg: 'whiteAlpha.50', color: '#228b22' }}
                          transition="all 0.2s ease"
                        >
                          Aircraft
                        </Box>
                      </RouterLink>

                      <RouterLink 
                        to="/soda-blasting/log-home-soda-blasting" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Box
                          py={3}
                          px={8}
                          color="whiteAlpha.900"
                          fontFamily="Open Sans, sans-serif"
                          fontSize="14px"
                          borderBottom="1px solid"
                          borderColor="whiteAlpha.50"
                          _hover={{ bg: 'whiteAlpha.50', color: '#228b22' }}
                          transition="all 0.2s ease"
                        >
                          Log Homes
                        </Box>
                      </RouterLink>

                      <RouterLink 
                        to="/soda-blasting/boat-and-marine-soda-blasting" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Box
                          py={3}
                          px={8}
                          color="whiteAlpha.900"
                          fontFamily="Open Sans, sans-serif"
                          fontSize="14px"
                          _hover={{ bg: 'whiteAlpha.50', color: '#228b22' }}
                          transition="all 0.2s ease"
                        >
                          Boat and Marine
                        </Box>
                      </RouterLink>
                    </VStack>
                  </Box>
                </Box>

                <RouterLink 
                  to="/gallery" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Box
                    py={4}
                    px={4}
                    color="white"
                    fontFamily="Arvo, Georgia, serif"
                    textTransform="uppercase"
                    letterSpacing="1px"
                    fontSize="16px"
                    fontWeight="bold"
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.100"
                    _hover={{ bg: 'whiteAlpha.100' }}
                    transition="all 0.2s ease"
                  >
                    Project Gallery
                  </Box>
                </RouterLink>

                <RouterLink 
                  to="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Box
                    py={4}
                    px={4}
                    color="white"
                    fontFamily="Arvo, Georgia, serif"
                    textTransform="uppercase"
                    letterSpacing="1px"
                    fontSize="16px"
                    fontWeight="bold"
                    _hover={{ bg: 'whiteAlpha.100' }}
                    transition="all 0.2s ease"
                  >
                    Contact
                  </Box>
                </RouterLink>
              </VStack>

              {/* Contact Info */}
              <Box mt={8} pt={6} borderTop="1px solid" borderColor="whiteAlpha.200">
                <VStack gap={3} align="flex-start">
                  <Text color="#228b22" fontWeight="bold" fontSize="sm" textTransform="uppercase">
                    Contact
                  </Text>
                  <Text color="white" fontSize="sm">📞 {settings.phone}</Text>
                  <Text color="#228b22" fontSize="sm">{settings.email}</Text>
                  <Text color="whiteAlpha.800" fontSize="xs">CCB# 97926</Text>
                </VStack>
              </Box>
            </Box>
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
              {settings.site_title}
            </Heading>
            <VStack gap={3} fontSize="sm" fontFamily="Open Sans, sans-serif">
              <Text>CCB# 97926</Text>
              <Text>Serving Oregon & Washington</Text>
              <Text>📞 {settings.phone}</Text>
              <Link href={`mailto:${settings.email}`} color="#228b22">
                {settings.email}
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