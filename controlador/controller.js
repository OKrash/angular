function ctrlFirst(scope,crud,  cand) {
	//$scope.nombre="joan";
	// scope.nuevapersona = {};

	scope.personas = crud.listar();
	scope.candidatos= cand.obtener();
	scope.candidato={};
	scope.persona={};
	scope.acceso=0;
	
	scope.sumarvotos=function(candidato)
	{
		cand.sumar(candidato);
		alert(candidato.nombre);

	};

	scope.abrirVentana = function (url){
		var a = document.createElement("a");
		//a.target = "_blank";
		a.href = url;
		a.click();
	};

	scope.agregarpersonas = function (persona) {
		// if (scope.nuevapersona.id) {
		// 	let index = scope.personas.findIndex(item => item.id == scope.nuevapersona.id)
		// 	scope.personas[index] = angular.copy(scope.nuevapersona)
		// } else {
		// 	scope.nuevapersona.id = Math.random();
		// 	scope.personas.push($scope.nuevapersona);
		// }
		// scope.nuevapersona = {};
		scope.valid=crud.buscar(persona);
		if(scope.valid){
			alert("Ya has votado");
		}
		else {
			alert("Puedes realizar tu voto \n recuerda que esta accion solo se puede realizar una vez");
			scope.persona.id = Math.random();
			crud.agregar(persona);
			scope.personas = crud.listar();
			scope.nuevapersona = {};
			scope.acceso = 1;
			window.close();
			window.open("./contenidos.html");
		}
		/*
		if (persona.id) {
			alert("Hola");
			crud.actualizar(persona);
		} else {
			
		}*/
		
	};	

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
};

ctrlFirst.$inject = [
	'$scope',
	'servCru',
	'servCandidatos'
];

function servicioCandidatos() {
	let candidatos=[
		{
			id:1,
			nombre:"construccion",
			avatar:"palana.jpeg",
			numvotos:0

		},
		{
			id:2,
			nombre:"onepiece",
			avatar:"sombrero.jpeg",
			numvotos:0
		},
		{
			id:3,
			nombre:"gallocarmelo",
			avatar:"gallo.jpeg",
			numvotos:0

		}
	];
	this.obtener = () => {
		return candidatos;
	};
	this.sumar=(candidato)=>{
		candidatos.forEach((item,key)=>{
			if(item.nombre===candidato.nombre)
			{
				console.log("votos antes= "+candidatos[key].numvotos);
				candidatos[key].numvotos++;
				console.log("votos despues= "+candidatos[key].numvotos);
			}
		});
	}

};

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
		let bandera = false;
		personas.forEach((item,key) => {
			if (item.dni === persona.dni) {
				bandera = true;
			}
		});
			return bandera;
	};
};

angular.module("app")
	.controller("FirstController", ctrlFirst)
	.service("servCru",servicioCrud)
	.service('servCandidatos', servicioCandidatos)