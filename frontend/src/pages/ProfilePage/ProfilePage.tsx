import {Navbar} from "../../components";
import {Profile} from "../../components/Profile/Profile.tsx";

export const ProfilePage = () => {
    return (<div className={'home-page'}>
        <Navbar/>
        <Profile/>
    </div>);
};