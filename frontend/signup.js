document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector("form");
  
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault(); 
  
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
  
      if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert("Signup successful! Please log in.");
          window.location.href = "login.html"; 
        } else {
          alert(result.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  });
  