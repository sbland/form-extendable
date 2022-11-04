import { IObj } from "@form-extendable/lib";
import { FilterObjectClass } from "@react_db_client/constants.client-types";

export const searchFnReference =
  (asyncGetDocuments, collection, schema, sortBy) =>
  async (filters?: FilterObjectClass[]): Promise<IObj[]> =>
    asyncGetDocuments(collection, filters || [], schema, sortBy);
