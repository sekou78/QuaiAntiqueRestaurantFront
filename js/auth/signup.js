//Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");

inputNom.addEventListener("keyup", validateForm);
inputPreNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);
btnValidation.disabled = true;

//Function permettant de valider tout le formulaire
function validateForm() {
  const nomOk = validateRequired(inputNom);
  const prenomOk = validateRequired(inputPreNom);
  const mailOk = validateMail(inputMail);

  if (nomOk && prenomOk && mailOk) {
    btnValidation.disabled = false;
  } else {
    btnValidation.disabled = true;
  }
}
//Function permettant de valider le champ Nom et Prenom formulaire
function validateRequired(input) {
  if (input.value != '') {
    //c'est ok
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  }
  else {
    //c'est pas ok
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
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