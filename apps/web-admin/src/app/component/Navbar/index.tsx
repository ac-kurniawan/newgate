import {
  FlexProps,
  Flex,
  useColorModeValue,
  IconButton,
  HStack,
  Text,
} from '@chakra-ui/react';
import { FiMenu, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AvatarMenu, AvatarMenuProps } from '../AvatarMenu';

interface NavbarProps extends FlexProps {
  onOpen: () => void;
  isShowLogo?: boolean;
  avatarMenu?: AvatarMenuProps;
}
export const Navbar = ({
  onOpen,
  isShowLogo,
  avatarMenu,
  ...rest
}: NavbarProps) => {
  const navigate = useNavigate();
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height={'20'}
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{
        base: 'space-between',
        md: isShowLogo ? 'space-between' : 'flex-end',
      }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        onClick={() => {
          navigate('/');
        }}
      >
        Newgate
      </Text>

      <Text
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        cursor={'pointer'}
        display={{ base: 'none', md: isShowLogo ? 'block' : 'none' }}
        onClick={() => {
          navigate('/');
        }}
      >
        Newgate
      </Text>
      {avatarMenu ? (
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
          <AvatarMenu
            name={avatarMenu.name}
            access={avatarMenu.access}
            imageSource={avatarMenu.imageSource}
          />
        </HStack>
      ) : (
        <div></div>
      )}
    </Flex>
  );
};
