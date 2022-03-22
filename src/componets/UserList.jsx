import React from 'react';
import GlobalButtons from './GlobalButtons';
import '../styles.css'

const UserList = ({ GetUsers, setUserSelected, deleteUser }) => {
  return (
    <ul className='usercard__wrapper'>
      {GetUsers.map((user) => (
        <li key={user.id} className='usercard__user'>
          <section className='usercard__userinfo'>
            <section>
              <h2 className='usercard__user-name'>{`${user.first_name} ${user.last_name}`}</h2>
            </section>
            <section className='usercard__user-complement'>
              <div className='usercard__content-icon'><i className="fa-solid fa-envelope"></i></div>
              <p className='usercard__content-text'>{user.email}</p>
            </section>
            <section className='usercard__user-complement'>
              <div className='usercard__content-icon'><i className="fa-solid fa-cake-candles"></i></div>
              <p className='usercard__content-text'>{user.birthday}</p>
            </section>
          </section>
          <section className='usercard__userbuttons'>
            <GlobalButtons
              ButtonClassName='usercard__userbutton-icon'
              ButtonOnClickAction={() => setUserSelected(user)}
              ButtonTextContent={<i className="fa-solid fa-pen-to-square"></i>}
            />
            <GlobalButtons
              ButtonClassName='usercard__userbutton-icon'
              ButtonOnClickAction={() => deleteUser(user.id)}
              ButtonTextContent={<i className="fa-solid fa-trash-can"></i>}
            />
          </section>
        </li>
      ))}
    </ul>
  );
};

export default UserList;