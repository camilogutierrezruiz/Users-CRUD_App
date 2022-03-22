import axios from "axios";
import React, { useEffect, useState } from "react";
import UserForm from "./componets/UserForm";
import UserList from './componets/UserList'
import GlobalButtons from "./componets/GlobalButtons";
import './styles.css'

function UserCRUDApp() {

  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = () => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then(response => {
        setUsers(response.data)
      })
  };

  const postUser = (user) => {
    axios
      .post('https://users-crud1.herokuapp.com/users/', user)
      .then(() => {
        getUsers();
      })
      .catch((error) => console.log(error));
  };

  const patchUser = (user) => {
    axios
      .patch(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, user)
      .then(() => {
        getUsers();
      })
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => {
        getUsers();
      })
  };

  return (
    <div className="page__wrapper">
      <header className="header">
        <h1 className="header__title">Users</h1>
        <GlobalButtons
          ButtonClassName={`header__button`}
          ButtonType='button'
          ButtonOnClickAction={() => setShowForm(!showForm)}
          ButtonTextContent={<i className="fa-solid fa-user-plus"></i>}
        />
      </header>
      <section className={showForm ? `userform__wrapper visible` : `userform__wrapper hide`}>
        <UserForm
          UserFormClassName={'userform'}
          ShowForm={setShowForm}
          getUsers={getUsers}
          postUser={postUser}
          patchUser={patchUser}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
        />
      </section>
      <main>
        <UserList
          GetUsers={users}
          setUserSelected={setUserSelected}
          deleteUser={deleteUser}
        />
      </main>
    </div>
  );
}

export default UserCRUDApp;
