import logo from "./logo.svg";
import "./App.css";
import Question from "./components/Question";

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src="assets/quiz-icon.webp" alt="q" width={60} />
        Surprise Test
      </div>
      <Question />
    </div>
  );
}

export default App;
