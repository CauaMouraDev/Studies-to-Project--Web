function FpC(F) {
  var Celcius = ((F - 32) * 5) / 9;
  return Celcius;
}

function CpF(C) {
  var Fahrenheit = (C * 9) / 5 + 32;
  return Fahrenheit;
}

var tempF = 100;
var cel = FpC(tempF);
console.log("A temperatura em Celsius é: " + cel + "°C");


var tempC = 35;
var far = CpF(tempC);
console.log("A temperatura em Fahrenheit é: " + far + "°F");
