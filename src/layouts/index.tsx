import { history, Link, Outlet } from 'umi';
import styles from './index.less';
import { storeContext } from '@/context';
import { useContext, useState } from 'react';

export default function Layout() {
  const [userInfo, setUserInfo] = useState(localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") || '') : null);

  const isLogin = userInfo?.id ? true : false;
  const changeUserInfo = (userInfo) => {
    setUserInfo(userInfo);
  }
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    history.push('/login');
  }
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isLogin && <li>
          <Link to="/login">Login</Link>
        </li>}
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/posts/create">CreatePosts</Link>
        </li>
        {isLogin && <li>
          <div onClick={logout}>Logout</div>
        </li>}
        <li>
          <a href="https://github.com/umijs/umi">Github</a>
        </li>
      </ul>
      <storeContext.Provider value={{ userInfo, changeUserInfo }}>
        <Outlet />
      </storeContext.Provider>
    </div>
  );
}
