import { IObj } from '@form-extendable/lib';
import {
  FilterObjectClass,
  TAsyncGetDocuments,
} from '@react_db_client/constants.client-types';

export const searchFnReference =
  <T extends IObj>(
    asyncGetDocuments: TAsyncGetDocuments<T>,
    collection: string,
    schema?: string,
    sortBy?: string
  ) =>
  async (filters?: FilterObjectClass[]): Promise<IObj[]> =>
    asyncGetDocuments(collection, filters || [], schema, sortBy);
