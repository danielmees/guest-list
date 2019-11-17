import React from 'react';
import './GuestCard.scss';
import diningIcon from '../assets/dining.png';

const GuestCard = ({ guest }) => {
  const { first_name, last_name, email, city, visit_count, total_spend, tags } = guest;

  return (
    <div className='guest-card'>
      <img src={diningIcon} alt='guest icon' />
      <div className='guest-info'>
        <p className='name'>{first_name} {(last_name) ? last_name : ''}</p>
        {tags &&
          <ul className='tags'>
            {tags.map((tag, index) =>
              <li key={index}>{tag}</li>
            )}
          </ul>
        }
        <div className='email-city'>
          <p className='email'>{(email) ? email : ''}</p>
          <p className='city'>{(city) ? city : ''}</p>
        </div>
        <p className='visit-info'>Has visited {visit_count} times, total spend is ${total_spend}</p>
      </div>
    </div>
  );
}

export default GuestCard;
