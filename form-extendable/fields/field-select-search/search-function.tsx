import { IObj } from '@form-extendable/lib';
import { FilterObjectClass } from '@react_db_client/constants.client-types';

export type AsyncGetDocumentsFn = <T>(
  collection: string,
  filters?: FilterObjectClass[],
  schema?: string,
  sortBy?: string
) => Promise<T[]>;

export const searchFnReference =
  (
    asyncGetDocuments: AsyncGetDocumentsFn,
    collection: string,
    schema?: string,
    sortBy?: string
  ) =>
  async (filters?: FilterObjectClass[]): Promise<IObj[]> =>
    asyncGetDocuments(collection, filters || [], schema, sortBy);
