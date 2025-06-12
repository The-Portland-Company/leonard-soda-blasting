import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
} from '@chakra-ui/react';

const PhoneNumber: React.FC = () => {
  return (
    <Box bg="#333333" py={4} w="100%">
      <Container maxW="container.xl" w="100%">
        <HStack justify="center" align="center" gap={3} w="100%">
          <Heading fontSize="20px" color="white" lineHeight="1" display="flex" alignItems="center">
            (503) 319-6711
          </Heading>
        </HStack>
      </Container>
    </Box>
  );
};

export default PhoneNumber;