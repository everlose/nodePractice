//数学辅助函数
var factorial = exports.factorial = function(n) {
	var facArr = [0, 1];
	return (function(){
		var nFac = facArr[n];
		return nFac ? nFac : (facArr[n] = n * factorial(n-1));
	})();
}

var fibonacci = exports.fibonacci = function(n) {
	var fibArr = [0, 1, 1];

	return (function(){
		var nFib = fibArr[n];
		return (nFib !== void 0) ? nFib : (fibArr[n] = fibonacci(n-1) + fibonacci(n-2));
	})();
}