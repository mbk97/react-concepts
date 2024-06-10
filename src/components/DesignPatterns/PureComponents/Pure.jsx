import React, { memo, useState } from "react";

const EmployeeProfile = memo(({ name, email, num }) => {
  console.log(name);
  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
});

// ! This keeps re-rendering as long as the name keeps changing
// const EmployeeProfile = ({ name, email }) => {
//   console.log(name);
//   return (
//     <div>
//       <p>Name: {name}</p>
//       <p>Email: {email}</p>
//     </div>
//   );
// };

export const Pure = () => {
  const [name, setName] = useState("Mubarak");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState(1);
  return (
    <div>
      <>
        <label>
          Name: <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:{" "}
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <hr />
        //!! Because the email was not passed to this component, it does not
        re-render if the email changes
        <EmployeeProfile name={name} num={num} />
      </>
    </div>
  );
};
