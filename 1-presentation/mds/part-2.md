Outillage et diagnostique
================

Chrome devtools
----------------

Connue de tous les développeurs web aujourd'hui.
Les onglets utiles pour du débuggage de performances sont :

- Timeline : enregistrmeent et analyse du rendu d'une page web, avec filtrage possible suivant l'étape : Loading, Scripting, Rendering, and Painting
- Profiles : profilage des performances JS

Batarang
----------------

Extension pour Chrome Devtools dédiée au débuggage d'applications AngularJS

https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk

Propose plusieurs onglets permettant :

- analyse des modèles
- analyse des watchers
- graphe des dépendances des modules, services, etc
- options de visualisations des scopes, bindings et applications dans la page HTML

Ajoute également un onglet 'AngularJS Properties' dans l'onglet principal 'Elements' de Devtools

Angular inspector bookmarklet
----------------

Marque page à exécuter sur une application AngularJS qui propose à peut près la même chose que Batarang :

- visualisations des scopes, bindings

mais aussi :

- watches en surcouche dans la page !
- watches par scope avec un nombre en haut à droite par rapport au nombre total de watches de l'application