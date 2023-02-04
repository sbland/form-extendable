/* eslint-disable no-underscore-dangle */
import { FilterObjectClass } from '@react_db_client/constants.client-types';
import cloneDeep from 'lodash/cloneDeep';
import { exampleDocuments } from './dummyData';

declare global {
  var __data__: any;
}

// eslint-disable-next-line no-underscore-dangle
global.__data__ =
  global.__data__ ||
  {
    // currencies: {},
    // settings: {},
    // projects: {},
  };

export const getDoc = <T>(id, collection): T => global.__data__[collection][id];
export const getDocs = <T>(collection, _filters?: FilterObjectClass[]): T[] => {
  if (global.__data__[collection] === undefined)
    throw Error(`Collection: ${collection} has not been initialised`);
  return Object.values<T>(global.__data__[collection]);
  // return Object.values<T>(global.__data__[collection]).filter(filters ? filterWithFilterObjects(filters) : () => true);
};
export const putDoc = (id, collection, data) => {
  if (global.__data__[collection] === undefined)
    throw Error(`Collection: ${collection} has not been initialised`);
  Object.assign(global.__data__[collection][id], data);
  return global.__data__[collection][id];
};

export const deleteDoc = (id, collection) => {
  if (global.__data__[collection] === undefined)
    throw Error(`Collection: ${collection} has not been initialised`);
  delete global.__data__[collection][id];
  return;
};
export const addDoc = <T>(id, collection, data: T) => {
  if (global.__data__[collection] === undefined)
    throw Error(`Collection: ${collection} has not been initialised`);
  if (global.__data__[collection][id]) throw Error('Duplicate Item');
  global.__data__[collection][id] = data;
  return global.__data__[collection][id];
};
export const initCollection = <T>(collection, data: { [id: string]: T }) => {
  global.__data__[collection] = cloneDeep(data);
};
const asDict = (d) =>
  Array.isArray(d) ? d.reduce((acc, v) => ({ ...acc, [v.uid]: v }), {}) : d;

export const initAll = () => {
  initCollection('exampleCollection', asDict(exampleDocuments));
};
