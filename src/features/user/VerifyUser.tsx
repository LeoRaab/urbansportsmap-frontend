import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ILLUSTRATIONS } from "../constants/Illustrations";
import { useLazyVerifyQuery } from "../store/api/authApi";
import GraphicMessage from "./UI/GraphicMessage";
import LoadingSpinner from "./UI/LoadingSpinner";
import PageWrapper from "./UI/PageWrapper";

const VerifyUser = () => {
    const params = useParams();
    const [verifyUser, { isLoading, isSuccess, isError }] = useLazyVerifyQuery();
    const verifyString = params.verifyString;

    useEffect(() => {
        if (verifyString) {
            verifyUser(verifyString);
        }
    }, [verifyString]);

    return (
        <>
            <PageWrapper title='Sign up'>
                <>
                    {isSuccess &&
                        <GraphicMessage illustration={ILLUSTRATIONS.VERIFY_EMAIL}
                            title={'E-Mail Adresse bestätigt'}
                            text={'Du hast deine Email erfolgreich bestätigt! Klicke den nachfolgenden Link, um dich einzuloggen: '}
                            link={{ path: '/login', text: 'Login' }} />
                    }
                </>
                <>
                    {isError &&
                        <GraphicMessage illustration={ILLUSTRATIONS.NOT_FOUND}
                            title={'E-Mail Adresse konnte nicht verifiziert werden'}
                            text={'Leider konnte deine Email nicht verifiziert werden! Versuch es bitte erneut.'}
                        />
                    }
                </>
            </PageWrapper>
            {isLoading && <LoadingSpinner />}
        </>
    )

}

export default VerifyUser;