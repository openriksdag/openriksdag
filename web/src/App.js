import React from "react";
import RiksdagChart from "./components/RiksdagChart";
import Layout from "./components/layout.jsx";
import MotionsSquare from "./components/MotionsSquare";

function App() {
  return (
    <Layout>
      <MotionsSquare type="Motions" description="Motions & Proposals" />
      <MotionsSquare
        type="Proposals"
        description="Proposals for decision"
        reverse
      />
    </Layout>
  );
}

export default App;
