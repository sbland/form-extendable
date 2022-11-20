import { THeading } from '@form-extendable/lib';
import { EFilterType } from '@react_db_client/constants.client-types';

export const headingsFlat = (headings: THeading<any>[]) =>
  headings.reduce(
    (acc, h) =>
      h.type === EFilterType.embedded
        ? // eslint-disable-next-line testing-library/no-node-access
          [...acc, ...headingsFlat((h as any).children)]
        : [...acc, h],
    [] as THeading<any>[]
  );
