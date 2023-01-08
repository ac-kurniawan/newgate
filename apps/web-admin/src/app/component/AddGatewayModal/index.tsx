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
import { InProgressConfigurationForm } from './InProgressConfigurationForm';
import { KongConfigurationForm } from './KongConfigurationForm';

export interface AddGatewayModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  gatewayList: AddGatewayItemCardProps[];
  onSelectGatewayItem: (id: number) => void;
}

export const AddGatewayModal: FC<AddGatewayModalProps> = (props) => {
  const { title, gatewayList, onSelectGatewayItem, ...rest } = props;

  const configurationForms = [
    <KongConfigurationForm />,
    <InProgressConfigurationForm />,
    <InProgressConfigurationForm />,
  ];

  const selectForm = () => {
    const find = gatewayList.find((x) => x.selected === true);
    if (!find) {
      return <InProgressConfigurationForm />;
    }
    return configurationForms[find.id];
  };

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
          {}
          {selectForm()}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
