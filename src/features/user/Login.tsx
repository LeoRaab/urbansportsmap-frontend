import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../common/components/form-elements/Button";
import Input from "../../common/components/form-elements/Input";
import PageWrapper from "../../common/components/UI/PageWrapper";
import useAuth from "../../common/hooks/use-auth";
import { useForm } from "../../common/hooks/use-form";
import useRedirectPath from "../../common/hooks/use-redirect-path";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../common/util/form-validators";
import { selectUserId } from "./authSlice";

const Login = () => {
    const navigate = useNavigate();
    const redirectPath = useRedirectPath();
    const { login } = useAuth();
    const userId = useSelector(selectUserId);

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
        if (userId) {
            navigate(redirectPath, { replace: true });
        }
    }, [userId]);

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
                    validators={[VALIDATOR_MINLENGTH(10)]}
                    type="password"
                    errorText="Das Passwort muss mindestens 8 Zeichen lang sein!"
                    onInput={inputHandler}
                />
                <div className="mt-8">
                    <Button
                        color="primary"
                        type="submit"
                        disabled={!formState.isValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </PageWrapper>
    );
};

export default Login;