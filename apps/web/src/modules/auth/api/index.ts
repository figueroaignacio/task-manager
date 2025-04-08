import { API_URL } from "@/lib/constants";

type RegisterResponse = {
  message: string;
  user: {
    id: string;
    email: string;
  };
};

export async function registerUser(data: {
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el registro");
  }

  return response.json();
}
