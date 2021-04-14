import React, { useEffect, useState } from "react";
import {
  initializeSpecialistsSource,
  initializeCustomersSource,
} from "./functions/apiFunctions";

interface Props {}

export function UI({}: Props) {
  const [customers, setCustomers] = useState<
    { customerId: number }[] | undefined
  >(undefined);

  const [specialists, setSpecialists] = useState<
    { specialistId: number }[] | undefined
  >(undefined);

  useEffect(() => {
    initializeSpecialistsSource(setSpecialists);
    initializeCustomersSource(setCustomers);
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
