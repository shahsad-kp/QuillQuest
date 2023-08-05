import './Navbar.css';
import {Link} from "react-router-dom";
import logo from '../../assets/logo.png';

export const Navbar = () => {
    return (
        <nav className={'navbar'}>
            <Link to={'/'}>
                <div className={'logo'}>
                    <img src={logo} alt={''}/>
                </div>
            </Link>
        </nav>
    );
};