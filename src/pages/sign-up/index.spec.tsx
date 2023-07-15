import { render } from '@testing-library/react';
import SignUp from '@pages/sign-up/index.page';

describe('Home', () => {
  it('renders a heading', () => {
    const { getByText } = render(<SignUp />);

    const submitButton = getByText('Submit');
    expect(submitButton).toBeInTheDocument();
  });
});
