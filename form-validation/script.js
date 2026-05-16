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
const submitBtn = document.getElementById("submit-btn");
const passwordStrengthIndicator = document.getElementById(
  "password-strength-indicator",
);
const passwordVisibilityBtn = document.querySelector(
  "#password + .password-visibility-btn",
);
const confirmPasswordVisibilityBtn = document.querySelector(
  "#confirm-password + .password-visibility-btn",
);

function showError(element, message) {
  element.innerHTML = message;
}

function clearError(element) {
  element.innerHTML = "";
}

/**
 * A password is weak if it has only lowercase
 * letters and only one number.
 *
 * @param {*} password
 * @returns
 */
function isWeak(password) {
  return /^(?=.*[a-z])([a-z]*\d[a-z]*)$/.test(password);
}

/**
 * A password is medium if it is neither weak nor strong.
 *
 * @param {*} password
 * @returns
 */
function isMedium(password) {
  return !isWeak(password) && !isStrong(password);
}

/**
 * A password is strong if it has at least one lowercase letter,
 * at least one uppercase letter, at least one number and at
 * least one symbol.
 *
 * @param {*} password
 * @returns
 */
function isStrong(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/.test(password);
}

function validateName() {
  let value = nameInput.value.trim();
  const validAnnotation = nameInput.nextElementSibling;
  if (value.length < 2) {
    validAnnotation.classList.add("hidden");
    showError(nameError, "Name must be at least 2 characters.");
    return false;
  }
  clearError(nameError);
  validAnnotation.classList.remove("hidden");
  return true;
}

function validateEmail() {
  let value = emailInput.value.trim();
  const validAnnotation = emailInput.nextElementSibling;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    validAnnotation.classList.add("hidden");
    showError(emailError, "Enter a valid email address.");
    return false;
  }
  clearError(emailError);
  validAnnotation.classList.remove("hidden");
  return true;
}

function validatePassword() {
  let password = passwordInput.value;
  const validAnnotation = passwordInput.nextElementSibling.nextElementSibling;
  if (password.length < 8) {
    passwordStrengthIndicator.className = "hidden";
    validAnnotation.classList.add("hidden");
    showError(passwordError, "Password must be at least 8 characters.");
    return false;
  }
  if (!/\d/.test(password)) {
    passwordStrengthIndicator.className = "hidden";
    showError(passwordError, "Password must contain at least 1 number.");
    return false;
  }

  clearError(passwordError);

  // check password strength
  if (isWeak(password)) {
    passwordStrengthIndicator.className = "weak";
    passwordStrengthIndicator.innerText = "Weak";
  } else if (isMedium(password)) {
    passwordStrengthIndicator.className = "medium";
    passwordStrengthIndicator.innerText = "Medium";
  } else if (isStrong(password)) {
    passwordStrengthIndicator.className = "strong";
    passwordStrengthIndicator.innerText = "Strong";
  }

  validAnnotation.classList.remove("hidden");

  return true;
}

function validateConfirmPassword() {
  let confirmPassword = confirmPasswordInput.value;
  let password = passwordInput.value;
  const validAnnotation = confirmPasswordInput.nextElementSibling.nextElementSibling;
  if (confirmPassword == "") {
    validAnnotation.classList.add("hidden");
    showError(confirmPasswordError, "Please confirm your password.");
    return false;
  }
  if (confirmPassword !== password) {
    validAnnotation.classList.add("hidden");
    showError(
      confirmPasswordError,
      "Password and confirm password should match.",
    );
    return false;
  }
  clearError(confirmPasswordError);
  validAnnotation.classList.remove("hidden");
  return true;
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);

form.setAttribute("novalidate", true);
submitBtn.setAttribute("disabled", "");
form.addEventListener("input", () => {
  result.innerHTML = "";

  let isValid =
    validateName() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword();
  if (isValid) {
    submitBtn.removeAttribute("disabled");
  } else {
    result.innerText = "Please fix the errors.";
    result.className = "error";
    submitBtn.disabled = true;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  result.innerText = "Form is valid.";
  result.className = "ok";
});

passwordVisibilityBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordVisibilityBtn.innerHTML = '<i class="fa fa-eye"></i>';
  } else {
    passwordInput.type = 'password';
    passwordVisibilityBtn.innerHTML = '<i class="fa fa-eye-slash"></i>';
  }
});

confirmPasswordVisibilityBtn.addEventListener('click', () => {
  if (confirmPasswordInput.type === 'password') {
    confirmPasswordInput.type = 'text';
    confirmPasswordVisibilityBtn.innerHTML = '<i class="fa fa-eye"></i>';
  } else {
    confirmPasswordInput.type = 'password';
    confirmPasswordVisibilityBtn.innerHTML = '<i class="fa fa-eye-slash"></i>';
  }
});