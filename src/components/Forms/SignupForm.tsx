import SubmitButton from '../UI/buttons/SubmitButton';
import React, {useState} from 'react';

type SignupFormProps = {
    onFormSubmit: (email: string, password: string, name: string) => void;
}

const SignupForm = ({onFormSubmit}: SignupFormProps) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        onFormSubmit(email, password, name);
    }

    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className="flex flex-col mb-4">
                <label className="my-2 font-bold">Name</label>
                <input type="text"
                       value={name}
                       onChange={nameChangeHandler}
                       className="placeholder-slate-400 rounded p-4 ring-1 ring-slate-200 shadow-sm appearance-none focus:ring-4 focus:text-black focus:ring-slate-200 focus:outline-none"/>
            </div>

            <div className="flex flex-col mb-4">
                <label className="my-2 font-bold">E-Mail</label>
                <input type="text"
                       value={email}
                       onChange={emailChangeHandler}
                       className="placeholder-slate-400 rounded p-4 ring-1 ring-slate-200 shadow-sm appearance-none focus:ring-4 focus:text-black focus:ring-slate-200 focus:outline-none"/>
            </div>

            <div className="flex flex-col my-4">
                <label className="my-2 font-bold">Password</label>
                <input type="password"
                       onChange={passwordChangeHandler}
                       className="placeholder-slate-400 rounded p-4 ring-1 ring-slate-200 shadow-sm appearance-none focus:ring-4 focus:text-black focus:ring-slate-200 focus:outline-none"/>
            </div>

            <div className="flex mt-8">
                <SubmitButton text={'Sign up'}/>
            </div>

        </form>
    )
}

export default SignupForm;