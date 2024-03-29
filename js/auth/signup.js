//Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputMail = document.getElementById("EmailInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnValidation = document.getElementById("btn-validation-inscription");
const formInscription = document.getElementById("formulaireInscription");

inputNom.addEventListener("keyup", validateForm);
inputPreNom.addEventListener("keyup", validateForm);
inputMail.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);
btnValidation.disabled = true;

btnValidation.addEventListener("click", InscrireUtilisateur);

//Function permettant de valider tout le formulaire
function validateForm() {
  const nomOk = validateRequired(inputNom);
  const prenomOk = validateRequired(inputPreNom);
  const mailOk = validateMail(inputMail);
  const passwordOk = validatePassword(inputPassword);
  const passwordConfirmOk = validateConfirmationPassword(inputPassword, inputValidationPassword);

  if (nomOk && prenomOk && mailOk && passwordOk && passwordConfirmOk) {
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
//Function permettant de valider le champ mot de passe du formulaire
function validatePassword(input) {
  //Définir mon regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
  const passwordUser = input.value;
  if (passwordUser.match(passwordRegex)) {
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
//Function permettant de verifier le champ confirmez votre mot de passe du formulaire
function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
  if (inputPwd.value == inputConfirmPwd.value) {
    inputConfirmPwd.classList.add("is-valid");
    inputConfirmPwd.classList.remove("is-invalid");
    return true;
  }
  else {
    inputConfirmPwd.classList.add("is-invalid");
    inputConfirmPwd.classList.remove("is-valid");
    return false;
  }
}
//Function permettant d'inscrire un utilisateur en appuyant sur le boutton inscription
function InscrireUtilisateur() {
  // Crée un nouvel objet FormData à partir du formulaire contenu dans la variable "formInscription"
let dataForm = new FormData(formInscription);
// Crée un nouvel objet Headers pour définir les en-têtes de la requête HTTP
let myHeaders = new Headers();
// Ajoute l'en-tête "Content-Type" avec la valeur "application/json"
myHeaders.append("Content-Type", "application/json");
// Convertit les données du formulaire en une chaîne JSON
let raw = JSON.stringify({
    "firstName": dataForm.get("nom"),
    "lastName": dataForm.get("prenom"),
    "email": dataForm.get("email"),
    "password": dataForm.get("mdp")
});
// Configure les options de la requête HTTP
let requestOptions = {
    // Méthode de la requête : "POST" pour envoyer des données au serveur
    method: 'POST',
    // Définit les en-têtes de la requête en utilisant l'objet Headers créé précédemment
    headers: myHeaders,
    // Corps de la requête : les données JSON converties en chaîne
    body: raw,
    // Redirection à suivre en cas de besoin ("follow" suit automatiquement les redirections)
    redirect: 'follow'
};

//   const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   "firstName": "Test fetch",
//   "lastName": "test fetch",
//   "email": "testDepuisJsQuaiAntique@email.com",
//   "password": "Azerty11"
// });

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

fetch("http://127.0.0.1:8000/api/registration", requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
}
