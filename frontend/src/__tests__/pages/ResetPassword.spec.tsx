import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';

import ResetPassword from '../../pages/ResetPassword';
import api from '../../services/api';

const apiMock = new AxiosMock(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

let mockedSearchToken = 'token-123456789';

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: mockedSearchToken,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ResetPassword Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be to reset password', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Password');
    const confirmationField = getByPlaceholderText('Password Confirmation');
    const buttonElement = getByText('Reset password');

    fireEvent.change(passwordField, { target: { value: '12345678' } });
    fireEvent.change(confirmationField, { target: { value: '12345678' } });

    fireEvent.click(buttonElement);

    apiMock.onPost('/password/reset').reply(201);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be to reset password with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Password');
    const confirmationField = getByPlaceholderText('Password Confirmation');
    const buttonElement = getByText('Reset password');

    fireEvent.change(passwordField, { target: { value: '123456789' } });
    fireEvent.change(confirmationField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if reset password fails', async () => {
    apiMock.onPost('/password/reset').abortRequest();

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Password');
    const confirmationField = getByPlaceholderText('Password Confirmation');
    const buttonElement = getByText('Reset password');

    fireEvent.change(passwordField, { target: { value: '123456789' } });
    fireEvent.change(confirmationField, { target: { value: '123456789' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });

  it('should not be able to reset password without token', async () => {
    mockedSearchToken = '';

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Password');
    const confirmationField = getByPlaceholderText('Password Confirmation');
    const buttonElement = getByText('Reset password');

    fireEvent.change(passwordField, { target: { value: '123456789' } });
    fireEvent.change(confirmationField, { target: { value: '123456789' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
