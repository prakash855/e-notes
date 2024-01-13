import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const state = useSelector((state) => state);
  console.log(state);

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Hello world!</h1>
    </>
  );
}

export default App;
