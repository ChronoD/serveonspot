import "./App.css";
import { MainPanel } from "./containers/MainPanel";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { store } from "./state/store";

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={() => <p>whoops</p>}>
        <Provider store={store}>
          <MainPanel />
        </Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
