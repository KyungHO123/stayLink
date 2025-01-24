
import './css/App.css';
import Header from './layout/header';
import Footer from './layout/footer';
import Home from './home';
import Mypage from './user/mypage';
import Login from './user/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './user/signup';

function App() {

  return (
    <div className="App">
      <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
