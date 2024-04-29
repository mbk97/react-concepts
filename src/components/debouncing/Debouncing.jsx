import React, { useState, useEffect } from "react";
import axios from "axios";

// ! There are some heavy tasks in software development. Take calling an API, for example. Suppose we have an API that searches a list of users, and we can't afford to fire it too often. We want to search only when we have typed the whole search query.

// ** Well, debouncing is a practice in software development which makes sure that certain heavy tasks like the one above don't get fired so often.

// ! For this example, we will have an input element that takes in user pin code, the purpose of this input element is to run the api function whenever a user enters the pin code.

//! But there is a catch here. Let's say our pin-code is 800001. If we type the first character, that is 8, we will send request to the backend server. Then we type 0, and we will send another request to the server, and so on. This calls the API so many times, and in turn overuses the requests. So, to prevent this, we use something called a debounce function.So to achieve this, we have a feature in JavaScript called Debouncing.

const Debouncing = () => {
  const [pinCode, setPinCode] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // ** Without debouncing
    // const getData = async () => {
    //   const response = await axios.get(
    //     "https://jsonplaceholder.typicode.com/users",
    //   );
    //   setUserData(response.data);
    // };
    // getData();

    // ** With debouncing
    const getData = () => {
      setTimeout(async () => {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        setUserData(response.data);
      }, 2000);
    };
    getData();
    return () => clearTimeout(getData);
  }, [pinCode]);

  return (
    <div>
      <h1 className="">Debouncing</h1>
      <input
        type="text"
        placeholder="Enter pincode"
        className="p-4 border-[0]"
        onChange={(e) => setPinCode(e.target.value)}
      />

      <div>
        {userData.map((user) => {
          return <h3 key={user.id}>{user.username}</h3>;
        })}
      </div>
    </div>
  );
};

export default Debouncing;
