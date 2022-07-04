import { useDispatch } from "react-redux"
import { toastsActions } from "../components/UI/toast/toastsSlice";

const useToast = () => {
    const dispatch = useDispatch();

    const show = (message: string) => (type: 'success' | 'error') => {
        dispatch(toastsActions.addToast({message, type}));
    }

    return {show}
}

export default useToast;