/* eslint react/prop-types: 0 */
import React from 'react';
import { TAsyncGetDocuments } from '@react_db_client/constants.client-types';
import { PopupPanelManagedWithContentWrap } from '@react_db_client/components.popup-panel-v2';
import { defaultComponentMap } from '@form-extendable/components.component-map';
import { IObj } from '@form-extendable/lib';
import {
  CustomFieldType,
  demoCustomTypeHeading,
  demoHeadingsData,
  demoRefObjs,
  DEMO_FILES_DATA,
} from './dummy-data';
import { IFormProps } from './form';
import { FormField } from './form-field';
import { errorCallback, onSubmit } from './dummy-api';
import { ExampleGetRefObjectComponent } from '@form-extendable/fields.field-select-reference';

const fileServerUrl = 'https://static.bit.dev';

const asyncGetRefObjs: TAsyncGetDocuments<
  unknown extends IObj ? unknown : IObj
> = async (collection): Promise<IObj[]> => {
  return demoRefObjs;
};

export const getComponentMap = (asyncGetFiles, onUpload) => ({
  [demoCustomTypeHeading.type]: () => CustomFieldType,
  ...defaultComponentMap({
    asyncGetFiles: (metaData) => asyncGetFiles,
    asyncGetRefObjs,
    asyncFileUpload: () => async (data, fileType) => onUpload(data, fileType),
    fileServerUrl,
    PopupPanel: PopupPanelManagedWithContentWrap,
    AddNewReferenceComponent: ExampleGetRefObjectComponent,
  }),
});

const componentMap = getComponentMap(
  async () => DEMO_FILES_DATA,
  () => {}
);

export const defaultProps: IFormProps<any> = {
  id: 'example form',
  FormField,
  headings: demoHeadingsData,
  onSubmit,
  componentMap,
  errorCallback,
};
