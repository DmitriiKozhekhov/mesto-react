import logo from "../images/logo-header.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />
    </header>
  );
}
export default Header;
