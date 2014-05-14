# Optimiser les performances de votre ng-application

## SPA classique



## SPA AngularJS

### dirty checking vs. Object.observe

Dirty checking actuel prend en moyenne 40ms par MAJ (Tableau de 20 colonnes, 100 lignes)

On peut aller encore plus loin avec la future spécification Ecmascript, et l'ajout de la méthode Observe à la classe Object. 
Elle permet de recevoir un évènement de changement d'un objet.

```javascript
var beingWatched = {};
// Define callback function to get notified on changes
function somethingChanged(changes) {
    // do something
}
Object.observe(beingWatched, somethingChanged);
```

Le résultat est très important, 1-2mx par MAj (20x à 40x plus rapide)

Prévu pour la v2, dispo actuellement dans une librairie séparée : watchtower.js écrite en ES6

Liens : 

http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe
http://addyosmani.com/blog/the-future-of-data-binding-is-object-observe/

### $digest & $apply & $$postdigest

Micro optimisation

$apply appelle les watchers dans la chaîne entière du scope + digest sur la fin...
$digest appelle les watchers dans le scope courant et ses enfants

$$postDigest appelle un callback défini une fois le cycle $digest terminé
Il permet par ex de MAJ le dom après un dirty checking

$$ === private pour Angular

```javascript
$scope.$$postDigest(function(){
  console.log("post Digest");
});
```

On préfère alors la méthode $timeout,

```javascript
$timeout(function(){
 console.log("post Digest with $timeout");
},0,false);
```

### ng-repeat : track by $index, pagination

Par défaut, ng-repeat crée un noeud DOM par élément, et détruit le noeud quand l'item est supprimé.
With track by $index, la directive va réutiliser ces noeuds DOM.

```javascript
<div ng-repeat="item in array">
  Hello, i am {{item}}.
<div>
```

```javascript
<div ng-repeat="item in array track by $index">
  Hello, i am {{item}}.
<div>
```

-> Demos

-> bindonce

### ng-if vs ng-show

ng-show cache les éléments en CSS - display:none
	- bindings tjs présent
ng-if va plus loin, et ne les crée même pas dans le DOM
	- moins de bindings
	- crée un scope sur l'enfant

Micro optimisation sauf si vous travaillez sur une liste importante.