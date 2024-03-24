//Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");

inputNom.addEventListener("keyup", validateForm);
inputPreNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);

//Function permettant de valider tout le formulaire
function validateForm() {
  validateRequired(inputNom);
  validateRequired(inputPreNom);
  validateMail(inputMail);
}
//Function permettant de valider le champ Nom et Prenom formulaire
function validateRequired(input) {
  if (input.value != '') {
    //c'est ok
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  }
  else {
    //c'est pas ok
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}
//Function permettant de valider le champ email du formulaire
function validateMail(input) {
  //Définir mon regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailUser = input.value;
  if (mailUser.match(emailRegex)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  }
  else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
}