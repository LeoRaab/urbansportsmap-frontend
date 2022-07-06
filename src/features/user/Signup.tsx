import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/components/form-elements/buttons/Button';
import Input from '../../common/components/form-elements/Input';
import GraphicMessage from '../../common/components/UI/GraphicMessage';
import PageWrapper from '../../common/components/UI/PageWrapper';
import { addToast } from '../../common/components/UI/toast/toastsSlice';
import { ILLUSTRATIONS } from '../../common/constants/illustrations';
import { STRINGS } from '../../common/constants/strings';
import { useForm } from '../../common/hooks/use-form';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_CONFIRM_PASSWORD,
} from '../../common/util/form-validators';
import getErrorMessage from '../../common/util/get-error-message';
import { useSignupMutation } from './userSlice';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isSuccess, error }] = useSignupMutation();
  const [isMailSent, setIsMailSent] = useState<boolean>(false);

  const { formState, inputHandler } = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
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
    if (isSuccess) {
      setIsMailSent(true);
    }

    if (error) {
      dispatch(addToast({ message: getErrorMessage(error), type: 'error' }));
    }
  }, [isSuccess, error, dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState.inputs.password.value !== formState.inputs.confirmPassword.value) {
      dispatch(addToast({ message: STRINGS.ERROR_UNEQUAL_PASSWORDS, type: 'error' }));
      return;
    }

    signup({
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      name: formState.inputs.password.value,
    });
  };

  return (
    <PageWrapper title="Sign&nbsp;up">
      <>
        {!isMailSent && (
          <form onSubmit={handleSubmit}>
            <Input
              element="input"
              id="name"
              label={STRINGS.INPUT_NAME_LABEL}
              validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(25)]}
              type="text"
              errorText={STRINGS.INPUT_NAME_ERROR}
              onInput={inputHandler}
            />
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
                  Abbrechen
                </Button>
              </div>

              <div className="w-2/5">
                <Button color="primary" type="submit" disabled={!formState.isValid}>
                  Sign up
                </Button>
              </div>
            </div>
          </form>
        )}

        {isMailSent && (
          <GraphicMessage
            illustration={ILLUSTRATIONS.VERIFY_EMAIL}
            title={STRINGS.EMAIL_CONFIRM_TITLE}
            text={STRINGS.EMAIL_CONFIRM_TEXT}
          />
        )}
      </>
    </PageWrapper>
  );
};

export default Signup;
