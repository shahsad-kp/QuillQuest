import './Navbar.css';
import {Link, useLocation} from "react-router-dom";
import logo from '../../assets/logo.png';
import {RxPencil2} from "react-icons/rx";
import {IoPersonCircleOutline, IoSettingsOutline} from "react-icons/io5";
import {AiOutlineHome} from "react-icons/ai";

export const Navbar = () => {
    const location = useLocation()

    return (<nav className={'navbar'}>
        <Link to={'/'}>
            <div className={'logo'}>
                <img src={logo} alt={''}/>
            </div>
        </Link>
        <div className={'menu'}>
            {location.pathname !== '/' && <Link to={'/'}>
                <AiOutlineHome className={'icon'}/>
            </Link>}
            {location.pathname !== '/new/' && <Link to={'/new/'}>
                <RxPencil2 className={'icon'}/>
            </Link>}
            {location.pathname !== '/settings/' && <Link to={'/settings/'}>
                <IoSettingsOutline className={'icon'}/>
            </Link>}
            {location.pathname !== '/profile/' && <Link to={'/profile/'}>
                <IoPersonCircleOutline className={'icon'}/>
            </Link>}
        </div>
    </nav>);
};