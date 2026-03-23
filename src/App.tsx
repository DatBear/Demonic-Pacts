import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Info from "@/pages/Info";
import RegionDetail from "@/pages/RegionDetail";
import Relics from "@/pages/Relics";
import { RouteScrollManager } from "@/components/RouteScrollManager";
import "./App.css";

function App() {
  return <>
    <main>
      <RouteScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/relics" element={<Relics />} />
        <Route path="/regions/:regionSlug" element={<RegionDetail />} />
      </Routes>
    </main>
  </>;
}

export default App;
