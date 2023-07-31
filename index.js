function validateform(){
    var flag = true;
    var age=document.forms['MyForm']['user_age'].value;
    var foot=document.forms['MyForm']['user_foot'].value;
    var inch=document.forms['MyForm']['user_inch'].value;
    var weight=document.forms['MyForm']['user_weight'].value;


    var age_error=document.getElementById("AgeError");
    var weight_error=document.getElementById("WeightError");
    var  height_error_ft=document.getElementById("height_Error_ft");
    var  height_Error_in=document.getElementById("height_Error_in");
    



    if(age==""){
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

    if(foot==""){
        height_error_ft.style.display="block";
        height_error_ft.style.color="red";
        flag = false;

    }else if(foot<=9){
        height_error_ft.style.display="none";
    }
    else{
        height_error_ft.style.display="block";
        height_error_ft.style.color="red";
        flag = false;
    }
     
    if(inch==""){
        height_Error_in.style.display="block";
        height_Error_in.style.color="red";
        flag = false;
    }else if(inch<=12){
        height_Error_in.style.display="none";
    }else{
        height_Error_in.style.display="block";
        height_Error_in.style.color="red";
    }

    if(weight==""){
        weight_error.style.display="block";
        weight_error.style.color="red";

        flag = false;
    }else if(weight >=1 && weight <=200){
        weight_error.style.display="none";
    }
    else{
        weight_error.style.display="block";
        weight_error.style.color="red";
        flag = false;
    }
    return flag;
}



    

    // console.log(flag);