let produitdanslocalstorage = JSON.parse(localStorage.getItem("teddy2")); //récup du local storage dans la page panier avec la clé teddy
console.log(produitdanslocalstorage);

let montanttotalstorage =  JSON.parse(localStorage.getItem("montanttotal")); //récup du montant total du storage 
console.log(montanttotalstorage);

let retourserveur = JSON.parse(localStorage.getItem("retourserveurstorage")); //récup du retour serveur storage 
console.log(retourserveur);

for (let q = 0; q < montanttotalstorage.length; q++) { //je vais cherche le contenu montant de mon local storage
    let infomontant = montanttotalstorage[q]; //je sauvegarde le montant dans une variable
    console.log(infomontant) 
}

const cardlistconfirm = document.querySelector("#cardlistconfirm"); //je seletionne l'endroit ou je veux afficher les infos sur la page html
const cardconfirm = 
`<article class="prodselectionner"> 
  <div class="card-body">
  <img class="card-img-top" src="" alt="teddy"/>
    <h5 class="card-title"><button type="button" id="plus">+</button>Quantité : <span id="afficheQuantite"></span><button type="button" id="moin">-</button <br><br>Nom : </h5>
    <h5 class="card-title">Prix à l'unité : </h5>
    <h5 class="card-prix">Prix Total : <span id="price">${montanttotalstorage}</span>euros<p><a id="btn_supp" href="#" role="button">Supprimer</a></p></h5> 
  </div>
</article>
`
;

cardlistconfirm.innerHTML=cardconfirm; //j'insère dans la partie html les infos choisies à l'endroit ciblé 