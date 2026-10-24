import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { BookProvider } from './context/BookContext';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import NotFound from './pages/NotFound/NotFound';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <div className="app">

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;