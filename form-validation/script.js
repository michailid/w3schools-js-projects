const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const result = document.getElementById("result");

function showError(element, message) {
  element.innerHTML = message;
}

function clearError(element) {
  element.innerHTML = "";
}

function validateName() {
  let value = nameInput.value.trim();
  if (value.length < 2) {
    showError(nameError, "Name must be at least 2 characters.");
    return false;
  }
  clearError(nameError);
  return true;
}

function validateEmail() {
  let value = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError(emailError, "Enter a valid email address.");
    return false;
  }
  clearError(emailError);
  return true;
}

function validatePassword() {
  let password = passwordInput.value;
  if (password.length < 8) {
    showError(passwordError, "Password must be at least 8 characters.");
    return false;
  }
  if (!/\d/.test(password)) {
    showError(passwordError, "Password must contain at least 1 number.");
    return false;
  }
  clearError(passwordError);
  return true;
}

function validateConfirmPassword() {
  let confirmPassword = confirmPasswordInput.value;
  let password = passwordInput.value;
  if (confirmPassword == "") {
    showError(confirmPasswordError, "Please confirm your password.");
    return false;
  }
  if (confirmPassword !== password) {
    showError(
      confirmPasswordError,
      "Password and confirm password should match.",
    );
    return false;
  }
  clearError(confirmPasswordError);
  return true;
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);

form.setAttribute("novalidate", true);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // clear result
  result.innerHTML = "";

  let isValid =
    validateName() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword();

  if (isValid) {
    result.innerHTML = "Form is valid.";
    result.className = "ok";
  } else {
    result.innerHTML = "Please fix the errors.";
    result.className = "error";
  }
});
