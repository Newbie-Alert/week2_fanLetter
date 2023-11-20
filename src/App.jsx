import Input from "./components/Input";
import Card from "./components/Card";
import React from "react";

const Banner = React.lazy(() => import("./components/Banner"));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading</div>}>
        <Banner />
      </React.Suspense>
      <Input />
      <Card />
    </div>
  );
}

export default App;
