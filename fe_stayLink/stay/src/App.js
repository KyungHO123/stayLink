
import './css/App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import Home from './home';
import Mypage from './user/mypage';
import Login from './user/login';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './user/signup';
import { useState } from 'react';
import UserReserve from './user/userReserve';
import UserPayment from './user/userPayment';
import UserFavorite from './user/userFavorite';
import CreateLod from './lod/createLod';
import UserView from './user/userView';
import MyLod from './lod/myLod';

function App() {
const [isLogin,setIsLogin] = useState(false);
const [isLod,setIsLod] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path='/createLod' element={<CreateLod isLod={isLod} setIsLod={setIsLod}/> }/>
        <Route path='/myLod' element={<MyLod isLod={isLod} setIsLod={setIsLod} /> }/>
        <Route path='/userReserve' element={<UserReserve/>}/>
        <Route path='/userPayment' element={<UserPayment/>}/>
        <Route path='/userFavorite' element={<UserFavorite/>}/>
        <Route path='/userView' element={<UserView/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage isLod={isLod}/>} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
