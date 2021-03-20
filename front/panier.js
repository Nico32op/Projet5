//---------------------------------Récup Panier du local storage à afficher-----------
let produitdanslocalstorage = JSON.parse(localStorage.getItem("teddy")); //récup du local storage dans la page panier avec la clé teddy
console.log(produitdanslocalstorage);

const cardlistpanier = document.querySelector("#cardlistpanier"); //insértion partie html

if (produitdanslocalstorage === null || produitdanslocalstorage == 0) {
  //cette instruction permet d'afficher si il y a du contenu dans le local storage
  console.log("panier vide"); //création d'une div panier vide a afficheur dans le html
  //panier vide s'affiche si le local storage est vide ou = à zéro
  const paniervide = ` 
    <div class="paniervide">
    <div>Panier vide</div> 
    <img class="card-img-top" src="images/calimero.jpg" alt="snif"/>
    </div> 
    `;
  cardlistpanier.innerHTML = paniervide; //insertion de la div panier vide dans le html
} else {
  //si le panier n'est pas vide afficher les éléments du local storage
  //console.log("panier remplie")
  let panierplein = []; //déclaration d'un tableau si le panier est plein
  for (i = 0; i < produitdanslocalstorage.length; i++) {
    //la boucle permettra d'ajouter les élements du local storage dans le tableau
    //instertion du tableau avec le contenu html dans la page html
    panierplein =
      panierplein +
      ` 
<article class="prodselectionner"> 
  <div class="card-body">
  <img class="card-img-top" src="${produitdanslocalstorage[i].phototed}" alt="teddy"/>
    <h5 class="card-title"><button type="button" id="plus${produitdanslocalstorage[i].idprodselectionne}">+</button>Quantité : <span id="afficheQuantite${produitdanslocalstorage[i].idprodselectionne}"></span><button type="button" id="moin${produitdanslocalstorage[i].idprodselectionne}">-</button <br><br>Nom : ${produitdanslocalstorage[i].nomproduit}</h5>
    <h5 class="card-title">Prix à l'unité : ${produitdanslocalstorage[i].prix}</h5>
    <h5 class="card-prix">Prix Total : <span id="price${produitdanslocalstorage[i].idprodselectionne}">${produitdanslocalstorage[i].prix}</span>euros<p><a id="btn_supp" href="#" role="button">Supprimer</a></p></h5> 
  </div>
</article>
       `;

  cardlistpanier.innerHTML = panierplein;
  }
}

//boucle et fonction me permettant de modifier la quantité des produits (en de cours)

for (let q = 0; q < produitdanslocalstorage.length; q++) { //je vais cherche le contenu de mon local storage
  let infolocalstorage = produitdanslocalstorage[q]; //je sauvegarde mon local storage dans un tableau
  console.log(infolocalstorage)                                   

  const plusplus = document.querySelector("#plus" + infolocalstorage.idprodselectionne); //je cible mon bouton plus
  const moin = document.querySelector("#moin" + infolocalstorage.idprodselectionne);
  const quantity = document.querySelector("#afficheQuantite" + infolocalstorage.idprodselectionne); //je cible l'endroit ou sera affiché la quantité
  const affichprix = document.querySelector("#price" + infolocalstorage.idprodselectionne);
  
  function affichquantiteetprixtot(){ //fonction qui affiche en html la quantité et la modification du prix total
  quantity.innerHTML = infolocalstorage.quantite;
  affichprix.innerHTML = infolocalstorage.quantite * infolocalstorage.prix;
  }

  affichquantiteetprixtot(); //appel de la fonction qui affiche la quantité et le prix total
  
  plusplus.addEventListener("click", (ee) => {
    infolocalstorage.quantite++; //la quantité de mon local storage augmente au click 
    localStorage.setItem("teddy", JSON.stringify(produitdanslocalstorage)); //je renvoie les modif dans mon local storage 
    affichquantiteetprixtot(); //appel de la fonction qui affiche la quantité et le prix total
    document.location.reload();
  });

  moin.addEventListener("click", (ee) => {
    if (infolocalstorage.quantite == 1) {//si il ne reste plus que 1 produit dans le panier
      
      if (window.confirm("Voulez vous vraiment supprimer cet article du panier?")) {
        //une fenetre s'ouvre pour être certain que le client souhaite effacer le produit du panier
        produitdanslocalstorage.splice([q], 1); //splice supprimera l'article entier si il reste moins de 1 article
        localStorage.setItem("teddy", JSON.stringify(produitdanslocalstorage)); //je renvoie les modif dans mon localStorage
        document.location.reload(); //recharge la page pour mettre à jour la page avec les produits restants (si il y en a)
      } 
    } else {
    infolocalstorage.quantite--; //la quantité de mon local storage diminue au click temps qu'il reste plus que 1 article 
    localStorage.setItem("teddy", JSON.stringify(produitdanslocalstorage)); //je renvoie les modif dans mon local storage 
    affichquantiteetprixtot(); //appel de la fonction qui affiche la quantité et le prix total
    document.location.reload();
  } 
  });
}
    
 //-------------------Paritie suppression panier-------------------------

