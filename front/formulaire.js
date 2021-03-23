//----------------------------------PARTIE RECUP FORMULAIRE/ AJOUT AU LOCAL STORAGE-----------------

constplacementformulairehtml = document.querySelector("#formulaire"); //selection de l'endroit ou on veut afficher le formulaire
const affichformulairehtml = `                                  
<div class="containerformulaire">
<h1 class="titreformulaire">Formulaire de commande</h1>
<form>
  <label for="lastName">Nom</label>
  <input type="text" id="lastName" name="lastName" placeholder="Votre nom">

  <label for="firstName">Prénom</label>
  <input type="text" id="firstName" name="firstName" placeholder="Votre prénom">

  <label for="email">Email</label>
  <input id="email" type="email" name="email" placeholder="Email">
  
  <label for="city">Ville</label>
  <input type="text" id="city" name="city"  placeholder="Votre ville" >

  <label for="address">Adresse</label>
  <textarea id="address" name="address" placeholder="Votre address" style="height:50px"></textarea>
 
<input id="envoieformulaire" name="envoieformulaire "type="submit" value="Envoyer">
</form>
</div>
`;
constplacementformulairehtml.innerHTML = affichformulairehtml;
//constplacementformulairehtml.insertAdjacentHTML("beforeend", affichformulairehtml); //insertion du formulaire à l'endroit souhaité direct en html

function checkInputetPost() {
  // création de la fonction me permettant de contrôler le formulaire avant l'envoie au serveur
  //Déclarations des variables pour procécer au controle Regex
  let checkString = /[a-zA-Z]/;
  let checkNumber = /[0-9]/;
  //emailregex.com m'a founris le contenu de ma variable checkMail
  let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
  let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

  //message de vérification vide
  let messageverif = "";

  //Récupération des valeurs inputs
  let Nom = document.querySelector("#lastName").value;
  let Prenom = document.querySelector("#firstName").value;
  let Email = document.querySelector("#email").value;
  let Adresse = document.querySelector("#address").value;
  let Ville = document.querySelector("#city").value;

  //tests des différents input du formulaire
  //Test nom, les chiffres ou les charactères spéciaaux ou le 'vide' ne sont pas acceptés
  if (
    checkNumber.test(Nom) == true ||
    checkSpecialCharacter.test(Nom) == true ||
    Nom == ""
  ) {
    messageverif = "Vérifier/Compléter votre nom";
  } else {
    console.log("Nom ok");
  }
  //Test du prénom, les chiffres ou charactères spéciaux ou le 'vide' ne sont pas acceptés
  if (
    checkNumber.test(Prenom) == true ||
    checkSpecialCharacter.test(Prenom) == true ||
    Prenom == ""
  ) {
    messageverif = messageverif + "\n" + "Vérifier/Compléter votre prénom";
  } else {
    console.log("Prénom ok");
  }
  //Test du mail selon le regex de la source L256
  if (checkMail.test(Email) == false) {
    messageverif = messageverif + "\n" + "Vérifier/Compléter votre email";
  } else {
    console.log("Adresse mail ok");
  }
  //Test de l'adresse, les characteres spéciaux ou le 'vide' ne sont pas acceptés
  if (checkSpecialCharacter.test(Adresse) == true || Adresse == "") {
    messageverif = messageverif + "\n" + "Vérifier/Compléter votre adresse";
  } else {
    console.log("Adresse ok");
  }
  //Test de la ville, les chiffres ou charactères spéciaux ou le 'vide' ne sont pas acceptés
  if (
    checkSpecialCharacter.test(Ville) == true ||
    checkNumber.test(Ville) == true ||
    Ville == ""
  ) {
    messageverif = messageverif + "\n" + "Vérifier/Compléter votre ville";
  } else {
    console.log("Ville ok");
  }
  //Si une des conditions n'est pas ok , un message d'alert s'affiche avec le 'lieu' ou l'erreur est détectée
  if (messageverif != "") {
    alert("Il est nécessaire de :" + "\n" + messageverif); //"\n" permet d'aller à la ligne
  }
  //Si tout est ok on passe à la suite
  else {
    let contact = {
      //création d'une constante qui contient/affichera toutes les valeurs du formulaires ensenmble
      lastName: document.querySelector("#lastName").value,
      firstName: document.querySelector("#firstName").value,
      email: document.querySelector("#email").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
    };

    localStorage.setItem("contact", JSON.stringify(contact)); //création d'une clé au format json dans le local storage qui contient les info du formulaire

    //création de la variable product qui sera un tableau contenant les id présent dans le local storage
    let products = [];

    for (let z = 0; z < produitdanslocalstorage.length; z++) {
      /*boucle qui me permet de rechercher les id du localstorage*/
      let iddulocalstorage = produitdanslocalstorage[z].idprodselectionne; // variable qui contient les id du local storage

      products.push(iddulocalstorage); //insertion des id dans le tableau products
    }
    localStorage.removeItem("teddy"); //permet de supprimer les articles du panier (clé teddy) a l'envoie du formulaire, cependant les informations restent dans la clé teddy 2
    //window.location.href = "panier.html"; //recharge l'url à l'envoie du formulaire
    //alert("Commande Envoyé");
    console.log(contact);
    console.log(products);

    fetch("http://localhost:3000/api/teddies/order", {
      //requête fetch POST
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact, products }),
    }).then(async (response) => {
      // le 1er then attend la fin de la requête et affichage la response
      console.log(response); //vérif contenu réponse
      const retourserveurstorage = []; // création d'un tableau qui contiendra le retour du serveur
      let retourserveur = await response.json(); //si la response est ok on la transforme en format json dans une variable
      try {
        console.log(retourserveur);
        retourserveurstorage.push(retourserveur); //envoie de la reponse du serveur dans le tableau qui ira dans le local storage
        localStorage.setItem(
          "retourserveurstorage",
          JSON.stringify(retourserveurstorage)
        ); //envoie le tableau avec la reponse serveur au format json ds le local storage
        console.log(retourserveurstorage);
        window.location.href = "confirm.html"; //charge l'url à l'envoie du formulaire
        alert("Commande Envoyé =D");
      } catch (e) {
        console.log(e);
      }
    });
  }
}

const btnenvoieformulaire = document.querySelector("#envoieformulaire"); //selection du bouton envoie formulaire
btnenvoieformulaire.addEventListener("click", function (e) {
  //création de ce qui est effectué au click
  e.preventDefault(); //empeche le recharge de la console au clic
  checkInputetPost(); //appel la fonction au click sur le bouton envoyer du formulaire
});
