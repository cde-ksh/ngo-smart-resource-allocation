const BASE_URL = "http://127.0.0.1:8000";

export const getVolunteers = async () => {
  const res = await fetch(`${BASE_URL}/volunteers`);
  return res.json();
};

export const createRequest = async (data) => {
  const res = await fetch(`${BASE_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const allocateRequest = async (requestId) => {
  const res = await fetch(`${BASE_URL}/allocate/${requestId}`, {
    method: "POST",
  });
  return res.json();
};