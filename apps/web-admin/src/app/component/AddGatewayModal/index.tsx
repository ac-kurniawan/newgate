import {
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Box,
} from '@chakra-ui/react';
import { FC } from 'react';
import { HomeItemCard } from '../HomeItemCard';
import KongLogo from '../../../assets/kong-logomark-color.svg';
import KrakendLogo from '../../../assets/krakend-api-gateway.webp';
import TykLogo from '../../../assets/tyk-logo.svg';

export interface AddGatewayModalProps extends Omit<ModalProps, 'children'> {
  title: string;
}

export const AddGatewayModal: FC<AddGatewayModalProps> = (props) => {
  const { title, ...rest } = props;
  return (
    <Modal {...rest} size={'6xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={3}
          >
            <Box border={'5px solid teal'}>
              <HomeItemCard
                imageUrl={KongLogo}
                name={'Kong'}
                type={'API Gateway'}
                url={''}
              />
            </Box>
            <HomeItemCard
              imageUrl={KrakendLogo}
              name={'Krakend'}
              type={'API Gateway'}
              url={''}
            />
            <HomeItemCard
              imageUrl={TykLogo}
              name={'Tyk'}
              type={'API Gateway'}
              url={''}
            />
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
