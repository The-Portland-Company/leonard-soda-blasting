import { createSystem, defaultConfig } from '@chakra-ui/react';

const theme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: 'var(--font-arvo), Georgia, serif' },
        body: { value: 'Open Sans, sans-serif' },
      },
    },
  },
});

export default theme;
