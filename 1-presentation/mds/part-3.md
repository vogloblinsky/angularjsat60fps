# Optimiser les performances de votre ng-application

@@
## SPA classique

@@
### Mise en cache du DOM

#### Exemple avec jQuery
* avant :

```javascript
$('div span .cls').each(...);
//...
$('div span').animate(...);
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

```css
input[type="text"] { color: red; }
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
ul.addEventListener('click', function(e){
  if( e.target.nodeName === 'LI'){
    //...
  }
}, false);
```
* Attention au mousemove/touchmove, onscroll

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

Le Dirty checking cherche qui a changé lors d'une action x ou y.

La future sp&eacute;cification ECMAScript avec l'ajout de la m&eacute;thode Observe &agrave; la classe Object bouleverse ce mécanisme.

Elle permet de recevoir un &eacute;v&egrave;nement de changement d'un objet.

@@
### dirty checking vs. Object.observe

```javascript
var beingWatched = {};
// Define callback function to get notified on changes
function somethingChanged(changes) {
    // do something
}
Object.observe(beingWatched, somethingChanged);
```

Le r&eacute;sultat est tr&egrave;s important, (20x &agrave; 40x plus rapide par ex)

Pr&eacute;vu pour la version 2, et disponible actuellement dans une librairie s&eacute;par&eacute;e : watchtower.js écrite en ES6

Object.observe disponible dans Chrome v35 depuis le 21/05/2014 !

@@

@@

Liens :

http://www.html5rocks.com/en/tutorials/es7/observe/
http://updates.html5rocks.com/2012/11/Respond-to-change-with-Object-observe
http://addyosmani.com/blog/the-future-of-data-binding-is-object-observe/

@@
### Surveillez votre
## $watch

```javascript
scope.$watch(watchExpression, listener, true/false);
```

* ```watchExpression``` sera exécutée plusieurs fois
* Deux modes de comparaison
  * FALSE : (par référence)  rapide
  * TRUE : (récursif) très très lent !!

@@
### Préférez
## $watchCollection

```javascript
scope.$watchCollection(obj, listener);
```

* Ajouté en 1.2, utilisé par ```ng-repeat```
* Un niveau de profondeur
* Alternative au $watch récursif

@@
### $watch vs. $watchCollection

[demo](http://localhost:8001/3.2.3/watch-vs-watchcollection.html)

@@
### $apply & $digest & $$postdigest

- $apply appelle les watchers dans la cha&icirc;ne enti&egrave;re du scope + $digest sur la fin...

- $digest appelle les watchers dans le scope courant et ses enfants

- $$postDigest appelle un callback d&eacute;fini une fois le cycle $digest termin&eacute;.
Il permet par exemple de MAJ le dom apr&egrave;s un dirty checking

$$ === private pour Angular

```javascript
$scope.$$postDigest(function(){
  console.log("post Digest");
});
```

On pr&eacute;f&eacute;re alors la m&eacute;thode $timeout,

```javascript
$timeout(function(){
 console.log("post Digest with $timeout");
},0,false);
```

@@
### $eval, $parse, $interpolate

* Attention : $eval appelle $parse

```javascript
for (var i=0; i<10E100; i+=1){
  $scope.$eval('expression');
}
```
* Il vaut mieux appeler $parse une fois

```javascript
var parsedExp = $parse('expression');
for (var i=0; i<10E10; i+=1){
  parsedExp($scope);
}
```
* $parse est beaucoup plus rapide que $interpolate

(pour les expressions simples)

@@
### directives : compile, link

* Pour les directives déclarées dans ```ng-repeat```
   * ```compile``` est appelée qu'une fois
   * ```link``` et le constructeur sont appel&eacute;s à chaque itération
* ```compile``` est votre ami

@@
### directives : transclusion

$digest limit&eacute; au scope de la directive


@@
## Exemple

* avant :

```javascript
app.directive(function(){
  return {
    link: function(s,e,a){
      s.foo = s.$eval(a.foo);
      s.$watch(a.list, function(list){}, true);
    }
  }
});
```

* après :

```javascript
app.directive(function($parse){
  return {
    transclude: true,
    compile: function(e,a){
      var fooExp = $parse(a.foo), listExp = $parse(a.list);
      return function link(s,e){
        s.foo = fooExp(s);
        s.$watchCollection(listExp, function(list){});
      }
    }
  }
});
```

<!--[demo](localhost:8001/3.2.5/directive.html)-->

@@
### ng-repeat : track by $index, pagination

Par d&eacute;faut, ng-repeat cr&eacute;e un noeud DOM par &eacute;l&eacute;ment, et d&eacute;truit le noeud quand l'item est supprim&eacute;.

Avec track by $index, la directive va r&eacute;utiliser ces noeuds DOM.


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

[-> demo](http://localhost:8001/3.2.6/1-ng-repeat-simple.html)

[-> demo tracked](http://localhost:8001/3.2.6/1-ng-repeat-simple-tracked.html)

@@
### ng-if vs ng-show

ng-show cache les &eacute;l&eacute;ments en CSS ( display:none )

- les bindings sont toujours pr&eacute;sent


ng-if va plus loin, et ne les cr&eacute;e même pas dans le DOM

- moins de bindings
- crée un scope sur l'enfant

[-> demo ng-show](http://localhost:8001/3.2.7/ngshow.html)

[-> demo ng-if](http://localhost:8001/3.2.7/ngif.html)

@@
### Filtres

Ils sont executés à chaque fin de cycle $digest. Ils doivent donc être très rapides.

A n'appliquer que si nécessaire dans une liste par exemple.
Ajouter plutôt le resultat du filtre dans la liste avant son affichage.

[-> demo ng-filter](http://localhost:8001/3.2.8/ngfilter.html)

[-> demo ng-filter optimized](http://localhost:8001/3.2.8/ngfilter-optimized.html)

@@
### Mono-binding / once

Lors de l'utilisation de {{ }}, Angular cr&eacute;e un watch interne pour d&eacute;marrer le processus de data-binding.

'Très' utile si la donnée change au cours du temps, mais si la donnée est en lecture seule, ce n'est plus utile.

But : allègement des watchers, le cycle de $digest sera plus cours également.

Solution : débrancher le watch une fois la donnée affichée.

https://github.com/tadeuszwojcik/angular-once

@@
### Mono-binding / once

Data-binded

```html
<ul>
    <li ng-repeat="user in users">
      <a ng-href="{{ user.profileUrl }}">{{ user.name }}</a>
    </li>
