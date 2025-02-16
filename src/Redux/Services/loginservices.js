export const loginService = async (credentials) => {
    const response = await fetch("https://67b043e7dffcd88a6788c25c.mockapi.io/empUsers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    
  
    if (!response.ok) {
      throw new Error("Login failed");
    }
  
    return response.json();
  };
  