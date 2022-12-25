import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Stack,
  Image,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
} from '@chakra-ui/react';
import { FC } from 'react';

interface ImageMenuBodyProps {
  id: string;
  imagePath: string;
  text: string;
  caption?: string;
  group: string;
  onClickMenuItem?: (id: string) => void;
}
const ImageMenuBody: FC<ImageMenuBodyProps> = (props) => {
  return (
    <Flex role="group" align={'center'}>
      <Image boxSize={'14'} p={'2'} src={props.imagePath} alt={'kong-logo'} />
      <Stack>
        <Text>{props.text}</Text>
        <Text as={'a'} textAlign={'left'} fontSize="xs" fontWeight={'light'}>
          {props.caption}
        </Text>
      </Stack>
    </Flex>
  );
};

export interface ImageMenuProps extends MenuProps {
  menuList: ImageMenuBodyProps[];
  selectedMenu: ImageMenuBodyProps;
}
export const ImageMenu: FC<ImageMenuProps> = (props) => {
  const { selectedMenu, menuList } = props;
  return (
    <Menu>
      <MenuButton
        as={Button}
        aria-label="Options"
        variant="outline"
        rightIcon={<ChevronDownIcon />}
        m={3}
        h={'auto'}
        p={2}
      >
        <ImageMenuBody
          id={selectedMenu.id}
          text={selectedMenu.text}
          imagePath={selectedMenu.imagePath}
          caption={selectedMenu.caption}
          group={selectedMenu.group}
        />
      </MenuButton>
      <MenuList>
        {menuList.map((menu) => (
          <MenuItem
            key={menu.text}
            onClick={() =>
              menu.onClickMenuItem !== undefined
                ? menu.onClickMenuItem(menu.id)
                : undefined
            }
          >
            <ImageMenuBody
              id={selectedMenu.id}
              text={menu.text}
              imagePath={menu.imagePath}
              caption={menu.caption}
              group={selectedMenu.group}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
