function validateform(){
    var flag = true;
    var age=document.forms['MyForm']['user_age'].value;
    var foot=document.forms['MyForm']['user_foot'].value;
    var inch=document.forms['MyForm']['user_inch'].value;
    var weight=document.forms['MyForm']['user_weight'].value;

    var NumberPattern=/^(?:1[0-1][0-9]|[1-9]?[0-9])$/;

    var age_error=document.getElementById("AgeError");
    var weight_error=document.getElementById("WeightError");
    



    if(age==""){
        age_error.style.display="block";
        age_error.style.color="red";
         flag = false;
    }else if(!age.match(NumberPattern)){
        age_error.style.display="block";
        age_error.style.color="red";
        flag = false;

    }else if(age >= 1 && age<=100)
    {
        age_error.style.display="none";
        
    }else{
        age_error.style.display="block";
        age_error.style.color="red";

        flag = false;
    }


    if(weight==""){
        weight_error.style.display="block";
        flag = false;

    }else if(!weight.match(NumberPattern)){
        weight_error.style.display="block";
        flag = false;


    }else if(weight >=1 && weight <=200){
        weight_error.style.display="none";
    }
    else{
        weight_error.style.display="block";
        flag = false;
    }
    return flag;



    

}
console.log("hello");