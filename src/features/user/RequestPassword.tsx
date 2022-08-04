import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/components/form-elements/buttons/Button';
import Input from '../../common/components/form-elements/Input';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import PageWrapper from '../../common/components/UI/PageWrapper';
import { addToast } from '../../common/components/UI/toast/toastsSlice';
import { STRINGS } from '../../common/constants/strings';
import { useForm } from '../../common/hooks/use-form';
import { VALIDATOR_EMAIL } from '../../common/util/form-validators';
import getErrorMessage from '../../common/util/get-error-message';
import { useResetPasswordMutation } from './userSlice';

const RequestPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resetPassword, { isLoading, isSuccess, isError, error }] = useResetPasswordMutation();

  const { formState, inputHandler } = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  useEffect(() => {
    if (isSuccess) {
        dispatch(addToast({ message: STRINGS.REQUEST_PASSWORD_SUCCESS, type: 'success' }));
    }

    if (isError && error) {
        dispatch(addToast({ message: getErrorMessage(error), type: 'error' }));
    }
  }, [isSuccess, isError, error, dispatch])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    resetPassword({ email: formState.inputs.email.value });
  };

  return (
    <>
      <PageWrapper title="Passwort vergessen">
        <>
          <form onSubmit={handleSubmit}>
            <Input
              element="input"
              id="email"
              type="text"
              label={STRINGS.INPUT_EMAIL_LABEL}
              validators={[VALIDATOR_EMAIL()]}
              errorText={STRINGS.INPUT_EMAIL_ERROR}
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
        </>
      </PageWrapper>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default RequestPassword;
