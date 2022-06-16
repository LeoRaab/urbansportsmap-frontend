import { useReducer, useEffect, useState } from "react";
import { validate, Validator } from "../../util/form-validators";

const initialState = {
    value: "",
    isValid: true,
    isTouched: false,
};

type ACTIONTYPE =
    | { type: "CHANGE"; payload: { value: string; validators: Validator[] } }
    | { type: "TOUCH" };

const inputReducer = (state: typeof initialState, action: ACTIONTYPE) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.payload.value,
                isValid: validate(
                    action.payload.value,
                    action.payload.validators
                ),
            };
        case "TOUCH": {
            return {
                ...state,
                isTouched: true,
            };
        }
        default:
            return state;
    }
};

type InputProps = {
    element: "input" | "textarea";
    id: string;
    label: string;
    validators: Validator[];
    onInput: (id: string, value: string, isValid: boolean) => void;
    errorText: string;
    type?: string;
    placeholder?: string;
    rows?: number;
};

const Input = ({
    element,
    id,
    label,
    validators,
    errorText,
    onInput,
    type,
    placeholder,
    rows,
}: InputProps) => {
    const [inputState, dispatch] = useReducer(inputReducer, initialState);
    const { value, isValid } = inputState;
    const [className, setClassName] = useState<string>('');

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    useEffect(() => {
        if (!isValid) {
            setClassName('invalid');
        } else {
            setClassName('');
        }
    }, [isValid]);

    const handleChange = (event: any) => {
        dispatch({
            type: "CHANGE",
            payload: {
                value: event.target.value,
                validators: validators,
            },
        });
    };

    const handleTouch = () => {
        dispatch({
            type: "TOUCH",
        });
    };

    const formElement =
        element === "input" ? (
            <input
                id={id}
                type={type || "text"}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleTouch}
                className={className}
            />
        ) : (
            <textarea
                id={id}
                rows={rows || 3}
                onChange={handleChange}
                onBlur={handleTouch}
                className={className}
            />
        );

    return (
        <div className="flex flex-col my-4">
            <label htmlFor={id} className="my-2 font-bold">
                {label}
            </label>
            {formElement}
            {!isValid && <p className="my-2 font-bold text-sm invalid">{errorText}</p>}
        </div>
    );
};

export default Input;
