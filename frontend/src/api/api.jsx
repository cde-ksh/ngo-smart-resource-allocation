const BASE_URL = "http://127.0.0.1:8000";

export const getRequests = async () => {
  const res = await fetch(`${BASE_URL}/requests`);
  if (!res.ok) throw new Error("Failed to fetch requests");
  return res.json();
};

export const createRequest = async (data) => {
  const res = await fetch(`${BASE_URL}/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create request");
  return res.json();
};

export const getVolunteers = async () => {
  const res = await fetch("http://127.0.0.1:8000/volunteers");
  if (!res.ok) throw new Error("Failed to fetch volunteers");
  return res.json();
};

export const allocateRequest = async (id) => {
  const res = await fetch(`http://127.0.0.1:8000/allocate/${id}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Allocation failed");
  return res.json();
};