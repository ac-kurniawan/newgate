import {
  Center,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Image,
  Text,
  Grid,
  Button,
} from '@chakra-ui/react';
import { FC } from 'react';
import { HeaderOnlyLayout } from '../../layout/HeaderOnlyLayout';
import { IoAddCircle } from 'react-icons/io5';

const IMAGE = 'https://picsum.photos/230/282';

export default function ProductSimple() {
  return (
    <Center py={12} cursor="pointer">
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(30px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Kong
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Chief API Gateway
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text color={'gray.600'}>https://kong-api.chief.ovh</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

export const HomePage: FC = () => {
  return (
    <HeaderOnlyLayout>
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={6}
      >
        <ProductSimple />
        <ProductSimple />
        <ProductSimple />
        <ProductSimple />
        <ProductSimple />
        <ProductSimple />
        <ProductSimple />
        <ProductSimple />
        <ProductSimple />
        <ProductSimple />
        <ProductSimple />
        <ProductSimple />
      </Grid>
      <Button
        colorScheme={'teal'}
        leftIcon={<IoAddCircle />}
        variant="solid"
        w={'100%'}
      >
        Add API gateway
      </Button>
    </HeaderOnlyLayout>
  );
};
