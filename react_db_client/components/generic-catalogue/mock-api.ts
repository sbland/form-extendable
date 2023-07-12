import { demoResults } from './demo-data';

export const asyncGetDocument = async () => {
  console.info('asyncGetDocument');
  return Object.values(demoResults)[0];
};
export const asyncGetDocuments = async () => Object.values(demoResults);
export const asyncPutDocument = async (collection, id, data) => {
  console.info("PUT DOC", data);
  return { ok: true };
};
export const asyncPostDocument = async (collection, id, data) => {
  console.info("POST DOC", data);
  return { ok: true };
};
export const asyncDeleteDocument = async () => ({ ok: true });
export const asyncCopyDocument = async () => ({ ok: true });
