import { fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import { type Auth, type UserCredential } from 'firebase/auth';
import * as FirebaseAuth from 'firebase/auth';

import SignUp from './index.page';

jest.mock('firebase/auth');
jest.mock('axios');

describe('SignUp', () => {
  test('レンダリングされること', () => {
    expect(SignUp).toBeTruthy();
    const { container } = render(<SignUp />);
    expect(container).toBeTruthy();
  });

  test('submitしたらサインアップされること', () => {
    jest.spyOn(FirebaseAuth, 'createUserWithEmailAndPassword').mockResolvedValue({} as unknown as UserCredential);
    jest.spyOn(FirebaseAuth, 'getAuth').mockReturnValue({} as unknown as Auth);
    jest.spyOn(axios, 'post').mockResolvedValue({});
    const { getByPlaceholderText, getByText } = render(<SignUp />);
    const submitButton = getByText('Submit');
    expect(submitButton).toBeTruthy();
    // placeholderの値を入力する
    const emailInput = getByPlaceholderText('your@email.com');
    fireEvent.change(emailInput, {
      target: {
        value: 'sample@getMaxListeners.com',
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
    expect(FirebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    // ホーム画面に遷移すること
  });
});
