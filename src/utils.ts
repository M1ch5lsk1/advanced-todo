export const fetchWrapper = async (
  url: string,
  options: RequestInit = {},
  handleError: Function = async (response: any) => {
    const errorDetails = await response.text();
    throw new Error(`HTTP Error: ${response.status}. ${errorDetails}`);
  }
) => {
  // Check if the body is FormData
  const isFormData = options.body instanceof FormData;

  // Set default headers if not provided
  // Ensure defaultHeaders is always a valid HeadersInit
  const defaultHeaders: HeadersInit = !isFormData
    ? {
        "Content-Type": "application/json",
        ...options.headers,
      }
    : options.headers ?? {}; // Use an empty object if headers is undefined

  // Create the full options object with default headers
  const fetchOptions: RequestInit = {
    method: "GET", // Default method
    headers: defaultHeaders,
    credentials: "include",
    ...options,
  };

  try {
    const response = await fetch(url, fetchOptions);

    // Check if the response status indicates an error
    if (!response.ok) {
      handleError(response);
    }

    // Parse response as JSON if content-type is application/json
    const contentType = response.headers.get("Content-Type");
    let data: any;
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      // Handle non-JSON responses
      data = await response.text();
    }

    // Example of setting user data to localStorage
    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Re-throw error to be handled by caller
  }
};

export const getUser = () => {
  // Retrieve the string from localStorage
  const userString = localStorage.getItem("user");

  // If no user is found, return undefined
  if (!userString) {
    return undefined;
  }

  // Parse the string into a User object (assuming it's stored as JSON)
  try {
    const user = JSON.parse(userString);
    return user;
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    return undefined;
  }
};

export const backendUrl = "http://localhost:3000"; // Adjust as needed

interface Change {
  id: string;
  indexRange: {
    start: number
    end: number
  };
  oldValue: any;
  newValue: any;
  timestamp: string; // ISO date string
}
export interface ToDoTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  toWhen?: string; // ISO date string, optional
  priority?: "low" | "medium" | "high"; // Optional field for priority
  completedAt?: string; // ISO date string, optional
  sharedWith?: string; // Optional field for sharing
  changes?: Change[]
} 
