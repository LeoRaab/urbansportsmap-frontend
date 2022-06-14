import { User } from '../../types/User';

type UserInfoProps = {
    user?: User
}

const UserInfo = ({user}: UserInfoProps) => {

    return (
        <div className="flex flex-col w-full">
            <h1 className="text-2xl mb-2">{user?.name}</h1>
            <h2 className="text-xl mb-4">{user?.email}</h2>
        </div>
    )
}

export default UserInfo;