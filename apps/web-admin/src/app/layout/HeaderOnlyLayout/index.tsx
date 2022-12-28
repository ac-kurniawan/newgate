import {
  Box,
  useDisclosure,
  useColorModeValue,
  Container,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { Navbar } from '../../component/Navbar';
import { useAppSelector } from '../../state';

export const HeaderOnlyLayout: FC<PropsWithChildren> = (props) => {
  const { onOpen } = useDisclosure();
  const auth = useAppSelector((state) => state.auth);

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.800')}>
      <Navbar
        onOpen={onOpen}
        isShowLogo={true}
        avatarMenu={
          auth.data && {
            name: auth.data.parsedToken.fullName,
            access: auth.data.parsedToken.email,
          }
        }
      />
      <Box p={4}>{props.children}</Box>
      <Box bg={'white'} color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© 2022 Chakra Templates. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}></Stack>
        </Container>
      </Box>
    </Box>
  );
};
