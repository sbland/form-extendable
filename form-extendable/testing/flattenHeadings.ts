import { THeading, IHeadingEmbedded } from '@form-extendable/lib';
import { EFilterType } from '@react_db_client/constants.client-types';

export const flattenHeadings = (headings: THeading<unknown>[]) =>
  headings.reduce(
    (acc, h) =>
      h.type === EFilterType.embedded
        ? // eslint-disable-next-line testing-library/no-node-access
          [...acc, ...flattenHeadings((h as IHeadingEmbedded).children)]
        : [...acc, h],
    [] as THeading<unknown>[]
  );
