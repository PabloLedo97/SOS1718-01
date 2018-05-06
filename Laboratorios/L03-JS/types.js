
console.log("Hello World!!");

var myInteger = 1;
var myDouble = 1.2;
var myString = "mystring";
var myBoolean = true;

myString = myString + " is good ";
myString += "and 'great' ";
myString += 'and "fancy" ';


console.log(myString);

if(myInteger === myDouble)  
    console.log("The same 1")
    
if(myInteger === parseInt(myDouble,0))
    console.log("The same 2")
    
myString = parseInt(myString);
console.log(myString);

myString = parseInt("2") + 1;
console.log(myString);

myString = parseInt("2" + 1);
console.log(myString);
