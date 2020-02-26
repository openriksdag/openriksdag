import React from "react";
import "./App.css";
import RiksdagChart from "./components/RiksdagChart";

function App() {
  const data = [
    { label: "CDU", value: 10 },
    { label: "SPD", value: 15 },
    { label: "Die Grünen", value: 8 },
    { label: "Die Mitte", value: 1 },
    { label: "Frei Wähler", value: 3 }
  ];
  return (
    <div className="App">
      <header className="App-header">
        <RiksdagChart
          data={data}
          width={400}
          height={400}
          innerRadius={80}
          outerRadius={200}
        />
      </header>
    </div>
  );
}

export default App;
