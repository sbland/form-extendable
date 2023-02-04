import { IDocument } from '@react_db_client/constants.client-types';

export interface IExampleDoc extends IDocument {
  description?: string;
}

export const exampleDocuments: IExampleDoc[] = [
  { uid: 'foo', label: 'Foo', description: 'Example Foo' },
  { uid: 'bar', label: 'Bar', description: 'Example Bar' },
];
