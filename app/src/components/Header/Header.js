import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBars,
  faMagnifyingGlass,
  faCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// base page
import './header.scss';
import SearchAdvance from '../Search/SearchAdvance';
import SearchSimple from '../Search/SearchSimple';

function Header({ props, funct }) {
  const showMenu = props.showMenu ? 'showMenu' : '';
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/', { replace: true });
  };

  return (
    <header className='header'>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='totumtitle' onClick={returnHome}>
          <h1 className='title'>TOTUM</h1>
        </div>
        <FontAwesomeIcon
          icon={faBars}
          className={'burgerMenu'}
          onClick={(e) => funct.handleListMainActivities(e)}
        />
        <SearchAdvance props={props} funct={funct} />
        <SearchSimple props={props} funct={funct} />
        <div className='icon' id='search'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='searchIndicator'
          />
        </div>
        <div className='icon' id='menu'>
          <FontAwesomeIcon
            icon={faUser}
            className='navbar-item'
            onClick={() => funct.handleMenu()}
          />
        </div>
      </nav>
      <div className={`navbar-menu ${showMenu}`} id='navbar-menu'>
        <div className='navbar-start'>
          <ul>
            <li
              onClick={
                props.isLogged ? funct.handleProfile : funct.handleLogin
              }>
              Profil
            </li>
            <li
              onClick={
                props.isLogged ? funct.handleParameters : funct.handleLogin
              }>
              Paramètres
            </li>

            {props.isLogged ? (
              <li onClick={() => funct.handleLogout()}>Déconnexion</li>
            ) : (
              <li onClick={() => funct.handleLogin()}>Connexion</li>
            )}
          </ul>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faCirclePlus}
        className='addActivity'
        onClick={
          props.isLogged ? funct.handleCreateActivity : funct.handleLogin
        }
      />
    </header>
  );
}

export default Header;
