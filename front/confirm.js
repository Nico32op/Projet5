let contactstorage = JSON.parse(localStorage.getItem("contact")); //récup du local storage les infos clients
 //.parse permet de traduit le format json en format j
const nom = contactstorage.lastName; //créer une constante récupérant le nom de contact du local storage                                 s
const prenom = contactstorage.firstName; //créer une constante récupérant le prenom de contact du local storage 

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
`<article class="confirmprodselectionner"> 
  <div class="card-body">
  <img class="card-img-top" src="images/homer.jpg" alt="snif"/>
    <h5 class="card-title">${nom} ${prenom} merci pour votre confiance!</h5>
    <h5 class="card-title">Le numéro de suivi de votre commande est : ${idserveur}</h5> 
    <h5 class="card-prix">Le montant de total de votre achat est de : <span id="price">${montanttotalstorage}</span>euros<p><a id="btn_retour" href="#" role="button">Retour à l'acceuil</a></p></h5> 
  </div>
</article>
`
;

cardlistconfirm.innerHTML=cardconfirm; //j'insère dans la partie html les infos choisies à l'endroit ciblé 
}

const retouracceuil = document.querySelector("#btn_retour"); //selection du bouton retour acceuil
retouracceuil.addEventListener("click", function(e){ //au click sur le bouton
localStorage.clear(); // on vide le local storage 
alert("A bientôt!")
window.location.href = "index.html"; //et on revient sur la page d'acceuil
});