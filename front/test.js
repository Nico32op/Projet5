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

let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);

        const nomprod1=(response[0].name); /*(response est un tableau)appel le nom du tableau avec l'index0*/
        const price1=(response[0].price); /*(response est un tableau)appel le prix du tableau avec l'index0 */
        const image1=(response[0].imageUrl);
        const id1=(response[0]._id)

    for( let i = 0; i < response.length; i++){ /*boucle qui me permet d'ajouter les arguments de ma fonction addcard jusqu'à la fin du tableau (const response qui contient tous le json)*/
            addCard(
              response[i].imageUrl,
              response[i].name,
              response[i].price,
              response[i]._id
              );
        }
    }
};
request.open("GET", "http://localhost:3000/api/teddies");
request.send();

      /*addCard(response[1].imageUrl, permet de sélectionner que 1 seul card
        response[1].name,
        response[1].price); */

    /*teddy1
    const nomprod1=(response[0].name); /*(response est un tableau)appel le nom du tableau avec l'index0
    const price1=(response[0].price); /*(response est un tableau)appel le prix du tableau avec l'index0
    const descriptionprod1=(response[0].description);
    console.log(descriptionprod1) 
   
    const textnomprod1 = document.querySelector(".card-title"); /*constante qui me permet de ciblé la ou je veux inséré mon texte
    const textprice1 = document.querySelector(".card-text"); 
    
    textnomprod1.innerHTML=nomprod1; /*action qui me permet d'insérer le texte au lieu ciblé
    textprice1.innerHTML=price1 + '€'; */

    