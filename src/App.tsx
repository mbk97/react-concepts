import React from "react";
import "./App.css";
import DynamicForm from "./components/DynamicForm/DynamicForm";
import { UsageList } from "./components/InterviewQuestions/GenericDataType";
import {
  TestOmitUserCard,
  TestPickUserCard,
  TestRequiredUserCard,
  TestUserCard,
} from "./components/InterviewQuestions/UtilityTypes";
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
      {/* <ContainerComponentsUdemy userId="3" resourceUrl="api.com">
        <UserInfo />
      </ContainerComponentsUdemy> */}
      {/* <UsageList /> */}
      {/* <TestPickUserCard name="mubarak" email="mbk" /> */}
      <TestOmitUserCard name="mubarak" email="mbk" age={40} />
      <h1>hello</h1>
    </div>
  );
}

export default App;
