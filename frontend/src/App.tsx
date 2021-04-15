import "./App.css";
import { UI } from "./components/UI";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { store } from "./state/store";

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={() => <p>whoops</p>}>
        {/* <Provider store={store}> */}
        <UI />
        {/* </Provider> */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
