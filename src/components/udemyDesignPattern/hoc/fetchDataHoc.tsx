import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const fetchUser = (Component) => {
  return (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      (async () => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        setData(response.data);
      })();
    }, []);

    return <Component {...props} data={data} />;
  };
};

export { fetchUser };
