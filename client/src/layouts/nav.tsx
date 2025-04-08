import { Link } from 'react-router-dom';
import '../custom.css';

const Nav = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">YourLogo</Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/services">Services</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;