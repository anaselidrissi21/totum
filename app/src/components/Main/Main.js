import { useEffect } from 'react';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import SearchAdvance from '../Search/SearchAdvance';

// base page
import './main.scss';
import Map from '../Map/Map';
import Activity from '../Activity/Activity';

// modal
import Activities from '../ListActivities/ListActivities';
import CreateActivity from '../CreateActivity/CreateActivity';
import Login from '../Login/Login';
import Profil from '../Profile/Profile';
import Settings from '../Settings/Settings';
import CreateProfil from '../CreateProfil/CreateProfile';
import Help from '../Settings/Help/Help';
import LegalMention from '../Settings/LegalMention/LegalMention';

function Desktop({ props, funct }) {
  const addActivity = props.addActivity ? 'isActive' : '';
  const profile = props.profile ? 'isActive' : '';
  const parameters = props.parameters ? 'isActive' : '';
  const user = props.user ? '' : 'isActive';
  const createUser = props.createProfile ? 'isActive' : '';
  const activity = props.activity ? 'isActive' : '';
  const listActivities = props.listActivities ? 'isActive' : '';
  const help = props.help ? 'isActive' : '';
  const legalMention = props.legalMention ? 'isActive' : '';

  useEffect(() => {}, []);

  return (
    <div className='desktop'>
      <div className='left'>
        <div className='mapComposant'>
          <Map />
        </div>
      </div>
      <div className='right'>
        <div className='search'>
          <SearchAdvance />
        </div>
        <div className='activitiesList'>
          <Activities />
        </div>
      </div>

      {/* zone modal */}

      <div id='modalLegalmention' className={legalMention}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <LegalMention props={props} funct={funct} />
      </div>

      <div id='modalHelp' className={help}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <Help props={props} funct={funct} />
      </div>

      <div id='modalActivity' className={activity}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <Activity />
      </div>

      <div id='modalCreateActivity' className={addActivity}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <CreateActivity props={props} funct={funct} />
      </div>

      <div id='modalLogin' className={user}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <Login funct={funct} props={props} />
      </div>

      <div id='modalProfil' className={profile}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <Profil />
      </div>

      <div id='modalSettings' className={parameters}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <Settings />
      </div>

      <div id='modalCreateProfil' className={createUser}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <CreateProfil funct={funct} props={props} />
      </div>

      <div id='modalListActivities' className={listActivities}>
        <FontAwesomeIcon
          icon={faXmark}
          className='icon_close'
          onClick={() => funct.closeAllModal()}
        />
        <Activities props={props} />
      </div>

      {/* fin zone modal */}

      <FontAwesomeIcon
        onClick={() => funct.handleCreateActivity()}
        className='icon_create'
        icon={faCirclePlus}
      />
    </div>
  );
}

export default Desktop;