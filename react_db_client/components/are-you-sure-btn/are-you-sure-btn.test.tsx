import React from 'react';
import { screen, render, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import * as compositions from './are-you-sure-btn.composition';

describe('Are you sure button', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, async () => {
        render(<Composition />);
        // @ts-ignore
        if (Composition.waitForReady) await Composition.waitForReady();
      });
    });
  });

  describe('are you sure process', () => {
    test('should call confirm id when we click accept button in are you sure panel', async () => {
      render(<compositions.BasicAreYouSureBtn />);
      const btn = screen.getByRole('button');
      await UserEvent.click(btn);
      await screen.findByText('Are You Sure?');
      const acceptBtn = screen.getByRole('button', { name: /Confirm/ });
      await UserEvent.click(acceptBtn);
      await screen.findByText('User confirmed');
    });
  });
  describe('Edge cases', () => {
    test('should show correct notes when there are multiple btns', async() => {
      render(<compositions.MultipleAreYouSureBtn />);
      const btn = screen.getByRole('button', {name: 'Click me 1'});
      await UserEvent.click(btn);
      await screen.findByText('Are You Sure?');
      expect(screen.getByText('This is a note')).toBeInTheDocument();
      const closePanelBtn = screen.getByRole('button', { name: /Cancel/ });
      await UserEvent.click(closePanelBtn);

      const btn2 = screen.getByRole('button', {name: 'Click me 2'});
      await UserEvent.click(btn2);
      await screen.findByText('Are You Sure?');
      expect(screen.getByText('This is a another note')).toBeInTheDocument();
    });
  });
});
