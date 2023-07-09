import { TABS } from '@templates/defaultTemplate';
import { type NextRouter } from 'next/router';

export const useHeader = (router: NextRouter) => {
  const pathToTab = (path: string): (typeof TABS)[number] => {
    switch (path) {
      case '/home':
        return 'Home';
        break;
      case '/newChallenge':
        return 'NewChallenge';
        break;
      case '/myChallenge':
        return 'My30daysChallenge';
        break;
      case '/account':
        return 'Account';
        break;
      case '/settings':
        return 'Settings';
        break;
      case '/help':
        return 'Help';
        break;
      case '/admin':
        return 'Admin';
        break;
      default:
        return 'Home';
        break;
    }
  };

  const tabToPushPath = async (tab: (typeof TABS)[number]): Promise<void> => {
    switch (tab) {
      case 'Home':
        await router.push('/home');
        break;
      case 'NewChallenge':
        await router.push('/newChallenge');
        break;
      case 'My30daysChallenge':
        await router.push('/myChallenge');
        break;
      case 'Account':
        await router.push('/account');
        break;
      case 'Settings':
        await router.push('/settings');
        break;
      case 'Help':
        await router.push('/help');
        break;
      case 'Admin':
        await router.push('/admin');
        break;
      default:
        break;
    }
  };

  return { pathToTab, tabToPushPath };
};
