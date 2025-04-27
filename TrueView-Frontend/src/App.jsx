import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { Signup } from './pages/SignUp/Signup';
import { Blog } from './pages/Blog/Blog';
import { Profile } from './pages/Profile/Profile';
import { Checker } from './pages/Checker/Checker';
import ArticleDetail from "./pages/ArticleDetail/ArticleDetail";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS library
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checker" element={<Checker />} />
            <Route path="/article/:index" element={<ArticleDetail />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

