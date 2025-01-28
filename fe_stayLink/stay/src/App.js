
import './css/App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import Home from './home';
import Mypage from './user/mypage';
import Login from './user/login';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './user/signup';
import { useState } from 'react';

function App() {
const [isLogin,setIsLogin] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage isLogin={isLogin} setIsLogin={setIsLogin}/>} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
