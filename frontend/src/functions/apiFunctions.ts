import axios from "axios";

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

export function initializeSpecialistsSource(setSpecialists: any) {
  const specialistsSource = new EventSource(
    "http://localhost:8080/specialists"
  );
  specialistsSource.onerror = () => {
    if (specialistsSource.readyState === 2) {
      setTimeout(initializeSpecialistsSource, 300);
    }
  };
  specialistsSource.onmessage = (message) => {
    const data = JSON.parse(message.data);
    setSpecialists(data);
  };
}

export function initializeCustomersSource(setCustomers: any) {
  const customersSource = new EventSource("http://localhost:8080/customers");
  customersSource.onerror = () => {
    if (customersSource.readyState === 2) {
      setTimeout(initializeSpecialistsSource, 300);
    }
  };
  customersSource.onmessage = (message) => {
    const data = JSON.parse(message.data);
    setCustomers(data);
  };
}
