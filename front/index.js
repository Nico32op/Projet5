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
request.then((response)=>{
    const donne = response.json(); 
    console.log(donne)

donne.then((utilisateur) => {
    console.log(utilisateur)
 
    for( let i = 0; i < utilisateur.length; i++){ /*boucle qui me permet d'ajouter les arguments de ma fonction addcard jusqu'à la fin du tableau (const response qui contient tous le json)*/
    addCard(
      utilisateur[i].imageUrl,
      utilisateur[i].name,
      utilisateur[i].price,
      utilisateur[i]._id
      );
}     
});    
}) 

.catch((err) => console.log(err));

        //const nomprod1=(donne[0].name); /*(response est un tableau)appel le nom du tableau avec l'index0*/
        //const price1=(donne[0].price); /*(response est un tableau)appel le prix du tableau avec l'index0 */
        //const image1=(donne[0].imageUrl);
        //const id1=(donne[0]._id)

  