import { useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import data from "./data.json";
import Home from "./pages/Home";
import Album from "./pages/Album";
import NotFound from "./pages/NotFound";
import { AnimatePresence } from "framer-motion";

function App() {
  const [musicData] = useState(data);
  const location = useLocation();

  return (
    <div className='full-site'>
      <main className=''>
        <AnimatePresence mode='wait' initial={false}>
          <Routes location={location} key={location.key}>
            <Route path='/' element={<Home musicData={musicData} />} />
            <Route path='/:id' element={<Album musicData={musicData} />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className='footer'>
        <p>Designed and built by Connor Wilson-Groark - 2023</p>
      </footer>
    </div>
  );
}

export default App;
