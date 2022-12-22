import React from 'react';
import { screen, render } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { DebounceDemo } from './useDebounce.composition';

describe('useDebounce', () => {
  test.skip('should update number when clicking button', async () => {
    // TODO: Fix testing with timeouts
    render(<DebounceDemo />);
    const saveBtn = screen.getByRole('button', { name: /SaveA1/, exact: true });
    await UserEvent.click(saveBtn);
    await screen.getByText('SaveCount: 1');
  });
});
