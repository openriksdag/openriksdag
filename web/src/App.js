import React from "react";
import RiksdagChart from "./components/RiksdagChart";
import Layout from "./components/layout.jsx";
import MotionsSquare from "./components/MotionsSquare";

function App() {
  return (
    <Layout>
      <MotionsSquare type="Motions" title="Motions & Proposals" />
      <MotionsSquare type="Proposals" title="Proposals for decision" reverse />
    </Layout>
  );
}

export default App;
