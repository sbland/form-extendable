import React from 'react';
import { screen, render } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { ItemEditorWithAsyncObjectManager } from './examples.composition';
import { fillInForm } from '@form-extendable/testing';
import { headings } from './custom-item-editor-with-async-object-manager';
import * as database from './database';
import { exampleDocuments } from './dummyData';

beforeAll(() => {
  database.initAll();
});

describe('Item editor with async object manager', () => {
  test.only('should be able to edit and save an existing document', async () => {
    const demoDoc = exampleDocuments[0];
    render(<ItemEditorWithAsyncObjectManager />);
    const form: HTMLFormElement = screen.getByRole('form');
    const newData = {
      label: 'new item label',
      // description: 'New Item Description',
    };
    await fillInForm(form, headings, newData);

    const submitButton = screen.getByRole('button', {
      name: /Submit/,
    });
    await UserEvent.click(submitButton);
    await screen.findByText('Document saved');
    expect(database.getDoc(demoDoc.uid, 'exampleCollection')).toEqual({
      ...demoDoc,
      ...newData,
    });
  }, 13000);
});
