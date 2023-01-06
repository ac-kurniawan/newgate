import {
  Center,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Image,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';

export interface HomeItemCardProps {
  imageUrl: string;
  name: string;
  type: string;
  url: string;
}

export const HomeItemCard: FC<HomeItemCardProps> = (props) => {
  const { imageUrl, name, type, url } = props;
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
            backgroundImage: `url(${imageUrl})`,
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
            objectFit={'contain'}
            src={imageUrl}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {type}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {name}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text color={'gray.600'}>{url}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
