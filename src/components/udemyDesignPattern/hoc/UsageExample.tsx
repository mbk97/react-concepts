import React from "react";
import { LogProps } from "./HocExample";
import { fetchUser } from "./fetchDataHoc";

const UsageExample = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((d) => {
        return (
          <div key={d.id} className=" p-2">
            <h1>
              <strong>Name:</strong> {d.name}
            </h1>
            <h1>
              <strong>Username:</strong> {d.username}
            </h1>
            <h1>
              <strong>Email:</strong> {d.email}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default fetchUser(UsageExample);
