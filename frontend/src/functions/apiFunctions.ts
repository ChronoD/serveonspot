import axios from "axios";
import { Customer, Specialist } from "../UI";

export function getSpecialistsHi(setData: (data: any) => void) {
  return axios
    .get(`http://localhost:8080/specialists/hi`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    })
    .then((res) => {
      setData(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function initializeCustomersSource(
  setCustomers: (customers: Customer[]) => void
) {
  const customersSource = new EventSource("http://127.0.0.1:8080/customers");
  customersSource.onerror = () => {
    if (customersSource.readyState === 2) {
      setTimeout(initializeSpecialistsSource, 300);
    }
  };
  customersSource.onmessage = (message) => {
    console.log(message);

    const data = JSON.parse(message.data);
    setCustomers(data);
  };
}

export function initializeSpecialistsSource(
  setSpecialists: (specialists: Specialist[]) => void
) {
  const specialistsSource = new EventSource(
    "http://127.0.0.1:8080/specialists"
  );
  specialistsSource.onerror = () => {
    if (specialistsSource.readyState === 2) {
      setTimeout(initializeSpecialistsSource, 300);
    }
  };
  specialistsSource.onmessage = (message) => {
    console.log(message);

    const data = JSON.parse(message.data);
    setSpecialists(data);
  };
}
