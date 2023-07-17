import { fireEvent, render } from '@testing-library/react';
import type { UserCredential } from 'firebase/auth';
import * as FirebaseAuth from 'firebase/auth';

import SignIn from './index.page';

jest.mock('firebase/auth');

describe('SignIn', () => {
  test('レンダリングされること', () => {
    expect(SignIn).toBeTruthy();
    const { container } = render(<SignIn />);
    expect(container).toBeTruthy();
  });

  test('submitしたらサインインされること', () => {
    jest.spyOn(FirebaseAuth, 'signInWithEmailAndPassword').mockResolvedValue({} as unknown as UserCredential);
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const submitButton = getByText('Submit');
    expect(submitButton).toBeTruthy();
    // placeholderの値を入力する
    const emailInput = getByPlaceholderText('your@email.com');
    fireEvent.change(emailInput, {
      target: {
        value: 'exsample@gmail.com',
      },
    });
    const passwordInput = getByPlaceholderText('your password');
    fireEvent.change(passwordInput, {
      target: {
        value: 'password',
      },
    });
    // submitボタンを押す
    fireEvent.click(submitButton);
    // サインインされること
    expect(FirebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});
