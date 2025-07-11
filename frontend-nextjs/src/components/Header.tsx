'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  HStack,
  useBreakpointValue,
  IconButton,
} from '@chakra-ui/react';
import { Navigation } from '@/lib/directus';

interface HeaderProps {
  navigation: Navigation[];
  siteTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ navigation, siteTitle }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

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
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <Box id="main-header" bg="blackAlpha.800" color="white" py={4} position="sticky" top={0} zIndex={1000}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link href="/" >
            <Text fontSize="16px" fontWeight="bold" fontFamily="Arvo, Georgia, serif" textTransform="uppercase" letterSpacing="0.5px">
              {siteTitle}
            </Text>
          </Link>
          {!isMobile ? (
            <HStack id="desktop-navigation" gap={8}>
              {navigation.filter(item => item.status === 'active').map((item) => (
                item.label === 'Services' ? (
                  <Box key={item.id} position="relative" onMouseLeave={() => setServicesMenuOpen(false)}>
                    <Text color="white" fontFamily="Arvo, Georgia, serif" textTransform="uppercase" letterSpacing="1px" fontSize="14px" cursor="pointer" _hover={{ color: '#228b22' }} onMouseEnter={() => setServicesMenuOpen(true)}>
                      Services ▼
                    </Text>
                    <Box position="absolute" top="100%" left="0" bg="blackAlpha.900" border="1px solid" borderColor="whiteAlpha.200" borderRadius="md" mt={0} py={2} minW="250px" zIndex={1000} opacity={servicesMenuOpen ? 1 : 0} visibility={servicesMenuOpen ? 'visible' : 'hidden'} transform={servicesMenuOpen ? 'translateY(0)' : 'translateY(-10px)'} transition="all 0.2s ease" pointerEvents={servicesMenuOpen ? 'auto' : 'none'} onMouseEnter={() => setServicesMenuOpen(true)}>
                      <VStack gap={0} align="stretch">
                        <Link href="/services" >
                          <Box px={4} py={2} color="white" fontFamily="Arvo, Georgia, serif" textTransform="uppercase" fontSize="14px" fontWeight="bold" _hover={{ bg: '#228b22' }} transition="all 0.2s ease">
                            Services Overview
                          </Box>
                        </Link>
                        {serviceNavItems.map(service => (
                          <Link href={service.href} key={service.href} >
                            <Box px={4} py={2} color="white" fontFamily="Open Sans, sans-serif" fontSize="13px" _hover={{ bg: '#228b22' }} transition="all 0.2s ease">
                              {service.label}
                            </Box>
                          </Link>
                        ))}
                      </VStack>
                    </Box>
                  </Box>
                ) : (
                  <Link key={item.id} href={item.url || '/'} target={item.target} >
                    <Text color='white' fontFamily='Arvo, Georgia, serif' textTransform='uppercase' letterSpacing='1px' fontSize='14px' textDecoration='none' _hover={{ textDecoration: 'none', color: '#228b22' }}>
                      {item.label}
                    </Text>
                  </Link>
                )
              ))}
            </HStack>
          ) : (
            <IconButton aria-label="Toggle mobile menu" variant="ghost" color="white" size="md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} _hover={{ bg: 'whiteAlpha.200' }} _active={{ bg: 'whiteAlpha.300' }}>
                <Box w="24px" h="18px" position="relative" display="flex" flexDirection="column" justifyContent="space-between">
                    <Box w="100%" h="2px" bg="white" borderRadius="1px" transform={mobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'} transition="all 0.3s ease" />
                    <Box w="100%" h="2px" bg="white" borderRadius="1px" opacity={mobileMenuOpen ? 0 : 1} transition="all 0.3s ease" />
                    <Box w="100%" h="2px" bg="white" borderRadius="1px" transform={mobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'} transition="all 0.3s ease" />
                </Box>
            </IconButton>
          )}
        </Flex>
      </Container>
      {isMobile && (
        <Box position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(0,0,0,0.85)" zIndex={999} transform={mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'} transition="transform 0.3s ease-in-out" backdropFilter="blur(10px)">
          <Box bg="blackAlpha.900" w="80%" maxW="300px" h="100vh" pt="80px" px={6} pb={6} transform={mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)'} transition="transform 0.3s ease-in-out 0.1s" overflowY="auto" borderRight="1px solid" borderColor="whiteAlpha.200">
            <VStack gap={0} align="stretch">
              {navigation.filter(item => item.status === 'active').map(item => (
                item.label === 'Services' ? (
                  <Box key={item.id} borderBottom="1px solid" borderColor="whiteAlpha.100">
                    <Box py={4} px={4} color="white" fontFamily="Arvo, Georgia, serif" textTransform="uppercase" letterSpacing="1px" fontSize="16px" fontWeight="bold" _hover={{ bg: 'whiteAlpha.100' }} transition="all 0.2s ease" cursor="pointer" display="flex" justifyContent="space-between" alignItems="center" onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}>
                      <Text>Services</Text>
                      <Text transform={mobileServicesExpanded ? 'rotate(90deg)' : 'rotate(0deg)'} transition="transform 0.3s ease" fontSize="14px">▶</Text>
                    </Box>
                    <Box maxHeight={mobileServicesExpanded ? "500px" : "0px"} overflow="hidden" transition="max-height 0.4s ease-in-out">
                      <VStack gap={0} align="stretch">
                        <Link href="/services" onClick={() => setMobileMenuOpen(false)} >
                          <Box py={3} px={8} color="#228b22" fontFamily="Arvo, Georgia, serif" textTransform="uppercase" letterSpacing="1px" fontSize="14px" fontWeight="bold" borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: 'whiteAlpha.50', color: 'white' }} transition="all 0.2s ease">
                            Services Overview
                          </Box>
                        </Link>
                        {serviceNavItems.map(service => (
                          <Link
                            href={service.href}
                            key={service.href}
                            onClick={() => setMobileMenuOpen(false)}
                            >
                            <Box py={3} px={8} color="whiteAlpha.900" fontFamily="Open Sans, sans-serif" fontSize="14px" borderBottom="1px solid" borderColor="whiteAlpha.50" _hover={{ bg: 'whiteAlpha.50', color: '#228b22' }} transition="all 0.2s ease">
                              {service.label}
                            </Box>
                          </Link>
                        ))}
                      </VStack>
                    </Box>
                  </Box>
                ) : (
                  <Link
                    key={item.id}
                    href={item.url || '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    >
                    <Box py={4} px={4} color="white" fontFamily="Arvo, Georgia, serif" textTransform="uppercase" letterSpacing="1px" fontSize="16px" fontWeight="bold" borderBottom="1px solid" borderColor="whiteAlpha.100" _hover={{ bg: 'whiteAlpha.100' }} transition="all 0.2s ease">
                      {item.label}
                    </Box>
                  </Link>
                )
              ))}
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Header;
