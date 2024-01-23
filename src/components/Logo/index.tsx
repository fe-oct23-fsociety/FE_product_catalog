import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './styles.scss';

export const Logo = () => {
  return (
    <h1 className="logo-wrapp">
      <NavLink to="/">
        <img src={logo} alt="nice gadgets" />
      </NavLink>
    </h1>
  );
};
