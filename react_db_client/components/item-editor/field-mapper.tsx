import { THeading, IHeadingFile, IHeadingEmbedded } from '@form-extendable/lib';
import { EFilterType, Uid } from '@react_db_client/constants.client-types';

export const injectFileFieldProps =
  (collection: string, id: Uid) => (param: THeading<any>) => {
    let modifiedParam = { ...param };
    // If file type we need to add additional properties
    if (
      [EFilterType.file, EFilterType.fileMultiple, EFilterType.image].indexOf(
        param.type as EFilterType
      ) !== -1
    ) {
      // TODO: should throw error if we can't get the uid
      modifiedParam = {
        ...modifiedParam,
        metaData: {
          collectionId: collection,
          documentId: id,
          fileType: (modifiedParam as IHeadingFile).fileType,
        },
      } as THeading<any>;
    }
    return modifiedParam;
  };

export const injectHighlightOverriden =
  (overridenFields) => (param: THeading<any>) => {
    let modifiedParam = { ...param };
    // if in overrides we need to highlight
    if (overridenFields && overridenFields.indexOf(param.uid) !== -1) {
      modifiedParam = { ...modifiedParam, hasChanged: true };
    }
    return modifiedParam;
  };

export const reduceGroupFields =
  (groupFieldsOrientation: 'horiz' | 'vert') =>
  (acc: IHeadingEmbedded[], v: THeading<any>) => {
    const currentSection = acc[acc.length - 1];
    const currentSectionChildCount = currentSection.children.length;
    const currentGroup =
      currentSectionChildCount > 0
        ? currentSection.children[currentSectionChildCount - 1].group
        : 0;
    if (currentGroup !== v.group) {
      acc.push({
        uid: `group-${v.group}`,
        label: '',
        showTitle: false,
        type: EFilterType.embedded,
        orientation: groupFieldsOrientation,
        children: [],
      });
    }
    acc[acc.length - 1].children.push(v);
    return acc;
  };

export const groupFields = (
  fields: THeading<any>[],
  groupOrientation: 'horiz' | 'vert' = 'horiz'
) => {
  return fields
    .reduce(reduceGroupFields(groupOrientation), [
      {
        uid: 'group-0',
        label: '',
        type: EFilterType.embedded,
        orientation: 'horiz',
        showTitle: false,
        children: [],
      },
    ])
    .filter((g) => g.children.length > 0);
};

/**
 * The map fields function injects additional data into each field
 * Including grouping, highlighting overriden fields, additional file properties
 *
 * @param {*} params
 * @param {*} standard
 * @param {*} overridenFields
 * @param {*} productId
 */
export const mapFields = (
  params: THeading<any>[],
  overridenFields: string[],
  groupFieldsOrientation: 'horiz' | 'vert',
  id: Uid,
  collection: string
) =>
  Object.keys(params)
    // filter out standard specific fields
    .map((key) => params[key])
    .map(injectFileFieldProps(collection, id))
    .map(injectHighlightOverriden(overridenFields))
    // group fields
    .reduce(reduceGroupFields(groupFieldsOrientation), [
      {
        uid: 'group-0',
        label: '',
        type: EFilterType.embedded,
        orientation: groupFieldsOrientation,
        showTitle: false,
        children: [],
      },
    ])
    .filter((g) => g.children.length > 0);
