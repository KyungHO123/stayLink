
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
import CreateLodApp from './lod/createLodApp';
import UserView from './user/userView';
import MyLodApp from './lod/myLodApp';
import SalesApp from './sales/salesApp';
import RoomApp from './room/roomApp';
import ReserveApp from './reserve/reserveApp';
import LodUserApp from './reserveUser/lodUserApp';

function App() {
const [isLogin,setIsLogin] = useState(false);
const [isLod,setIsLod] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path='/createLod' element={<CreateLodApp isLod={isLod} setIsLod={setIsLod}/> }/>
        <Route path='/myLod' element={<MyLodApp isLod={isLod} setIsLod={setIsLod} /> }/>
        <Route path='/userReserve' element={<UserReserve/>}/>
        <Route path='/userPayment' element={<UserPayment/>}/>
        <Route path='/userFavorite' element={<UserFavorite/>}/>
        <Route path='/userView' element={<UserView/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage isLod={isLod} setIsLod={setIsLod}/>} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sales/app" element={<SalesApp />} />
        <Route path="/room/app" element={<RoomApp />} />
        <Route path="/reserve/app" element={<ReserveApp />} />
        <Route path="/reserveUser/app" element={<LodUserApp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
