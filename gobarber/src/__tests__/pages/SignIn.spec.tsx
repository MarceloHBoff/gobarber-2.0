import React from 'react';

import { render } from 'react-native-testing-library';

import SignIn from '../../pages/Auth/SignIn';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('SignIn Page', () => {
  it('should be to sign in', async () => {
    const { getByPlaceholder } = render(<SignIn />);

    expect(getByPlaceholder('E-mail')).toBeTruthy();
  });
});
