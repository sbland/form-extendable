import * as database from './database';

export const apiGetDocument = async <T>(collection, uid) =>
  database.getDoc<T>(uid, collection);
export const apiPutDocument = async <T>(collection, uid, data) =>
  database.putDoc(uid, collection, data);

export const apiPostDocument = async <T>(collection, uid, data) => {
  database.addDoc(uid, collection, data);
};
export const apiDeleteDocument = async <T>(collection, uid) =>
  database.deleteDoc(uid, collection);
