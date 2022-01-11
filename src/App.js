import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { OrderEntry } from "./pages/entry/OrderEntry";
import { useState } from "react";
import { OrderSummary } from "./pages/summary/OrderSummary";
import { OrderConfirmation } from "./pages/confirmation/OrderConfirmation";

function App() {
  const [phase, setPhase] = useState("inProgress");
  let phaseComponent = null;
  switch (phase) {
    case "inProgress":
      phaseComponent = <OrderEntry setPhase={setPhase} />;
      break;
    case "review":
      phaseComponent = <OrderSummary setPhase={setPhase} />;
      break;
    case "complete":
      phaseComponent = <OrderConfirmation setPhase={setPhase} />;
      break;
    default:
      break;
  }
  return (
    // <SummaryForm/>
    <>
      <h1>Desgin your Sundae</h1>
      <OrderDetailsProvider>{phaseComponent}</OrderDetailsProvider>
    </>
  );
}

export default App;
