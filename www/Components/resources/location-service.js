angular.module('CRM').service('LocationService', function($http){
	return{
		statesBR: function(){
			return [
				{id:1, shortName:"AC", longName:"Acre"},
				{id:2, shortName:"AL", longName:"Alagoas"},
				{id:3, shortName:"AM", longName:"Amazonas"},
				{id:4, shortName:"AP", longName:"Amapá"},
				{id:5, shortName:"BA", longName:"Bahia"},
				{id:6, shortName:"CE", longName:"Ceará"},
				{id:7, shortName:"DF", longName:"Distrito Federal"},
				{id:8, shortName:"ES", longName:"Espírito Santo"},
				{id:9, shortName:"GO", longName:"Goiás"},
				{id:10, shortName:"MA", longName:"Maranhão"},
				{id:11, shortName:"MG", longName:"Minas Gerais"},
				{id:12, shortName:"MS", longName:"Mato Grosso do Sul"},
				{id:13, shortName:"MT", longName:"Mato Grosso"},
				{id:14, shortName:"PA", longName:"Pará"},
				{id:15, shortName:"PB", longName:"Paraíba"},
				{id:16, shortName:"PE", longName:"Pernambuco"},
				{id:17, shortName:"PI", longName:"Piauí"},
				{id:18, shortName:"PR", longName:"Paraná"},
				{id:19, shortName:"RJ", longName:"Rio de Janeiro"},
				{id:20, shortName:"RN", longName:"Rio Grande do Norte"},
				{id:21, shortName:"RO", longName:"Rondônia"},
				{id:22, shortName:"RR", longName:"Roraima"},
				{id:23, shortName:"RS", longName:"Rio Grande do Sul"},
				{id:24, shortName:"SC", longName:"Santa Catarina"},
				{id:25, shortName:"SE", longName:"Sergipe"},
				{id:26, shortName:"SP", longName:"São Paulo"},
				{id:27, shortName:"TO", longName:"Tocantins"}
			]
		}
		
	}	
	
})