const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput")
const btnSingin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

btnSingin.addEventListener("click", checkCredentials);

function checkCredentials() {
  //Ici, il faudra appeler l'API pour vérifier les credentials en BDD
    let dataForm = new FormData(signinForm);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": dataForm.get("email"),
        "password": dataForm.get("mdp")
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // fetch("http://127.0.0.1:8000/api/login", requestOptions)
    fetch(apiUrl+"login", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
          mailInput.classList.add("is-invalid");
          passwordInput.classList.add("is-invalid");
        }
    })
    .then(result => {
      //Recuperation de l'apiToken
      const token = result.apiToken;
      setToken(token);

      //placer ce token en cookie
      setCookie(RoleCookieName, result.roles[0], 7);
      window.location.replace("/");
    })
    .catch(error => console.log('error', error));

/*
  // if (mailInput.value == "test@mail.com" && passwordInput.value == "123") {
  //   //Il faudra récupérer le vrai token
  //   const token = "lkjsdngfljsqdnglkjsdbglkjqskjgkfjgbqslkfdgbskldfgdfgsdgf";
  //   setToken(token);

  //   //placer ce token en cookie
  //   // setCookie(RoleCookieName, "admin", 7);
  //   // window.location.replace("/");

  //   setCookie(RoleCookieName, "client", 7);
  //   window.location.replace("/");

  //   //   setCookie(RoleCookieName, "visiteur", 7);
  //   //   window.location.replace("/");
  // }
  // else {
  //   mailInput.classList.add("is-invalid");
  //   passwordInput.classList.add("is-invalid");
  // }
*/
}