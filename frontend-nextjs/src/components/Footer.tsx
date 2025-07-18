import { Box, Container, VStack, Text, Link, Button } from '@chakra-ui/react';
import { GlobalSettings } from '@/lib/directus';
import { config } from '@/lib/config';

interface FooterProps {
  settings: GlobalSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  // Use settings data with fallbacks for required business information
  const businessName = settings?.site_title || 'LEONARD SODA BLASTING';
  const ccbNumber = settings?.ccb_number || '97926';
  const serviceAreas = settings?.service_areas || 'Serving Oregon & Washington';
  const phoneNumber = settings?.phone_number || '(503) 850-2784';
  const email = settings?.email || config.adminEmail;
  const compliance = settings?.compliance_certifications || 'FDA, OSHA, EPA, USDA COMPLIANT';

  return (
    <Box as="footer" bg="gray.900" color="white" py={8} textAlign="center">
      <Container maxW="container.xl">
        <VStack gap={3} fontSize="sm">
          {/* Business Name */}
          <Text fontSize="lg" fontWeight="bold" fontFamily="Arvo, Georgia, serif">
            {businessName}
          </Text>
          
          {/* CCB Number */}
          <Text>
            CCB# {ccbNumber}
          </Text>
          
          {/* Service Areas */}
          <Text>
            {serviceAreas}
          </Text>
          
          {/* Phone Number */}
          <Link href={`tel:${phoneNumber}`} color="white">
            <Text>{phoneNumber}</Text>
          </Link>
          
          {/* Email */}
          <Link href={`mailto:${email}`} color="white">
            <Text>{email}</Text>
          </Link>
          
          {/* Compliance Certifications */}
          <Text fontSize="xs" color="gray.300">
            {compliance}
          </Text>
          
          {/* Copyright */}
          <Text fontSize="xs" color="gray.400" mt={4}>
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </Text>
          
          {/* Admin Login */}
          <Link href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/admin`} target="_blank" rel="noopener noreferrer">
            <Button size="sm" colorScheme="green" mt={2}>
              Admin Login
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}