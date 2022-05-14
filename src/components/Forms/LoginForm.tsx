import SubmitButton from '../UI/buttons/SubmitButton';
import React, {useState} from 'react';

type LoginFormProps = {
    onFormSubmit: (email: string, password: string) => void;
}

const LoginForm = ({onFormSubmit}: LoginFormProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onFormSubmit(email, password);
    }

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className="p-4">

            <div className="flex flex-col mb-4">
                <label className="my-2 font-bold">E-Mail</label>
                <input type="text"
                       value={email}
                       onChange={emailChangeHandler}
                       className="placeholder-slate-400 rounded-sm p-4 ring-1 ring-slate-200 shadow-sm appearance-none focus:ring-4 focus:text-black focus:ring-slate-200 focus:outline-none"/>
            </div>

            <div className="flex flex-col my-4">
                <label className="my-2 font-bold">Password</label>
                <input type="password"
                       onChange={passwordChangeHandler}
                       className="placeholder-slate-400 rounded-sm p-4 ring-1 ring-slate-200 shadow-sm appearance-none focus:ring-4 focus:text-black focus:ring-slate-200 focus:outline-none"/>
            </div>

            <div className="flex mt-8">
                <SubmitButton text={'Log in'}/>
            </div>

        </form>
    )
}

export default LoginForm;