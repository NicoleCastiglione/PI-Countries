import "./App.css";
import { Home } from "./screens/Home/Home";
import { Start } from "./screens/Start/Start";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Detail } from "./screens/CountryDetails/Detail";
import { Activities } from "./screens/Activities/Activities";

const App = () => {
  const location = useLocation();
  const pathDoesntExists =
    location.pathname !== "/" && location.pathname !== "/home";

  return (
    <div className="App">
      <div>
        {pathDoesntExists && <Navbar />}
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/activities" element={<Activities />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
