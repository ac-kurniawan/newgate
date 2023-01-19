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
import { useFormik } from 'formik';
import { FC } from 'react';

export const KongConfigurationForm: FC = () => {
  const form = useFormik({
    initialValues: {
      name: "",
      host: "",
      port: 8001,
      key: "",
      alias: undefined,
      group: undefined
    },
    onSubmit: (val) => {}
  })
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
            <Input type={'text'} id="name" name='name' value={form.values.name} onChange={form.handleChange} />
            <FormHelperText>kong service name, example: newgate</FormHelperText>
            <FormErrorMessage>test</FormErrorMessage>
          </FormControl>
          <FormControl isRequired my={2}>
            <FormLabel>Host</FormLabel>
            <Input type={'text'} id="host" name='host' value={form.values.host} onChange={form.handleChange} />
            <FormHelperText>
              kong host, example: https://localhost
            </FormHelperText>
            <FormErrorMessage>test</FormErrorMessage>
          </FormControl>
          <FormControl isRequired my={2}>
            <FormLabel>Port</FormLabel>
            <Input type={'number'} id="port" name='port' value={form.values.port} onChange={form.handleChange}/>
            <FormHelperText>kong Admin port, example: 8001</FormHelperText>
            <FormErrorMessage>test</FormErrorMessage>
          </FormControl>
          <FormControl my={2}>
            <FormLabel>Key</FormLabel>
            <Input type={'text'} id="key" name='key' value={form.values.key} onChange={form.handleChange} />
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
            <Input type={'text'} id="alias" name='alias' value={form.values.alias} onChange={form.handleChange}/>
            <FormHelperText>alias name</FormHelperText>
            <FormErrorMessage>test</FormErrorMessage>
          </FormControl>
          <FormControl my={2}>
            <FormLabel>Group</FormLabel>
            <Input type={'text'} id="group" name='group' value={form.values.group} onChange={form.handleChange} />
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
