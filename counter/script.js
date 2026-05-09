const counterLabel = document.getElementById("counter-label");
const increaseBtn = document.getElementById("increase-btn");
const decreaseBtn = document.getElementById("decrease-btn");
const resetBtn = document.getElementById("reset-btn");
const saveBtn = document.getElementById("save-btn");
const loadBtn = document.getElementById("load-btn");

increaseBtn.addEventListener("click", () => {
  counterLabel.innerHTML = Number(counterLabel.innerText) + 1;
});

decreaseBtn.addEventListener("click", () => {
  counterLabel.innerHTML = Number(counterLabel.innerText) - 1;
});

resetBtn.addEventListener("click", () => {
  counterLabel.innerHTML = 0;
});

saveBtn.addEventListener("click", () => {
  localStorage.setItem("counter-number", counterLabel.innerText);
});

loadBtn.addEventListener("click", () => {
  counterLabel.innerHTML = localStorage.getItem("counter-number") || 0;
});
