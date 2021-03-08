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

for(let k = 0; k < produitdanslocalstorage.length; k++){
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
constplacementformulairehtml = document.querySelector("#cardlistpanier"); //selection de l'endroit ou on veut afficher le formulaire
const affichformulairehtml = `                                  
<div class="containerformulaire">
<h1 class="titreformulaire">Formulaire de commande</h1>
<form>
  <label for="nom">Nom</label>
  <input type="text" id="nom" name="nom" placeholder="Votre nom">

  <label for="prenom">Prénom</label>
  <input type="text" id="prenom" name="prenom" placeholder="Votre prénom">

  <label for="emailAddress">Email</label>
  <input id="email" type="email" name="email" placeholder="Votre email">
  
  <label for="ville">Ville</label>
  <input id="ville"  placeholder="Votre ville" type="text">

  <label for="cp">Code Postal</label>
  <input id="cp" name="cp"  placeholder="Votre code Postal" type="text">
   
  <label for="adresse">Adresse</label>
  <textarea id="adresse" name="adresse" placeholder="Votre adresse" style="height:50px"></textarea>
 
  <label for="Pays">Pays :</label>
  <select name="pays" id="pays">
    <option value="Fr">France</option>
    <option value="Angl">Italie</option>
    <option value="USA">USA</option>
  </select>
  <br /><br />

  <input id="envoieformulaire" name="envoieformulaire "type="submit" value="Envoyer">
</form>
</div>
`
;

constplacementformulairehtml.insertAdjacentHTML("beforeend", affichformulairehtml); //insertion du formulaire à l'endroit souhaité direct en html

const btnenvoieformulaire = document.querySelector("#envoieformulaire"); //selection du bouton envoie formulaire
btnenvoieformulaire.addEventListener("click", function(e){ //création de ce qui est effectué au click
e.preventDefault(); //empeche le recharge de la console au clic

localStorage.setItem("nom", document.querySelector("#nom").value)
localStorage.setItem("prenom", document.querySelector("#prenom").value)
localStorage.setItem("email", document.querySelector("#email").value)
localStorage.setItem("ville", document.querySelector("#ville").value)
localStorage.setItem("cp", document.querySelector("#cp").value)
localStorage.setItem("adresse", document.querySelector("#adresse").value)
//création des clés des formulaires dans le local storage

const formulaireok = {//création d'une constante qui contient/affichera toutes les clés et valeurs du formulaires ensenmble 
nom : localStorage.getItem("nom"), 
prenom : localStorage.getItem("prenom"), 
email : localStorage.getItem("email"), 
ville : localStorage.getItem("ville"), 
cp : localStorage.getItem("cp"), 
adresse : localStorage.getItem("adresse")
};
console.log(formulaireok);

//donné a envoyer serveur, formulaire + produit enregistré dans le panier(local storage)
const Envoieserveur = { 
    produitdanslocalstorage, 
    formulaireok
    
};
console.log(Envoieserveur)
})



