import {UserProfile} from '../../types/UserProfile';

type UserInfoProps = {
    userProfile?: UserProfile
}

const UserInfo = ({userProfile}: UserInfoProps) => {

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-2xl mb-2">{userProfile?.name}</h1>
            <h2 className="text-xl mb-4">{userProfile?.email}</h2>
        </div>
    )
}

export default UserInfo;