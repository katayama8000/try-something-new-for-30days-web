import { Button, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { addDoc, collection } from 'firebase/firestore';
import type { NextPage } from 'next';

import { db } from '../../../firebase/firebase';
import { DefaultTemplate } from '../../templates/defaultTemplate';

// 必要な項目
// タイトル
// 開始日
// 目的

type NewChallengeForm = {
  purpose: string;
  startDate: string;
  title: string;
};

const NewChallenge: NextPage = () => {
  const form = useForm<NewChallengeForm>({
    initialValues: {
      purpose: '',
      startDate: '',
      title: '',
    },
  });

  const handleSubmit = async (values: NewChallengeForm): Promise<void> => {
    const { purpose, startDate, title } = values;
    const docRef = await addDoc(collection(db, 'example'), {
      purpose,
      startDate,
      title,
    });
    console.log(docRef);
  };
  return (
    <DefaultTemplate>
      <Title>NewChallenge</Title>
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <TextInput label='title' placeholder='title' required {...form.getInputProps('title')} />
        <DateInput
          label='Date input'
          placeholder='Date input'
          maw={400}
          mx='auto'
          {...form.getInputProps('startDate')}
        />
        <TextInput label='purpose' placeholder='purpose' required {...form.getInputProps('purpose')} />
        <Button type='submit'>submit</Button>
      </form>
    </DefaultTemplate>
  );
};

export default NewChallenge;
