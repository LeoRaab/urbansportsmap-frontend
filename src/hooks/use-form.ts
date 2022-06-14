import { useCallback, useReducer } from "react";

interface FormState {
    inputs: { [key: string]: IInput };
    isValid: boolean;
}

interface IInput {
    value: string;
    isValid: boolean;
}

type ACTIONTYPE =
    | {
          type: "INPUT_CHANGE";
          payload: { id: string; value: string; isValid: boolean };
      }
    | { type: "SET_DATA"; payload: FormState };

const formReducer = (state: FormState, action: ACTIONTYPE) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;

            for (const id in state.inputs) {
                if (id === action.payload.id) {
                    formIsValid = formIsValid && action.payload.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[id].isValid;
                }
            }

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.payload.id]: {
                        value: action.payload.value,
                        isValid: action.payload.isValid,
                    },
                },
                isValid: formIsValid,
            };
        default:
            return state;
    }
};

export const useForm = (initialInputs: {}, initialFormValidity: boolean) => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialInputs,
        isValid: initialFormValidity,
    });

    const inputHandler = useCallback(
        (id: string, value: string, isValid: boolean) => {
            dispatch({
                type: "INPUT_CHANGE",
                payload: {
                    id,
                    value,
                    isValid: isValid,
                },
            });
        },
        []
    );

    const setFormData = useCallback(({ inputs, isValid }: FormState) => {
        dispatch({
            type: "SET_DATA",
            payload: {
                inputs,
                isValid,
            },
        });
    }, []);

    return { formState, inputHandler, setFormData };
};
