import { HeaderTabs } from '@components/header/header';
import { Container } from '@mantine/core';
import React from 'react';
import { type FC, type ReactNode } from 'react';

export const TABS = ['Home', 'NewChallenge', 'My30daysChallenge', 'Account', 'Settings', 'Help', 'Admin'] as const;

type defaultTemplateProps = {
  children: ReactNode;
};

export const DefaultTemplate: FC<defaultTemplateProps> = ({ children }) => {
  return (
    <>
      <HeaderTabs user={{ name: 'Jane Doe', image: 'https://bit.ly/ryan-florence' }} tabs={TABS} />
      <Container>{children}</Container>
    </>
  );
};
