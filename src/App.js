import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { OrderEntry } from "./pages/entry/OrderEntry";

function App() {
  return (
    // <SummaryForm/>
    <>
      <h1>Desgin your Sundae</h1>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </>
  );
}

export default App;
