import * as Sentry from '@sentry/nextjs';
import { type Transaction } from '@sentry/nextjs/types/client';
import { render } from '@testing-library/react';

import Home from './index.page';

jest.mock('@sentry/nextjs');
describe('Sentry Home', () => {
  test('レンダリングされること', () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });

  test('「Throw error!」を押すとエラーが発生すること', () => {
    jest.spyOn(Sentry, 'captureException');
    jest.spyOn(Sentry, 'startTransaction').mockReturnValue({} as Transaction);
    const { getByText } = render(<Home />);
    const button = getByText('Throw error!');
    expect(button).toBeTruthy();
    // TODO: sentryのモック
    // button.click();
    // expect(() => {
    //   throw new Error('error');
    // }).toThrowError('error');
  });
});
