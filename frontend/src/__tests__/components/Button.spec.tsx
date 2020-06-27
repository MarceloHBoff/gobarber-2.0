import React from 'react';

import { render } from '@testing-library/react';

import Button from '../../components/Button';

describe('Button component', () => {
  it('should be able to render an Button', () => {
    const { getByText } = render(<Button>Test</Button>);

    expect(getByText('Test')).toBeTruthy();
  });

  it('should be able to render an Button with loading', async () => {
    const { getByText } = render(<Button loading>Test</Button>);

    expect(getByText('Loading...')).toBeTruthy();
  });
});
