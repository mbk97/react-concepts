import React, { useEffect, useState } from "react";
import axios from "axios";

// ! Container components in a sense are react components responsible for handling data loading and data management on behalf of their child components.

// * This is where container components come.They address this issue by extracting the data loading logic into a dedicated component.The container, which then handles the data retrieval process and automatically passes it down to the child components.

const ContainerComponents = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ChildComponents users={data} />
    </div>
  );
};

const ChildComponents = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          {Object.keys(user)
            .slice(0, 3)
            .map((key) => (
              <div key={key}>
                <strong>{key}</strong>: {user[key]}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export { ContainerComponents };
