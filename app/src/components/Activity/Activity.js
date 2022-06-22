/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import './activity.scss';
import { useParams } from 'react-router-dom';
// import { findActivityById } from '../../utils/dataTools';
import axios from '../../utils/axiosPool';

/** Xavier/10/06/2022:
 *
 * this component could be a modal that could be used in lists and map
 * when it's not active it looks like a buton with contextual informations
 * for instance: if it's used in th map, the button could display a simple picto,
 * while if it's used in the homepage list it should show picto, name, date, owner and number of takeholders
 * if it's used in the profile/past activities list, it could show only name, date and owner....
 *
 * Anyway, the actual content of the modal might be more or less the same in any case.
 * I'll first develop the content.
 *
 *
 */

function Activity({ ...rest }) {
  // console.log(activities)
  const { id } = useParams();
  const [activity, setActivity] = useState([]);
  const [levels, setLevels] = React.useState([]);
  const [currentLevel, setCurrentLevel] = React.useState('');
  const [participants, setParticipants] = React.useState([1]);
  const [comments, setComments] = React.useState([
    {
      id: 1,
      content: 'Cool mais vous voulez pas faire un foot plutôt?',
      picture:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ku-iLbhmhyk1j1nZbYIqYAAAAA%26pid%3DApi&f=1',
      id_user: 1,
    },
    {
      id: 2,
      content: 'Nul à chier',
      picture:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.O2PMmzrazlHPK_qI1XuCLgHaIQ%26pid%3DApi&f=1',
      id_user: 3,
    },
  ]);

  const getActivity = async (idElem) => {
    try {
      const result = await axios({
        method: 'get',
        url: `/activity/${idElem}/manage`,
      });
      console.log(result.data);
      setActivity(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async (idElem) => {
    try {
      const result = await axios({
        method: 'get',
        url: `/activity/${idElem}/user`,
      });
      setParticipants(result.data);
      console.log(participants);
    } catch (error) {
      console.log(error);
    }
  };

  //  const isCurrentLevel = () => (levels.id === activity.level);

  /* const findCurrentLevel = () => {
    levels.find(levels.id === activity.level);
  }; */

  const getLevels = async (levelId) => {
    try {
      const response = await axios({
        method: 'get',
        url: '/level/getAll',
      });
      // console.log(response.data);
      setLevels(response.data);
      console.log(currentLevel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActivity(id);
    getUsers(id);
    getLevels();
  }, []);

  return (
    <div className='container_activity'>
      <div className='left'>
        <header className='card-header has-text-centered'>
          <p className='activity__name card-header-title'>{activity.name}</p>
          {/* <p className='activity-level'>{activity.level}</p> */}
          <button className='modal-close is-large' aria-label='close'></button>
        </header>

        <figure className='image box'>
          <img
            className='activity__picture'
            src='https://picsum.photos/100'
            alt={activity.name}
          />
        </figure>
        <p className='activity__adress'>
          {activity.address}, {activity.city}, {activity.zip_code},{' '}
          {activity.country}
        </p>

      </div>
      <div className='right'>
        <p className='activity__participants'>
          {participants.length}/{activity.max_participants} participants pour le
            moment
        </p>
        <progress
          className='activity__takeholders progress box is-success'
          value={participants.length}
          max={activity.max_participants}></progress>

        <p className='activity__description'>{activity.description}</p>
        <section className='activity__comments box'>
          {comments.map((comment) => (
            <article className='comment message is-small'>
              <div className='message-header'>
                <p>{comment.id_user}</p>
              </div>
              <div className='comment message-body'>{comment.content}</div>
            </article>
          ))}
        </section>

        <footer className='card-footer buttons has-addons box'>
          <a href='/' className='card-footer-item button is-success is-focused'>
            Participer
          </a>
          <a href='/' className='card-footer-item button is-light'>
            Commenter
          </a>
        </footer>

      </div>

    </div>

  );
}

Activity.defaultProps = {
  className: '',

  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      date: PropTypes.string.isRequired,
      level: PropTypes.string,
      address: PropTypes.string.isRequired,
      zip_code: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Activity;
