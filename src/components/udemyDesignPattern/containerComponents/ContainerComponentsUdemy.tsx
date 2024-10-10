import axios from "axios";
import React, { useEffect, useState } from "react";

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface ContainerComponentsUdemyProps {
  userId?: string;
  resourceUrl?: string;
  children: React.ReactNode;
}

const ContainerComponentsUdemy = ({
  children,
}: ContainerComponentsUdemyProps) => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users",
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { users } as any);
        }
        return child;
      })}
    </>
  );
};

const UserInfo = ({ users }) => {
  return (
    <div>
      {users?.map((user) => {
        return (
          <div className="mb-10" key={user.id}>
            <h1>
              <strong>Name:</strong> <span>{user.name}</span>
            </h1>
            <h1>
              <strong>Email:</strong> <span>{user.email}</span>
            </h1>
            <h1>
              <strong>username:</strong> <span>{user.username}</span>
            </h1>
          </div>
        );
      })}
    </div>
  );
};

const ContainerComponentsUdemyWithId = ({
  userId,
  children,
}: ContainerComponentsUdemyProps) => {
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { users } as any);
        }
        return child;
      })}
    </>
  );
};

const UserInfoWithId = ({ users }) => {
  return (
    <div>
      {users?.map((user) => {
        return (
          <div className="mb-10" key={user.id}>
            <h1>
              <strong>Name:</strong> <span>{user.name}</span>
            </h1>
            <h1>
              <strong>Email:</strong> <span>{user.email}</span>
            </h1>
            <h1>
              <strong>username:</strong> <span>{user.username}</span>
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export { ContainerComponentsUdemy, UserInfo };
