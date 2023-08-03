// var bmi;

function validateform(){
    event.preventDefault();
    var flag = true;

    //input fields value
    var age=document.forms['MyForm']['user_age'].value;
    var foot=document.forms['MyForm']['user_foot'].value;
    var inch=document.forms['MyForm']['user_inch'].value;
    var weight=document.forms['MyForm']['user_weight'].value;

     //Errors
    var age_error=document.getElementById("AgeError");
    var weight_error=document.getElementById("WeightError");
    var  height_error_ft=document.getElementById("height_Error_ft");
    var  height_Error_in=document.getElementById("height_Error_in");
    
    //age validation
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

    //foot validation
    if(foot==""){
        height_error_ft.style.display="block";
        height_error_ft.style.color="red";
        flag = false;

    }else if(foot>=1 &&  foot<=9){
        height_error_ft.style.display="none";
    }
    else{
        height_error_ft.style.display="block";
        height_error_ft.style.color="red";
        flag = false;
    }

    //inch validation 
    if(inch === "" && foot != ""){
        inch=0;
        // document.getElementById("inch").value = parseInt(0);
        // console.log("incdhjhd"+inch);
       
    }else if(inch<=12){
        height_Error_in.style.display="none";
       
    }else{
        height_Error_in.style.display="block";
        height_Error_in.style.color="red";
      
        flag = false;

    }
    
    //weight validation
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
     
    //convert foot into meters
    var heightInCm = parseInt(foot) * 0.3048 + parseInt(inch) * 0.0254;
      var bmi = BMI_cal(heightInCm, parseFloat(weight));
      return flag;
      
    }
    // console.log("BMI = " + bmi);


    // var bmi;
    function BMI_cal(height,weight){
        
        var  bmi = weight / (height * height);
        
        var result = document.getElementById("result");
    result.innerHTML = "Your BMI: " + bmi.toFixed(2);
        // result.style.color="green";
        result.style.backgroundColor="yellow";
        chart_create(bmi);
}
//javascript chart



