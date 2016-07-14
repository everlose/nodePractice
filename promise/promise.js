var PENDING = 0; //待定
var FULFILLED = 1; //完成
var REJECTED = 2; //拒绝

/**
 * Check if a value is a Promise and, if it is,
 * return the `then` method of that promise.
 *
 * @param {Promise|Any} value
 * @return {Function|Null}
 */
var getThen = function (value) {
	var t = typeof value;
	if (value && (t === 'object' || t === 'function')) {
		var then = value.then;
		if (typeof then === 'function') {
			return then;
		}
	}
	return null;
};

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 *
 * @param {Function} fn A resolver function that may not be trusted
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 */
var doResolve = function (fn, onFulfilled, onRejected) {
	var done = false;
	try {
		fn(function (value) {
			if (done) {
				return;
			}
			done = true;
			onFulfilled(value);
		}, function (reason) {
			if (done) {
				return;
			}
			done = true;
			onRejected(reason);
		})
	} catch (ex) {
		if (done) {
			return;
		}
		done = true;
		onRejected(ex);
	}
}

var Promise = function () {
	//状态
	var state = PENDING;

	//FULFILLED和REJECTED的值
	var value = null;

	// store sucess & failure handlers attached by calling .then or .done
	var handlers = [];

	var fulfill = function (result) {
		state = FULFILLED;
		value = result;
	};

	var reject = function(error) {
		state = REJECTED;
		value = error;
	};

	var resolve = function (result) {
		try {
			var then = getThen(result);
			if (then) {
				doResolve(then.bind(result), resolve, reject);
				return;
			}
			fulfill(result);
		} catch (e) {
			reject(e);
		}
	}

};