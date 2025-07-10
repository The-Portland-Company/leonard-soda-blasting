'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Link as ChakraLink,
  useBreakpointValue,
  IconButton,
  Skeleton,
} from '@chakra-ui/react';
import { useGlobalSettings, useNavigation } from '@/hooks/useDirectus';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  const { settings, loading: settingsLoading } = useGlobalSettings();
  const { navigation, loading: navLoading } = useNavigation();

  // Hardcoded service links for now, will replace with dynamic data if available
  const serviceNavItems = [
      { label: 'Commercial & Industrial', href: '/soda-blasting/commercial-industrial' },
      { label: 'Automotive', href: '/soda-blasting/automotive-soda-blasting' },
      { label: 'Food Processing Equipment', href: '/soda-blasting/food-processing-equipment' },
      { label: 'Fire & Water Damage', href: '/soda-blasting/fire-and-water-damage-restoration-soda-blasting' },
      { label: 'Aircraft', href: '/soda-blasting/airplane-soda-blasting' },
      { label: 'Log Homes', href: '/soda-blasting/log-home-soda-blasting' },
      { label: 'Boat & Marine', href: '/soda-blasting/boat-and-marine-soda-blasting' },
    ];


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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setMobileServicesExpanded(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <Box id="layout-main">
      {/* Main Header */}
      <Box id="main-header" bg="blackAlpha.800" color="white" py={4} position="sticky" top={0} zIndex={1000}>
        <Container id="header-container" maxW="container.xl">
          <Flex id="header-content" justify="space-between" align="center">
            <Skeleton isLoaded={!settingsLoading} height="24px" width="200px">
                <Link href="/" >
                    <Text
                      fontSize="16px"
                      fontWeight="bold"
                      color="white"
                      fontFamily="Arvo, Georgia, serif"
                      textTransform="uppercase"
                      letterSpacing="0.5px"
                    >
                      {settings?.site_title}
                    </Text>
                </Link>
            </Skeleton>
            {!isMobile && (
              <HStack id="desktop-navigation" gap={8}>
                <Skeleton isLoaded={!navLoading} height="24px" width="400px">
                    {navigation.length > 0 ? (
                      navigation.filter(item => item.status === 'active').map((item) => (
                        item.label === 'Services' ? (
                          <Box id="services-dropdown" key={item.id} position="relative" onMouseLeave={() => setServicesMenuOpen(false)}>
                            <Text
                              color="white"
                              fontFamily="Arvo, Georgia, serif"
                              textTransform="uppercase"
                              letterSpacing="1px"
                              fontSize="14px"
                              cursor="pointer"
                              _hover={{ color: '#228b22' }}
                              onMouseEnter={() => setServicesMenuOpen(true)}
                            >
                              Services ▼
                            </Text>
                            <Box
                              id="services-dropdown-menu"
                              position="absolute"
                              top="100%"
                              left="0"
                              bg="blackAlpha.900"
                              border="1px solid"
                              borderColor="whiteAlpha.200"
                              borderRadius="md"
                              mt={0}
                              py={2}
                              minW="250px"
                              zIndex={1000}
                              opacity={servicesMenuOpen ? 1 : 0}
                              visibility={servicesMenuOpen ? 'visible' : 'hidden'}
                              transform={servicesMenuOpen ? 'translateY(0)' : 'translateY(-10px)'}
                              transition="all 0.2s ease"
                              pointerEvents={servicesMenuOpen ? 'auto' : 'none'}
                              onMouseEnter={() => setServicesMenuOpen(true)}
                            >
                              <VStack id="services-dropdown-content" gap={0} align="stretch">
                                <Link href="/services" >
                                  <Box
                                    id="services-overview-link"
                                    px={4}
                                    py={2}
                                    color="white"
                                    fontFamily="Arvo, Georgia, serif"
                                    textTransform="uppercase"
                                    fontSize="14px"
                                    fontWeight="bold"
                                    _hover={{ bg: '#228b22' }}
                                    transition="all 0.2s ease"
                                  >
                                    Services Overview
                                  </Box>
                                </Link>
                                {serviceNavItems.map(service => (
                                    <Link href={service.href} key={service.href} >
                                        <Box
                                            px={4}
                                            py={2}
                                            color="white"
                                            fontFamily="Open Sans, sans-serif"
                                            fontSize="13px"
                                            _hover={{ bg: '#228b22' }}
                                            transition="all 0.2s ease"
                                        >
                                            {service.label}
                                        </Box>
                                    </Link>
                                ))}
                              </VStack>
                            </Box>
                          </Box>
                        ) : item.url ? (
                            <Link key={item.id} href={item.url} target={item.target} >
                              <Text
                                 color='white'
                                 fontFamily='Arvo, Georgia, serif'
                                 textTransform='uppercase'
                                 letterSpacing='1px'
                                 fontSize='14px'
                                 textDecoration='none'
                                 _hover={{ textDecoration: 'none', color: '#228b22' }}
                              >
                                {item.label}
                              </Text>
                            </Link>
                        ) : null
                      ))
                    ) : null}
                </Skeleton>
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
                  id="hamburger-menu-icon"
                  w="24px"
                  h="18px"
                  position="relative"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Box
                    id="hamburger-line-1"
                    w="100%"
                    h="2px"
                    bg="white"
                    borderRadius="1px"
                    transform={mobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'}
                    transition="all 0.3s ease"
                  />
                  <Box
                    id="hamburger-line-2"
                    w="100%"
                    h="2px"
                    bg="white"
                    borderRadius="1px"
                    opacity={mobileMenuOpen ? 0 : 1}
                    transition="all 0.3s ease"
                  />
                  <Box
                    id="hamburger-line-3"
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
            id="mobile-menu-overlay"
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
              id="mobile-menu-content"
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
              <VStack id="mobile-navigation" gap={0} align="stretch">
                {/* Main Navigation Items */}
                <Link href="/" onClick={() => setMobileMenuOpen(false)} >
                  <Box
                    id="mobile-home-link"
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
                </Link>

                <Link
                  href="/about-soda-blasting"
                  onClick={() => setMobileMenuOpen(false)}
                  >
                  <Box
                    id="mobile-about-link"
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
                </Link>

                {/* Services - Collapsible Menu */}
                <Box id="mobile-services-section" borderBottom="1px solid" borderColor="whiteAlpha.100">
                  {/* Services Parent Item */}
                  <Box
                    id="mobile-services-toggle"
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
                    id="mobile-services-submenu"
                    maxHeight={mobileServicesExpanded ? "500px" : "0px"}
                    overflow="hidden"
                    transition="max-height 0.4s ease-in-out"
                  >
                    <VStack id="mobile-services-links" gap={0} align="stretch">
                      {/* Services Overview Link */}
                      <Link href="/services" onClick={() => setMobileMenuOpen(false)} >
                        <Box
                          id="mobile-services-overview-link"
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
                      </Link>

                      {/* Specialized Services */}
                      {serviceNavItems.map(service => (
                          <Link
                            href={service.href}
                            key={service.href}
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
                              {service.label}
                            </Box>
                          </Link>
                      ))}
                    </VStack>
                  </Box>
                </Box>

                <Link href="/gallery" onClick={() => setMobileMenuOpen(false)} >
                  <Box
                    id="mobile-gallery-link"
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
                </Link>

                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} >
                  <Box
                    id="mobile-contact-link"
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
                </Link>
              </VStack>

              {/* Contact Info */}
              <Box id="mobile-contact-info" mt={8} pt={6} borderTop="1px solid" borderColor="whiteAlpha.200">
                <VStack id="mobile-contact-details" gap={3} align="flex-start">
                  <Text color="#228b22" fontWeight="bold" fontSize="sm" textTransform="uppercase">
                    Contact
                  </Text>
                  <Text color="white" fontSize="sm">📞 {settings?.phone_number}</Text>
                  <Text color="#228b22" fontSize="sm">{settings?.email}</Text>
                  <Text color="whiteAlpha.800" fontSize="xs">CCB# 97926</Text>
                </VStack>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      {/* Page Content */}
      <Box as="main">
        {children}
      </Box>
      {/* Footer */}
      <Box id="footer" bg="gray.900" color="white" py={12}>
        <Container id="footer-container" maxW="container.xl">
          <VStack id="footer-content" gap={6} textAlign="center">
            <Heading
              size="md"
              fontSize="20px"
              fontFamily="Arvo, Georgia, serif"
              fontWeight="bold"
              textTransform="uppercase"
              color="#228b22"
            >
              {settings?.site_title}
            </Heading>
            <VStack id="footer-contact-info" gap={3} fontSize="sm" fontFamily="Open Sans, sans-serif">
              <Text>CCB# 97926</Text>
              <Text>Serving Oregon & Washington</Text>
              <Text>📞 {settings?.phone_number}</Text>
              <ChakraLink href={`mailto:${settings?.email}`} color="#228b22">
                {settings?.email}
              </ChakraLink>
              <Text fontWeight="bold" color="#228b22">
                FDA, OSHA, EPA, USDA COMPLIANT
              </Text>
            </VStack>
            <Text fontSize="xs" color="gray.400" mt={4}>
              © 2024 Leonard Soda Blasting. All rights reserved.
            </Text>
            <ChakraLink
              href={`/admin`} // Updated for Next.js, assuming admin is at /admin
              isExternal
              bg="gray.700"
              color="white"
              px={4}
              py={2}
              borderRadius="md"
              fontSize="sm"
              fontWeight="semibold"
              textDecoration="none"
              _hover={{
                bg: "#228b22",
                textDecoration: "none"
              }}
              transition="all 0.2s ease"
              mt={2}
              display="inline-block"
            >
              Admin Login
            </ChakraLink>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;

