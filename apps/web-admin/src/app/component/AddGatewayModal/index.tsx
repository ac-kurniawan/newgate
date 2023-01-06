import {
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { FC } from 'react';
import {
  AddGatewayItemCard,
  AddGatewayItemCardProps,
} from '../AddGatewayItemCard';

export interface AddGatewayModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  gatewayList: AddGatewayItemCardProps[];
  onSelectGatewayItem: (id: number) => void;
}

export const AddGatewayModal: FC<AddGatewayModalProps> = (props) => {
  const { title, gatewayList, onSelectGatewayItem, ...rest } = props;

  return (
    <Modal {...rest} size={'6xl'}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={3}
          >
            {gatewayList.map((gateway, idx) => (
              <AddGatewayItemCard
                key={idx}
                id={idx}
                imageUrl={gateway.imageUrl}
                name={gateway.name}
                type={gateway.type}
                url={gateway.url}
                selected={gateway.selected}
                onClick={onSelectGatewayItem}
              />
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue">Next</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
