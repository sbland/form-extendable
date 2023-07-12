import { demoData } from './demo-data';

export const asyncGetDocument = async () => {
  console.info('asyncGetDocument');
  return demoData;
};
export const asyncGetDocuments = async () => [demoData];
export const asyncPutDocument = async (collection, id, data) => {
  console.info('PUT DOC', data);
  return { ok: true };
};
export const asyncPostDocument = async (collection, id, data) => {
  console.info('POST DOC', data);
  return { ok: true };
};
export const asyncDeleteDocument = async () => ({ ok: true });
export const asyncCopyDocument = async () => ({ ok: true });
