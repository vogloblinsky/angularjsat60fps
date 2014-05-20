# État de l'art
fonctionnement du navigateur
---

@@
## Fonctionnent générale
<img src="./img/slides/rendering-engine.png" alt="Rendering engine" height="100" />

@@
## Document Object Model Tree
```html
<html>
  <body>
    <p>
      Hello World
    </p>
    <div> <img src="example.png"/></div>
  </body>
</html>
```
<img src="./img/slides/dom-tree.png" alt="DOM Tree" width="600"/>

@@
## HTML Parsing
<img src="./img/slides/html-parsing-flow.png" alt="HTML Parsing Flow" width="300"/>

@@
## CSS Object Model Tree
<img src="./img/slides/parsing-css.png" alt="CSS Parsing Flow" width="500"/>

@@
## Arbre d'affichage
<img src="./img/slides/webkitflow.png" alt="Webkit Flow" width="800"/>

__Attention au repaint/reflow !__

@@
## Un mot sur JavaScript...
<img src="./img/slides/boucle-événements-navigateur.png" />
