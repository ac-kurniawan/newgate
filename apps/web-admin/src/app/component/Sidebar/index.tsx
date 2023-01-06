import { FC, ReactNode, ReactText, useState } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Divider,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import KongLogo from '../../../assets/kong-logomark-color.svg';
import { ImageMenu } from '../ImageMenu';
import { Navbar } from '../Navbar';
import { CustomRouter, RouterList } from '../../routes';
import { sidebarGroupMapper } from '../../routes/mapper';
import { useMatches, Link, Params, useNavigate } from 'react-router-dom';

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface GroupSidebarItemsProps {
  group: string;
  sidebarItems: CustomRouter[];
  match: {
    id: string;
    pathname: string;
    params: Params<string>;
    data: unknown;
    handle: unknown;
  }[];
  params?: {
    kongId?: string;
  };
}
const GroupSidebarItems: FC<GroupSidebarItemsProps> = (props) => {
  const filteredRoutes = props.sidebarItems.filter(
    (x) => x.group === props.group
  );
  const { match } = props;
  const getHrefTarget = (route: CustomRouter) => {
    switch (props.group) {
      case 'kong':
        return route.path?.replace(':kongId', props.params?.kongId || '');
      default:
        return route.path;
    }
  };
  return (
    <>
      <Divider my={2} />
      <Text m={3} fontWeight={'bold'}>
        {sidebarGroupMapper(props.group)}
      </Text>
      {filteredRoutes.map((link) => (
        <NavItem
          key={link.id}
          icon={link.icon}
          active={match[0].id === link.id}
          to={getHrefTarget(link)}
        >
          {link.name}
        </NavItem>
      ))}
    </>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const match = useMatches();
  const navigate = useNavigate();
  let menuList = [
    {
      id: '123123123',
      text: 'Chief gateway',
      imagePath: KongLogo,
      caption: 'Kong',
      group: 'kong',
    },
    {
      id: 'asdasdasdasd',
      text: 'ChiefV2 gateway',
      imagePath: KongLogo,
      caption: 'Kong',
      group: 'kong',
    },
  ];
  const [selectedMenu, setSelectedMenu] = useState(
    menuList.find((x) => x.id === match[0].params.kongId) || menuList[0]
  );

  const onClickMenuItem = (id: string) => {
    const find = menuList.find((x) => x.id === id);
    setSelectedMenu(find || menuList[0]);
    navigate('/kong/' + find?.id);
  };

  menuList = menuList.map((x) => ({
    ...x,
    onClickMenuItem,
  }));

  const sidebarItems: CustomRouter[] = RouterList.filter(
    (x) => x.isShownInSidebar === true
  );

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Newgate
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <ImageMenu
        selectedMenu={selectedMenu}
        menuList={menuList}
        children={undefined}
      />
      <GroupSidebarItems
        group="kong"
        sidebarItems={sidebarItems}
        match={match}
        params={{
          ...(selectedMenu.group === 'kong'
            ? { kongId: selectedMenu.id }
            : undefined),
        }}
      />
      <GroupSidebarItems
        group="admin"
        sidebarItems={sidebarItems}
        match={match}
      />
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon?: IconType;
  children: ReactText;
  active?: boolean;
  to?: string;
}
const NavItem = ({ icon, children, active, to, ...rest }: NavItemProps) => {
  return (
    <Link to={to || '#'}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          bg={active ? 'cyan.400' : undefined}
          color={active ? 'white' : undefined}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              color={active ? 'white' : undefined}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </Link>
  );
};
