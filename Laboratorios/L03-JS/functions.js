function log(message1, message2){
    
    for(var i = 0; i<arguments.length; i++){
        console.log("%s > %s", Date(),arguments[i] );
    }
}

log("Hey!", "one", "two");

var c1 = new Object();

c1.name = "Peter";
c1.phone = 123456;
var c2 = {"name": "paul", "phone": 6789};

c1.print = function(){
    log(this.name, this.phone);
}

c1.print();


var numbers = [1,2,3,4,5];

function printNumber(n){
    console.log(n);
}

for (var i=0;i<numbers.length;i++){
    console.log(numbers[i]);
}


numbers.forEach(printNumber);


numbers.forEach(function(n){
    console.log(n);
});


numbers.forEach((n) => {
    console.log(n);
});
console.log("-----");

numbers.map((n) => {
    return (n+2);
}).filter((n) => {
    return (n<10);
}).forEach((n) => {
    console.log(n);
});


var sum = numbers.reduce((a,n) => {
    return a+n;
});

console.log(sum);

