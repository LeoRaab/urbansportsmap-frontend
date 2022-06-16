import { useState, useEffect } from "react";
import Input from "../../common/components/form-elements/Input";
import GraphicMessage from "../../common/components/UI/GraphicMessage";
import PageWrapper from "../../common/components/UI/PageWrapper";
import { ILLUSTRATIONS } from "../../common/constants/illustrations";
import { useForm } from "../../common/hooks/use-form";
import { VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH, VALIDATOR_EMAIL } from "../../common/util/form-validators";
import { useSignupMutation } from "./authApi";

const Signup = () => {
    const [signup, { isSuccess, error }] = useSignupMutation();
    const [isMailSent, setIsMailSent] = useState<boolean>(false);

    const { formState, inputHandler } = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        true
    );

    useEffect(() => {
        if (isSuccess) {
            setIsMailSent(true);
        }
    }, [isSuccess]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signup({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            name: formState.inputs.password.value,
        });
    };

    return (
        <PageWrapper title="Sign up">
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
                            label="Passwort"
                            validators={[
                                VALIDATOR_MINLENGTH(8),
                                VALIDATOR_MAXLENGTH(25),
                            ]}
                            type="text"
                            errorText="Gib bitte zwischen 8 und 25 Zeichen ein!"
                            onInput={inputHandler}
                        />
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
