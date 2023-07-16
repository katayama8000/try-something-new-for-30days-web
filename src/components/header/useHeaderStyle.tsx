import { createStyles, rem } from '@mantine/core';

export const useHeaderStyles = createStyles((theme) => {return {

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },
  header: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]}`,
    marginBottom: rem(120),
    paddingTop: theme.spacing.sm,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  tab: {

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },

    '&[data-active]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
    },
    backgroundColor: 'transparent',
    fontWeight: 500,
    height: rem(38),
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  user: {

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    transition: 'background-color 100ms ease',

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}});
