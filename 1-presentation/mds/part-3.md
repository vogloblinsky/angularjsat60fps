# Optimiser les performances de votre ng-application

@@
## SPA classique

@@
### Mise en cache du DOM

#### Exemple avec jQuery
* avant :

```javascript
$('.div').find('span').filter('.cls').each(...);
//...
$('.div').find('span').animate(...);
```
* après :

```javascript
var spans = $('.div').find('span');
spans.filter('.cls').each(...);
//...
spans.animate(...);
```

@@
### Manipulation du DOM
#### Exemple en Vanilla
* avant :

```javascript
doc.innerHTML = '<ul>';
arr.forEach(function(prd){
    doc.innerHTML += '<li>'+prd+'<li>';
});
doc.innerHTML += '</ul>';
```
* après :

```javascript
var html = '<ul>';
arr.forEach(function(prd){
    html += '<li>'+prd+'<li>';
});
doc.innerHTML = html + '</ul>';
```

@@
### Sélecteurs CSS
Les sélecteurs universels sont à proscrire
```css
* { color: red; }
[type="text"] { color: red; }
```

@@
### Repaint et reflow

Éviter le reflow et minimiser les repaint

* Redimensionner la fenêtre
* Changer la police
* Calculer du ```offsetWidth``` et ```offsetHeight```
* Modifier des attributs de l'objet ```style```
* ...

@@
### Gestion correcte des évènements
* Enregistrement/désenregistrement systématique

```javascript
el.addEventListener('click', fn, false);
el.removeEventListener('click', fn, false);
```
* Délégation d'évenements

```javascript
ul.addEventListener('click', function(){
  if( this.nodeType === 'LI'){
    //...
  }
}, false);
```
* Attention au mousemove/touchmove

@@
### Quelques ressources
* http://moduscreate.com/efficient-dom-and-css/
* https://developers.google.com/speed/articles/javascript-dom
* https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS
* http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/
* https://developers.google.com/speed/articles/reflow

@@
## SPA AngularJS

@@
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

@@
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

@@
### Surveillez votre
## $watch

```javascript
scope.$watch(watchExpression, listener, true/false);
```

* ```watchExpression``` sera exécutée plusieurs fois
* Deux modes de comparaison
  * FALSE : (par référence)  rapide
  * TRUE : (profonde) très très lent !!

@@
### Préférez
## $watchCollection

```javascript
scope.$watchCollection(obj, listener);
```

* Ajouté en 1.2, utilisé par ```ng-repeat```
* Un niveau de profondeur
* Alternative au $watch/true

@@
### $watch vs. $watchCollection

-> demo

@@
### $eval, $parse, $interpolate
@todo wassim


@@
### directives : compile, link

* Pour les directives déclarées dans ```ng-repeat```
   * ```compile``` est appelée qu'une fois
   * ```link``` et le constructeur sont appelés à chaque itération
* ```compile``` est votre ami

@@
### directives : transclusion

$digest limité au scope de la directive

@@
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


@@
### ng-if vs ng-show

ng-show cache les �l�ments en CSS - display:none
	- bindings tjs pr�sent
ng-if va plus loin, et ne les cr�e m�me pas dans le DOM
	- moins de bindings
	- cr�e un scope sur l'enfant

Micro optimisation sauf si vous travaillez sur une liste importante.


@@
### Filtres

Ils sont execut�s � chaque fin de cycle $digest. Ils doivent donc �tre tr�s rapides.

A n'appliquer que si n�cessaire dans une liste par exemple.
Ajouter plut�t le resultat du filtre dans la liste avant son affichage.


@@
### Mono-binding / once

Lors de l'utilisation de {{ }}, Angular cr�e un watch interne pour d�marrer le processus de data-binding.
Le data-binding est 'tr�s' utile si la donn�e change au cours du temps, mais si la donn�e est en lecture seule, ce n'est plus utile.

But : all�gement des watchers, le cycle de $digest sera plus cours �galement.

Solution : d�brancher le watch une fois la donn�e affich�e.

https://github.com/tadeuszwojcik/angular-once

Exemple :

```html
<ul>
    <li ng-repeat="user in users">
      <a ng-href="{{ user.profileUrl }}">{{ user.name }}</a>
    </li>
</ul>
```

Sur une liste de 100 �lements  : 101 watchers

Onced

```html
<ul>
    <li ng-repeat="user in users">
      <a once-href="user.profileUrl" once-text="user.name"></a>
    </li>
</ul>
```

Sur une liste de 100 �lements  : 1 watchers
