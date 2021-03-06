//---------------PARTIE RECUP ID DANS L'url-------------------//
const _id_url = window.location.search; //.search et la partie qui suit "?"" dans l'url//
console.log(_id_url)//window.location fournis les info de l'url 

const id = _id_url.slice(4); //(slice) permet de supprimer le "?" de l'id //
console.log(id)//


    
let request = fetch("http://localhost:3000/api/teddies");
//décla promesse (request)
request.then(async (response)=>{ //la méthode then renvoie l'argument response si tout est ok avec la promesse (statut 200 requête reussi) 
console.log(response)             //déclaration function asynchrone (argument response)

// try relève si il y a des erreurs dans le bloc si il y a une erreur elle relevée dans le catch
try{
const donnejson = await response.json(); //traduit les données reçu au format json si la promesse est bien reçu
console.log(donnejson)

const idprodselectionne = donnejson.find(element => {return element._id === id;});
console.log(idprodselectionne); //me permet d'afficher le contenu de l'id selectionné

//{ //partie que permet d'insérer le texte dans la partie html
const cardlistprod = document.querySelector("#cardlistprod");
const card = `<article class="cardprod"> 
<img class="card-img-top" src="${idprodselectionne.imageUrl}" alt="teddy"/>
  <div class="card-body">
    <h5 class="card-title">Nom : ${idprodselectionne.name}</h5> 
    <h5 class="card-prix">Prix : ${idprodselectionne.price/100} euros</h5> 
     <p class="card-text">Description : ${idprodselectionne.description}</p>
     <label for="Couleurs">Couleurs :</label>
     <select name="couleurs" id="couleurs">
      <option value="bl">Bleu</option>
       <option value="rg">Rouge</option>
       <option value="ro">Rose</option>
     </select>
     <p><a id="btn-envoyer" href="#" role="button">Ajouter au panier</a></p>
   </div>
</article>

`
;
cardlistprod.innerHTML = card;

//Partie -----------------PANIER-------------------------------------
const btn_ajoutpanier = document.querySelector("#btn-envoyer");
 console.log(btn_ajoutpanier)                  //selection du bouton

btn_ajoutpanier.addEventListener("click", function(event) {
event.preventDefault;
//btn_ajoutpanier.innerHTML = "cliqué";   //écouter le bouton et envoyer le contenu au panier  .preventDefault(); //preventdefault permet de ne pas réactualiser la page au click ajout panier
console.log(btn_ajoutpanier)  


let contenuprodrecup = {  //les contenus à récupérer dans le panier quand on clcik sur ajout panier
  nomproduit: idprodselectionne.name,
  idprodselectionne: idprodselectionne._id,
  prix: idprodselectionne.price/100,
  quantité: 1,
  description: idprodselectionne.description,
  phototed: idprodselectionne.imageUrl
  
};console.log(contenuprodrecup)

//-----------------------------------récupéré les produits dans local storage// 
let produitdanslocalstorage = JSON.parse(localStorage.getItem("teddy"));
//json.parse permet de convertir le format js en json// 
if(produitdanslocalstorage){
  produitdanslocalstorage.push(contenuprodrecup); //envoie des contenues des prod à récupérer dans le local storage
  localStorage.setItem("teddy" ,JSON.stringify(produitdanslocalstorage));
//création de la clé teddy dans le tableau du local storage 
// json.stringify envoie des données au format js à convertir en json
}
// l'instruction if et else me permet de continuer de rajouter les clé teddy dans le tableau, sinon la clé teddy est toujours remplacé 
else{
produitdanslocalstorage = []; 
produitdanslocalstorage.push(contenuprodrecup); 
localStorage.setItem("teddy" ,JSON.stringify(produitdanslocalstorage));
console.log(produitdanslocalstorage)
//création de la clé teddy dans le tableau du local storage 
}

});
} catch (err){ //si une erreur est révélée dans le bloc (try) elle sera affichée ici
  console.log(err)
}
}) 

.catch((err) => console.log(err)); //.catch renvoie une erreur si il y a une erreur dans la requête



 
    