function chart_create(bmi)
{


am5.ready(function() {

  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");
  
  
  // Set themes
  // https://www.amcharts.com/docs/v5/concepts/themes/
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "none",
    wheelY: "none",
    layout: root.verticalLayout,
    paddingRight: 30
  }));
  
  
  // Add legend
  // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
  var legend = chart.children.push(
    am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    })
  );
  var data=[];
  var TF=[];
   var color1=[]
  var v=Math.ceil(bmi);
  for( var i=0; i<60; i++){
   
       if(i === v){
        TF[i]=true;
      }else{
        TF[i]=false;
      }
      if(i>=1 && i<19){
        color1[i]=am5.color(0xfcc034);
      }else  if(i >=19 && i<25){
        color1[i]=am5.color(0x6baaa2);
      }else if(i>=25 && i<30){
        color1[i]=am5.color(0xDC4BF3);
      }else if(i>=30 && i <36){
        color1[i]=am5.color(0x6bc352);
      }
      else if(i>=36 && i<60){
        color1[i]=am5.color(0xc6251a);

      }
    }
    


 for( var i=0; i<60; i++){
  data.push({category:i,value:100,currentBullet:TF[i],columnSettings:{ fill:color1[i]}});

}
console.log(data);
  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {
  
    }),
    tooltip: am5.Tooltip.new(root, {})
  }));
  
  var xRenderer = xAxis.get("renderer");
  
  xRenderer.grid.template.set("forceHidden", true);
  xRenderer.labels.template.set("forceHidden", true);
  
  xAxis.data.setAll(data);
  
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    min: 0,
    max: 400,
    strictMinMax: true,
    renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  var yRenderer = yAxis.get("renderer");
  
  yRenderer.grid.template.set("forceHidden", true);
  yRenderer.labels.template.set("forceHidden", true);
  
  
  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    maskBullets: false
  }));
  
  series.columns.template.setAll({
    //tooltipText: "{categoryX}: {valueY}",
    width: am5.p100,
    tooltipY: 0,
    strokeOpacity: 1,
    strokeWidth:2,
    stroke:am5.color(0xffffff),
    templateField: "columnSettings"
  });
  
  series.bullets.push(function(root, target, dataItem) {
    if (dataItem.dataContext.currentBullet) {
      var container = am5.Container.new(root, {});
      
      var pin = container.children.push(am5.Graphics.new(root, {
        fill: dataItem.dataContext.columnSettings.fill,
        dy: -5,
        centerY: am5.p100,
        centerX: am5.p50,
        svgPath: "M66.9 41.8c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4 0 11.3 20.4 32.4 20.4 32.4s20.4-21.1 20.4-32.4zM37 41.4c0-5.2 4.3-9.5 9.5-9.5s9.5 4.2 9.5 9.5c0 5.2-4.2 9.5-9.5 9.5-5.2 0-9.5-4.3-9.5-9.5z"
      }));
      
      var label = container.children.push(am5.Label.new(root, {
        text: dataItem.get("categoryX"),
        dy: -38,
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          cornerRadiusTL: 20,
          cornerRadiusTR: 20,
          cornerRadiusBR: 20,
          cornerRadiusBL: 20,
        })
      }));
      
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: container
      });
    }
    else if (dataItem.dataContext.targetBullet) {
      var container = am5.Container.new(root, {
        dx: 15
      });
      
      var circle = container.children.push(am5.Circle.new(root, {
        radius: 34,
        fill: am5.color(0x11326d),
      }));
      
      var label = container.children.push(am5.Label.new(root, {
        text: "GOAL\n[bold]ZERO[/]",
        textAlign: "center",
        //fontSize: "10",
        fill: am5.color(0xffffff),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true,
      }));
      return am5.Bullet.new(root, {
        locationY: 0.5,
        sprite: container
      });
    }
    return false;
  });
  
  series.data.setAll(data);

  // function addAxisLabel(startCategory, endCategory, text) {
  //   var rangeDataItem = xAxis.makeDataItem({
  //     category: (startCategory + endCategory) / 2 // Calculate the midpoint of the range
  //   });
  
  //   var range = xAxis.createAxisRange(rangeDataItem);
  
  //   // Set the range for the axis
  //   range.value = startCategory;
  //   range.endValue = endCategory;
  
  //   range.get("label").setAll({
  //     //fill: am5.color(0xffffff),
  //     text: text,
  //     forceHidden: false
  //   });
  
  //   range.get("grid").setAll({
  //     //stroke: color,
  //     strokeOpacity: 1,
  //     location: 1
  //   });
  // }
  
  
   // Add labels
  // function addAxisLabel(startval,endValue,text) {
  //   var rangeDataItem = xAxis.makeDataItem({
  //     category: (startval+endValue)
  //   });
    
  //   var range = xAxis.createAxisRange(rangeDataItem);
  
  //   range.get("label").setAll({
  //     //fill: am5.color(0xffffff),
  //     text: text,
  //     forceHidden: false
  //   });
  
  //   range.get("grid").setAll({
  //     //stroke: color,
  //     strokeOpacity: 1,
  //     location: 1
  //   });
  // }

// addAxisLabel(v[i]-29, v[i]-33, "Obesity");
// addAxisLabel(v[i]-24, v[i]-29, "Overweight");
// addAxisLabel(v[i]-18, v[i]-24, "Normal");
// addAxisLabel(v[i]-1, v-[i]-18, "Underweight");

function addAxisLabel(category,text) {
  var rangeDataItem = xAxis.makeDataItem({
    category: category
  });
  
  var range = xAxis.createAxisRange(rangeDataItem);
  
  range.get("label").setAll({
    //fill: am5.color(0xffffff),
    text: text,
    forceHidden: false
  });
  
  range.get("grid").setAll({
    //stroke: color,
    strokeOpacity: 1,
    location: 1
  });
}

addAxisLabel(35, " Morbid obesity");
addAxisLabel(29, "Obesity");
addAxisLabel(24 ,"Overweight");
addAxisLabel(19 ,"Normal");
addAxisLabel(1,"Underweight");

  

  
  

  
  
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000, 100);
  chart.appear(1000, 100);
  
  }); // end am5.ready()
}