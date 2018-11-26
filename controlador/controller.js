function ctrlFirst(scope, crud) {
	//$scope.nombre="joan";
	// scope.nuevapersona = {};

	scope.personas = crud.listar();

	scope.agregarpersonas = function (persona) {
		// if (scope.nuevapersona.id) {
		// 	let index = scope.personas.findIndex(item => item.id == scope.nuevapersona.id)
		// 	scope.personas[index] = angular.copy(scope.nuevapersona)
		// } else {
		// 	scope.nuevapersona.id = Math.random();
		// 	scope.personas.push($scope.nuevapersona);
		// }
		// scope.nuevapersona = {};
		if (persona.id) {
			alert("Hola");
			crud.actualizar(persona);
		} else {
			crud.agregar(persona);
			scope.nuevapersona = {};
		}
		scope.personas = crud.listar();
	}

	scope.editar = (persona) => {
		scope.nuevapersona = angular.copy(persona);
	};

	scope.eliminar = (key) => {
		crud.eliminar(key);
	};

	scope.ingresar = function (persona) {
		if (persona.id) {
			alert("Ya ha registrado un voto");
		}else{
			crud.agregar(persona);
		}
		scope.personas = crud.listar();
	};
}

ctrlFirst.$inject = [
	'$scope',
	'servCrud'
];

function servicioCrud() {

	let personas = [
		{
			id: 1,
			dni: "74697080"
		},
		{
			id: 2,
			dni: "74587950"
		},
		{
			id: 3,
			dni: "75978564"
		}
	];


	this.agregar = (persona) => {
		personas.push(persona);
	};
	this.actualizar = (persona) => {
		let aux;
		personas.forEach((item, key) => {
			if (item.id === persona.id) {
				personas[key] = persona;
			}
		});
		return aux;
	};
	this.eliminar = (key) => {
		personas.splice(key, 1);
	};
	this.listar = () => {
		return personas;
	};

	this.buscar = (persona) => {
		let aux;
		personas.forEach((item,key) => {
			if (item.id === persona.id) {
				alert("Ya ha registrado un voto");
			}else {
				alert("Voto");
			}
		});
	} 
}

angular.module("app")
	.controller("FirstController", ctrlFirst)
	.service('servCrud', servicioCrud)