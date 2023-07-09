import React from 'react';
import { DefaultTemplate } from '@templates/defaultTemplate';
import { NextPage } from 'next';
import { Title } from '@mantine/core';

const NewChallenge: NextPage = () => {
  return (
    <DefaultTemplate>
      <Title>NewChallenge</Title>
    </DefaultTemplate>
  );
};

export default NewChallenge;
