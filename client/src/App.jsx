// App.jsx
import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  redirect,
  useNavigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import DesignEditor from './components/DesignEditor';
import Account from './components/Account';
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    console.log(savedUser);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSetUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return (
    <div className="">
      <BrowserRouter>
        <Navbar user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/register"
              element={<Register setUser={handleSetUser} />}
            ></Route>
            <Route
              path="/login"
              element={<Login setUser={handleSetUser} />}
            ></Route>
            <Route
              path="/design"
              element={<DesignEditor user={user} />}
            ></Route>
            <Route
              path="/account"
              element={<Account user={user} setUser={setUser} />}
            ></Route>
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
