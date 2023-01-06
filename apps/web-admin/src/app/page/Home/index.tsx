import { Grid, Button, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { HeaderOnlyLayout } from '../../layout/HeaderOnlyLayout';
import { IoAddCircle } from 'react-icons/io5';
import { AddGatewayModal } from '../../component/AddGatewayModal';

export const HomePage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HeaderOnlyLayout>
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={6}
      ></Grid>
      <Button
        colorScheme={'teal'}
        leftIcon={<IoAddCircle />}
        variant="solid"
        w={'100%'}
        onClick={onOpen}
      >
        Add API gateway
      </Button>
      <AddGatewayModal
        title="Select you gateway type:"
        onClose={onClose}
        isOpen={isOpen}
      />
    </HeaderOnlyLayout>
  );
};
