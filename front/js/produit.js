//---------------PARTIE RECUP ID DANS L'url-------------------//
const _id_url = window.location.search; //.search et la partie qui suit "?"" dans l'url//
console.log(_id_url); //window.location fournis les info de l'url

const id = _id_url.slice(4); //(slice) permet de supprimer le "?" de l'id //
console.log(id); //

//{ //partie que permet d'insérer le texte dans la partie html
const cardlistprod = document.querySelector("#cardlistprod");
//fonction qui me permet d'afficher les produits avec le contenu souhaité
function affichproddynamique(image, name, prix, description) {
  const card = `<article class="cardprod"> 
  <img class="card-img-top" src="${image}" alt="teddy"/>
    <div class="card-body">
      <h5 class="card-title">Nom : ${name}</h5> 
      <h5 class="card-prix">Prix : ${prix} euros</h5> 
       <p class="card-text">Description : ${description}</p>
       <label for="couleurs">Couleurs :</label>
       <select name="couleur" id="couleurs">
       </select>
       <p><a id="btn-envoyer" href="#" role="button">Ajouter au panier</a></p>
     </div>
  </article>
  `;
  cardlistprod.innerHTML = card; //insertion dans la partie html
}

let request = fetch("http://localhost:3000/api/teddies/" + id); //+id permet d'afficher le contenu du produits grace à son id
//décla promesse (request)
request
  .then(async (response) => {
    //la méthode then renvoie l'argument response si tout est ok avec la promesse (statut 200 requête reussi)
    console.log(response); //déclaration function asynchrone (argument response)

    // try relève si il y a des erreurs dans le bloc si il y a une erreur elle relevée dans le catch
    try {
      const idprodselectionne = await response.json(); //traduit les données reçu au format json si la promesse est bien reçu
      console.log(idprodselectionne);

      //AUTRES METOHDES POUR AFFICHIER LE CONTENU EN FONCTION DE L'ID
      // const idprodselectionne = donnejson.find((element) => {
      // return element._id === id;
      //});
      //console.log(idprodselectionne); //me permet d'afficher le contenu de l'id selectionné

      affichproddynamique(
        //appel de la fonction qui me permet d'afficher les éléments souhaités dans la card
        idprodselectionne.imageUrl,
        idprodselectionne.name,
        idprodselectionne.price / 100,
        idprodselectionne.description
      );
      const choixcouleurs = idprodselectionne.colors; //enregistre les couleurs en fonctions du produit selectionné
      const idselect = document.querySelector("#couleurs"); //cible l'endroit ou on veut implanter les couleurs
      for (let u = 0; u < choixcouleurs.length; u++) {
        //permet d'afficher toutes les couleurs d'un produit
        console.log(choixcouleurs);
        //let option = document.createElement('option');
        //option.value = choixcouleurs[u];
        //option.innerHTML = choixcouleurs[u];
        //idselect.appendChild(option);

        let optioncouleur = `<option value="${choixcouleurs[u]}">${choixcouleurs[u]}</option>`; //les valeurs de n'importe quelle couleurs seront affichés dans le html
        idselect.insertAdjacentHTML("beforeend", optioncouleur);
      }

      //Partie -----------------PANIER-------------------------------------

      function envoieaupanier() {
        //déclarations de la fonction qui contient ce qui doit être envoyé au panier

        let contenuprodrecup = {
          //les contenus à récupérer dans le panier quand on clcik sur ajout panier
          nomproduit: idprodselectionne.name, //sépartion en constantes des objects "appartenants" à l'id
          idprodselectionne: idprodselectionne._id,
          quantite: 1,
          prix: idprodselectionne.price / 100,
          description: idprodselectionne.description,
          phototed: idprodselectionne.imageUrl,
        };
        console.log(contenuprodrecup);

        //-----------------------------------envoyer les produits dans local storage//
        let produitdanslocalstorage = JSON.parse(localStorage.getItem("teddy"));
        //json.parse permet de convertir le format js en json//

        //fonction apparaition fenêtre pop up
        const popupconfirm = function () {
          //.confirm afficher 2 boutons ok et annuler
          if (
            window.confirm(`${idprodselectionne.name} a bien été ajouté au panier
Cliquer sur OK pour consulter le panier ou ANNULER pour revenir à l'acceuil`)
          ) {
            window.location.href = "panier.html"; //.href permet de renvoyer vers une autre adresse url
          } else {
            window.location.href = "index.html";
          }
        };

        if (produitdanslocalstorage) {
          // on vérifie si le même produit existe dans le local storage
          let produitexistant = false;
          for (let i = 0; i < produitdanslocalstorage.length; i++) {
            if (
              contenuprodrecup.nomproduit == //dans le cas ou le même produit existe
              produitdanslocalstorage[i].nomproduit
            ) {
              produitdanslocalstorage[i].quantite++; // on rajoute 1 à sa quantité
              produitexistant = true;
              localStorage.setItem(
                "teddy",
                JSON.stringify(produitdanslocalstorage)
              );
              popupconfirm();
              return false; // return false permet de sortir de la boucle si un produit est correspondant
            }
          }
          if (!produitexistant) {
            // si le même produit n'existe pas on rajoute le produit "normalement"
            produitdanslocalstorage.push(contenuprodrecup); //envoie des contenues des prod à récupérer dans le local storage
            localStorage.setItem(
              "teddy",
              JSON.stringify(produitdanslocalstorage)
            );
            popupconfirm();
            //création de la clé teddy dans le tableau du local storage
            // json.stringify envoie des données au format js à convertir en json
          }
          // l'instruction if et else me permet de continuer de rajouter les clé teddy dans le tableau, sinon la clé teddy est toujours remplacé
        } else {
          //si le local storage n'existe pas on prépare déjà le panier et ce qu'il contiendra
          produitdanslocalstorage = [];
          produitdanslocalstorage.push(contenuprodrecup);
          localStorage.setItem(
            "teddy",
            JSON.stringify(produitdanslocalstorage)
          );
          console.log(produitdanslocalstorage);
          popupconfirm();
          //création de la clé teddy dans le tableau du local storage
        }
      }

      const btn_ajoutpanier = document.querySelector("#btn-envoyer");
      console.log(btn_ajoutpanier); //selection du bouton

      btn_ajoutpanier.addEventListener("click", function (event) {
        event.preventDefault;
        envoieaupanier(); //appel de la fonction qui envoie les objets souhaités dans le panier/localstorage
        //btn_ajoutpanier.innerHTML = "cliqué";   //écouter le bouton et envoyer le contenu au panier  .preventDefault(); //preventdefault permet de ne pas réactualiser la page au click ajout panier
        console.log(btn_ajoutpanier);
      });
    } catch (err) {
      //si une erreur est révélée dans le bloc (try) elle sera affichée ici
      console.log(err);
    }
  })

  .catch((err) => console.log(err)); //.catch renvoie une erreur si il y a une erreur dans la requête
