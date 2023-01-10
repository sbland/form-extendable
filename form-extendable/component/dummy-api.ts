import { IFormSubmit } from './form';

export const onSubmit = (data: IFormSubmit) => console.info(data);
export const errorCallback = (err: string) => {};
export const getInitialFormData = (data = {}) => (data);
