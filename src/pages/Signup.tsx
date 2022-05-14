import PageHeader from '../components/UI/PageHeader';
import SignupForm from '../components/Forms/SignupForm';
import {userRepository} from '../repositories/userRepository';
import {useState} from 'react';
import GraphicMessage from '../components/UI/GraphicMessage';
import {ILLUSTRATIONS} from '../constants/Illustrations';

const Signup = () => {
    const userRepo = userRepository();
    const [isMailSent, setIsMailSent] = useState<boolean>(false);

    const handleFormSubmit = (email: string, password: string, name: string) => {
        userRepo.signUp(email, password, name)
            .then(() => setIsMailSent(true))
            .catch((error) => console.log(error));
    }

    return (
        <>
            <PageHeader text={'Sign up'}/>

            <div className="px-2">
                {!isMailSent &&
                    <SignupForm onFormSubmit={handleFormSubmit}/>
                }

                {isMailSent &&
                    <GraphicMessage illustration={ILLUSTRATIONS.VERIFY_EMAIL}
                                    title={'Bestätige deine E-Mail Adresse'}
                                    text={'Du hast eine Mail bekommen, folge dem Link, um deine E-Mail Adresse zu bestätigen'}/>
                }
            </div>
        </>
    )
}

export default Signup;