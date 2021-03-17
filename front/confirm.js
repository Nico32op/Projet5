let contactstorage = JSON.parse(localStorage.getItem("contact")); //récup du local storage les infos clients
console.log(contactstorage.lastName);  //.parse permet de traduit le format json en format js

let montanttotalstorage =  JSON.parse(localStorage.getItem("montanttotal")); //récup du montant total du storage 
//console.log(montanttotalstorage);

let retourserveur = JSON.parse(localStorage.getItem("retourserveurstorage")); //récup du retour serveur storage 
//console.log(retourserveur);


    for (let j = 0; j < retourserveur.length; j++) { //je vais chercher le contenu du retour serveur de mon local storage
    let infoserveur = retourserveur[j]; //je sauvegarde le contenu dans une variable
    let idserveur = retourserveur[j].orderId; // je sauvegarder l'id du retour serveur dans une variable
    console.log(idserveur)
    console.log(infoserveur) 


const cardlistconfirm = document.querySelector("#cardlistconfirm"); //je seletionne l'endroit ou je veux afficher les infos sur la page html
const cardconfirm = 
`<article class="prodselectionner"> 
  <div class="card-body">
  <img class="card-img-top" src="images/homer.jpg" alt="snif"/>
    <h5 class="card-title">${contactstorage.lastName} ${contactstorage.firstName} merci pour votre confiance!</h5>
    <h5 class="card-title">Le numéro de suivi de votre commande est : ${idserveur}</h5> 
    <h5 class="card-prix">Le montant de total de votre achat est de : <span id="price">${montanttotalstorage}</span>euros<p><a id="btn_supp" href="#" role="button">Supprimer</a></p></h5> 
  </div>
</article>
`
;

cardlistconfirm.innerHTML=cardconfirm; //j'insère dans la partie html les infos choisies à l'endroit ciblé 
    }