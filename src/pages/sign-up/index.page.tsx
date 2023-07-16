import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import type { NextPage } from 'next';
import Link from 'next/link';

import { auth } from '../../../firebase/firebase';

type FormValues = {
  email: string;
  password: string;
};

const SignUp: NextPage = () => {
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => {
        return /^\S+@\S+$/.test(value) ? null : 'Invalid email';
      },
    },
  });

  const handleSignup = async (data: FormValues): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log('signed up');
    } catch (error) {
      console.log(error);
      throw new Error("Couldn't sign up");
    }
  };

  return (
    <Box maw={300} mx='auto'>
      <form
        onSubmit={form.onSubmit((values) => {
          return handleSignup(values);
        })}
      >
        <TextInput withAsterisk label='Email' placeholder='your@email.com' {...form.getInputProps('email')} />
        <TextInput
          withAsterisk
          label='Password'
          placeholder='your password'
          type='password'
          {...form.getInputProps('password')}
        />

        <Group position='right' mt='md'>
          <Button type='submit' data-testid='submitButton'>
            Submit
          </Button>
        </Group>
      </form>
      <Link href='sign-in'>signIn</Link>
    </Box>
  );
};

export default SignUp;
