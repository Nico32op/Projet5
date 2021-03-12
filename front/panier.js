//---------------------------------Récup Panier du local storage à afficher-----------
let produitdanslocalstorage = JSON.parse(localStorage.getItem("teddy")); //récup du local storage dans la page panier avec la clé teddy
console.log(produitdanslocalstorage);

const cardlistpanier = document.querySelector("#cardlistpanier"); //insértion partie html 

if(produitdanslocalstorage === null || produitdanslocalstorage == 0){ //cette instruction permet d'afficher si il y a du contenu dans le local storage 
    console.log("panier vide")//création d'une div panier vide a afficheur dans le html
     //panier vide s'affiche si le local storage est vide ou = à zéro 
    const paniervide = ` 
    <div class="paniervide">
    <div>Panier vide</div> 
    <img class="card-img-top" src="images/calimero.jpg" alt="snif"/>
    </div> 
    `
    ;
cardlistpanier.innerHTML = paniervide; //insertion de la div panier vide dans le html 
}else{ //si le panier n'est pas vide afficher les éléments du local storage 
    //console.log("panier remplie")
    let panierplein = []; //déclaration d'un tableau si le panier est plein
   for(i=0 ; i< produitdanslocalstorage.length ; i++){ //la boucle permettra d'ajouter les élements du local storage dans le tableau
   //instertion du tableau avec le contenu html dans la page html    
   panierplein = panierplein + ` 
<article class="prodselectionner"> 
  <div class="card-body">
  <img class="card-img-top" src="${produitdanslocalstorage[i].phototed}" alt="teddy"/>
    <h5 class="card-title">Quantité 1 : Nom ${produitdanslocalstorage[i].nomproduit}</h5> 
    <h5 class="card-prix">Prix : ${produitdanslocalstorage[i].prix}euros<p><a id="btn_supp" href="#" role="button">Supprimer</a></p></h5> 
    
    </div>
</article>
       `
       ;
 cardlistpanier.innerHTML = panierplein;  
    }   
}

//-------------------Paritie suppression panier-------------------------

let btn_supp = document.querySelectorAll("#btn_supp"); //selection de tous les btn supprimer

//séléectionné de l'id à supprimer

for (let j = 0; j < btn_supp.length; j++){  //la boucle permettra de séléctionné n'importe quel bouton supp
btn_supp[j].addEventListener("click", function(evenement) {
evenement.preventDefault(); // empêche le rechargement de la page 
 
//selectionné l'id à supprimer 
let idasupp = produitdanslocalstorage[j].idprodselectionne;    //selection l'id dans le local storage

//la méthode filter permet de garder dans un tableau des objets avec les instructions données (ex: des mots d'une longueur de 6 lettres (en dessous du 6 lettres les mots sont sup))
produitdanslocalstorage = produitdanslocalstorage.filter(element => element.idprodselectionne !== idasupp); 
console.log(produitdanslocalstorage)                                              //le point "!" permet de faire l'inverse de la méthode filter, cad supprimer et non gardé tous les éléments qui contiennent la variable idasupp 
//retir de la console les produit sélétionnés avec le bouton supp

//on envoie au format json dans le local storage les modifs effectés
localStorage.setItem("teddy" ,JSON.stringify(produitdanslocalstorage));//supp dans le local storage des prod selectionnées    

window.location.href = "panier.html"; //recharge l'url à la suppression d'un produit sinon il faut actualisé la page manuellement pour supprimé le produit
alert("Produit Supprimé =(");
})
}

//----------------------------Calcul montant total panier

let paniermontantotal = [] ; //on déclare un tableau qui contiendra chaque montant du panier

for(let k = 0 ; k < produitdanslocalstorage.length; k++){
let prixproddanspanier = produitdanslocalstorage[k].prix;
console.log  (prixproddanspanier) //affiche le prix des produits dans le local storage/panier    

paniermontantotal.push(prixproddanspanier) //on ajoute dans le tableau les montants des produis présents dans le panier 
console.log(paniermontantotal) //affiche le tableau avec le prix présent dans la panier
}
 
//calcul des valeurs présant dans paniermontantotal grace à la méhode reduc qui permet d'accumuler les valeurs d'une liste (un tableau)
const reducer = (accumulator, currentValue) => accumulator + currentValue; //méthode vu sur MDN
const prixtotal = paniermontantotal.reduce(reducer,0); //on insère dans une constante l'accumulation (l'addition) des prix du tableau présent dans paniermontantotal
console.log(prixtotal) //affiche l'addition des prix présent dans la panier  //,0 permet d'éviter une erreur dans la console quand le panier est vide

//création de la div pour afficher le prix dans la partie html 
const affichageprixtothtml = ` 
<div class = "affichage-prix"> Montant total du panier : ${prixtotal} euros </div>
`;
cardlistpanier.insertAdjacentHTML("beforeend", affichageprixtothtml) //affichge la div en dessous des div déjà existantes dans la partie html 

//----------------------------------PARTIE RECUP FORMULAIRE LOCAL STORAGE-----------------
constplacementformulairehtml = document.querySelector("#formulaire"); //selection de l'endroit ou on veut afficher le formulaire
const affichformulairehtml = `                                  
<div class="containerformulaire">
<h1 class="titreformulaire">Formulaire de commande</h1>
<form>
  <label for="nom">Nom</label>
  <input type="text" id="nom" name="nom" placeholder="Votre nom">

  <label for="prenom">Prénom</label>
  <input type="text" id="prenom" name="prenom" placeholder="Votre prénom">

  <label for="email">Email</label>
  <input id="email" type="email" name="email" placeholder="Email">
  
  <label for="ville">Ville</label>
  <input type="text" id="ville" name="ville"  placeholder="Votre ville" >

  <label for="cp">Code Postal</label>
  <input type="text"  id="cp" name="cp" placeholder="Votre code Postal">
   
  <label for="adresse">Adresse</label>
  <textarea id="adresse" name="adresse" placeholder="Votre adresse" style="height:50px"></textarea>
 
<input id="envoieformulaire" name="envoieformulaire "type="submit" value="Envoyer">
</form>
</div>
`
;
constplacementformulairehtml.innerHTML =affichformulairehtml ;
//constplacementformulairehtml.insertAdjacentHTML("beforeend", affichformulairehtml); //insertion du formulaire à l'endroit souhaité direct en html

