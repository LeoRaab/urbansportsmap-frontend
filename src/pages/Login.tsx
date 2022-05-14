import PageHeader from '../components/UI/PageHeader';
import LoginForm from '../components/Forms/LoginForm';
import {useLoginMutation} from '../store/api/authApi';
import {useDispatch} from 'react-redux';
import {authActions} from '../store/authSlice';

const Login = () => {

    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const handleFormSubmit = async (email: string, password: string) => {
        try {
            const userData = await login({email, password}).unwrap();
            dispatch(authActions.setCredentials(userData));
            localStorage.setItem('userData', JSON.stringify(userData));
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