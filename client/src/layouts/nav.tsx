import { Link } from 'react-router-dom';
import '../custom.css';

const Nav = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/"><img src='../assets/download.png' alt='logo'></img></Link>
            </div>
            <ul className="navbar__list">
                <li>
                    <Link to="/" className='navbar__link'>Home</Link>
                </li>
                <li>
                    <Link to="/login" className='navbar__link'>Login</Link>
                </li>
                <li>
                    <Link to="/signup" className='navbar__link'>Signup</Link>
                </li>
                <li>
                    <Link to="/users" className='navbar__link'>Users</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;