checkInput = () =>{ // création de la fonction me permettant de contrôler le formulaire avant l'envoie au serveur 
    //Déclarations des variables pour procécer au controle Regex
    let checkString = /[a-zA-Z]/;
    let checkNumber = /[0-9]/;
    //emailregex.com m'a founris le contenu de ma variable checkMail
    let checkMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/y;
    let checkSpecialCharacter = /[§!@#$%^&*(),.?":{}|<>]/;

    //message de vérification vide
    let messageverif = "";

    //Récupération des valeurs inputs
    let Nom = document.querySelector("#nom").value;
    let Prenom = document.querySelector("#prenom").value;
    let Email = document.querySelector("#email").value;
    let Adresse = document.querySelector("#adresse").value;
    let Ville = document.querySelector("#ville").value;
    let CodePostal = document.querySelector("#cp").value; 


      //tests des différents input du formulaire
        //Test nom, les chiffres ou les charactères spéciaaux ou le 'vide' ne sont pas acceptés
        if(checkNumber.test(Nom) == true || checkSpecialCharacter.test(Nom) == true || Nom == ""){
        	messageverif = "Vérifier/Compléter votre nom";
        }else{
        	console.log("Nom ok");
        };
        //Test du prénom, les chiffres ou charactères spéciaux ou le 'vide' ne sont pas acceptés 
        if(checkNumber.test(Prenom) == true || checkSpecialCharacter.test(Prenom) == true || Prenom == ""){
        	messageverif = messageverif + "\n"+"Vérifier/Compléter votre prénom";
        }else{
        	console.log("Prénom ok");
        };
        //Test du mail selon le regex de la source L256
        if(checkMail.test(Email) == false){
        	messageverif = messageverif + "\n" + "Vérifier/Compléter votre email";
        }else{
        	console.log("Adresse mail ok");
        };
        //Test de l'adresse, les characteres spéciaux ou le 'vide' ne sont pas acceptés
        if(checkSpecialCharacter.test(Adresse) == true || Adresse == ""){
        	messageverif = messageverif +"\n"+ "Vérifier/Compléter votre adresse";
        }else{
        	console.log("Adresse ok");
        };
        //Test de la ville, les chiffres ou charactères spéciaux ou le 'vide' ne sont pas acceptés
        if(checkSpecialCharacter.test(Ville) == true || checkNumber.test(Ville) == true || Ville == ""){
        	messageverif = messageverif + "\n"+ "Vérifier/Compléter votre ville"
        }else{
        	console.log("Ville ok")
        };
        //Test du code postale, les lettres ou charactères spéciaux ou le 'vide' ne sont pas acceptés
        if(checkSpecialCharacter.test(CodePostal) == true || checkString.test(CodePostal) == true || CodePostal == ""){
        	messageverif = messageverif +"\n"+ "Vérifier/Compléter votre CP";
        }else{
        	console.log("CP ok");
        };
        //Si une des conditions n'est pas ok , un message d'alert s'affiche avec le 'lieu' ou l'erreur est détectée
        if(messageverif != ""){
        	alert("Il est nécessaire de :" + "\n" + messageverif); //"\n" permet d'aller à la ligne
        }
        //Si tout est ok on passe à la suite
        else{const formulaireok = {//création d'une constante qui contient/affichera toutes les valeurs du formulaires ensenmble 
        nom : document.querySelector("#nom").value, 
        prenom : document.querySelector("#prenom").value, 
        email : document.querySelector("#email").value, 
        ville : document.querySelector("#ville").value, 
        cp : document.querySelector("#cp").value, 
        adresse : document.querySelector("#adresse").value
        };
        console.log(formulaireok);
        
        localStorage.setItem("formulaireok", JSON.stringify(formulaireok)); //création d'une clé au format json dans le local storage qui contient les info du formulaire
        
        //donné a envoyer serveur, formulaire + produit enregistré dans le panier(local storage)
        const Envoieserveur = { 
            produitdanslocalstorage, 
            formulaireok
            
        };
        console.log(Envoieserveur)
        
        localStorage.removeItem("teddy"); //permet de supprimer les articles du panier (clé teddy) a l'envoie du formulaire, cependant les informations restent dans la clé teddy 2
        //window.location.href = "panier.html"; //recharge l'url à l'envoie du formulaire 
        //alert("Commande Envoyé");
        };
    }; 

 
    async function postForm(Envoieserveur) {
        try 
        {
            let response = await fetch("http://localhost:3000/api/teddies/order", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: Envoieserveur,
            });
            if (response) {
                let responseId = await response.json();
                //getOrderConfirmationId(responseId);
                //
                window.location.href = "confirm.html";
            } else {
                console.error('Retour du serveur : ', response.status);
            }
        } catch (e) {
            console.log(e);
        }
    }   

const btnenvoieformulaire = document.querySelector("#envoieformulaire"); //selection du bouton envoie formulaire
btnenvoieformulaire.addEventListener("click", function(e){ //création de ce qui est effectué au click
e.preventDefault(); //empeche le recharge de la console au clic
checkInput (); //appel la fonction au click sur le bouton envoyer du formulaire
postForm ();
})





