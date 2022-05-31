import PageHeader from '../components/UI/PageHeader';
import React, { useEffect } from 'react';
import UserInfo from '../components/User/UserInfo';
import IconButton from '../components/UI/buttons/IconButton';
import {ICONS} from '../constants/Icons';
import { useSelector } from 'react-redux';
import { selectUserId } from '../store/authSlice';
import { useLazyGetUserQuery } from '../store/api/authApi';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import PageWrapper from '../components/UI/page-wrapper';

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