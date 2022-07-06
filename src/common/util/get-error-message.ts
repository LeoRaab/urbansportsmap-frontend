import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { STRINGS } from '../constants/strings';

interface ErrorData {
    message: string
}

const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  if ('status' in error) {

    if ('error' in error) {
      return error.error
    }

    if ('data' in error) {
      const errorData = error.data as ErrorData;
      return errorData.message;
    }
  }

  if ('message' in error && error.message) {
    return error.message;
  }

  return STRINGS.ERROR_UNKNOWN;
};

export default getErrorMessage;
