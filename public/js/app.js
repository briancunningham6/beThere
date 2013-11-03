window.app = angular.module('ngFantasyFootball', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ngRoute', 'ngff.controllers', 'ngff.directives', 'ngff.services','ui.sortable']);

// bundling dependencies
window.angular.module('ngff.controllers', ['ngff.controllers.teams','ngff.controllers.header','ngff.controllers.index','ngff.controllers.locations','ngff.controllers.eventinstances','ngff.controllers.events','ngff.controllers.messages','ngff.controllers.players','ngff.controllers.users','ngff.controllers.purchases']);
window.angular.module('ngff.services', ['ngff.services.teams','ngff.services.global','ngff.services.locations','ngff.services.events','ngff.services.eventinstances','ngff.services.players','ngff.services.messages','ngff.services.users','ngff.services.purchases']);

