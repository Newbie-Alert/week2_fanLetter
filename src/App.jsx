import "./App.css";
import Banner from "./components/Banner";
import Input from "./components/Input";
import Card from "./components/Card";

function App({ messages, setMessages }) {
  return (
    <div className="App">
      <Banner />
      <Input setMessages={setMessages} />
      <Card messages={messages} />
    </div>
  );
}

export default App;
