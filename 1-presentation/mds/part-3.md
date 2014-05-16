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

### $digest & $apply & $$postdigest

Micro optimisation

$apply appelle les watchers dans la cha�ne enti�re du scope + digest sur la fin...
$digest appelle les watchers dans le scope courant et ses enfants

$$postDigest appelle un callback d�fini une fois le cycle $digest termin�
Il permet par ex de MAJ le dom apr�s un dirty checking

$$ === private pour Angular

```javascript
$scope.$$postDigest(function(){
  console.log("post Digest");
});
```

On pr�f�re alors la m�thode $timeout,

```javascript
$timeout(function(){
 console.log("post Digest with $timeout");
},0,false);
```

### ng-repeat : track by $index, pagination

Par d�faut, ng-repeat cr�e un noeud DOM par �l�ment, et d�truit le noeud quand l'item est supprim�.
With track by $index, la directive va r�utiliser ces noeuds DOM.

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

ng-show cache les �l�ments en CSS - display:none
	- bindings tjs pr�sent
ng-if va plus loin, et ne les cr�e m�me pas dans le DOM
	- moins de bindings
	- cr�e un scope sur l'enfant

Micro optimisation sauf si vous travaillez sur une liste importante.