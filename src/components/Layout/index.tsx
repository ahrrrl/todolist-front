import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.scss';
import { useUser } from '../../hook/useUser';

const Layout: React.FC = () => {
  const { data: user, isError } = useUser();
  console.log(user);
  return (
    <>
      <header className={styles.header_container}>
        <nav className={styles.nav_container}>
          <Link to='/'>
            <img
              className={styles.nav_img}
              src='/icon-thingsTodo.png'
              alt='logo'
            />
          </Link>
          <ul className={styles.nav_list}>
            <li className={styles.li_item}>
              <Link to='/'>Todo List</Link>
            </li>
            {user && !isError ? (
              <li className={styles.li_item}>{user.username}</li>
            ) : (
              <>
                <li className={styles.li_item}>
                  <Link to='/register'>회원가입</Link>
                </li>
                <li className={styles.li_item}>
                  <Link to='/login'>로그인</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
