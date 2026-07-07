import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import StreamList from "./pages/StreamList.jsx";
import Movies from "./pages/Movies.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StreamList />} />
        <Route path="movies" element={<Movies />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
