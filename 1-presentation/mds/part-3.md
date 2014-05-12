# Optimiser les performances de votre ng-application

## SPA classique



## SPA AngularJS

### dirty checking vs. Object.observe

Dirty checking actuel prend en moyenne 40ms par MAJ (Tableau de 20 colonnes, 100 lignes)

On peut aller encore plus loin avec la future sp�cification Ecmascript, et l'ajout de la m�thode Observe � la classe Object. 
Elle permet de recevoir un �v�nement de changement d'un objet.

```javascript
var beingWatched = {};
// Define callback function to get notified on changes
function somethingChanged(changes) {
    // do something
}
Object.observe(beingWatched, somethingChanged);
```

Le r�sultat est tr�s important, 1-2mx par MAj (20x � 40x plus rapide)

Pr�vu pour la v2, dispo actuellement dans une librairie s�par�e : watchtower.js �crite en ES6

Liens : 

http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe
http://addyosmani.com/blog/the-future-of-data-binding-is-object-observe/