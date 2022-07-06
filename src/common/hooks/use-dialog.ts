import { useDispatch } from 'react-redux';
import { dialogActions } from '../components/UI/dialog/dialogSlice';

let resolveDialog: (isAccepted: boolean) => void;

const useDialog = () => {
  const dispatch = useDispatch();

  const onAccept = () => {
    close();
    resolveDialog(true);
  };

  const onReject = () => {
    close();
    resolveDialog(false);
  };

  const open = (message: string): Promise<boolean> => {
    dispatch(dialogActions.show({ message }));

    return new Promise((res, rej) => {
      resolveDialog = res;
    });
  };

  const close = () => {
    dispatch(dialogActions.hide());
  };

  return { onAccept, onReject, open, close };
};

export default useDialog;