</ul>
```

Sur une liste de 100 élements  : 101 watchers

[-> demo without-once](http://localhost:8001/3.2.9/without-once.html)

Onced

```html
<ul>
    <li ng-repeat="user in users">
      <a once-href="user.profileUrl" once-text="user.name"></a>
    </li>
</ul>
```

Sur une liste de 100 élements  : 1 watchers

[-> demo with-once](http://localhost:8001/3.2.9/with-once.html)

@@
# Et en prod ?

@@
### Service $templateCache

```javascript
angular.module("monApplication").run([$templateCache, function($templateCache) {
  $templateCache.put("template1.html",
      // template1.html content (escaped)
  );
  $templateCache.put("template2.html",
      // template2.html content (escaped)
  );
  // etc.
}]);
```

html

```html
<div ng-include="'template1.html'"></div>
```

JavaScript

```javascript
$templateCache.get('template1.html');
```

@@
### Oui, mais je veux l'automatiser !

Installation

```bash
$ npm install gulp-angular-templatecache --save-dev
```

Gulpfile.js

```javascript
var templateCache = require('gulp-angular-templatecache');
gulp.task('default', function () {
  gulp.src('templates/**/*.html')
    .pipe(templateCache())
    .pipe(gulp.dest('public'));
});
```

public/templates.js 

```javascript
angular.module("templates").run([$templateCache, function($templateCache) {
  $templateCache.put("template1.html",
      // template1.html content (escaped)
  );
  $templateCache.put("template2.html",
      // template2.html content (escaped)
  );
  // etc.
}]);
```

@@
### Minification, Concaténation, ...


Gulp à la rescousse !


```javascript
gulp.task('build', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))

    .pipe(concat('app.js'))
    .pipe(ngmin())
    .pipe(gulp.dest('app/dist/js'))
    .pipe(rename({suffix: '.min'}))

    .pipe(uglify())
    .pipe(gulp.dest('app/dist/js'))

    .pipe(notify({ message: 'Build task completed' }))

    .on('error', gutil.log);
});
```