import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../common/components/form-elements/buttons/Button";
import Input from "../../common/components/form-elements/Input";
import GraphicMessage from "../../common/components/UI/GraphicMessage";
import PageWrapper from "../../common/components/UI/PageWrapper";
import { toastsActions } from "../../common/components/UI/toast/toastsSlice";
import { ILLUSTRATIONS } from "../../common/constants/illustrations";
import { useForm } from "../../common/hooks/use-form";
import { VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH, VALIDATOR_EMAIL, VALIDATOR_CONFIRM_PASSWORD } from "../../common/util/form-validators";
import { useSignupMutation } from "./userSlice";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signup, { isSuccess, error }] = useSignupMutation();
    const [isMailSent, setIsMailSent] = useState<boolean>(false);

    const { formState, inputHandler } = useForm(
        {
            name: {
                value: '',
                isValid: false
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
                dependsOn: 'password'
            }
        },
        false
    );

    useEffect(() => {
        if (isSuccess) {
            setIsMailSent(true);
        }
    }, [isSuccess]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formState.inputs.password.value !== formState.inputs.confirmPassword.value) {
            dispatch(toastsActions.addToast({message: 'Die Passwörter müssen übereinstimmen!', type: 'error'}))
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
                            label="Name"
                            validators={[
                                VALIDATOR_MINLENGTH(3),
                                VALIDATOR_MAXLENGTH(25),
                            ]}
                            type="text"
                            errorText="Gib bitte zwischen 3 und 25 Zeichen ein!"
                            onInput={inputHandler}
                        />
                        <Input
                            element="input"
                            id="email"
                            label="E-Mail"
                            validators={[VALIDATOR_EMAIL()]}
                            type="text"
                            errorText="Gib bitte eine richtige E-Mail Adresse ein!"
                            onInput={inputHandler}
                        />
                        <Input
                            element="input"
                            id="password"
                            type="password"
                            label="Passwort"
                            validators={[
                                VALIDATOR_MINLENGTH(10)
                            ]}                            
                            errorText="Gib bitte mindestens 10 Zeichen ein!"
                            onInput={inputHandler}
                        />
                         <Input
                            element="input"
                            id="confirmPassword"
                            type="password"
                            label="Passwort wiederholen"
                            validators={[
                                VALIDATOR_CONFIRM_PASSWORD(formState.inputs.password.value)
                            ]}
                            errorText="Die beiden Passwörter müssen übereinstimmen!"
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
                        title={"Bestätige deine E-Mail Adresse"}
                        text={
                            "Du hast eine Mail bekommen, folge dem Link, um deine E-Mail Adresse zu bestätigen!"
                        }
                    />
                )}
            </>
        </PageWrapper>
    );
};

export default Signup;
