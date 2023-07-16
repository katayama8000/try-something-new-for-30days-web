import { Title } from '@mantine/core';
import type { NextPage } from 'next';
import React from 'react';

import { DefaultTemplate } from '../../templates/defaultTemplate';

// 必要な項目
// タイトル
// 開始日
// 目的

const NewChallenge: NextPage = () => {
  return (
    <DefaultTemplate>
      <Title>NewChallenge</Title>
    </DefaultTemplate>
  );
};

export default NewChallenge;
