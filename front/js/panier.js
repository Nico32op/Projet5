//---------------------------------Récup Panier du local storage à afficher-----------
let produitdanslocalstorage = JSON.parse(localStorage.getItem("teddy")); //récup du local storage dans la page panier avec la clé teddy
console.log(produitdanslocalstorage);

function veriflocalstorage() {
  // création d'une fonction qui permet de vérifier le contenu du local storage
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
    <h5 class="card-prix">Prix Total : <span id="price${produitdanslocalstorage[i].idprodselectionne}"></span>euros<p><a id="btn_supp" href="#" role="button">Supprimer</a></p></h5> 
  </div>
</article>
       `;

      cardlistpanier.innerHTML = panierplein;
    }
  }
}
veriflocalstorage(); //appel la fonction qui permet de vérifier le contenu du local storage

//boucle et fonction me permettant de modifier la quantité des produits
for (let q = 0; q < produitdanslocalstorage.length; q++) {
  //je vais cherche le contenu de mon local storage
  let infolocalstorage = produitdanslocalstorage[q]; //je sauvegarde mon local storage
  console.log(infolocalstorage);

  const plusplus = document.querySelector(
    "#plus" + infolocalstorage.idprodselectionne
  ); //je cible mon bouton plus
  const moin = document.querySelector(
    "#moin" + infolocalstorage.idprodselectionne
  );
  const quantity = document.querySelector(
    "#afficheQuantite" + infolocalstorage.idprodselectionne
  ); //je cible l'endroit ou sera affiché la quantité
  const affichprix = document.querySelector(
    "#price" + infolocalstorage.idprodselectionne
  ); //je cible l'endroit ou sera affiché le prix total du produit

  function affichquantiteetprixtot() {
    //fonction qui affiche en html la quantité et la modification du prix total
    quantity.innerHTML = infolocalstorage.quantite;
    affichprix.innerHTML = infolocalstorage.quantite * infolocalstorage.prix;
  }

  affichquantiteetprixtot(); //appel de la fonction qui affiche la quantité et le prix total

  plusplus.addEventListener("click", (ee) => {
    infolocalstorage.quantite++; //la quantité de mon local storage augmente au click
    localStorage.setItem("teddy", JSON.stringify(produitdanslocalstorage)); //je renvoie les modif dans mon local storage
    affichquantiteetprixtot(); //appel de la fonction qui affiche la quantité et le prix total
    document.location.reload(); //recharge l'url
  });

  moin.addEventListener("click", (ee) => {
    if (infolocalstorage.quantite == 1) {
      //si il ne reste plus que 1 produit dans le panier

      if (
        window.confirm("Voulez vous vraiment supprimer cet article du panier?")
      ) {
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
function supressionarticle() {
  //fonction qui me permettra de supprimer un article
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
}
supressionarticle(); //appel de la fonction
//----------------------------Calcul montant total panier
function calculpanier() {
  //création d'une fonction qui permet d'additiones les prix présent dans le local storage
  let paniermontantotal = []; //on déclare un tableau qui contiendra chaque montant du panier

  for (let k = 0; k < produitdanslocalstorage.length; k++) {
    let prixproddanspanier =
      produitdanslocalstorage[k].prix * produitdanslocalstorage[k].quantite;
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

  localStorage.setItem("montanttotal", JSON.stringify(prixtotal)); //affiche le montant total dans le local storage
  cardlistpanier.insertAdjacentHTML("beforeend", affichageprixtothtml); //affichge la div en dessous des div déjà existantes dans la partie html
}
calculpanier();
