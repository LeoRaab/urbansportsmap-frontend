import PageHeader from '../components/UI/PageHeader';
import LoginForm from '../components/Forms/LoginForm';
import {useLoginMutation} from '../store/api/authApi';
import {useDispatch} from 'react-redux';
import {authActions} from '../store/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUserDataToStorage } from '../util/userdata-localstorage';
import useRedirectPath from '../components/hooks/useRedirectPath';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const redirectPath = useRedirectPath();

    const handleFormSubmit = async (email: string, password: string) => {
        try {
            const userData = await login({email, password}).unwrap();
            dispatch(authActions.setCredentials(userData));
            setUserDataToStorage(userData);
            navigate(redirectPath, { replace: true });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <PageHeader text={'Log in'}/>

            <LoginForm onFormSubmit={handleFormSubmit}/>
        </>
    )
}

export default Login;