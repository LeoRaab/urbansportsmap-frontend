import SubmitButton from "../UI/buttons/SubmitButton";
import React, { useState } from "react";
import SecondaryButton from "../UI/buttons/SecondaryButton";
import Button from "./Button";
import { useForm } from "../../hooks/use-form";
import { VALIDATOR_MINLENGTH } from "../../util/form-validators";
import Input from "./Input";

type CommentFormProps = {
    onFormSubmit: (comment: string) => void;
    onFormCancel: () => void;
    commentValue?: string;
};

const CommentForm = ({
    onFormSubmit,
    onFormCancel,
    commentValue,
}: CommentFormProps) => {

    const { formState, inputHandler } = useForm(
        {
            comment: {
                value: commentValue,
                isValid: false,
            },
        },
        false
    );

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onFormSubmit(formState.inputs.comment.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                element="textarea"
                id="comment"
                label="Kommentar"
                validators={[VALIDATOR_MINLENGTH(3)]}
                errorText="Gib bitte mindestens 3 Zeichen ein!"
                onInput={inputHandler}
            />

            <div className="flex justify-between mt-4">
                <div className="w-5/12">
                    <Button
                        color={"secondary"}
                        type={"button"}
                        onClick={onFormCancel}
                    >
                        abbrechen
                    </Button>
                </div>
                <div className="w-5/12">
                    <Button
                        color={"primary"}
                        type={"submit"}
                        disabled={!formState.isValid}
                    >
                        speichern
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
