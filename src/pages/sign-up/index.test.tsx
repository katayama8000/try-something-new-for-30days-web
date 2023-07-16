import { render } from '@testing-library/react';

import SignUp from './index.page';

describe('SignUp', () => {
  it('should render', () => {
    expect(SignUp).toBeTruthy();
    const { getByTestId } = render(<SignUp />);
    // const submitButton = getByText('Submit');
    const submitButton = getByTestId('submitButton');
    expect(submitButton).toBeTruthy();
  });
});
