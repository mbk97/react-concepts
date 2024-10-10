import "./App.css";
import DynamicForm from "./components/DynamicForm/DynamicForm";
import Timer from "./components/reducerForm/ReducerForm";
// import SignupForm from "./components/reducerForm/ReducerForm";
import { GlobalDebug } from "./components/removeConsoleLogInProd/removeConsoleLog";
import ThrottledForm from "./components/Throttling/Throttling";
import { ContainerComponents } from "./components/udemyDesignPattern/containerComponents/ContainerComponents";
import {
  ContainerComponentsUdemy,
  UserInfo,
} from "./components/udemyDesignPattern/containerComponents/ContainerComponentsUdemy";

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
      {/* <Timer /> */}
      {/* <DynamicForm /> */}
      {/* <ContainerComponents /> */}
      <ContainerComponentsUdemy userId="3" resourceUrl="api.com">
        <UserInfo />
      </ContainerComponentsUdemy>
    </div>
  );
}

export default App;
