import { Container } from '@mantine/core';
import { type FC, type ReactNode } from 'react';

import { HeaderTabs } from '../components/header/header';

export const TABS = ['Home', 'NewChallenge', 'My30daysChallenge', 'Account', 'Settings', 'Help', 'Admin'] as const;

type defaultTemplateProps = {
  children: ReactNode;
};

export const DefaultTemplate: FC<defaultTemplateProps> = ({ children }) => {
  return (
    <>
      <HeaderTabs user={{ image: 'https://bit.ly/ryan-florence', name: 'Jane Doe' }} tabs={TABS} />
      <Container>{children}</Container>
    </>
  );
};
