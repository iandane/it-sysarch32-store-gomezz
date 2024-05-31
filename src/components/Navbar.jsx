import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar({ cartItems }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="store-name">Gomez saksak sinagol MOTOR Store</Link>
                <Link to="/" className="motor-nav">Motorbike</Link>
            </div>
            <div className="navbar-right">
                <Link to="/cart" className="cartBtn">
                    <FaShoppingCart style={{ fontSize: '1.5rem' }} /> ({cartItems})
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
