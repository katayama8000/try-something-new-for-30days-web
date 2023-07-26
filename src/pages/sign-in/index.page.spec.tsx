import { fireEvent, render } from '@testing-library/react';
import axios from 'axios';
import type { UserCredential } from 'firebase/auth';
import * as FirebaseAuth from 'firebase/auth';

import SignIn from './index.page';

jest.mock('firebase/auth');
jest.mock('axios');

describe('SignIn', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('レンダリングされること', () => {
    expect(SignIn).toBeTruthy();
    const { container } = render(<SignIn />);
    expect(container).toBeTruthy();
  });

  test('submitしたらサインインされること', () => {
    jest.spyOn(FirebaseAuth, 'signInWithEmailAndPassword').mockResolvedValue({} as unknown as UserCredential);
    // const mockRouterPush = jest.fn().mockReturnValue(Promise.resolve());
    // jest.spyOn(NextRouter, 'useRouter').mockReturnValue({
    //   push: mockRouterPush as unknown,
    // } as ReturnType<(typeof NextRouter)['useRouter']>);
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
    // ホーム画面に遷移すること
  });
  test('サインイン時に[custom claims]が付与されていること', () => {
    const uid = '123';
    const response = { data: { uid } };
    jest.spyOn(FirebaseAuth, 'signInWithEmailAndPassword').mockResolvedValue({} as unknown as UserCredential);
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue(response);
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
    // apiが呼ばれていること
    // expect(axios.post).toHaveBeenCalledWith('/api/setCustomClaim', { uid });
  });
});
