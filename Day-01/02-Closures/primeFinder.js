//Write a function that determines if the given number is a prime number or not.

function getIsPrime(){
	var cache={};
	function checkPrime(n){
		console.log("Finding prime or not...");
		if (n <= 3) return true;
		for(var i = 2; i <= (n/2); i++)
			if (n % i === 0) return false;
		return true;
	}
	function isPrime(n){
		if (typeof cache[n] === "undefined")
			cache[n] = checkPrime(n);
		return cache[n];
	}
	return isPrime;
}
var isPrime = getIsPrime();
isPrime(100);
