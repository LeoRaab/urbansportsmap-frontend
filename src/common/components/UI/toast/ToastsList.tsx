import { useSelector } from 'react-redux';
import Portal from '../Portal';
import Toast from './Toast';
import { selectToasts } from './toastsSlice';

const ToastsList = () => {
  const toasts = useSelector(selectToasts);

  const toastsList = toasts.toasts.map((toast, index) => (
    <Toast message={toast.message} type={toast.type} duration={toast.duration} id={index} key={index} />
  ));

  return toastsList.length > 0 ? (
    <Portal>
      <div className="absolute bottom-0 w-full flex flex-col items-center justify-center z-1100 ">{toastsList}</div>
    </Portal>
  ) : null;
};

export default ToastsList;