import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import PageWrapper from '../../common/components/UI/PageWrapper';
import { useDeleteUserMutation, useGetUserQuery, useResetPasswordMutation } from './userSlice';
import UserInfo from './UserInfo';
import { TrashIcon, RefreshIcon } from '@heroicons/react/outline';
import Button from '../../common/components/form-elements/buttons/Button';
import { STRINGS } from '../../common/constants/strings';
import { addToast } from '../../common/components/UI/toast/toastsSlice';
import getErrorMessage from '../../common/util/get-error-message';
import useDialog from '../../common/hooks/use-dialog';
import useAuth from '../../common/hooks/use-auth';

const Profile = () => {
  const dispatch = useDispatch();
  const dialog = useDialog();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: user, isLoading: isLoadingUser, isFetching: isFetchingUser } = useGetUserQuery();
  const [
    resetPassword,
    { isLoading: isLoadingReset, isSuccess: isSuccessReset, isError: isErrorReset, error: resetError },
  ] = useResetPasswordMutation();

  const [
    deleteUser,
    { isLoading: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete, error: deleteError },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (isSuccessReset) {
      dispatch(addToast({ message: STRINGS.REQUEST_PASSWORD_SUCCESS, type: 'success' }));
    }

    if (isErrorReset && resetError) {
      dispatch(addToast({ message: getErrorMessage(resetError), type: 'error' }));
    }
  }, [dispatch, isSuccessReset, isErrorReset, resetError]);

  useEffect(() => {
    if (isSuccessDelete) {
      logout();
      dispatch(addToast({ message: STRINGS.DELETE_USER_SUCCESS, type: 'success' }));
      navigate('/');
    }

    if (isErrorDelete && deleteError) {
      dispatch(addToast({ message: getErrorMessage(deleteError), type: 'error' }));
    }
  }, [dispatch, isSuccessDelete, isErrorDelete, deleteError]);

  const handleResetPassword = () => {
    if (user) {
      resetPassword({ email: user.email });
    }
  };

  const handleDeleteAccount = async () => {
    const isAccepted = await dialog.open(STRINGS.DIALOG_DELETE_USER);

    if (isAccepted) {
      deleteUser();
    }
  };

  return (
    <PageWrapper title={STRINGS.PAGE_PROFILE}>
      <div className="mt-6">
        <UserInfo user={user} />
      </div>

      <div className="flex flex-col mt-4">
        <Button color="white" type="button" onClick={handleResetPassword}>
          <div className="flex items-center font-normal">
            <RefreshIcon className="h-6 w-6" />
            <p className="ml-2">{STRINGS.PROFILE_RESET_PASSWORD}</p>
          </div>
        </Button>
        <Button color="white" type="button" onClick={handleDeleteAccount}>
          <div className="flex items-center font-normal text-red-400">
            <TrashIcon className="h-6 w-6" />
            <p className="ml-2">{STRINGS.PROFILE_DELETE_ACCOUNT}</p>
          </div>
        </Button>
      </div>

      {(isLoadingUser || isFetchingUser || isLoadingReset) && <LoadingSpinner />}
    </PageWrapper>
  );
};

export default Profile;
