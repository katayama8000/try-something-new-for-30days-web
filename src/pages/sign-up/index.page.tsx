import type { NextPage } from 'next';
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import Link from 'next/link';

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
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
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
      <form onSubmit={form.onSubmit((values) => handleSignup(values))}>
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
