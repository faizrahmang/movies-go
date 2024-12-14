async function loginHandler() {
  const id = document.getElementById("UserId").value.trim();
  const pass = document.getElementById("password").value;
  const messageElement = document.getElementById("emailp");

  const updateMessage = (msg, isError = true) => {
    messageElement.innerText = msg;
    messageElement.style.color = isError ? "red" : "green";
  };

  if (!id || !/\S+@\S+\.\S+/.test(id)) {
    updateMessage("Please enter a valid email address.");
    return;
  }

  if (pass.length < 8) {
    updateMessage("Password should contain at least 8 characters.");
    return;
  }

  const loginButton = document.getElementById("finalLogin");
  loginButton.disabled = true;
  updateMessage("Logging in...", false);

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: id,
        password: pass,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      updateMessage("Login successful!", false);
      console.log("Token received.");
      const redirectUrl = "http://localhost:5000/main.html";
      if (redirectUrl && redirectUrl.startsWith("http")) {
        window.location.href = redirectUrl;
      } else {
        updateMessage("Invalid redirect URL.", true);
      }
    } else {
      updateMessage(result.message || "Login failed.");
    }
  } catch (error) {
    updateMessage("An error occurred. Please try again.");
    console.error("Error:", error);
  } finally {
    loginButton.disabled = false;
  }
}
