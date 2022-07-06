import { useLocation } from 'react-router-dom';

interface StateType {
  from: { pathname: string };
}

const useRedirectPath = (): string => {
  const location = useLocation();
  let redirectPath = '/';

  if (location.state) {
    const locationState = location.state as StateType;
    redirectPath = locationState.from.pathname;
  }

  return redirectPath;
};

export default useRedirectPath;
