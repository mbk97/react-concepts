import "./App.css";
import Timer from "./components/reducerForm/ReducerForm";
// import SignupForm from "./components/reducerForm/ReducerForm";
import { GlobalDebug } from "./components/removeConsoleLogInProd/removeConsoleLog";
import ThrottledForm from "./components/Throttling/Throttling";

function App() {
  // useEffect(() => {
  //   (process.env.NODE_ENV === "production" ||
  //     process.env.REACT_APP_ENV === "STAGING") &&
  //     GlobalDebug(false);
  // }, []);

  return (
    <div>
      {/* <SampleHOC description="I am the desc" /> */}
      {/* <ProviderDesignPattern /> */}
      {/* <ThrottledForm /> */}
      <Timer />
    </div>
  );
}

export default App;
