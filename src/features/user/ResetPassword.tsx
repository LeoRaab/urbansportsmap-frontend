import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../common/components/form-elements/buttons/Button';
import Input from '../../common/components/form-elements/Input';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import PageWrapper from '../../common/components/UI/PageWrapper';
import { addToast } from '../../common/components/UI/toast/toastsSlice';
import { STRINGS } from '../../common/constants/strings';
import { useForm } from '../../common/hooks/use-form';
import { VALIDATOR_CONFIRM_PASSWORD, VALIDATOR_MINLENGTH } from '../../common/util/form-validators';
import getErrorMessage from '../../common/util/get-error-message';
import { useLazyVerifyQuery, useUpdatePasswordMutation } from './userSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [verify, { isLoading: isLoadingVerify, isSuccess: isSuccessVerify, isError: isErrorVerify }] =
    useLazyVerifyQuery();
  const [
    updatePassword,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate, isError: isErrorUpdate, error: updateError },
  ] = useUpdatePasswordMutation();
  const verifyString = params.verifyString;

  const { formState, inputHandler } = useForm(
    {
      password: {
        value: '',
        isValid: false,
      },
      confirmPassword: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  useEffect(() => {
    if (verifyString) {
      verify(verifyString);
    }
  }, [verifyString, verify]);

  useEffect(() => {
    if (isErrorVerify) {
      //navigate('/');
      console.log('errer');
    }
  }, [isErrorVerify]);

  useEffect(() => {
    if (updateError) {
      dispatch(addToast({ message: getErrorMessage(updateError), type: 'error' }));
    }
  }, [updateError, dispatch]);

  useEffect(() => {
    if (isSuccessUpdate) {
      dispatch(addToast({ message: STRINGS.RESET_PASSWORD_SUCCESS, type: 'success' }));
      navigate('/login');
    }
  }, [isSuccessUpdate, dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState.inputs.password.value !== formState.inputs.confirmPassword.value) {
      dispatch(addToast({ message: STRINGS.ERROR_UNEQUAL_PASSWORDS, type: 'error' }));
      return;
    }

    updatePassword({ password: formState.inputs.password.value, verifyString: verifyString! });
  };

  return (
    <>
      <PageWrapper title="Passwort zurücksetzen">
        <>
          {isSuccessVerify && (
            <form onSubmit={handleSubmit}>
              <Input
                element="input"
                id="password"
                type="password"
                label={STRINGS.INPUT_PASSWORD_LABEL}
                validators={[VALIDATOR_MINLENGTH(10)]}
                errorText={STRINGS.INPUT_PASSWORD_ERROR}
                onInput={inputHandler}
              />
              <Input
                element="input"
                id="confirmPassword"
                type="password"
                label={STRINGS.INPUT_CONFIRM_PASSWORD_LABEL}
                validators={[VALIDATOR_CONFIRM_PASSWORD(formState.inputs.password.value)]}
                errorText={STRINGS.INPUT_CONFIRM_PASSWORD_ERROR}
                onInput={inputHandler}
              />

              <div className="flex justify-between my-8">
                <div className="w-2/5">
                  <Button color="secondary" type="button" onClick={() => navigate('/')}>
                    {STRINGS.BUTTON_CANCEL}
                  </Button>
                </div>

                <div className="w-2/5">
                  <Button color="primary" type="submit" disabled={!formState.isValid}>
                    {STRINGS.BUTTON_RESET}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </>
      </PageWrapper>
      {(isLoadingVerify || isLoadingUpdate) && <LoadingSpinner />}
    </>
  );
};

export default ResetPassword;
