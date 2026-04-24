const BASE_URL = "http://127.0.0.1:8000";

/*
====================================
REQUEST APIs
====================================
*/

export const getRequests = async () => {
  const res = await fetch(`${BASE_URL}/requests/`);

  if (!res.ok) {
    throw new Error("Failed to fetch requests");
  }

  return res.json();
};

export const createRequest = async (data) => {
  const res = await fetch(`${BASE_URL}/requests/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create request");
  }

  return res.json();
};

/*
====================================
VOLUNTEER APIs
====================================
*/

export const getVolunteers = async () => {
  const res = await fetch(`${BASE_URL}/volunteers/`);

  if (!res.ok) {
    throw new Error("Failed to fetch volunteers");
  }

  return res.json();
};

/*
====================================
SMART ALLOCATION API
====================================
*/

export const allocateRequest = async (requestId) => {
  const res = await fetch(
    `${BASE_URL}/allocation/${requestId}`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error("Smart allocation failed");
  }

  return res.json();
};

/*
====================================
ASSIGNMENT API
====================================
*/

export const assignVolunteer = async (
  requestId,
  volunteerId
) => {
  const res = await fetch(
    `${BASE_URL}/assign/${requestId}/${volunteerId}`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error("Volunteer assignment failed");
  }

  return res.json();
};