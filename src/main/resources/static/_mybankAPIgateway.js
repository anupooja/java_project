	var _mybankAPIgateway = angular.module('_mybankAPIgateway', []); 

	_mybankAPIgateway.controller('_mybankAPIgatewayController', function ($scope, $http) {
	
	$scope.customer = {};
	$scope.customer.eventlog = {};
	
	$scope.showeventlog = 0; //bydefault hide the event log

	$scope.data = {
	
						query:"SELECT CONCAT( " + 
								" '[', " + 
							" GROUP_CONCAT(JSON_OBJECT(%fields%)), " +
								"']'" + 
								") as jsonresult from %TABLE_NAME%;" 
								 ,
						querytype:0,
						queryresponse:"",
								 
						};
						
	$scope.data.querytemplate = {
									"create": "INSERT INTO %TABLE_NAME% (%fields%) VALUES (%values%);", 
									"delete":"DELETE FROM %TABLE_NAME% WHERE _ID in ( %ID_LIST% );",
									"update":"UPDATE %TABLE_NAME% SET %fields% WHERE _id = %_ID%;",
									"read":"SELECT CONCAT( '[', GROUP_CONCAT(JSON_OBJECT(%fields%)),']') as jsonresult from  %TABLE_NAME% ;"
								};
	
	$scope.data.customer = {
								"tablename":"customer",
								"insertfields":"name,email,phone,feedback",
								"selectfields":"'_id',_id,'name',name,'email',email,'phone',phone,'feedback',feedback"
							};
	
							
		$scope.customer.executequery = function () 
		{
			//alert("execute query called");
			
			$http({
						method: 'GET',
						url: 'http://localhost:8083/getcustomer?name=a&email=ab@gmail&phone=2345&feedback=thank',
						dataType: 'json',
						data: {query: $scope.data.query,
								querytype: $scope.data.querytype},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.data.queryresponse = response.data;
							//alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
							
							
						  });
			
		}; //executequery function
		
		
		$scope.data.customer.insertquery = function () 
		{
			//alert("execute query called");
			
			$http({
						method: 'GET',
						url: 'http://localhost:8083/getcustomer?name=a&email=ab@gmail&phone=2345&feedback=thank',
						dataType: 'json',
						data: {query: $scope.data.query,
								querytype: $scope.data.querytype},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.data.queryresponse = response.data;
							//alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
							
							
						  });

		
		/*$scope.data.customer.insertquery = function () 
		{
			var fieldvalues = "";
			$scope.data.query = $scope.data.querytemplate.create;
			$scope.data.querytype = 1;
			
			$scope.data.query  = $scope.data.query.replace(/%TABLE_NAME%/, $scope.data.customer.tablename);
			
			$scope.data.query  = $scope.data.query.replace(/%fields%/, $scope.data.customer.insertfields);
			
			fieldvalues = "'" + $scope.form.cname + "'" + "," +"'"+ $scope.form.email +"'" +","+"'" + $scope.form.contact + "'"+","+"'"+ + $scope.form.message + +"'";
			
			$scope.data.query  = $scope.data.query.replace(/%values%/, fieldvalues);
			
			$scope.customer.executequery(); 
			
			
		}; //insertquery function */
		
		$scope.data.customer.vieweventlog = function()
		{
			alert($scope.data.eventquery);
			$scope.showeventlog = 1; 
			
			$http({
						method: 'GET',
						url: 'http://localhost:8083/getcustomer?name=a&email=ab@gmail&phone=2345&feedback=thank',
						dataType: 'json',
						data: {query: $scope.data.eventquery,
								querytype: 0},
						headers: { 'Content-Type': 'application/json; charset=UTF-8' }
					}).then(function successCallback(response) {
							// this callback will be called asynchronously
							// when the response is available
							$scope.msg = "Post Data Submitted Successfully!";
							$scope.customer.eventlog = response.data;
							alert(response.data);
							
						  }, function errorCallback(response) {
							$scope.msg = "Service not Exists." + response.data;
							$scope.statusval = response.status;
							$scope.statustext = response.statusText;
							$scope.headers = response.headers();
						  });
						  
		}//account event log
		
		$scope.hideeventlog = function()
		{
			$scope.showeventlog = 0;
		}

	}); /*mainApp.dataController*/