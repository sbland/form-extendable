import { Uid } from "@react_db_client/constants.client-types";

export enum EFormValidationError {
  REQUIRED = 'REQUIRED',
  MIN_LENGTH = 'MIN_LENGTH',
  MAX_LENGTH = 'MAX_LENGTH',
  MIN = 'MIN',
  MAX = 'MAX',
  PATTERN = 'PATTERN',
  EMAIL = 'EMAIL',
  MATCH = 'MATCH',
  CUSTOM = 'CUSTOM',
  UNKNOWN = 'UNKNOWN',
}

export interface IFormFieldValidationError {
  type: EFormValidationError;
  message: string;
  field?: Uid;
  value?: any;
}
