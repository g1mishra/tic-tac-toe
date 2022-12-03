import "./App.css";
import Board from "./game/board";

function App() {
  return (
    <>
      <Board />
      <div className="font-semibold flex justify-center items-center space-x-1">
        <p>developer : </p>
        <a className="underline text-blue-600" href="https://g1mishra.dev">
          Jeevan Kumar
        </a>
      </div>
    </>
  );
}

export default App;