let btn_supp = document.querySelectorAll("#btn_supp"); //selection de tous les btn supprimer

//séléectionné de l'id à supprimer

for (let j = 0; j < btn_supp.length; j++) {
  //la boucle permettra de séléctionné n'importe quel bouton supp
  btn_supp[j].addEventListener("click", function (evenement) {
    evenement.preventDefault(); // empêche le rechargement de la page

    //selectionné l'id à supprimer
    let idasupp = produitdanslocalstorage[j].idprodselectionne; //selection l'id dans le local storage

    //la méthode filter permet de garder dans un tableau des objets avec les instructions données (ex: des mots d'une longueur de 6 lettres (en dessous du 6 lettres les mots sont sup))
    produitdanslocalstorage = produitdanslocalstorage.filter(
      (element) => element.idprodselectionne !== idasupp
    );
    console.log(produitdanslocalstorage); //le point "!" permet de faire l'inverse de la méthode filter, cad supprimer et non gardé tous les éléments qui contiennent la variable idasupp
    //retir de la console les produit sélétionnés avec le bouton supp

    //on envoie au format json dans le local storage les modifs effectés
    localStorage.setItem("teddy", JSON.stringify(produitdanslocalstorage)); //supp dans le local storage des prod selectionnées

    window.location.href = "panier.html"; //recharge l'url à la suppression d'un produit sinon il faut actualisé la page manuellement pour supprimé le produit
    alert("Produit Supprimé =(");
  });
}

//----------------------------Calcul montant total panier

let paniermontantotal = []; //on déclare un tableau qui contiendra chaque montant du panier

for (let k = 0; k < produitdanslocalstorage.length; k++) {
  let prixproddanspanier = produitdanslocalstorage[k].prix*produitdanslocalstorage[k].quantite;
  console.log(prixproddanspanier); //affiche le prix des produits dans le local storage/panier

  paniermontantotal.push(prixproddanspanier); //on ajoute dans le tableau les montants des produis présents dans le panier
  console.log(paniermontantotal); //affiche le tableau avec le prix présent dans la panier
}

//calcul des valeurs présant dans paniermontantotal grace à la méhode reduc qui permet d'accumuler les valeurs d'une liste (un tableau)
const reducer = (accumulator, currentValue) => accumulator + currentValue; //méthode vu sur MDN
const prixtotal = paniermontantotal.reduce(reducer, 0); //on insère dans une constante l'accumulation (l'addition) des prix du tableau présent dans paniermontantotal
console.log(prixtotal); //affiche l'addition des prix présent dans la panier  //,0 permet d'éviter une erreur dans la console quand le panier est vide

//création de la div pour afficher le prix dans la partie html
const affichageprixtothtml = ` 
<div class = "affichage-prix"> Montant total du panier : ${prixtotal} euros </div>
`;
localStorage.setItem("montanttotal", JSON.stringify(prixtotal));//affiche le montant total dans le local storage
cardlistpanier.insertAdjacentHTML("beforeend", affichageprixtothtml); //affichge la div en dessous des div déjà existantes dans la partie html

//----------------------------------PARTIE RECUP FORMULAIRE LOCAL STORAGE-----------------
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

function checkInput() {
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
    
    }).then((response) => {// le 1er then attend la fin de la requête et affichage la response
      console.log(response);//vérif contenu réponse
      const retourserveurstorage = []; // création d'un tableau qui contiendra le retour du serveur
      response.json().then((retourserveur)=>{ //le 2ème then traduit la reponse au formas json dans une fonction (promesse)
      console.log(retourserveur)
      retourserveurstorage.push(retourserveur); //envoie de la reponse du serveur dans le tableau qui ira dans le local storage
      localStorage.setItem("retourserveurstorage", JSON.stringify(retourserveurstorage)); //envoie le tableau avec la reponse serveur au format json ds le local storage
      console.log(retourserveurstorage)
      window.location.href = "confirm.html"; //charge l'url à l'envoie du formulaire
      alert("Commande Envoyé =D");
      
      });
    });
  }
}

const btnenvoieformulaire = document.querySelector("#envoieformulaire"); //selection du bouton envoie formulaire
btnenvoieformulaire.addEventListener("click", function (e) {
  //création de ce qui est effectué au click
  e.preventDefault(); //empeche le recharge de la console au clic
  checkInput(); //appel la fonction au click sur le bouton envoyer du formulaire
});



