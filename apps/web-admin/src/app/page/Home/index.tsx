import { Grid, Button, useDisclosure } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { HeaderOnlyLayout } from '../../layout/HeaderOnlyLayout';
import { IoAddCircle } from 'react-icons/io5';
import { AddGatewayModal } from '../../component/AddGatewayModal';

import KongLogo from '../../../assets/kong-logomark-color.svg';
import KrakendLogo from '../../../assets/krakend-api-gateway.webp';
import TykLogo from '../../../assets/tyk-logo.svg';
import { AddGatewayItemCardProps } from '../../component/AddGatewayItemCard';
export const HomePage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gatewayList, setGatewayList] = useState<AddGatewayItemCardProps[]>([
    {
      id: 0,
      imageUrl: KongLogo,
      name: 'Kong',
      type: 'API Gateway',
      url: '',
      selected: false,
    },
    {
      id: 1,
      imageUrl: KrakendLogo,
      name: 'Krakend',
      type: 'API Gateway',
      url: '',
      selected: false,
    },
    {
      id: 2,
      imageUrl: TykLogo,
      name: 'Tyk',
      type: 'API Gateway',
      url: '',
      selected: false,
    },
  ]);
  const onClick = (id: number) => {
    const cp = gatewayList.map((x) => ({
      ...x,
      selected: false,
    }));
    cp[id].selected = true;
    setGatewayList([...cp]);
  };
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
        gatewayList={gatewayList}
        onSelectGatewayItem={onClick}
      />
    </HeaderOnlyLayout>
  );
};
