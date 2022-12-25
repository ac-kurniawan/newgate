import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Link,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Box,
  Text,
  HStack,
  Divider, FormErrorMessage,
} from '@chakra-ui/react';
import {FC, useEffect, useState} from 'react';
import { HeaderOnlyLayout } from '../../layout/HeaderOnlyLayout';
import {useAppDispatch, useAppSelector} from "../../state";
import {AuthSlice} from "../../state/auth/auth.state";
import {useFormik} from "formik";
import {signinDtoValidator} from "@newgate/dto";

export const SigninPage: FC = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false)

  useEffect(() => {
    if (auth.status === 'PENDING') {
      setIsLoadingSignIn(true)
    } else {
      setIsLoadingSignIn(false)

    }
  }, [auth.status])

  const signInForm = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: signinDtoValidator,
    onSubmit: (val) => {
      dispatch(AuthSlice.actions.signin({
        email: val.email,
        password: val.password
      }))
    }
  })

  return (
    <HeaderOnlyLayout>
      <Flex
        minH={'calc(100vh - 168px)'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link>{' '}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email" id="email" name="email" onChange={signInForm.handleChange} value={signInForm.values.email}/>
                <FormErrorMessage>{signInForm.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" id="password" name="password" onChange={signInForm.handleChange} value={signInForm.values.password}/>
                <FormErrorMessage>{signInForm.errors.password}</FormErrorMessage>
              </FormControl>
              <Text color={'red'} display={auth.status === 'FAILED' ? 'block' : 'none'} >email or password was wrong</Text>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={isLoadingSignIn}
                  onClick={() => signInForm.handleSubmit()}
                >
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Text>Or</Text>
                  <Divider />
                </HStack>
                <Button
                  bg={'teal.400'}
                  color={'white'}
                  _hover={{
                    bg: 'teal.500',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </HeaderOnlyLayout>
  );
};
