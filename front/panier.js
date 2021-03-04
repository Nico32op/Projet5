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
    <h5 class="card-prix">${produitdanslocalstorage[i].prix}euros : <p><a id="btn_supp" href="#" role="button">Supprimer</a></p></h5> 
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

window.location.href = "panier.html"; //recharge l'url à la suppression d'un produit 
alert("Produit Supprimé =(");
})
}

