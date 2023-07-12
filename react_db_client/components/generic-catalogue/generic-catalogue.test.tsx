import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import * as compositions from './generic-catalogue.composition';
import * as mockApi from './mock-api';

const searchForDocument = async (
  el: ReturnType<typeof within> | typeof screen,
  searchString: string
) => {
  const searchInput = el.getByLabelText('search');
  await UserEvent.click(searchInput);
  await UserEvent.keyboard(searchString);
  const resultsList = el.getByRole('list');
  const items = await within(resultsList).findAllByRole('listitem');
  return items;
};

const openExistingItemEditor = async (searchResult: HTMLElement) => {
  const firstResultButton = within(searchResult).getByRole('button');
  await UserEvent.click(firstResultButton);
  const editSelectedButton = screen.getByRole('button', {
    name: /Edit Selected Demo Item/,
  });
  await UserEvent.click(editSelectedButton);
  const itemEditor = await screen.findByTestId('rdc-itemEditor');
  return itemEditor;
};

describe('Generic Catalogue', () => {
  describe('Compositions', () => {
    Object.entries(compositions)
      .filter(([name, Composition]) => (Composition as any).forTests)
      .forEach(([name, Composition]) => {
        test(name, async () => {
          render(<Composition />);
          // @ts-ignore
          if (Composition.waitForReady) await Composition.waitForReady();
        });
      });
  });
  describe('Functional tests', () => {
    test('should render list of results', async () => {
      render(<compositions.WrappedGenericCatalogue />);
      const searchResults = await searchForDocument(screen, 'demo');
      expect(searchResults.length).toBeGreaterThan(0);
      expect(searchResults.length).toBe(5);
    });
    test('should open the item editor when selecting result and clicking edit selected', async () => {
      render(<compositions.WrappedGenericCatalogue />);
      const searchResults = await searchForDocument(screen, 'demo');
      await openExistingItemEditor(searchResults[0]);
    });
    test('should load data from api when opening existing item', async () => {
      render(<compositions.WrappedGenericCatalogue />);
      const searchResults = await searchForDocument(screen, 'demo');
      await openExistingItemEditor(searchResults[0]);
      const itemEditor = await screen.findByTestId('rdc-itemEditor');
      const nameInput = within(itemEditor).getByLabelText('Name');
      expect(nameInput).toHaveValue('Foo');
    });
    test('should close item editor when pressing close button', async () => {
      render(<compositions.WrappedGenericCatalogue />);
      const searchResults = await searchForDocument(screen, 'demo');
      const itemEditor = await openExistingItemEditor(searchResults[0]);
      const closeBtn = await screen.findByRole('button', {
        name: /Close popup/,
      });
      await UserEvent.click(closeBtn);
      expect(itemEditor).not.toBeInTheDocument();
    });
    describe('New items', () => {
      test.todo(
        'should clear previously selected data when creating a new item'
      );
      test.todo('should use post api if item is new');
      test('should not call api if item is new and not saved', async () => {
        const loadHardwareSetSpy = jest.spyOn(mockApi, 'asyncGetDocument');
        render(<compositions.WrappedGenericCatalogueManaged />);
        const createNewButton = screen.getByRole('button', {
          name: /Create New Demo Item/,
        });
        await UserEvent.click(createNewButton);
        await screen.findByTestId('rdc-itemEditor');
        expect(loadHardwareSetSpy).not.toHaveBeenCalled();
      });
      test('should use put api after new item saved', async () => {
        render(<compositions.WrappedGenericCatalogueManaged />);
        const createNewButton = screen.getByRole('button', {
          name: /Create New Demo Item/,
        });
        await UserEvent.click(createNewButton);
        const itemEditor = await screen.findByTestId('rdc-itemEditor');
        const itemEditorForm = within(itemEditor).getByRole('form');
        const nameInput: HTMLInputElement =
          within(itemEditorForm).getByLabelText('Name');
        expect(nameInput.value).toEqual('');
        const newName = 'New Name';
        await UserEvent.click(nameInput);
        await UserEvent.keyboard(newName);
        await screen.findByText('Demo Item saved');

        await waitFor(() =>
          expect(
            JSON.parse(
              screen.getByTestId('databaseState').textContent || '{}'
            ).democollection.find((v) => v.name === newName)
          ).toBeTruthy()
        );
        const databaseValue = JSON.parse(
          screen.getByTestId('databaseState').textContent || '{}'
        );
        const newId = databaseValue.democollection.find(
          (v) => v.name === newName
        ).uid;

        const editedName = 'Edited Name';
        await UserEvent.click(nameInput);
        await UserEvent.clear(nameInput);
        await UserEvent.keyboard(editedName);
        await waitFor(() =>
          expect(
            JSON.parse(
              screen.getByTestId('databaseState').textContent || '{}'
            ).democollection.find((v) => v.uid === newId)
          ).toEqual({ uid: newId, name: editedName })
        );
      });
      test('should be able to create a new item after previously creating one', async () => {
        render(<compositions.WrappedGenericCatalogueManaged />);
        const createNewButton = screen.getByRole('button', {
          name: /Create New Demo Item/,
        });
        await UserEvent.click(createNewButton);
        const itemEditor = await screen.findByTestId('rdc-itemEditor');
        const itemEditorForm = within(itemEditor).getByRole('form');
        const nameInput: HTMLInputElement =
          within(itemEditorForm).getByLabelText('Name');
        const newName = 'New Name';
        await UserEvent.click(nameInput);
        await UserEvent.keyboard(newName);
        await screen.findByText('Demo Item saved');
        const closeBtn = await screen.findByRole('button', {
          name: /Close popup/,
        });
        await UserEvent.click(closeBtn);
        expect(itemEditor).not.toBeInTheDocument();
        await UserEvent.click(createNewButton);
        await screen.findByTestId('rdc-itemEditor');
      });
    });
  });
});
