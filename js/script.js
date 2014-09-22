var textArtApp = angular.module('textArtApp', ['firebase']);

textArtApp.factory('Person', ['$firebase', function($firebase) {
	return function(username) {
		var ref = new Firebase('https://smscanvas.firebaseio.com/persons/').child(username);

		return $firebase(ref).$asObject();
	};
}]);

textArtApp.controller('MainCtrl', ['$scope', 'Person', '$firebase',
	function ($scope, Person, $firebase) {

		Person('tony').$bindTo($scope, 'person');
//-----------------------------------------------------------

		var smsRef = new Firebase('https://smscanvas.firebaseio.com/persons/tony');
		var sync = $firebase(smsRef);
		var textVar;

		$scope.list = ['cat', 'dog', 'bird'];

		$scope.list = sync.$asArray();

		smsRef.child('name').on('value', function(snapshot) {
			textVar = snapshot.val();

		// styling changes and effects section------------------------
		$scope.bgColor = {
			'position' : 'absolute',
			'bottom' : '0',
			'top' : '0',
			'left' : '0',
			'right' : '0',
			'background-color' : textVar
		};

			
		});
//-------------------------------------

	}
]);