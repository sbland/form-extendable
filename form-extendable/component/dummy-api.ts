import { IFormSubmit } from './form';

export const onSubmit = (data: IFormSubmit<any>) => console.info(data);
export const errorCallback = (err: string|Error) => {};
export const getInitialFormData = (data = {}) => (data);
