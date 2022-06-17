
import mestoLogo from '../images/logo-white.svg';

function Header() {
  return (
    <header className="header">
        <img
        src={mestoLogo}
        alt="Логотип Mesto"
        className="header__logo"
        />
    </header>   
  );
}

export default Header;
