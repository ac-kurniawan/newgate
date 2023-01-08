import { Box, Divider, Text } from '@chakra-ui/react';
import { FC } from 'react';

export const InProgressConfigurationForm: FC = () => {
  return (
    <Box>
      <Divider my={5} />
      <Text fontSize={'xl'} fontWeight={'semibold'} my={3}>
        Under development
      </Text>
    </Box>
  );
};
