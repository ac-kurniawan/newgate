import {
  Box,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';

export const KongConfigurationForm: FC = () => {
  return (
    <Box>
      <Divider my={5} />
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem
          colSpan={2}
          pr={4}
          borderRight={'2px solid rgb(226, 232, 240)'}
        >
          <Text fontSize={'xl'} fontWeight={'semibold'} my={3}>
            Configuration
          </Text>
          <FormControl isRequired my={2}>
            <FormLabel>Name</FormLabel>
            <Input type={'text'} />
            <FormHelperText>kong service name, example: newgate</FormHelperText>
            <FormErrorMessage>test</FormErrorMessage>
          </FormControl>
          <FormControl isRequired my={2}>
            <FormLabel>Host</FormLabel>
            <Input type={'text'} />
            <FormHelperText>
              kong host, example: https://localhost
            </FormHelperText>
            <FormErrorMessage>test</FormErrorMessage>
          </FormControl>
          <FormControl isRequired my={2}>
            <FormLabel>Port</FormLabel>
            <Input type={'text'} />
            <FormHelperText>kong Admin port, example: 8001</FormHelperText>
            <FormErrorMessage>test</FormErrorMessage>
          </FormControl>
          <FormControl my={2}>
            <FormLabel>Key</FormLabel>
            <Input type={'text'} />
            <FormHelperText>
              let it blank to create service in kong automatically
            </FormHelperText>
            <FormErrorMessage>test</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <Text fontSize={'xl'} fontWeight={'semibold'} my={3}>
            Additional configuration
          </Text>
          <FormControl my={2}>
            <FormLabel>Alias</FormLabel>
            <Input type={'text'} />
            <FormHelperText>alias name</FormHelperText>
            <FormErrorMessage>test</FormErrorMessage>
          </FormControl>
          <FormControl my={2}>
            <FormLabel>Group</FormLabel>
            <Input type={'text'} />
            <FormHelperText>
              if you need to group your gateway, example: Development
            </FormHelperText>
            <FormErrorMessage>test</FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>
    </Box>
  );
};
