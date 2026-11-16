const accountForm = document.querySelector("#account-form");
const formMessage = document.querySelector("#form-message");

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "This is a class-project preview. No account was created and no information was saved.";
});
