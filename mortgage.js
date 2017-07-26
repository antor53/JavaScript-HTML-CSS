 //********************************************************************************//
    //* Name : Mahmudul Islam Mahmud                                                 *//
    //* zenit login : int222_161f14                                                  *//
    //********************************************************************************//
    //********************************************************************************//
    //*   Do not modify any statements in detailPaymentCalculation function          *//
    //********************************************************************************//

function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) {

    //********************************************************************************//
    //*   This function calculates the monthly payment based on the following:       *//
    //*                                                                              *//
    //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
    //*                                                                              *//
    //*   Note: This function also updates the payment amount on the form            *//
    //********************************************************************************//
     var paymentError = "";
     var v = mortAmount * 1;
     var d = mortDownPayment * 1;
     var i = mortRate * 1;
     var y = mortAmortization * 1;
     var a = v - d;
         i = i/100/12;
         n = y * 12;
     var f = Math.pow((1+i),n);

     var p = (a * ((i*f)/(f-1))).toFixed(2);

     if (p=="NaN" || p=="Infinity") {
         document.forms[0].payment.value = "";
     }
     else {
           document.forms[0].payment.value = p;
     }

} // End of detailPaymentCalculation function


function calculatePayment() { 
		var errorMessage = "";
		var error = "";
		var msg = "";
		var msgError = "";	
		var detpaycal = "";
		errorMessage = validatePropValue(errorMessage);
		error = downPaymentValidate(error);
		msg = intRateValidate(msg);
		msgError = amortizationValidate(msgError);
	   
	   if (errorMessage !== "" || error !== "" || msg != "" || msgError != ""){
		   
		    displayError(errorMessage);
			errorDisplay(error);
			intRateError(msg);
			AmortError(msgError);
			return false;
	   }else{
		   var mortAmount = document.getElementById("propValue").value;
		   var mortDownPayment = document.getElementById("downPay").value;
		   var mortRate = document.getElementById("intRate").value;
		   var mortAmortization = document.getElementById("amortization").value;
		   detpaycal= detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization);
		   
		   return document.getElementById("payment").innerHTML = detpaycal;
	   }

}// End of calculatePayment function


     function formValidation() {
       var errMessages = ""; 
		var errMessage = "";
		var detectedError = "";
		var wrongLocation = "";
		var propTypeError = "";
		var replyError = "";
		var err = "";
		var calculation = "";
		
	   calculation = calculatePayment() ;
       errMessages = validateUserId(errMessages);
	   errMessage =  validateUserName(errMessage);
	   detectedError = ValidateIncome(detectedError);
	   wrongLocation = validatePropLocation(wrongLocation);
	   propTypeError = validatePropDetails(propTypeError);
	   replyError = validateMortYear(replyError);
	   err = validateMortMonth(err);
	   
	   
	   if (errMessages !== "" || errMessage !== "" || detectedError !== "" || wrongLocation != "" || propTypeError !=""
									|| 	replyError !="" || err != "" ) {         
          showErrors(errMessages);
		  showError(errMessage);
		 
		  errorDetected(detectedError);
		  LocationError(wrongLocation);
		  TypeError(propTypeError);
		  ErrorMsg(replyError);
		  monthError(err);
		  
          return false;               
       }  	else{
		   calculatePayment();
		   var client = document.getElementById("userId").value;
		   client = client.charAt(0).toUpperCase()+client.slice(1);
		   var js = document.getElementById("jsActive").value;
		   js = Y;
		   return true;
	   }                                                           
       
     }// End of completeFormValidation


     function validateUserId(errMessages) {

       var stringName = document.getElementById("userId").value;
       stringName = stringName.trim();
       var hypen = stringName.charAt(4);
       var stringLength = stringName.length;
		
		var add= "";

       if (stringLength !== 10) { 
           errMessages += "<p><mark>Client ID</mark> - Please, Enter exactly 10 Characters <br/></p>";
       }   
       else  { 
           if (hypen !== "-") {
               errMessages += "<p><mark>Client ID</mark> - Please follow this pattern ####-##### <br /></p>";
           } 
           else {                 
               var countAlpha = 0;                  
               for (var i=0;i<stringLength;i++ ) {
				   if(i==4){
					   continue;
				   }
                   if (! ( (stringName.charCodeAt(i) > 47) && (stringName.charCodeAt(i) < 58) ) ) { 
                         countAlpha++
                         break;
                   }   
               }	 
               if  (countAlpha) {
                   errMessages +="<p><mark>Client ID</mark> - Please enter digits only <br/></p>";
               }	
					var sum = "";
				   for( var count=0;count<4;count++){
					   var l=stringName.charAt(count);
					   sum +=l;
				   }
				   if(sum <= 0){
					  errMessages +="<p><mark>Client ID</mark> - Sum of first four must be greater than 0 <br/></p>"; 
				   }else{
								for(var j=0;j<5;j++){
							   var k =stringName.charAt(j+5);
							   add +=k;
							}
					   if(add <(sum + 2)){
						   errMessages +="<p><mark>Client ID</mark> - Sum of last five must be greater than first four plus 2<br/></p>";
					   }
				   }  
			   }
           }
       
	   
				  
			   
       return errMessages;

     }  
	 
	 //end of client id validation
	function validateUserName(errMessage) {

       var userName = document.getElementById("client").value;
       userName = userName.trim();
       var stringLength = userName.length;

       if (stringLength < 3) { 
           errMessage += "<p><mark>Client Name</mark> - Please, Enter at least 3 Characters <br/></p>";
       }   
       else  {                 
               var countnonAlpha = 0;                  
               for (var i=0;i<stringLength;i++ ) {
                   if (! ( ((userName.charCodeAt(i) > 64) && (userName.charCodeAt(i) < 91) )||((userName.charCodeAt(i) > 96) && (userName.charCodeAt(i) < 123) ) ||(userName.charCodeAt(i) == 39)  ) ) { 
                         countnonAlpha++
                         break;
                   }   
               }	 
               if  (countnonAlpha) {
                   errMessage +="<p><mark>Client Name</mark><br /> - Please enter letters only <br/></p>";
               }
           }
       
       return errMessage;

     }  
	 //end of the client name validation
	 
	 function validatePropValue(errorMessage){
			var propVal = document.getElementById("propValue").value;
			propVal = propVal.trim();
			if(isNaN(propVal)){
				errorMessage +="<p><mark>Property Value</mark> -Invalid Amount</p>";
			}else{
				if(propVal <(65000 + (1/5 * propVal))){
					errorMessage +="<p><mark>Property Value</mark> -Please, Enter a Valid Amount</p>";
				}
			}	
			
		return errorMessage;	
	 }
	 //end of property value validation
	 function downPaymentValidate(error){
		 var downPayment = document.getElementById("downPay").value;
		 downPayment = downPayment.trim();
		 if(isNaN(downPayment)){
			 error +="<p><mark>Down Pay</mark> -Please, Enter a Valid Amount</p>";
		 }
		 else{
			 if(downPayment <(1/5 * document.getElementById("propValue").value)){
				error +="<p><mark>Down pay</mark> -At least 20% payment of property value to be made</p>";
			}else{
				if(downPayment > document.getElementById("propValue").value - 65000){
						error +="<p><mark>Down pay</mark> -Down payment must be less than $65000 of the property value</p>";
				}
			}
		}
	 
		 return error;
	 }

	//end of downpayment validation
	
	      function ValidateIncome(detectedError){
                var menuList = document.getElementById("income");
                if(! menuList.value){
                    detectedError +="<p><mark>Income Range</mark> - Selection of an income range is required</p>";
                }
				return detectedError;
            }
	//end of incomeRange validation
			
			function validatePropLocation(wrongLocation){
				var checkedElement = document.getElementById("propLocation");
				if(!checkedElement.value){
					wrongLocation += "<p><mark>Location</mark> - You must choose a Location</p>";
				}
				return wrongLocation;
			}
			
	//end of location validation
		
		
			function validatePropDetails(propTypeError){
				var radioButtons = document.getElementsByName("propDetails");
				var NoOfButtons = radioButtons.length;
				var checkedButton = "";
				var count = 0;
				for( count ;count < NoOfButtons; count++){
					if(radioButtons[count].checked ===true){
					checkedButton = radioButtons[count].value;
					}
				}
				if(checkedButton === "" ){
					propTypeError = "<p><mark>Property Type</mark> - Please, select a property type</p>";
				}
				return propTypeError;
			}
			
	//end of validation of property details
	
			function validateMortYear(replyError){
				var year = document.getElementById("mortYear").value;
				var myDate = new Date();
				if(year < myDate.getFullYear() || year >(myDate.getFullYear() + 1)){
					
					replyError +="<p><mark>Year</mark> - Please, Enter this year or Next year</p>";
				}
				return replyError;
			}
	//end of validation of mortYear
	
			function validateMortMonth(err){
				var month = document.getElementById("mortMonth").value;
				var myDate = new Date();
				if(month < myDate.getMonth() || month >(myDate.getMonth() + 1)){
					
					err +="<p><mark>Month</mark> - Please, Enter the current month or next month</p>";
				}
				return err;
			}
	//end of validation of month error
	
			function intRateValidate(msg){
				var rate = document.getElementById("intRate").value;
				rate = rate.trim();
				if(isNaN(rate) || rate == ""){
				msg +="<p><mark>Interest Rate</mark> -Please, Enter a Valid Amount</p>";
				}else{
					if(rate<3 || rate >16){
						msg +="<p><mark>Interest Rate</mark> - Interest rate must be in range of 3 - 16 %</p>";
					}
				}
				 return msg;
			}
	
		//end of intRate validation
		
			function amortizationValidate(msgError){
				var amortization = document.getElementById("amortization").value;
				amortization = amortization.trim();
				if(isNaN(amortization) || amortization == ""){
				msgError +="<p><mark>Amortization</mark> -Please, Enter a Valid Amount</p>";
				}else{
					if(amortization<5 || amortization >20){
						msgError +="<p><mark>Amortization</mark> - Mortgage can be made 5 to 20 years</p>";
					}
				}
				 return msgError;
			}
	
     function showErrors(messages) {
        document.getElementById('ID').innerHTML = messages;

     } 
	function showError(message) {
        document.getElementById('name').innerHTML = message;
     } 
	 function displayError(error) {
        document.getElementById('pval').innerHTML = error;
     } 
	 function errorDisplay(errMsg) {
        document.getElementById('downP').innerHTML = errMsg;
     } 
	 
	 function errorDetected(msg){
		 document.getElementById("incomeRange").innerHTML = msg;
	 }
	 
	 function LocationError(err){
		 document.getElementById("location").innerHTML = err;
	 }
	 
	 function TypeError(error){
		 document.getElementById("ptype").innerHTML = error;
	 }
	 function ErrorMsg(replyErr){
		 document.getElementById("yyyy").innerHTML = replyErr;
	 }
	 function monthError(Error){
		 document.getElementById("mm").innerHTML = Error;
	 }
	 function intRateError(showError){
		 document.getElementById("rate").innerHTML = showError;
	 }
	 
	 function AmortError(showErr){
		 document.getElementById("amort").innerHTML = showErr;
	 }
 
 
     function  clearShowErrors() {

            
     }