import PageHeader from '../components/UI/PageHeader';
import React from 'react';
import UserInfo from '../components/User/UserInfo';
import IconButton from '../components/UI/buttons/IconButton';
import {ICONS} from '../constants/Icons';

const Profile = () => {

    const handleResetPassword = () => {
     
    }

    const handleDeleteAccount = () => {
        console.log('Account deleted');
    }


    return (
        <>
            <PageHeader text={'Profil'}/>

            <div className="px-2 mt-6">
                <UserInfo />
            </div>

            <div className="flex flex-col px-2 mt-4">
                <IconButton text={'Passwort zurücksetzen'} icon={ICONS.REFRESH} handleOnClick={handleResetPassword}/>
                <div className="text-red-400">
                    <IconButton icon={ICONS.TRASH} text={'Profil löschen'} handleOnClick={handleDeleteAccount}/>
                </div>
            </div>
        </>
    )
}

export default Profile;