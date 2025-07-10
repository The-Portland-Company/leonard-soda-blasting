'use client'

import React from 'react';
import {
  Box,
  Container,
  Heading,
  HStack,
} from '@chakra-ui/react';

interface PhoneNumberProps {
  phoneNumber?: string;
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ phoneNumber }) => {
  return (
    <Box id="phone-number-banner" bg="#333333" py={4} w="100%">
      <Container id="phone-number-container" maxW="container.xl" w="100%">
        <HStack id="phone-number-content" justify="center" align="center" gap={3} w="100%">
          <Heading fontSize="41px" color="white" lineHeight="1" display="flex" alignItems="center">
            {phoneNumber && `📞 ${phoneNumber}`}
          </Heading>
        </HStack>
      </Container>
    </Box>
  );
};

export default PhoneNumber;