import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../common/components/UI/LoadingSpinner";
import PageWrapper from "../../common/components/UI/PageWrapper";
import { selectUserId, useLazyGetUserQuery } from "./userSlice";
import UserInfo from "./UserInfo";
import { RefreshIcon, TrashIcon } from "@heroicons/react/outline";
import Button from "../../common/components/form-elements/buttons/Button";
import { STRINGS } from "../../common/constants/strings";

const Profile = () => {
    const [getUser, {data: user, isLoading, isFetching}] = useLazyGetUserQuery();
    const userId = useSelector(selectUserId);

    useEffect(() => {
        if (userId) {
            getUser(userId);
        }
    }, [userId, getUser])

    const handleResetPassword = () => {
     
    }

    const handleDeleteAccount = () => {
        console.log('Account deleted');
    }


    return (
        <PageWrapper title={STRINGS.PAGE_PROFILE}>
            
            <div className="mt-6">
                <UserInfo user={user}/>
            </div>

            <div className="flex flex-col mt-4">
                <Button color="white" type="button" onClick={handleResetPassword}>
                    <div className="flex items-center">
                        <RefreshIcon className="h-6 w-6"/>
                        <p>{STRINGS.PROFILE_RESET_PASSWORD}</p>
                    </div>
                </Button>
                <Button color="white" type="button" onClick={handleDeleteAccount}>
                    <div className="flex items-center">
                        <TrashIcon className="h-6 w-6 text-red-400"/>
                        <p>{STRINGS.PROFILE_DELETE_ACCOUNT}</p>
                    </div>
                </Button>
            </div>

            {(isLoading || isFetching) && 
                <LoadingSpinner/>
            }
        </PageWrapper>
    )
}

export default Profile;