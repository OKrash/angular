var app=angular.module("MiPrimeraApp",[]);
app.controller("PrimerControlador",function($scope){
	$scope.nombre="Oscar";
	$scope.nuevaPersona={};
	$scope.personas =[
		{
			nombre:"Juan",
			apellido:"Perez",
			edad :12
		},
		{
			nombre:"Pedro",
			apellido:"Leyton",
			edad:15
		}
	];
	$scope.agregarPersona = function(){
		$scope.personas.push($scope.nuevaPersona);
		$scope.nuevaPersona={};
	}
});