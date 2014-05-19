# Outillage et diagnostique
Comment et avec quoi debugger correctement
---

@@
## Chrome devtools

Connue de tous les d&eacute;veloppeurs web aujourd'hui.
Les onglets utiles pour du d&eacute;buggage de performances sont :

- Timeline : enregistrmeent et analyse du rendu d'une page web, avec filtrage possible suivant l'&eacute;tape : Loading, Scripting, Rendering, and Painting
- Profiles : profilage des performances JS

@@
## Batarang

Extension pour Chrome Devtools d&eacute;di&eacute;e au d&eacute;buggage d'applications AngularJS

https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk

Propose plusieurs onglets permettant :

- analyse des mod&egrave;les
- analyse des watchers
- graphe des d&eacute;pendances des modules, services, etc
- options de visualisations des scopes, bindings et applications dans la page HTML

Ajoute &eacute;galement un onglet 'AngularJS Properties' dans l'onglet principal 'Elements' de Devtools

@@
## Angular inspector bookmarklet

Marque page &agrave; ex&eacute;cuter sur une application AngularJS qui propose &agrave; peut pr&egrave;s la m&ecirc;me chose que Batarang :

- visualisations des scopes, bindings

mais aussi :

- watches en surcouche dans la page !
- watches par scope avec un nombre en haut &agrave; droite par rapport au nombre total de watches de l'application

https://github.com/maxdow/Angular-Inspector-Bookmarklet