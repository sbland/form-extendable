import { screen, render } from '@testing-library/react';
import React from 'react';
import { demoHeading } from './demo-data';
import { editValue } from './test-utils';
import * as compositions from './field-multi-select.composition';

const defaultProps = {
  //
};

describe('field multi select', () => {
  describe('Compositions', () => {
    Object.entries(compositions).forEach(([name, Composition]) => {
      test(name, () => {
        render(<Composition />);
      });
    });
  });
  describe('filling in form', () => {
    test('should be able to select item', async () => {
      render(<compositions.Showall />);
      const heading = demoHeading;

      await editValue(
        [heading.options[0].uid],
        screen.getByRole('form'),
        heading
      );
      await screen.findByText(JSON.stringify([[heading.options[0].uid]]));
    });

    test('should be able to change selection', async () => {
      render(<compositions.Showall />);
      const heading = demoHeading;

      await editValue(
        [heading.options[0].uid],
        screen.getByRole('form'),
        heading
      );
      await screen.findByText(JSON.stringify([[heading.options[0].uid]]));

      await editValue(
        [heading.options[1].uid],
        screen.getByRole('form'),
        heading
      );
      await screen.findByText(JSON.stringify([[heading.options[1].uid]]));

      await editValue(
        [heading.options[0].uid, heading.options[1].uid],
        screen.getByRole('form'),
        heading
      );
      await screen.findByText(
        JSON.stringify([[heading.options[0].uid, heading.options[1].uid]])
      );
    });
  });
});
