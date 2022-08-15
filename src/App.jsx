import { PokedexPanelLeft } from "./components/PokedexPanelLeft";
import { PokedexPanelRight } from "./components/PokedexPanelRight";
import "./styles/index.css";

function App() {
  return (
    <div className="pokedex">
      <PokedexPanelLeft />
      <PokedexPanelRight />
    </div>
  );
}

export default App;
