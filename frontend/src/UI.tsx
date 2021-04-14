import React, { useEffect, useState } from "react";
import {
  initializeSpecialistsSource,
  initializeCustomersSource,
} from "./functions/apiFunctions";

interface Props {}

export interface Customer {
  customerId: number;
}

export interface Specialist {
  specialistId: number;
}

export function UI({}: Props) {
  const [customers, setCustomers] = useState<Customer[] | undefined>(undefined);

  const [specialists, setSpecialists] = useState<Specialist[] | undefined>(
    undefined
  );

  function updateCustomers(customers: Customer[]): void {
    setCustomers(customers);
  }

  function updateSpecialists(specialists: Specialist[]): void {
    setSpecialists(specialists);
  }
  console.log(customers);
  console.log(specialists);

  useEffect(() => {
    initializeCustomersSource(setCustomers);
    initializeSpecialistsSource(setSpecialists);
  }, []);

  return (
    <div>
      {!customers ? (
        "loading customers"
      ) : (
        <>
          <div>waiting customers:</div>
          {customers.length &&
            customers.map((i: any, index: number) => (
              <p key={index}>{i.customerId}</p>
            ))}
        </>
      )}

      <div>
        {!specialists ? (
          "loading specialists"
        ) : (
          <>
            <div>available specialists:</div>
            {specialists && specialists.length
              ? specialists.map((u, index) => (
                  <p key={index}>{u.specialistId}</p>
                ))
              : specialists.length}
          </>
        )}
      </div>
    </div>
  );
}
