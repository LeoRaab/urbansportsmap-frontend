import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GraphicMessage from '../../common/components/UI/GraphicMessage';
import LoadingSpinner from '../../common/components/UI/LoadingSpinner';
import PageWrapper from '../../common/components/UI/PageWrapper';
import { ILLUSTRATIONS } from '../../common/constants/illustrations';
import { STRINGS } from '../../common/constants/strings';
import { useLazyVerifyQuery } from './userSlice';

const VerifyUser = () => {
  const params = useParams();
  const [verifyUser, { isLoading, isSuccess, isError }] = useLazyVerifyQuery();
  const verifyString = params.verifyString;

  useEffect(() => {
    if (verifyString) {
      verifyUser(verifyString);
    }
  }, [verifyString, verifyUser]);

  return (
    <>
      <PageWrapper title="Profil verifizieren">
        <>
          {isSuccess && (
            <GraphicMessage
              illustration={ILLUSTRATIONS.VERIFY_EMAIL}
              title={STRINGS.EMAIL_CONFIRM_SUCCESS_TITLE}
              text={STRINGS.EMAIL_CONFIRM_SUCCESS_TEXT}
              link={{ path: '/login', text: STRINGS.BUTTON_LOGIN }}
            />
          )}
        </>
        <>
          {isError && (
            <GraphicMessage
              illustration={ILLUSTRATIONS.NOT_FOUND}
              title={STRINGS.EMAIL_CONFIRM_FAIL_TITLE}
              text={STRINGS.EMAIL_CONFIRM_FAIL_TEXT}
            />
          )}
        </>
      </PageWrapper>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default VerifyUser;
