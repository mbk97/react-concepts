import React from "react";
// !  Utility types with React (e.g., Partial, Pick)

// ** In TypeScript, utility types like Partial, Pick, Omit, and others are used to transform or manipulate types. When working with React, they become highly useful for creating flexible, reusable components, handling props, and ensuring stricter type safety.

// * 1. Partial

// Partial<T> makes all properties in T optional. This is helpful when you want to allow components to receive only some of the props, but not all, or when default values might be set for some props.

// !Example

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

type UserCardProps = Partial<User>;

const UserCard = ({ id, name, email }: UserCardProps) => (
  <div>
    <p>ID: {id}</p>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
  </div>
);

const TestUserCard = () => {
  return (
    <div>
      <UserCard id={1} name="Mubarak" />
    </div>
  );
};

//* 2. Required
//Required<T> makes all optional properties in T required. It’s the opposite of Partial

type RequiredUserCardProps = Required<User>;

const TestRequiredUserCard: React.FC<RequiredUserCardProps> = ({
  id,
  name,
  email,
}) => {
  return (
    <div>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
};

// * 3. Pick
// Pick<T, K> constructs a type by picking a subset of properties from type T. It’s useful when you only want to pass certain props to a component and ignore the rest.

type PickTestProps = Pick<User, "name" | "email">;

const TestPickUserCard: React.FC<PickTestProps> = ({ name, email }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
};

// * 3. Omit
// Pick<T, K> constructs a type by picking a subset of properties from type T. It’s useful when you only want to pass certain props to a component and ignore the rest.

type OmitTestProps = Omit<User, "id">;

const TestOmitUserCard: React.FC<OmitTestProps> = ({ name, email, age }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
    </div>
  );
};

// * 4 Readonly
// Readonly<T> makes all properties in T immutable. It’s helpful when you want to ensure that props passed to a component cannot be modified.

export {
  TestUserCard,
  TestRequiredUserCard,
  TestPickUserCard,
  TestOmitUserCard,
};
