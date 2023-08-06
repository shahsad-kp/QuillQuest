import './Navbar.css';
import {Link} from "react-router-dom";
import logo from '../../assets/logo.png';
import {RxPencil2} from "react-icons/rx";

export const Navbar = () => {
    return (<nav className={'navbar'}>
            <Link to={'/'}>
                <div className={'logo'}>
                    <img src={logo} alt={''}/>
                </div>

            </Link>
            <div className={'menu'}>
                <Link to={'/new'}>
                    <RxPencil2 className={'icon'}/>
                </Link>
            </div>
        </nav>);
};