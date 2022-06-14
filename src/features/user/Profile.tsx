import { useEffect } from "react";
import { useSelector } from "react-redux";
import IconButton from "../../common/components/UI/buttons/IconButton";
import LoadingSpinner from "../../common/components/UI/LoadingSpinner";
import PageWrapper from "../../common/components/UI/PageWrapper";
import { ICONS } from "../../common/constants/Icons";
import { useLazyGetUserQuery } from "./authApi";
import { selectUserId } from "./authSlice";
import UserInfo from "./UserInfo";

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
        <PageWrapper title='Profil'>
            
            <div className="mt-6">
                <UserInfo user={user}/>
            </div>

            <div className="flex flex-col mt-4">
                <IconButton text={'Passwort zurücksetzen'} icon={ICONS.REFRESH} handleOnClick={handleResetPassword}/>
                <div className="text-red-400">
                    <IconButton icon={ICONS.TRASH} text={'Profil löschen'} handleOnClick={handleDeleteAccount}/>
                </div>
            </div>

            {(isLoading || isFetching) && 
                <LoadingSpinner/>
            }
        </PageWrapper>
    )
}

export default Profile;