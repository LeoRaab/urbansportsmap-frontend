import PageHeader from '../components/UI/PageHeader';
import LoginForm from '../components/Forms/LoginForm';
import useAuth from '../hooks/use-auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRedirectPath from '../hooks/use-redirect-path';
import { useSelector } from 'react-redux';
import { selectUserId } from '../store/authSlice';
import PageWrapper from '../components/UI/PageWrapper';

const Login = () => {
    const navigate = useNavigate();
    const redirectPath = useRedirectPath();
    const { login } = useAuth();
    const userId = useSelector(selectUserId);

    const handleFormSubmit = async (email: string, password: string) => {
        login(email, password);
    }

    useEffect(() => {
        if (userId) {
            navigate(redirectPath, { replace: true });
        }
    }, [userId]);

    return (
        <PageWrapper title='Login'>
            <LoginForm onFormSubmit={handleFormSubmit} />
        </PageWrapper>
    )
}

export default Login;