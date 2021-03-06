const cardlist = document.querySelector("#cardlist");

function addCard(image, prod, prix, id){ /*partie que permet d'insérer le texte dans la partie html*/
const card = /*?{id} permet de rajouter l'id dans la barre uril*/
        `
        <a href="./produit.html?id=${id}">
        <article class="card"> 
        <img class="card-img-top" src="${image}" alt=""/>
           <div class="card-body">
             <h5 class="card-title">Nom: ${prod}</h5> 
             <p class="card-text">Prix : ${prix/100} euros</p>
           </div>
        </article>
        </a>
        `;
cardlist.insertAdjacentHTML("beforeend", card); /*permet d'insérer ma const "card" dans ma div cardlist du html*/
};
        
document.querySelector(".btn").onclick = function() { //fonction bouton qui fait apparaitre ou disparaitre la div #cardlist//
if (window.getComputedStyle(document.querySelector('#cardlist')).display=='none'){
document.querySelector("#cardlist").style.display="block";
} else {
document.querySelector("#cardlist").style.display="none";
}
}

let request = fetch("http://localhost:3000/api/teddies");
//décla promesse (request)
request.then(async (response)=>{ //la méthode then renvoie l'argument response si tout est ok avec la promesse (statut 200 requête reussi) 
                                //déclaration function asynchrone (argument response)
try{// try relève si il y a des erreurs dans le bloc si il y a une erreur elle relevée dans le catch
const donnejson = await response.json(); //traduit les données reçu au format json si la promesse est bien reçu
console.log(donnejson)

    for( let i = 0; i < donnejson.length; i++){ /*boucle qui me permet d'ajouter les arguments de ma fonction addcard jusqu'à la fin du tableau (const response qui contient tous le json)*/
    addCard(
      donnejson[i].imageUrl,
      donnejson[i].name,
      donnejson[i].price,
      donnejson[i]._id
      );
}     
} catch(erreur){  //si une erreur est révélée dans le bloc (try) elle sera affichée ici
  console.log(erreur)
} 
}) 

.catch((err) => console.log(err)); //catch renvoie une erreur si elle se produit dans la requête

        //const nomprod1=(donne[0].name); /*(response est un tableau)appel le nom du tableau avec l'index0*/
        //const price1=(donne[0].price); /*(response est un tableau)appel le prix du tableau avec l'index0 */
        //const image1=(donne[0].imageUrl);
        //const id1=(donne[0]._id)

  