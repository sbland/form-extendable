import { defaultComponentMap } from '@form-extendable/components.component-map';
import { demoHeadingsData } from './dummy-data';
import { IFormProps } from './form';

const onSubmit = () => {};
const errorCallback = () => {};

const fileServerUrl = 'FILE_SERVER_URL';
const asyncGetDocuments = async () => [];

const componentMap = defaultComponentMap({
  asyncGetDocuments,
  fileServerUrl,
});

export const defaultProps: IFormProps = {
  headings: demoHeadingsData,
  onSubmit,
  componentMap,
  errorCallback,
};
