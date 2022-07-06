import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/components/form-elements/buttons/Button';
import Input from '../../common/components/form-elements/Input';
import PageWrapper from '../../common/components/UI/PageWrapper';
import { addToast } from '../../common/components/UI/toast/toastsSlice';
import { STRINGS } from '../../common/constants/strings';
import useAuth from '../../common/hooks/use-auth';
import { useForm } from '../../common/hooks/use-form';
import useRedirectPath from '../../common/hooks/use-redirect-path';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../common/util/form-validators';
import getErrorMessage from '../../common/util/get-error-message';
import { selectUserId } from './userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectPath = useRedirectPath();
  const { login, loginError } = useAuth();
  const userId = useSelector(selectUserId);

  const { formState, inputHandler } = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false,
  );

  useEffect(() => {
    if (userId) {
      navigate(redirectPath, { replace: true });
    }
  }, [userId, navigate, redirectPath]);

  useEffect(() => {
    if (loginError) {
      dispatch(addToast({message: getErrorMessage(loginError), type: 'error'}))
    }
  }, [loginError, dispatch])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(formState.inputs.email.value, formState.inputs.password.value);
  };

  return (
    <PageWrapper title="Login">
      <form onSubmit={handleSubmit}>
        <Input
          element="input"
          id="email"
          label={STRINGS.INPUT_EMAIL_LABEL}
          validators={[VALIDATOR_EMAIL()]}
          type="text"
          errorText={STRINGS.INPUT_EMAIL_ERROR}
          onInput={inputHandler}
        />

        <Input
          element="input"
          id="password"
          label={STRINGS.INPUT_PASSWORD_LABEL}
          validators={[VALIDATOR_MINLENGTH(10)]}
          type="password"
          errorText={STRINGS.INPUT_PASSWORD_ERROR}
          onInput={inputHandler}
        />
        <div className="mt-8">
          <Button color="primary" type="submit" disabled={!formState.isValid}>
            Login
          </Button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default Login;
