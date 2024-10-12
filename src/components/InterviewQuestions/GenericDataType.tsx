// !  Generic components in TypeScript

// * Generic components in TypeScript allow you to create reusable components that can work with a variety of data types. Generics provide flexibility by letting you define the type at the time the component is used, rather than hard-coding it into the component. This is especially useful when creating components like tables, lists, or forms that can accept different data types.

import React from "react";

// Define the generic type T for the list items
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

const List = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

const UsageList = () => {
  return (
    <List
      items={[1, 2, "cherry"]}
      renderItem={(item) => <strong>{item}</strong>}
    />
  );
};

export { List, UsageList };
