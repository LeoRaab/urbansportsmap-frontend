import SubmitButton from '../UI/buttons/SubmitButton';
import React, {useState} from 'react';
import SecondaryButton from '../UI/buttons/SecondaryButton';

type CommentFormProps = {
    onFormSubmit: (comment: string) => void,
    onFormCancel: () => void,
    commentValue?: string,
}

const LoginForm = ({onFormSubmit, onFormCancel, commentValue}: CommentFormProps) => {
    const [comment, setComment] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onFormSubmit(comment);
    }

    const commentChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className="p-2">

            <div className="flex flex-col">
                <label className="my-4 font-bold">Kommentar</label>
                <textarea rows={6}
                          onChange={commentChangeHandler}
                          className="focus:ring-4 focus:ring-slate-200 focus:outline-none appearance-none text-sm rounded-sm p-2 ring-1 ring-slate-200"
                          defaultValue={commentValue}>
                </textarea>
            </div>


            <div className="flex justify-between mt-4">
                <div className="w-5/12">
                    <SecondaryButton text={'Abbrechen'} handleOnClick={onFormCancel}/>
                </div>
                <div className="w-5/12">
                    <SubmitButton text={'Speichern'}/>
                </div>
            </div>

        </form>
    )
}

export default LoginForm;