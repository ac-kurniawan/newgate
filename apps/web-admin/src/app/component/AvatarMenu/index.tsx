import {
  Flex,
  Menu,
  MenuButton,
  HStack,
  Avatar,
  VStack,
  MenuList,
  useColorModeValue,
  MenuItem,
  MenuDivider,
  Box,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export interface AvatarMenuProps {
  name: string;
  access: string;
  imageSource?: string;
}
export const AvatarMenu: FC<AvatarMenuProps> = (props) => {
  const { name, access, imageSource } = props;
  return (
    <Flex alignItems={'center'} zIndex={3}>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
          <HStack>
            <Avatar size={'sm'} bg="cyan.400" src={imageSource} />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">{name}</Text>
              <Text fontSize="xs" color="gray.600">
                {access}
              </Text>
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue('white', 'gray.900')}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Billing</MenuItem>
          <MenuDivider />
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
