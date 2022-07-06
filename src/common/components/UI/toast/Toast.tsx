import { XIcon } from '@heroicons/react/outline';
import Button from '../../form-elements/buttons/Button';
import useTimer from '../../../hooks/use-timer';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeToast } from './toastsSlice';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
  duration: number;
  id: number;
};

const Toast = ({ message, type, duration, id }: ToastProps) => {
  const dispatch = useDispatch();
  const timer = useTimer(duration, 100);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [currentWidth, setCurrentWidth] = useState<number>(100);
  const isMounted = useRef<boolean>(false);
  const isStarted = useRef<boolean>(false);

  useEffect(() => {
    if (!isStarted.current) {
      timer.start();
      isStarted.current = true;
    }
  }, [timer]);

  useEffect(() => {
    setCurrentWidth((timer.remainingTime / 5000) * 100);
    if (timer.remainingTime <= 0) {
      setIsVisible(false);
    }
  }, [timer.remainingTime]);

  useEffect(() => {
    return () => {
      if (isMounted.current) {
        dispatch(removeToast({ toastId: id }));
      }

      isMounted.current = true;
    };
  }, [dispatch, id]);

  return isVisible ? (
    <div className={'rounded shadow p-4 mb-2 w-3/4 relative bg-opacity-90 ' + type}>
      <div className="flex">
        <p className="text-sm font-semibold">{message}</p>
        <div className="absolute flex justify-center right-2 z-1100">
          <Button color="transparent" type="button" onClick={() => setIsVisible(false)}>
            <XIcon className="icon-size" />
          </Button>
        </div>
      </div>
      <div className="rounded mt-2 border-b-8 border-white/10" style={{ width: currentWidth + '%' }} />
    </div>
  ) : null;
};

export default Toast;
