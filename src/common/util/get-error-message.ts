import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { STRINGS } from '../constants/strings';

const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  if ('status' in error) {
    return 'error' in error ? error.error : JSON.stringify(error.data);
  }

  if ('message' in error && error.message) {
    return error.message;
  }

  return STRINGS.ERROR_UNKNOWN;
};

export default getErrorMessage;
