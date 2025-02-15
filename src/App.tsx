import React, { useState } from "react";
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
import UsageExample from "./components/udemyDesignPattern/hoc/UsageExample";
import ReRenders from "./components/udemyDesignPattern/ReRenders/ReRenders";
// import { CounterButton, CounterDisplay, CounterProvider } from "./context";
import FramerRender from "./components/FramerMotion/FramerRender";
import { Route, Routes } from "react-router-dom";
import PermissionRender from "./components/Permissions/RoleBasedAccessControl/PermissionRender";

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
      {/* <TestOmitUserCard name="mubarak" email="mbk" age={40} />
      <h1>hello</h1> */}
      {/* <UsageExample /> */}
      {/* <ReRenders /> */}
      {/* <CounterProvider>
        <CounterDisplay />
        <CounterButton />
      </CounterProvider> */}

      <PermissionRender />
    </div>
  );
}

export default App;
