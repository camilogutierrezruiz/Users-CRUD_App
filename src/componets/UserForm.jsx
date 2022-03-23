import React, { useEffect, useState } from 'react';
import GlobalButtons from './GlobalButtons';
import '../styles.css'

const UserForm = ({
  UserFormClassName,
  ShowForm,
  postUser,
  patchUser,
  userSelected,
  setUserSelected
}) => {

  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userDate, setUserDate] = useState('');
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (userSelected) {
      setUserFirstName(userSelected.first_name);
      setUserLastName(userSelected.last_name);
      setUserEmail(userSelected.email);
      setUserPass(userSelected.password);
      setUserDate(userSelected.birthday);
      ShowForm(true);
    }
  }, [userSelected, ShowForm]);

  const submit = (event) => {
    event.preventDefault();
    const userData = {
      email: userEmail,
      password: userPass,
      first_name: userFirstName,
      last_name: userLastName,
      birthday: userDate,
    };
    if (userSelected) {
      patchUser(userData);
      resetInputs();
      ShowForm(false);
    } else {
      postUser(userData);
      ShowForm(false);
      resetInputs();
    }
  };

  const resetInputs = () => {
    setUserFirstName('');
    setUserLastName('');
    setUserEmail('');
    setUserPass('');
    setUserDate('');
    setShowPass(false);
  };

  const cancelPatch = () => {
    setUserSelected(null);
    resetInputs();
    ShowForm(false)
  };

  return (
    <form className={UserFormClassName} onSubmit={submit}>
      <section className={!userSelected ? 'userform__button--wrapper visible' : 'userform__button--wrapper hidden'}>
        <GlobalButtons
          ButtonClassName={'button__closeform'}
          ButtonType={'button'}
          ButtonOnClickAction={() => ShowForm(false)}
          ButtonTextContent={<i className="fa-solid fa-circle-xmark"></i>}
        />
      </section>
      <section className='userform__input--wrapper'>
        <section className='input__wrapper'>
          <input className='userform__input'
            type="text"
            id='form__user-firstname'
            placeholder='first name'
            onChange={event => setUserFirstName(event.target.value)}
            value={userFirstName}
          />
        </section>
        <section className='input__wrapper'>
          <input className='userform__input'
            type="text"
            id='form__user-lastname'
            placeholder='last name'
            onChange={event => setUserLastName(event.target.value)}
            value={userLastName}
          />
        </section>
        <section className='input__wrapper'>
          <input className='userform__input'
            type="email"
            id='form__user-email'
            placeholder='email'
            onChange={event => setUserEmail(event.target.value)}
            value={userEmail}
          />
        </section>
        <section className='input__wrapper password'>
          <input className='userform__input password'
            type={showPass ? 'text' : 'password'}
            id='form__user-pass'
            placeholder='password'
            onChange={event => setUserPass(event.target.value)}
            value={userPass}
          />
          <GlobalButtons
            ButtonClassName='password__button'
            ButtonType={'button'}
            ButtonOnClickAction={() => setShowPass(!showPass)}
            ButtonTextContent={showPass ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
          />
        </section>
        <section className='input__wrapper'>
          <input className='userform__input'
            type="date"
            id='form__user-birthday'
            onChange={event => setUserDate(event.target.value)}
            value={userDate}
          />
        </section>
      </section>
      <section className='formbuttons__wrapper'>
        <GlobalButtons
          ButtonClassName={'form__button--footer'}
          ButtonType={'submit'}
          ButtonTextContent={userSelected ? 'Update' : 'Create'}
        />
        {userSelected && <GlobalButtons
          ButtonClassName={'form__button--footer'}
          ButtonTextContent={'Cancel'}
          ButtonOnClickAction={() => cancelPatch()}
        />}
      </section>
    </form>
  );
};

export default UserForm;