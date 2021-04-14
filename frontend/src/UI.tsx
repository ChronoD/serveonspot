import React, { useEffect, useState } from "react";
import {
  getSpecialistsHi,
  initializeSpecialistsSource,
  initializeCustomersSource,
} from "./functions/apiFunctions";

interface Props {}

export function UI({}: Props) {
  const [customers, setCustomers] = useState<
    { customerId: number }[] | undefined
  >(undefined);

  const [customers2, setCustomers2] = useState<string | undefined>(undefined);

  const [specialists, setSpecialists] = useState<
    { specialistId: number }[] | undefined
  >(undefined);

  console.log(customers);

  useEffect(() => {
    initializeSpecialistsSource(setSpecialists);
    initializeCustomersSource(setCustomers2);
  }, []);

  return (
    <div>
      {/* {!customers ? (
        "loading customers"
      ) : (
        <>
          <div>waiting customers:</div>
          {customers.map((i: any, index: number) => (
            <p key={index}>{i.customerId}</p>
          ))}
        </>
      )} */}

      {!customers2 ? (
        "loading customers2"
      ) : (
        <>
          <div>waiting customers: {customers2}</div>
        </>
      )}

      <div>
        {!specialists ? (
          "loading specialists"
        ) : (
          <>
            <div>available specialists:</div>
            {/* {specialists} */}
            {specialists &&
              specialists.map((u, index) => (
                <p key={index}>{u.specialistId}</p>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
