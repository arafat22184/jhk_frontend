const signinBtn = document.getElementById("signinBtn");

signinBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const emailValue = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!emailValue || !password) {
    alert("please provide email and password");
  } else if (emailValue === "admin@gmail.com" && password === "admin123") {
    alert("Login successful");
  } else {
    alert("Invalid email or password");
  }
});
