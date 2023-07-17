import { Avatar, Burger, Container, Group, Menu, rem, Tabs, Text, UnstyledButton } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import type { TABS } from '../../templates/defaultTemplate';
import { useHeader } from '../header/useHeader';
import { useHeaderStyles } from './useHeaderStyle';

interface HeaderTabsProps {
  tabs: typeof TABS;
  user: { image: string; name: string };
}

export const HeaderTabs = ({ tabs, user }: HeaderTabsProps) => {
  const { classes, cx, theme } = useHeaderStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState<boolean>(false);
  const router = useRouter();
  const { pathToTab, tabToPushPath } = useHeader(router);

  const items = tabs.map((tab) => {
    return (
      <Tabs.Tab value={tab} key={tab}>
        {tab}
      </Tabs.Tab>
    );
  });

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position='apart'>
          <MantineLogo size={28} />

          <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />

          <Menu
            width={260}
            position='bottom-end'
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => {
              return setUserMenuOpened(false);
            }}
            onOpen={() => {
              return setUserMenuOpened(true);
            }}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar src={user?.image} alt={user?.name} radius='xl' size={20} />
                  <Text weight={500} size='sm' sx={{ lineHeight: 1 }} mr={3}>
                    {/* {user.name} */}
                  </Text>
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconHeart size='0.9rem' color={theme.colors.red[6]} stroke={1.5} />}>
                Liked posts
              </Menu.Item>
              <Menu.Item icon={<IconStar size='0.9rem' color={theme.colors.yellow[6]} stroke={1.5} />}>
                Saved posts
              </Menu.Item>
              <Menu.Item icon={<IconMessage size='0.9rem' color={theme.colors.blue[6]} stroke={1.5} />}>
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size='0.9rem' stroke={1.5} />}>Account settings</Menu.Item>
              <Menu.Item icon={<IconSwitchHorizontal size='0.9rem' stroke={1.5} />}>Change account</Menu.Item>
              <Menu.Item icon={<IconLogout size='0.9rem' stroke={1.5} />}>Logout</Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<IconPlayerPause size='0.9rem' stroke={1.5} />}>Pause subscription</Menu.Item>
              <Menu.Item color='red' icon={<IconTrash size='0.9rem' stroke={1.5} />}>
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container>
        <Tabs
          value={pathToTab(router.pathname)}
          variant='outline'
          onTabChange={(tab) => {
            tabToPushPath(tab as (typeof TABS)[number]);
          }}
          classNames={{
            root: classes.tabs,
            tab: classes.tab,
            tabsList: classes.tabsList,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
};
