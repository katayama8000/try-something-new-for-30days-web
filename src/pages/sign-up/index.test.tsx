import { render } from '@testing-library/react';
import SignUp from './index.page';

describe('SignUp', () => {
  it('should render', () => {
    expect(SignUp).toBeTruthy();
    const { getByText } = render(<SignUp />);
    const submitButton = getByText('Submit');
    expect(submitButton).toBeTruthy();
  });
});
