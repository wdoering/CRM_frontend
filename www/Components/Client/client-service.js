angular.module('CRM').service('ClientService', function($http, SERVER_URL){
  var urlClient = "/client";
  return {
      all: function(){
        return [{"id":3,"cnpj":123111111,"tradeName":"STATIC Fantasy Company","legalName":"Fantasia LTDA.","stateRegistrationNumber":"123456","primaryContactName":"Swagner","street":"uno st.","addressNumber":"111","neighborhood":"vila sapo","city":"sao hell","stateID":1,"postalCode":"1283123","email":"wagnerdoering@trololo.com"},
                {"id":24,"cnpj":5,"tradeName":"5STATIC","legalName":"5","stateRegistrationNumber":"5","primaryContactName":"5","street":"55","addressNumber":"5","neighborhood":"5","city":"5","stateID":5,"postalCode":"5","email":"5"},
                {"id":25,"cnpj":7,"tradeName":"STATIC7","legalName":"7","stateRegistrationNumber":"7","primaryContactName":"7","street":"7","addressNumber":"7","neighborhood":"7","city":"7","stateID":7,"postalCode":"7","email":"7"},
                {"id":26,"cnpj":8,"tradeName":"STATIC8","legalName":"8","stateRegistrationNumber":"8","primaryContactName":"8","street":"8","addressNumber":"8","neighborhood":"8","city":"8","stateID":8,"postalCode":"8","email":"8"}];
      },
      
      getClients: function(){
          console.log(SERVER_URL);
        return $http.get(SERVER_URL + urlClient);
      },

      submitNewClient : function(clientData){
        return $http.post(SERVER_URL + urlClient, clientData);
      },

      deleteClient : function(clientId){
        return $http.delete(SERVER_URL + urlClient + "?id=" + clientId); 
      },

      fetchIndex : function (objList,clientId) {
        var indexofObject = -1;
        angular.forEach(objList, function(client) {
             if(clientId === client.id){
                console.log(objList.indexOf(client));
                indexofObject = objList.indexOf(client);
             }
        });
        return indexofObject;
      }


  }

})