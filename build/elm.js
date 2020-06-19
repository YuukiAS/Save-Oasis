(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $author$project$Message$LinkClicked = function (a) {
	return {$: 'LinkClicked', a: a};
};
var $author$project$Message$UrlChanged = function (a) {
	return {$: 'UrlChanged', a: a};
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$application = _Browser_application;
var $author$project$Model$Clover = F3(
	function (leftClover, rightClover, upClover) {
		return {leftClover: leftClover, rightClover: rightClover, upClover: upClover};
	});
var $author$project$Model$Home = {$: 'Home'};
var $author$project$Outlooks$Initi = {$: 'Initi'};
var $author$project$Outlooks$Normal = {$: 'Normal'};
var $author$project$Outlooks$Quite = {$: 'Quite'};
var $author$project$Outlooks$Red = {$: 'Red'};
var $author$project$Model$Stopped = {$: 'Stopped'};
var $author$project$Outlooks$TheOasis = {$: 'TheOasis'};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Model$Keys = function (enter) {
	return function (left) {
		return function (right) {
			return function (a) {
				return function (d) {
					return function (one) {
						return function (two) {
							return function (three) {
								return function (four) {
									return function (five) {
										return function (six) {
											return function (seven) {
												return function (eight) {
													return function (nine) {
														return function (ten) {
															return {a: a, d: d, eight: eight, enter: enter, five: five, four: four, left: left, nine: nine, one: one, right: right, seven: seven, six: six, ten: ten, three: three, two: two};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var $author$project$Model$nokeys = $author$project$Model$Keys(false)(false)(false)(false)(false)(false)(false)(false)(false)(false)(false)(false)(false)(false)(false);
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Model$AttackState = F2(
	function (ongoing, success) {
		return {ongoing: ongoing, success: success};
	});
var $author$project$Model$ongoingAttack = A2($author$project$Model$AttackState, true, false);
var $author$project$Outlooks$page1 = 'assets/booklet/1.jpg';
var $author$project$Model$initial = F3(
	function (flags, url, key) {
		return _Utils_Tuple2(
			{
				attack: $author$project$Model$ongoingAttack,
				ball_vx: -3.0,
				ball_vy: -3.0,
				ball_x: 47,
				ball_y: 35,
				block_vx: 3,
				block_vy: 1.5,
				block_x: 10,
				block_y: 10,
				blueLeaves: _List_fromArray(
					[
						_Utils_Tuple2(0, 4),
						_Utils_Tuple2(1, 4),
						_Utils_Tuple2(2, 4),
						_Utils_Tuple2(3, 4),
						_Utils_Tuple2(4, 4),
						_Utils_Tuple2(5, 4),
						_Utils_Tuple2(6, 4),
						_Utils_Tuple2(7, 4),
						_Utils_Tuple2(8, 4),
						_Utils_Tuple2(9, 4),
						_Utils_Tuple2(10, 4),
						_Utils_Tuple2(0, 5),
						_Utils_Tuple2(1, 5),
						_Utils_Tuple2(2, 5),
						_Utils_Tuple2(3, 5),
						_Utils_Tuple2(4, 5),
						_Utils_Tuple2(5, 5),
						_Utils_Tuple2(6, 5),
						_Utils_Tuple2(7, 5),
						_Utils_Tuple2(8, 5),
						_Utils_Tuple2(9, 5),
						_Utils_Tuple2(10, 5),
						_Utils_Tuple2(0, 6),
						_Utils_Tuple2(1, 6),
						_Utils_Tuple2(2, 6),
						_Utils_Tuple2(3, 6),
						_Utils_Tuple2(4, 6),
						_Utils_Tuple2(5, 6),
						_Utils_Tuple2(6, 6),
						_Utils_Tuple2(7, 6),
						_Utils_Tuple2(8, 6),
						_Utils_Tuple2(9, 6),
						_Utils_Tuple2(10, 6),
						_Utils_Tuple2(0, 13),
						_Utils_Tuple2(1, 13),
						_Utils_Tuple2(2, 13),
						_Utils_Tuple2(3, 13),
						_Utils_Tuple2(4, 13),
						_Utils_Tuple2(5, 13),
						_Utils_Tuple2(6, 13),
						_Utils_Tuple2(7, 13),
						_Utils_Tuple2(8, 13),
						_Utils_Tuple2(9, 13),
						_Utils_Tuple2(10, 13),
						_Utils_Tuple2(0, 14),
						_Utils_Tuple2(1, 14),
						_Utils_Tuple2(2, 14),
						_Utils_Tuple2(3, 14),
						_Utils_Tuple2(4, 14),
						_Utils_Tuple2(5, 14),
						_Utils_Tuple2(6, 14),
						_Utils_Tuple2(7, 14),
						_Utils_Tuple2(8, 14),
						_Utils_Tuple2(9, 14),
						_Utils_Tuple2(10, 14),
						_Utils_Tuple2(0, 15),
						_Utils_Tuple2(1, 15),
						_Utils_Tuple2(2, 15),
						_Utils_Tuple2(3, 15),
						_Utils_Tuple2(4, 15),
						_Utils_Tuple2(5, 15),
						_Utils_Tuple2(6, 15),
						_Utils_Tuple2(7, 15),
						_Utils_Tuple2(8, 15),
						_Utils_Tuple2(9, 15),
						_Utils_Tuple2(10, 15)
					]),
				booklet: $author$project$Outlooks$Initi,
				clover: A3($author$project$Model$Clover, false, false, false),
				combo: 0,
				cyanLeaves: _List_Nil,
				difficulty: $author$project$Outlooks$Normal,
				emptyLeaves: _List_Nil,
				exp: 0,
				gold_angle: 180,
				gold_w: 0,
				gold_x: 37,
				gold_y: 25,
				key: key,
				keys: $author$project$Model$nokeys,
				leaf: 0,
				life: 5,
				max_life: 5,
				minute: 0,
				music: $author$project$Outlooks$TheOasis,
				nextBrick: $author$project$Outlooks$Red,
				nextPoint: _Utils_Tuple2(0, 0),
				pad_angle: 0,
				pad_w: 0,
				pad_x: 37,
				pad_y: 25,
				page: $author$project$Model$Home,
				pinkLeaves: _List_Nil,
				redLeaves: _List_Nil,
				se: $author$project$Outlooks$Quite,
				second: 0,
				showingpage: $author$project$Outlooks$page1,
				skills_cost: _List_fromArray(
					[10, 15, 20, 25, 30, 40, 50, 60, 70, 80]),
				skills_ok: _List_fromArray(
					[false, false, false, false, false, false, false, false, false, false]),
				state: $author$project$Model$Stopped,
				url: url,
				wShell_down: 0,
				wShell_left: 0,
				wShell_right: 240,
				wShell_up: 120
			},
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Message$KeyChanged = F2(
	function (a, b) {
		return {$: 'KeyChanged', a: a, b: b};
	});
var $author$project$Model$Playing = {$: 'Playing'};
var $author$project$Message$Tick = function (a) {
	return {$: 'Tick', a: a};
};
var $author$project$Message$TimeDelta = function (a) {
	return {$: 'TimeDelta', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 'Delta', a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {oldTime: oldTime, request: request, subs: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$browser$Browser$AnimationManager$now = _Browser_now(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.request;
		var oldTime = _v0.oldTime;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 'Nothing') {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.subs;
		var oldTime = _v0.oldTime;
		var send = function (sub) {
			if (sub.$ === 'Time') {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 'Time', a: a};
};
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (sub.$ === 'Time') {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrameDelta = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Delta(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrameDelta = $elm$browser$Browser$AnimationManager$onAnimationFrameDelta;
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keyup');
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				_Utils_eq(model.state, $author$project$Model$Playing) ? $elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Message$TimeDelta) : $elm$core$Platform$Sub$none,
				_Utils_eq(model.state, $author$project$Model$Playing) ? A2($elm$time$Time$every, 1000, $author$project$Message$Tick) : $elm$core$Platform$Sub$none,
				$elm$browser$Browser$Events$onKeyUp(
				A2(
					$elm$json$Json$Decode$map,
					$author$project$Message$KeyChanged(false),
					A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string))),
				$elm$browser$Browser$Events$onKeyDown(
				A2(
					$elm$json$Json$Decode$map,
					$author$project$Message$KeyChanged(true),
					A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string)))
			]));
};
var $author$project$Message$DrawBrick = function (a) {
	return {$: 'DrawBrick', a: a};
};
var $author$project$Message$DrawPoint = function (a) {
	return {$: 'DrawPoint', a: a};
};
var $author$project$Model$Game = {$: 'Game'};
var $author$project$Model$Help = {$: 'Help'};
var $author$project$Message$NewBrick = function (a) {
	return {$: 'NewBrick', a: a};
};
var $author$project$Message$NewPoint = function (a) {
	return {$: 'NewPoint', a: a};
};
var $author$project$Outlooks$page10 = 'assets/booklet/10.jpg';
var $author$project$Outlooks$page11 = 'assets/booklet/11.jpg';
var $author$project$Outlooks$page2 = 'assets/booklet/2.jpg';
var $author$project$Outlooks$page3 = 'assets/booklet/3.jpg';
var $author$project$Outlooks$page4 = 'assets/booklet/4.jpg';
var $author$project$Outlooks$page5 = 'assets/booklet/5.jpg';
var $author$project$Outlooks$page6 = 'assets/booklet/6.jpg';
var $author$project$Outlooks$page7 = 'assets/booklet/7.jpg';
var $author$project$Outlooks$page8 = 'assets/booklet/8.jpg';
var $author$project$Outlooks$page9 = 'assets/booklet/9.jpg';
var $author$project$Help$bookletList = _List_fromArray(
	[$author$project$Outlooks$page1, $author$project$Outlooks$page2, $author$project$Outlooks$page3, $author$project$Outlooks$page4, $author$project$Outlooks$page5, $author$project$Outlooks$page6, $author$project$Outlooks$page7, $author$project$Outlooks$page8, $author$project$Outlooks$page9, $author$project$Outlooks$page10, $author$project$Outlooks$page11]);
var $author$project$Outlooks$Cyan = {$: 'Cyan'};
var $author$project$Outlooks$Pink = {$: 'Pink'};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$float = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var seed1 = $elm$random$Random$next(seed0);
				var range = $elm$core$Basics$abs(b - a);
				var n1 = $elm$random$Random$peel(seed1);
				var n0 = $elm$random$Random$peel(seed0);
				var lo = (134217727 & n1) * 1.0;
				var hi = (67108863 & n0) * 1.0;
				var val = ((hi * 134217728.0) + lo) / 9007199254740992.0;
				var scaled = (val * range) + a;
				return _Utils_Tuple2(
					scaled,
					$elm$random$Random$next(seed1));
			});
	});
var $elm$random$Random$getByWeight = F3(
	function (_v0, others, countdown) {
		getByWeight:
		while (true) {
			var weight = _v0.a;
			var value = _v0.b;
			if (!others.b) {
				return value;
			} else {
				var second = others.a;
				var otherOthers = others.b;
				if (_Utils_cmp(
					countdown,
					$elm$core$Basics$abs(weight)) < 1) {
					return value;
				} else {
					var $temp$_v0 = second,
						$temp$others = otherOthers,
						$temp$countdown = countdown - $elm$core$Basics$abs(weight);
					_v0 = $temp$_v0;
					others = $temp$others;
					countdown = $temp$countdown;
					continue getByWeight;
				}
			}
		}
	});
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$random$Random$weighted = F2(
	function (first, others) {
		var normalize = function (_v0) {
			var weight = _v0.a;
			return $elm$core$Basics$abs(weight);
		};
		var total = normalize(first) + $elm$core$List$sum(
			A2($elm$core$List$map, normalize, others));
		return A2(
			$elm$random$Random$map,
			A2($elm$random$Random$getByWeight, first, others),
			A2($elm$random$Random$float, 0, total));
	});
var $author$project$Update$brickGenerator = A2(
	$elm$random$Random$weighted,
	_Utils_Tuple2(60, $author$project$Outlooks$Cyan),
	_List_fromArray(
		[
			_Utils_Tuple2(20, $author$project$Outlooks$Red),
			_Utils_Tuple2(20, $author$project$Outlooks$Pink)
		]));
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Help$nextOne = F2(
	function (model, bookletL) {
		nextOne:
		while (true) {
			if (_Utils_eq(
				A2(
					$elm$core$Maybe$withDefault,
					'a',
					$elm$core$List$head(
						A2(
							$elm$core$List$drop,
							1,
							$elm$core$List$reverse(bookletL)))),
				model.showingpage)) {
				return $elm$core$List$head(
					$elm$core$List$reverse(bookletL));
			} else {
				var $temp$model = model,
					$temp$bookletL = $elm$core$List$reverse(
					A2(
						$elm$core$List$drop,
						1,
						$elm$core$List$reverse(bookletL)));
				model = $temp$model;
				bookletL = $temp$bookletL;
				continue nextOne;
			}
		}
	});
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $elm$random$Random$map2 = F3(
	function (func, _v0, _v1) {
		var genA = _v0.a;
		var genB = _v1.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v2 = genA(seed0);
				var a = _v2.a;
				var seed1 = _v2.b;
				var _v3 = genB(seed1);
				var b = _v3.a;
				var seed2 = _v3.b;
				return _Utils_Tuple2(
					A2(func, a, b),
					seed2);
			});
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Update$pointGenerator = A3(
	$elm$random$Random$map2,
	$elm$core$Tuple$pair,
	A2($elm$random$Random$int, 0, 1),
	A2($elm$random$Random$int, 0, 1));
var $author$project$Help$previousOne = F2(
	function (model, bookletL) {
		previousOne:
		while (true) {
			if (_Utils_eq(
				A2(
					$elm$core$Maybe$withDefault,
					'a',
					$elm$core$List$head(
						A2($elm$core$List$drop, 1, bookletL))),
				model.showingpage)) {
				return $elm$core$List$head(bookletL);
			} else {
				var $temp$model = model,
					$temp$bookletL = A2($elm$core$List$drop, 1, bookletL);
				model = $temp$model;
				bookletL = $temp$bookletL;
				continue previousOne;
			}
		}
	});
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 'Nothing') {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 'Nothing') {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.protocol;
		if (_v0.$ === 'Http') {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fragment,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.query,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.port_,
					_Utils_ap(http, url.host)),
				url.path)));
};
var $author$project$Update$updateKeys = F3(
	function (isDown, key, keys) {
		switch (key) {
			case 'ArrowLeft':
				return _Utils_update(
					keys,
					{left: isDown});
			case 'ArrowRight':
				return _Utils_update(
					keys,
					{right: isDown});
			case 'Enter':
				return _Utils_update(
					keys,
					{enter: isDown});
			case 'a':
				return _Utils_update(
					keys,
					{a: isDown});
			case 'd':
				return _Utils_update(
					keys,
					{d: isDown});
			case '1':
				return _Utils_update(
					keys,
					{one: isDown});
			case '2':
				return _Utils_update(
					keys,
					{two: isDown});
			case '3':
				return _Utils_update(
					keys,
					{three: isDown});
			case '4':
				return _Utils_update(
					keys,
					{four: isDown});
			case '5':
				return _Utils_update(
					keys,
					{five: isDown});
			case '6':
				return _Utils_update(
					keys,
					{six: isDown});
			case '7':
				return _Utils_update(
					keys,
					{seven: isDown});
			case '8':
				return _Utils_update(
					keys,
					{eight: isDown});
			case '9':
				return _Utils_update(
					keys,
					{nine: isDown});
			case '0':
				return _Utils_update(
					keys,
					{ten: isDown});
			default:
				return keys;
		}
	});
var $author$project$Outlooks$Fire = {$: 'Fire'};
var $author$project$Outlooks$Frozen = {$: 'Frozen'};
var $author$project$Outlooks$Ordinary = {$: 'Ordinary'};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $author$project$Calculate$ballDownCoordinate = function (model) {
	return _Utils_Tuple2(
		$elm$core$Basics$floor((model.ball_y - 7) / 4),
		$elm$core$Basics$floor((model.ball_x - 2) / 4));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Check$cDownLeaf = function (model) {
	return (A2(
		$elm$core$List$member,
		$author$project$Calculate$ballDownCoordinate(model),
		model.blueLeaves) && (!A2(
		$elm$core$List$member,
		$author$project$Calculate$ballDownCoordinate(model),
		model.emptyLeaves))) ? true : false;
};
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Check$cDownPillar = F2(
	function (model, t) {
		return (t >= 51) ? true : false;
	});
var $elm$core$Basics$pow = _Basics_pow;
var $author$project$Check$cHit = F2(
	function (x, y) {
		return (_Utils_cmp(
			A2($elm$core$Basics$pow, x - 42, 2) + A2($elm$core$Basics$pow, y - 30, 2),
			A2($elm$core$Basics$pow, 6, 2)) < 1) ? true : false;
	});
var $author$project$Check$cHitB = F4(
	function (x, y, a, b) {
		return ((_Utils_cmp(
			A2($elm$core$Basics$pow, x - a, 2) + A2($elm$core$Basics$pow, y - b, 2),
			A2($elm$core$Basics$pow, 6, 2)) < 1) && (_Utils_cmp(
			A2($elm$core$Basics$pow, x - a, 2) + A2($elm$core$Basics$pow, y - b, 2),
			A2($elm$core$Basics$pow, 4, 2)) > -1)) ? true : false;
	});
var $author$project$Calculate$ballLeftCoordinate = function (model) {
	return _Utils_Tuple2(
		$elm$core$Basics$floor((model.ball_y - 8) / 4),
		$elm$core$Basics$floor((model.ball_x - 3) / 4));
};
var $author$project$Calculate$ballRightCoordinate = function (model) {
	return _Utils_Tuple2(
		$elm$core$Basics$floor((model.ball_y - 8) / 4),
		$elm$core$Basics$floor((model.ball_x - 1) / 4));
};
var $author$project$Calculate$ballUpCoordinate = function (model) {
	return _Utils_Tuple2(
		$elm$core$Basics$floor((model.ball_y - 9) / 4),
		$elm$core$Basics$floor((model.ball_x - 2) / 4));
};
var $author$project$Check$cLeftLeaf = function (model) {
	return (A2(
		$elm$core$List$member,
		$author$project$Calculate$ballLeftCoordinate(model),
		model.blueLeaves) && (!A2(
		$elm$core$List$member,
		$author$project$Calculate$ballLeftCoordinate(model),
		model.emptyLeaves))) ? true : false;
};
var $author$project$Check$cRightLeaf = function (model) {
	return (A2(
		$elm$core$List$member,
		$author$project$Calculate$ballRightCoordinate(model),
		model.blueLeaves) && (!A2(
		$elm$core$List$member,
		$author$project$Calculate$ballRightCoordinate(model),
		model.emptyLeaves))) ? true : false;
};
var $author$project$Check$cUpLeaf = function (model) {
	return (A2(
		$elm$core$List$member,
		$author$project$Calculate$ballUpCoordinate(model),
		model.blueLeaves) && (!A2(
		$elm$core$List$member,
		$author$project$Calculate$ballUpCoordinate(model),
		model.emptyLeaves))) ? true : false;
};
var $author$project$Check$cIsCoordinate = function (model) {
	return $author$project$Check$cLeftLeaf(model) ? $author$project$Calculate$ballLeftCoordinate(model) : ($author$project$Check$cDownLeaf(model) ? $author$project$Calculate$ballDownCoordinate(model) : ($author$project$Check$cUpLeaf(model) ? $author$project$Calculate$ballUpCoordinate(model) : ($author$project$Check$cRightLeaf(model) ? $author$project$Calculate$ballRightCoordinate(model) : _Utils_Tuple2(0, 0))));
};
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $elm$core$Basics$sin = _Basics_sin;
var $elm$core$Basics$tan = _Basics_tan;
var $author$project$Check$cValidB = F5(
	function (angle, x, y, a, b) {
		return ((($elm$core$Basics$sin(
			$elm$core$Basics$degrees(angle + 180)) > 0) && (($elm$core$Basics$cos(
			$elm$core$Basics$degrees(angle + 180)) > 0) && ((_Utils_cmp(
			y - b,
			((-1) * $elm$core$Basics$tan(
				$elm$core$Basics$degrees(angle + 180))) * (x - a)) > 0) && (_Utils_cmp(
			y - b,
			((-1) * $elm$core$Basics$tan(
				$elm$core$Basics$degrees(angle + 90))) * (x - a)) < 0)))) || ((($elm$core$Basics$sin(
			$elm$core$Basics$degrees(angle + 180)) > 0) && (($elm$core$Basics$cos(
			$elm$core$Basics$degrees(angle + 180)) < 0) && ((_Utils_cmp(
			y - b,
			((-1) * $elm$core$Basics$tan(
				$elm$core$Basics$degrees(angle + 180))) * (x - a)) < 0) && (_Utils_cmp(
			y - b,
			((-1) * $elm$core$Basics$tan(
				$elm$core$Basics$degrees(angle + 90))) * (x - a)) < 0)))) || ((($elm$core$Basics$sin(
			$elm$core$Basics$degrees(angle + 180)) < 0) && (($elm$core$Basics$cos(
			$elm$core$Basics$degrees(angle + 180)) < 0) && ((_Utils_cmp(
			y - b,
			((-1) * $elm$core$Basics$tan(
				$elm$core$Basics$degrees(angle + 180))) * (x - a)) < 0) && (_Utils_cmp(
			y - b,
			((-1) * $elm$core$Basics$tan(
				$elm$core$Basics$degrees(angle + 90))) * (x - a)) > 0)))) || ((($elm$core$Basics$sin(
			$elm$core$Basics$degrees(angle + 180)) < 0) && (($elm$core$Basics$cos(
			$elm$core$Basics$degrees(angle + 180)) > 0) && ((_Utils_cmp(
			y - b,
			((-1) * $elm$core$Basics$tan(
				$elm$core$Basics$degrees(angle + 180))) * (x - a)) > 0) && (_Utils_cmp(
			y - b,
			((-1) * $elm$core$Basics$tan(
				$elm$core$Basics$degrees(angle + 90))) * (x - a)) > 0)))) || ((($elm$core$Basics$sin(
			$elm$core$Basics$degrees(angle + 180)) === 1) && (($elm$core$Basics$cos(
			$elm$core$Basics$degrees(angle + 180)) < 0.000001) && (((y - b) < 0) && ((x - a) > 0)))) || ((_Utils_eq(
			$elm$core$Basics$sin(
				$elm$core$Basics$degrees(angle + 180)),
			-1) && (($elm$core$Basics$cos(
			$elm$core$Basics$degrees(angle + 180)) < 0.000001) && (((y - b) > 0) && ((x - a) < 0)))) || ((($elm$core$Basics$sin(
			$elm$core$Basics$degrees(angle + 180)) < 0.000001) && (($elm$core$Basics$cos(
			$elm$core$Basics$degrees(angle + 180)) === 1) && (((y - b) > 0) && ((x - a) > 0)))) || (($elm$core$Basics$sin(
			$elm$core$Basics$degrees(angle + 180)) < 0.000001) && (_Utils_eq(
			$elm$core$Basics$cos(
				$elm$core$Basics$degrees(angle + 180)),
			-1) && (((y - b) < 0) && ((x - a) < 0))))))))))) ? true : false;
	});
var $author$project$Check$cIsHitBlue = function (model) {
	return A5($author$project$Check$cValidB, model.pad_angle, model.block_x + 1, model.block_y + 1, 42, 30) ? true : false;
};
var $author$project$Check$cIsHitGold = function (model) {
	return (A2($author$project$Check$cHit, model.ball_x, model.ball_y) && A5($author$project$Check$cValidB, model.gold_angle, model.ball_x, model.ball_y, 42, 30)) ? true : false;
};
var $author$project$Check$cIsHitKernel = function (model) {
	return A2($author$project$Check$cHit, model.block_x + 1, model.block_y + 1) ? true : false;
};
var $author$project$Check$cIsHitShell = function (model) {
	return (A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 10, 30) && (!A5($author$project$Check$cValidB, model.wShell_left, model.ball_x, model.ball_y, 10, 30))) ? true : ((A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 74, 30) && (!A5($author$project$Check$cValidB, model.wShell_right, model.ball_x, model.ball_y, 74, 30))) ? true : ((A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 42, 14) && (!A5($author$project$Check$cValidB, model.wShell_up, model.ball_x, model.ball_y, 42, 14))) ? true : (A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 42, 46) ? true : false)));
};
var $author$project$Check$cIsLose = function (model) {
	return (model.life <= 0) ? true : false;
};
var $author$project$Check$cIsWin = function (model) {
	return (model.clover.leftClover && (model.clover.rightClover && model.clover.upClover)) ? true : false;
};
var $author$project$Check$cLeftPillar = F2(
	function (model, t) {
		return (t <= 3) ? true : false;
	});
var $author$project$Check$cRightPillar = F2(
	function (model, t) {
		return (t >= 81) ? true : false;
	});
var $author$project$Check$cUpPillar = F2(
	function (model, t) {
		return (t <= 9) ? true : false;
	});
var $elm_community$list_extra$List$Extra$count = function (predicate) {
	return A2(
		$elm$core$List$foldl,
		F2(
			function (x, acc) {
				return predicate(x) ? (acc + 1) : acc;
			}),
		0);
};
var $author$project$Dashboard$fromJust = function (x) {
	if (x.$ === 'Just') {
		var y = x.a;
		return y;
	} else {
		return 0;
	}
};
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Model$overAttack = A2($author$project$Model$AttackState, false, false);
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm_community$list_extra$List$Extra$updateAt = F3(
	function (index, fn, list) {
		if (index < 0) {
			return list;
		} else {
			var tail = A2($elm$core$List$drop, index, list);
			var head = A2($elm$core$List$take, index, list);
			if (tail.b) {
				var x = tail.a;
				var xs = tail.b;
				return _Utils_ap(
					head,
					A2(
						$elm$core$List$cons,
						fn(x),
						xs));
			} else {
				return list;
			}
		}
	});
var $elm_community$list_extra$List$Extra$setAt = F2(
	function (index, value) {
		return A2(
			$elm_community$list_extra$List$Extra$updateAt,
			index,
			$elm$core$Basics$always(value));
	});
var $author$project$Update$updateTime = F2(
	function (model, dt) {
		var state = ($author$project$Check$cIsWin(model) || $author$project$Check$cIsLose(model)) ? $author$project$Model$Stopped : model.state;
		var skills_ok = model.keys.one ? (((_Utils_cmp(
			$author$project$Dashboard$fromJust(
				A2($elm_community$list_extra$List$Extra$getAt, 0, model.skills_cost)),
			model.exp) < 0) && (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 0, model.skills_ok),
			$elm$core$Maybe$Just(true)))) ? A3($elm_community$list_extra$List$Extra$setAt, 0, true, model.skills_ok) : model.skills_ok) : (model.keys.two ? (((_Utils_cmp(
			$author$project$Dashboard$fromJust(
				A2($elm_community$list_extra$List$Extra$getAt, 1, model.skills_cost)),
			model.exp) < 0) && (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 1, model.skills_ok),
			$elm$core$Maybe$Just(true)))) ? A3($elm_community$list_extra$List$Extra$setAt, 1, true, model.skills_ok) : model.skills_ok) : (model.keys.three ? (((_Utils_cmp(
			$author$project$Dashboard$fromJust(
				A2($elm_community$list_extra$List$Extra$getAt, 2, model.skills_cost)),
			model.exp) < 0) && (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 2, model.skills_ok),
			$elm$core$Maybe$Just(true)))) ? A3($elm_community$list_extra$List$Extra$setAt, 2, true, model.skills_ok) : model.skills_ok) : (model.keys.four ? (((_Utils_cmp(
			$author$project$Dashboard$fromJust(
				A2($elm_community$list_extra$List$Extra$getAt, 3, model.skills_cost)),
			model.exp) < 0) && (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 3, model.skills_ok),
			$elm$core$Maybe$Just(true)))) ? A3($elm_community$list_extra$List$Extra$setAt, 3, true, model.skills_ok) : model.skills_ok) : (model.keys.five ? (((_Utils_cmp(
			$author$project$Dashboard$fromJust(
				A2($elm_community$list_extra$List$Extra$getAt, 4, model.skills_cost)),
			model.exp) < 0) && (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 4, model.skills_ok),
			$elm$core$Maybe$Just(true)))) ? A3($elm_community$list_extra$List$Extra$setAt, 4, true, model.skills_ok) : model.skills_ok) : (model.keys.six ? (((_Utils_cmp(
			$author$project$Dashboard$fromJust(
				A2($elm_community$list_extra$List$Extra$getAt, 5, model.skills_cost)),
			model.exp) < 0) && (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 5, model.skills_ok),
			$elm$core$Maybe$Just(true)))) ? A3($elm_community$list_extra$List$Extra$setAt, 5, true, model.skills_ok) : model.skills_ok) : (model.keys.seven ? (((_Utils_cmp(
			$author$project$Dashboard$fromJust(
				A2($elm_community$list_extra$List$Extra$getAt, 6, model.skills_cost)),
			model.exp) < 0) && (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 6, model.skills_ok),
			$elm$core$Maybe$Just(true)))) ? A3($elm_community$list_extra$List$Extra$setAt, 6, true, model.skills_ok) : model.skills_ok) : (model.keys.eight ? (((_Utils_cmp(
			$author$project$Dashboard$fromJust(
				A2($elm_community$list_extra$List$Extra$getAt, 7, model.skills_cost)),
			model.exp) < 0) && (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 7, model.skills_ok),
			$elm$core$Maybe$Just(true)))) ? A3($elm_community$list_extra$List$Extra$setAt, 7, true, model.skills_ok) : model.skills_ok) : (model.keys.nine ? (((_Utils_cmp(
			$author$project$Dashboard$fromJust(
				A2($elm_community$list_extra$List$Extra$getAt, 8, model.skills_cost)),
			model.exp) < 0) && (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 8, model.skills_ok),
			$elm$core$Maybe$Just(true)))) ? A3($elm_community$list_extra$List$Extra$setAt, 8, true, model.skills_ok) : model.skills_ok) : (model.keys.ten ? (((_Utils_cmp(
			$author$project$Dashboard$fromJust(
				A2($elm_community$list_extra$List$Extra$getAt, 9, model.skills_cost)),
			model.exp) < 0) && (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 9, model.skills_ok),
			$elm$core$Maybe$Just(true)))) ? A3($elm_community$list_extra$List$Extra$setAt, 9, true, model.skills_ok) : model.skills_ok) : model.skills_ok)))))))));
		var skills_cost0 = function () {
			if (!_Utils_eq(skills_ok, model.skills_ok)) {
				var tot_skill = A2(
					$elm_community$list_extra$List$Extra$count,
					$elm$core$Basics$eq(true),
					skills_ok);
				return A2(
					$elm$core$List$map,
					function (a) {
						return (a + (tot_skill * 4)) + 2;
					},
					model.skills_cost);
			} else {
				return model.skills_cost;
			}
		}();
		var ski_9_eff = _Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 8, model.skills_ok),
			$elm$core$Maybe$Just(true)) ? true : false;
		var ski_8_eff = _Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 7, model.skills_ok),
			$elm$core$Maybe$Just(true)) ? true : false;
		var wDown = (model.wShell_down === 360) ? (ski_8_eff ? (dt * (-40.0)) : (dt * (-50.0))) : (ski_8_eff ? (model.wShell_down + (dt * (-40.0))) : (model.wShell_down + (dt * (-50.0))));
		var wLeft = (model.wShell_left === 360) ? (ski_8_eff ? (dt * 8.5) : (dt * 10.0)) : (ski_8_eff ? (model.wShell_left + (dt * 8.5)) : (model.wShell_left + (dt * 10.0)));
		var wRight = (model.wShell_right === 360) ? (ski_8_eff ? (dt * 8.5) : (dt * 10.0)) : (ski_8_eff ? (model.wShell_right + (dt * 8.5)) : (model.wShell_right + (dt * 10.0)));
		var wUp = (model.wShell_up === 360) ? (ski_8_eff ? (dt * (-8.5)) : (dt * (-10.0))) : (ski_8_eff ? (model.wShell_up + (dt * (-8.5))) : (model.wShell_up + (dt * (-10.0))));
		var ski_7_eff = _Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 6, model.skills_ok),
			$elm$core$Maybe$Just(true)) ? true : false;
		var ski_6_eff = _Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 5, model.skills_ok),
			$elm$core$Maybe$Just(true)) ? true : false;
		var ski_5_eff = _Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 4, model.skills_ok),
			$elm$core$Maybe$Just(true)) ? true : false;
		var ski_4_eff = _Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 3, model.skills_ok),
			$elm$core$Maybe$Just(true)) ? true : false;
		var ski_3_eff = _Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 2, model.skills_ok),
			$elm$core$Maybe$Just(true)) ? true : false;
		var wg = model.keys.a ? (ski_3_eff ? 3.0 : 2.0) : (model.keys.d ? (ski_3_eff ? (-3.0) : (-2.0)) : 0);
		var wp = model.keys.left ? (ski_3_eff ? 3.0 : 2.0) : (model.keys.right ? (ski_3_eff ? (-3.0) : (-2.0)) : 0);
		var ski_2_get = (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 1, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 1, model.skills_ok))) ? true : false;
		var skills_cost = ski_2_get ? A2(
			$elm$core$List$map,
			function (a) {
				return a - 10;
			},
			skills_cost0) : skills_cost0;
		var ski_1_get = (!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 0, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 0, model.skills_ok))) ? true : false;
		var ski_10_eff = _Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 9, model.skills_ok),
			$elm$core$Maybe$Just(true)) ? true : false;
		var red = (!_Utils_eq(model.nextBrick, $author$project$Outlooks$Red)) ? model.redLeaves : ((!_Utils_eq(
			$author$project$Check$cIsCoordinate(model),
			_Utils_Tuple2(0, 0))) ? (A2(
			$elm$core$List$member,
			$author$project$Check$cIsCoordinate(model),
			model.blueLeaves) ? A2(
			$elm$core$List$append,
			model.redLeaves,
			_List_fromArray(
				[
					$author$project$Check$cIsCoordinate(model)
				])) : model.redLeaves) : model.redLeaves);
		var pink = (!_Utils_eq(model.nextBrick, $author$project$Outlooks$Pink)) ? model.pinkLeaves : ((!_Utils_eq(
			$author$project$Check$cIsCoordinate(model),
			_Utils_Tuple2(0, 0))) ? (A2(
			$elm$core$List$member,
			$author$project$Check$cIsCoordinate(model),
			model.blueLeaves) ? A2(
			$elm$core$List$append,
			model.pinkLeaves,
			_List_fromArray(
				[
					$author$project$Check$cIsCoordinate(model)
				])) : model.pinkLeaves) : model.pinkLeaves);
		var next_point = (ski_4_eff && _Utils_eq(
			model.nextPoint,
			_Utils_Tuple2(0, 0))) ? _Utils_Tuple2(1, 0) : model.nextPoint;
		var vxb = _Utils_eq(model.attack, $author$project$Model$overAttack) ? ((_Utils_eq(
			next_point,
			_Utils_Tuple2(0, 0)) || _Utils_eq(
			next_point,
			_Utils_Tuple2(0, 1))) ? (ski_6_eff ? 2.5 : 3.5) : ((_Utils_eq(
			next_point,
			_Utils_Tuple2(1, 0)) || _Utils_eq(
			next_point,
			_Utils_Tuple2(1, 1))) ? (ski_6_eff ? (-2.5) : (-3.5)) : model.block_vx)) : (A2($author$project$Check$cHit, model.block_x + 1, model.block_y + 1) ? ((((((-1) * A2($elm$core$Basics$pow, model.block_x - 42, 2)) * model.block_vx) + (A2($elm$core$Basics$pow, model.block_y - 30, 2) * model.block_vx)) - (((2 * (model.block_x - 42)) * (model.block_y - 30)) * model.block_vy)) / (A2($elm$core$Basics$pow, model.block_x - 42, 2) + A2($elm$core$Basics$pow, model.block_y - 30, 2))) : model.block_vx);
		var vyb = _Utils_eq(model.attack, $author$project$Model$overAttack) ? ((_Utils_eq(
			next_point,
			_Utils_Tuple2(0, 0)) || _Utils_eq(
			next_point,
			_Utils_Tuple2(1, 0))) ? (ski_6_eff ? 1.5 : 2) : ((_Utils_eq(
			next_point,
			_Utils_Tuple2(0, 1)) || _Utils_eq(
			next_point,
			_Utils_Tuple2(1, 1))) ? (ski_6_eff ? (-1.5) : (-2)) : model.block_vy)) : (A2($author$project$Check$cHit, model.block_x + 1, model.block_y + 1) ? (((((((-2) * (model.block_x - 42)) * (model.block_y - 30)) * model.block_vx) + (A2($elm$core$Basics$pow, model.block_x - 42, 2) * model.block_vy)) - (A2($elm$core$Basics$pow, model.block_y - 30, 2) * model.block_vy)) / (A2($elm$core$Basics$pow, model.block_x - 42, 2) + A2($elm$core$Basics$pow, model.block_y - 30, 2))) : model.block_vy);
		var xBlock = _Utils_eq(model.attack, $author$project$Model$overAttack) ? ((_Utils_eq(
			next_point,
			_Utils_Tuple2(0, 0)) || _Utils_eq(
			next_point,
			_Utils_Tuple2(0, 1))) ? (5 + (dt * vxb)) : ((_Utils_eq(
			next_point,
			_Utils_Tuple2(1, 0)) || _Utils_eq(
			next_point,
			_Utils_Tuple2(1, 1))) ? (80 + (dt * vxb)) : (model.block_x + (dt * vxb)))) : (model.block_x + (dt * vxb));
		var yBlock = _Utils_eq(model.attack, $author$project$Model$overAttack) ? ((_Utils_eq(
			next_point,
			_Utils_Tuple2(0, 0)) || _Utils_eq(
			next_point,
			_Utils_Tuple2(1, 0))) ? (10 + (dt * vyb)) : ((_Utils_eq(
			next_point,
			_Utils_Tuple2(0, 1)) || _Utils_eq(
			next_point,
			_Utils_Tuple2(1, 1))) ? (50 + (dt * vyb)) : (model.block_y + (dt * vyb)))) : (model.block_y + (dt * vyb));
		var max_life = ski_1_get ? (model.max_life + 1) : model.max_life;
		var life0 = ($author$project$Check$cIsHitKernel(model) && (!$author$project$Check$cIsHitBlue(model))) ? ((ski_10_eff && $author$project$Check$cIsHitGold(model)) ? model.life : (model.life - 1)) : ((A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 42, 46) && (A5($author$project$Check$cValidB, model.wShell_down, model.ball_x, model.ball_y, 42, 46) && (model.life < 5))) ? (ski_7_eff ? (model.life + 2) : (model.life + 1)) : model.life);
		var life = ski_1_get ? (life0 + 1) : life0;
		var leaf = ((!model.clover.leftClover) && ((!model.clover.rightClover) && (!model.clover.upClover))) ? 0 : (((model.clover.leftClover && ((!model.clover.rightClover) && (!model.clover.upClover))) || (((!model.clover.leftClover) && (model.clover.rightClover && (!model.clover.upClover))) || ((!model.clover.leftClover) && ((!model.clover.rightClover) && model.clover.upClover)))) ? 1 : (((model.clover.leftClover && (model.clover.rightClover && (!model.clover.upClover))) || (((!model.clover.leftClover) && (model.clover.rightClover && model.clover.upClover)) || (model.clover.leftClover && ((!model.clover.rightClover) && model.clover.upClover)))) ? 2 : 3));
		var isRed = ((!_Utils_eq(
			$author$project$Check$cIsCoordinate(model),
			_Utils_Tuple2(0, 0))) && A2(
			$elm$core$List$member,
			$author$project$Check$cIsCoordinate(model),
			model.redLeaves)) ? true : false;
		var isPink = ((!_Utils_eq(
			$author$project$Check$cIsCoordinate(model),
			_Utils_Tuple2(0, 0))) && A2(
			$elm$core$List$member,
			$author$project$Check$cIsCoordinate(model),
			model.pinkLeaves)) ? true : false;
		var isCyan = ((!_Utils_eq(
			$author$project$Check$cIsCoordinate(model),
			_Utils_Tuple2(0, 0))) && A2(
			$elm$core$List$member,
			$author$project$Check$cIsCoordinate(model),
			model.cyanLeaves)) ? true : false;
		var se = isPink ? $author$project$Outlooks$Fire : (isRed ? $author$project$Outlooks$Frozen : (isCyan ? $author$project$Outlooks$Ordinary : (($author$project$Check$cIsHitBlue(model) || ($author$project$Check$cIsHitGold(model) || $author$project$Check$cIsHitShell(model))) ? $author$project$Outlooks$Quite : model.se)));
		var exp0 = (!_Utils_eq(
			$author$project$Check$cIsCoordinate(model),
			_Utils_Tuple2(0, 0))) ? (ski_5_eff ? ((model.combo > 0) ? ((((model.exp + 2) + ((model.combo - 1) * 3)) + model.leaf) + 1) : (((model.exp + 2) + model.leaf) + 1)) : ((model.combo > 0) ? (((model.exp + 2) + ((model.combo - 1) * 3)) + model.leaf) : ((model.exp + 2) + model.leaf))) : model.exp;
		var exp = (!_Utils_eq(skills_ok, model.skills_ok)) ? ((!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 0, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 0, model.skills_ok))) ? (exp0 - $author$project$Dashboard$fromJust(
			A2($elm_community$list_extra$List$Extra$getAt, 0, skills_cost))) : ((!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 1, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 1, model.skills_ok))) ? (exp0 - $author$project$Dashboard$fromJust(
			A2($elm_community$list_extra$List$Extra$getAt, 1, skills_cost))) : ((!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 2, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 2, model.skills_ok))) ? (exp0 - $author$project$Dashboard$fromJust(
			A2($elm_community$list_extra$List$Extra$getAt, 2, skills_cost))) : ((!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 3, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 3, model.skills_ok))) ? (exp0 - $author$project$Dashboard$fromJust(
			A2($elm_community$list_extra$List$Extra$getAt, 3, skills_cost))) : ((!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 4, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 4, model.skills_ok))) ? (exp0 - $author$project$Dashboard$fromJust(
			A2($elm_community$list_extra$List$Extra$getAt, 4, skills_cost))) : ((!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 5, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 5, model.skills_ok))) ? (exp0 - $author$project$Dashboard$fromJust(
			A2($elm_community$list_extra$List$Extra$getAt, 5, skills_cost))) : ((!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 6, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 6, model.skills_ok))) ? (exp0 - $author$project$Dashboard$fromJust(
			A2($elm_community$list_extra$List$Extra$getAt, 6, skills_cost))) : ((!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 7, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 7, model.skills_ok))) ? (exp0 - $author$project$Dashboard$fromJust(
			A2($elm_community$list_extra$List$Extra$getAt, 7, skills_cost))) : ((!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 8, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 8, model.skills_ok))) ? (exp0 - $author$project$Dashboard$fromJust(
			A2($elm_community$list_extra$List$Extra$getAt, 8, skills_cost))) : ((!_Utils_eq(
			A2($elm_community$list_extra$List$Extra$getAt, 9, skills_ok),
			A2($elm_community$list_extra$List$Extra$getAt, 9, model.skills_ok))) ? (exp0 - $author$project$Dashboard$fromJust(
			A2($elm_community$list_extra$List$Extra$getAt, 9, skills_cost))) : exp0)))))))))) : exp0;
		var empty = (!_Utils_eq(
			$author$project$Check$cIsCoordinate(model),
			_Utils_Tuple2(0, 0))) ? ((A2(
			$elm$core$List$member,
			$author$project$Check$cIsCoordinate(model),
			model.cyanLeaves) || (A2(
			$elm$core$List$member,
			$author$project$Check$cIsCoordinate(model),
			model.pinkLeaves) || (A2(
			$elm$core$List$member,
			$author$project$Check$cIsCoordinate(model),
			model.redLeaves) || (A2(
			$elm$core$List$member,
			$author$project$Check$cIsCoordinate(model),
			model.blueLeaves) && ski_9_eff)))) ? A2(
			$elm$core$List$append,
			model.emptyLeaves,
			_List_fromArray(
				[
					$author$project$Check$cIsCoordinate(model)
				])) : model.emptyLeaves) : model.emptyLeaves;
		var dyb0 = (A2($author$project$Check$cHit, model.ball_x, model.ball_y) && (A5($author$project$Check$cValidB, model.gold_angle, model.ball_x, model.ball_y, 42, 30) && model.keys.enter)) ? ((4 * (model.ball_y - 30)) / A2(
			$elm$core$Basics$pow,
			A2($elm$core$Basics$pow, 42 - model.ball_x, 2) + A2($elm$core$Basics$pow, 30 - model.ball_y, 2),
			0.5)) : (A2($author$project$Check$cHit, model.ball_x, model.ball_y) ? (((((((-2) * (model.ball_x - 42)) * (model.ball_y - 30)) * model.ball_vx) + (A2($elm$core$Basics$pow, model.ball_x - 42, 2) * model.ball_vy)) - (A2($elm$core$Basics$pow, model.ball_y - 30, 2) * model.ball_vy)) / (A2($elm$core$Basics$pow, model.ball_x - 42, 2) + A2($elm$core$Basics$pow, model.ball_y - 30, 2))) : ((A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 10, 30) && (!A5($author$project$Check$cValidB, model.wShell_left, model.ball_x, model.ball_y, 10, 30))) ? (((((((-2) * (model.ball_x - 10)) * (model.ball_y - 30)) * model.ball_vx) + (A2($elm$core$Basics$pow, model.ball_x - 10, 2) * model.ball_vy)) - (A2($elm$core$Basics$pow, model.ball_y - 30, 2) * model.ball_vy)) / (A2($elm$core$Basics$pow, model.ball_x - 10, 2) + A2($elm$core$Basics$pow, model.ball_y - 30, 2))) : ((A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 74, 30) && (!A5($author$project$Check$cValidB, model.wShell_right, model.ball_x, model.ball_y, 74, 30))) ? (((((((-2) * (model.ball_x - 74)) * (model.ball_y - 30)) * model.ball_vx) + (A2($elm$core$Basics$pow, model.ball_x - 74, 2) * model.ball_vy)) - (A2($elm$core$Basics$pow, model.ball_y - 30, 2) * model.ball_vy)) / (A2($elm$core$Basics$pow, model.ball_x - 74, 2) + A2($elm$core$Basics$pow, model.ball_y - 30, 2))) : ((A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 42, 14) && (!A5($author$project$Check$cValidB, model.wShell_up, model.ball_x, model.ball_y, 42, 14))) ? (((((((-2) * (model.ball_x - 42)) * (model.ball_y - 14)) * model.ball_vx) + (A2($elm$core$Basics$pow, model.ball_x - 42, 2) * model.ball_vy)) - (A2($elm$core$Basics$pow, model.ball_y - 14, 2) * model.ball_vy)) / (A2($elm$core$Basics$pow, model.ball_x - 42, 2) + A2($elm$core$Basics$pow, model.ball_y - 14, 2))) : (A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 42, 46) ? (((((((-2) * (model.ball_x - 42)) * (model.ball_y - 46)) * model.ball_vx) + (A2($elm$core$Basics$pow, model.ball_x - 42, 2) * model.ball_vy)) - (A2($elm$core$Basics$pow, model.ball_y - 46, 2) * model.ball_vy)) / (A2($elm$core$Basics$pow, model.ball_x - 42, 2) + A2($elm$core$Basics$pow, model.ball_y - 46, 2))) : ((A2($author$project$Check$cLeftPillar, model, model.ball_x) || (A2($author$project$Check$cRightPillar, model, model.ball_x) || (A2($author$project$Check$cUpPillar, model, model.ball_y) || A2($author$project$Check$cDownPillar, model, model.ball_y)))) ? ((4 * (30 - model.ball_y)) / A2(
			$elm$core$Basics$pow,
			A2($elm$core$Basics$pow, 42 - model.ball_x, 2) + A2($elm$core$Basics$pow, 30 - model.ball_y, 2),
			0.5)) : (($author$project$Check$cUpLeaf(model) || $author$project$Check$cDownLeaf(model)) ? (model.ball_vy * (-1)) : model.ball_vy)))))));
		var dyb = isRed ? (dyb0 * 1.1) : (isPink ? (dyb0 * 0.9) : dyb0);
		var yb = ($author$project$Check$cIsHitGold(model) && (!model.keys.enter)) ? (30 - (5.5 * $elm$core$Basics$sin(
			$elm$core$Basics$degrees(model.gold_angle + 135)))) : (model.ball_y + (dt * dyb));
		var dxb0 = (A2($author$project$Check$cHit, model.ball_x, model.ball_y) && (A5($author$project$Check$cValidB, model.gold_angle, model.ball_x, model.ball_y, 42, 30) && model.keys.enter)) ? ((4 * (model.ball_x - 42)) / A2(
			$elm$core$Basics$pow,
			A2($elm$core$Basics$pow, 42 - model.ball_x, 2) + A2($elm$core$Basics$pow, 30 - model.ball_y, 2),
			0.5)) : (A2($author$project$Check$cHit, model.ball_x, model.ball_y) ? ((((((-1) * A2($elm$core$Basics$pow, model.ball_x - 42, 2)) * model.ball_vx) + (A2($elm$core$Basics$pow, model.ball_y - 30, 2) * model.ball_vx)) - (((2 * (model.ball_x - 42)) * (model.ball_y - 30)) * model.ball_vy)) / (A2($elm$core$Basics$pow, model.ball_x - 42, 2) + A2($elm$core$Basics$pow, model.ball_y - 30, 2))) : ((A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 10, 30) && (!A5($author$project$Check$cValidB, model.wShell_left, model.ball_x, model.ball_y, 10, 30))) ? ((((((-1) * A2($elm$core$Basics$pow, model.ball_x - 10, 2)) * model.ball_vx) + (A2($elm$core$Basics$pow, model.ball_y - 30, 2) * model.ball_vx)) - (((2 * (model.ball_x - 10)) * (model.ball_y - 30)) * model.ball_vy)) / (A2($elm$core$Basics$pow, model.ball_x - 10, 2) + A2($elm$core$Basics$pow, model.ball_y - 30, 2))) : ((A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 74, 30) && (!A5($author$project$Check$cValidB, model.wShell_right, model.ball_x, model.ball_y, 74, 30))) ? ((((((-1) * A2($elm$core$Basics$pow, model.ball_x - 74, 2)) * model.ball_vx) + (A2($elm$core$Basics$pow, model.ball_y - 30, 2) * model.ball_vx)) - (((2 * (model.ball_x - 74)) * (model.ball_y - 30)) * model.ball_vy)) / (A2($elm$core$Basics$pow, model.ball_x - 74, 2) + A2($elm$core$Basics$pow, model.ball_y - 30, 2))) : ((A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 42, 14) && (!A5($author$project$Check$cValidB, model.wShell_up, model.ball_x, model.ball_y, 42, 14))) ? ((((((-1) * A2($elm$core$Basics$pow, model.ball_x - 42, 2)) * model.ball_vx) + (A2($elm$core$Basics$pow, model.ball_y - 14, 2) * model.ball_vx)) - (((2 * (model.ball_x - 42)) * (model.ball_y - 14)) * model.ball_vy)) / (A2($elm$core$Basics$pow, model.ball_x - 42, 2) + A2($elm$core$Basics$pow, model.ball_y - 14, 2))) : (A4($author$project$Check$cHitB, model.ball_x, model.ball_y, 42, 46) ? ((((((-1) * A2($elm$core$Basics$pow, model.ball_x - 42, 2)) * model.ball_vx) + (A2($elm$core$Basics$pow, model.ball_y - 46, 2) * model.ball_vx)) - (((2 * (model.ball_x - 42)) * (model.ball_y - 46)) * model.ball_vy)) / (A2($elm$core$Basics$pow, model.ball_x - 42, 2) + A2($elm$core$Basics$pow, model.ball_y - 46, 2))) : ((A2($author$project$Check$cLeftPillar, model, model.ball_x) || (A2($author$project$Check$cRightPillar, model, model.ball_x) || (A2($author$project$Check$cUpPillar, model, model.ball_y) || A2($author$project$Check$cDownPillar, model, model.ball_y)))) ? ((4 * (42 - model.ball_x)) / A2(
			$elm$core$Basics$pow,
			A2($elm$core$Basics$pow, 42 - model.ball_x, 2) + A2($elm$core$Basics$pow, 30 - model.ball_y, 2),
			0.5)) : (($author$project$Check$cRightLeaf(model) || $author$project$Check$cLeftLeaf(model)) ? (model.ball_vx * (-1)) : model.ball_vx)))))));
		var dxb = isRed ? (dxb0 * 1.1) : (isPink ? (dxb0 * 0.9) : dxb0);
		var xb = ($author$project$Check$cIsHitGold(model) && (!model.keys.enter)) ? (42 + (5.5 * $elm$core$Basics$cos(
			$elm$core$Basics$degrees(model.gold_angle + 135)))) : (model.ball_x + (dt * dxb));
		var cyan = (!_Utils_eq(model.nextBrick, $author$project$Outlooks$Cyan)) ? model.cyanLeaves : ((!_Utils_eq(
			$author$project$Check$cIsCoordinate(model),
			_Utils_Tuple2(0, 0))) ? (A2(
			$elm$core$List$member,
			$author$project$Check$cIsCoordinate(model),
			model.blueLeaves) ? A2(
			$elm$core$List$append,
			model.cyanLeaves,
			_List_fromArray(
				[
					$author$project$Check$cIsCoordinate(model)
				])) : model.cyanLeaves) : model.cyanLeaves);
		var combo = ((!_Utils_eq(
			$author$project$Check$cIsCoordinate(model),
			_Utils_Tuple2(0, 0))) && ((!$author$project$Check$cIsHitGold(model)) && ((!$author$project$Check$cIsHitBlue(model)) && (!$author$project$Check$cIsHitShell(model))))) ? (model.combo + 1) : (($author$project$Check$cIsHitGold(model) || ($author$project$Check$cIsHitBlue(model) || (!$author$project$Check$cIsHitShell(model)))) ? 0 : model.combo);
		var clover = function () {
			var upC = (_Utils_cmp(
				A2($elm$core$Basics$pow, model.ball_x - 42, 2) + A2($elm$core$Basics$pow, model.ball_y - 14, 2),
				A2($elm$core$Basics$pow, 5, 2)) < 1) ? true : model.clover.upClover;
			var rightC = (_Utils_cmp(
				A2($elm$core$Basics$pow, model.ball_x - 74, 2) + A2($elm$core$Basics$pow, model.ball_y - 30, 2),
				A2($elm$core$Basics$pow, 5, 2)) < 1) ? true : model.clover.rightClover;
			var leftC = (_Utils_cmp(
				A2($elm$core$Basics$pow, model.ball_x - 10, 2) + A2($elm$core$Basics$pow, model.ball_y - 30, 2),
				A2($elm$core$Basics$pow, 5, 2)) < 1) ? true : model.clover.leftClover;
			return A3($author$project$Model$Clover, leftC, rightC, upC);
		}();
		var attackState = (A2($author$project$Check$cLeftPillar, model, model.block_x) || (A2($author$project$Check$cRightPillar, model, model.block_x) || (A2($author$project$Check$cUpPillar, model, model.block_y) || A2($author$project$Check$cDownPillar, model, model.block_y)))) ? $author$project$Model$overAttack : $author$project$Model$ongoingAttack;
		var ap = (((((model.gold_angle - model.pad_angle) - (2 * wp)) > 90) && (((model.gold_angle - model.pad_angle) - (2 * wp)) < 270)) || ((_Utils_cmp((model.gold_angle - model.pad_angle) - (2 * wp), -90) < 0) && (_Utils_cmp((model.gold_angle - model.pad_angle) - (2 * wp), -270) > 0))) ? (model.pad_angle + wp) : model.pad_angle;
		var ag = (((((model.gold_angle + (2 * wg)) - model.pad_angle) > 90) && (((model.gold_angle + (2 * wg)) - model.pad_angle) < 270)) || ((_Utils_cmp((model.gold_angle + (2 * wg)) - model.pad_angle, -90) < 0) && (_Utils_cmp((model.gold_angle + (2 * wg)) - model.pad_angle, -270) > 0))) ? (model.gold_angle + wg) : model.gold_angle;
		return _Utils_update(
			model,
			{attack: attackState, ball_vx: dxb, ball_vy: dyb, ball_x: xb, ball_y: yb, block_vx: vxb, block_vy: vyb, block_x: xBlock, block_y: yBlock, clover: clover, combo: combo, cyanLeaves: cyan, emptyLeaves: empty, exp: exp, gold_angle: ag, gold_w: wg, leaf: leaf, life: life, max_life: max_life, pad_angle: ap, pad_w: wp, pinkLeaves: pink, redLeaves: red, se: se, skills_cost: skills_cost, skills_ok: skills_ok, state: state, wShell_down: wDown, wShell_left: wLeft, wShell_right: wRight, wShell_up: wUp});
	});
var $author$project$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'KeyChanged':
				var isDown = msg.a;
				var key = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							keys: A3($author$project$Update$updateKeys, isDown, key, model.keys)
						}),
					$elm$core$Platform$Cmd$none);
			case 'TimeDelta':
				var dt = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Update$updateTime, model, 0.06),
					$elm$core$Platform$Cmd$none);
			case 'DrawBrick':
				var time = msg.a;
				return _Utils_Tuple2(
					model,
					A2($elm$random$Random$generate, $author$project$Message$NewBrick, $author$project$Update$brickGenerator));
			case 'NewBrick':
				var newBrick = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{nextBrick: newBrick}),
					$elm$core$Platform$Cmd$none);
			case 'DrawPoint':
				var time = msg.a;
				return _Utils_Tuple2(
					model,
					A2($elm$random$Random$generate, $author$project$Message$NewPoint, $author$project$Update$pointGenerator));
			case 'NewPoint':
				var newPoint = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{nextPoint: newPoint}),
					$elm$core$Platform$Cmd$none);
			case 'Alterpage':
				var booklet = msg.a;
				switch (booklet.$) {
					case 'Initi':
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									showingpage: A2(
										$elm$core$Maybe$withDefault,
										'a',
										$elm$core$List$head($author$project$Help$bookletList))
								}),
							$elm$core$Platform$Cmd$none);
					case 'Previousone':
						return _Utils_eq(
							model.showingpage,
							A2(
								$elm$core$Maybe$withDefault,
								'a',
								$elm$core$List$head($author$project$Help$bookletList))) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{
									showingpage: A2(
										$elm$core$Maybe$withDefault,
										'a',
										$elm$core$List$head(
											$elm$core$List$reverse($author$project$Help$bookletList)))
								}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									showingpage: A2(
										$elm$core$Maybe$withDefault,
										'a',
										A2($author$project$Help$previousOne, model, $author$project$Help$bookletList))
								}),
							$elm$core$Platform$Cmd$none);
					default:
						return _Utils_eq(
							model.showingpage,
							A2(
								$elm$core$Maybe$withDefault,
								'a',
								$elm$core$List$head(
									$elm$core$List$reverse($author$project$Help$bookletList)))) ? _Utils_Tuple2(
							_Utils_update(
								model,
								{
									showingpage: A2(
										$elm$core$Maybe$withDefault,
										'a',
										$elm$core$List$head($author$project$Help$bookletList))
								}),
							$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
							_Utils_update(
								model,
								{
									showingpage: A2(
										$elm$core$Maybe$withDefault,
										'a',
										A2($author$project$Help$nextOne, model, $author$project$Help$bookletList))
								}),
							$elm$core$Platform$Cmd$none);
				}
			case 'Start':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							attack: $author$project$Model$ongoingAttack,
							ball_vx: -3.0,
							ball_vy: -3.0,
							ball_x: 47,
							ball_y: 35,
							block_vx: 3,
							block_vy: 1.5,
							block_x: 10,
							block_y: 10,
							blueLeaves: _List_fromArray(
								[
									_Utils_Tuple2(0, 4),
									_Utils_Tuple2(1, 4),
									_Utils_Tuple2(2, 4),
									_Utils_Tuple2(3, 4),
									_Utils_Tuple2(4, 4),
									_Utils_Tuple2(5, 4),
									_Utils_Tuple2(6, 4),
									_Utils_Tuple2(7, 4),
									_Utils_Tuple2(8, 4),
									_Utils_Tuple2(9, 4),
									_Utils_Tuple2(10, 4),
									_Utils_Tuple2(0, 5),
									_Utils_Tuple2(1, 5),
									_Utils_Tuple2(2, 5),
									_Utils_Tuple2(3, 5),
									_Utils_Tuple2(4, 5),
									_Utils_Tuple2(5, 5),
									_Utils_Tuple2(6, 5),
									_Utils_Tuple2(7, 5),
									_Utils_Tuple2(8, 5),
									_Utils_Tuple2(9, 5),
									_Utils_Tuple2(10, 5),
									_Utils_Tuple2(0, 6),
									_Utils_Tuple2(1, 6),
									_Utils_Tuple2(2, 6),
									_Utils_Tuple2(3, 6),
									_Utils_Tuple2(4, 6),
									_Utils_Tuple2(5, 6),
									_Utils_Tuple2(6, 6),
									_Utils_Tuple2(7, 6),
									_Utils_Tuple2(8, 6),
									_Utils_Tuple2(9, 6),
									_Utils_Tuple2(10, 6),
									_Utils_Tuple2(0, 13),
									_Utils_Tuple2(1, 13),
									_Utils_Tuple2(2, 13),
									_Utils_Tuple2(3, 13),
									_Utils_Tuple2(4, 13),
									_Utils_Tuple2(5, 13),
									_Utils_Tuple2(6, 13),
									_Utils_Tuple2(7, 13),
									_Utils_Tuple2(8, 13),
									_Utils_Tuple2(9, 13),
									_Utils_Tuple2(10, 13),
									_Utils_Tuple2(0, 14),
									_Utils_Tuple2(1, 14),
									_Utils_Tuple2(2, 14),
									_Utils_Tuple2(3, 14),
									_Utils_Tuple2(4, 14),
									_Utils_Tuple2(5, 14),
									_Utils_Tuple2(6, 14),
									_Utils_Tuple2(7, 14),
									_Utils_Tuple2(8, 14),
									_Utils_Tuple2(9, 14),
									_Utils_Tuple2(10, 14),
									_Utils_Tuple2(0, 15),
									_Utils_Tuple2(1, 15),
									_Utils_Tuple2(2, 15),
									_Utils_Tuple2(3, 15),
									_Utils_Tuple2(4, 15),
									_Utils_Tuple2(5, 15),
									_Utils_Tuple2(6, 15),
									_Utils_Tuple2(7, 15),
									_Utils_Tuple2(8, 15),
									_Utils_Tuple2(9, 15),
									_Utils_Tuple2(10, 15)
								]),
							clover: A3($author$project$Model$Clover, false, false, false),
							combo: 0,
							cyanLeaves: _List_Nil,
							emptyLeaves: _List_Nil,
							exp: 0,
							gold_angle: 180,
							gold_w: 0,
							gold_x: 37,
							gold_y: 25,
							leaf: 0,
							life: 5,
							max_life: 5,
							minute: 0,
							nextBrick: $author$project$Outlooks$Red,
							nextPoint: _Utils_Tuple2(0, 0),
							pad_angle: 0,
							pad_w: 0,
							pad_x: 37,
							pad_y: 25,
							pinkLeaves: _List_Nil,
							redLeaves: _List_Nil,
							se: $author$project$Outlooks$Quite,
							second: 0,
							skills_cost: _List_fromArray(
								[10, 15, 20, 25, 30, 40, 50, 60, 70, 80]),
							skills_ok: _List_fromArray(
								[false, false, false, false, false, false, false, false, false, false]),
							state: $author$project$Model$Playing,
							wShell_down: 0,
							wShell_left: 0,
							wShell_right: 240,
							wShell_up: 120
						}),
					$elm$core$Platform$Cmd$none);
			case 'Keep':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{state: $author$project$Model$Playing}),
					$elm$core$Platform$Cmd$none);
			case 'Tick':
				var newTime = msg.a;
				var nextMinute = (model.second === 59) ? true : false;
				var second = nextMinute ? 0 : (model.second + 1);
				var minute = nextMinute ? (model.minute + 1) : model.minute;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{minute: minute, second: second}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2($elm$core$Task$perform, $author$project$Message$DrawBrick, $elm$time$Time$now),
								A2($elm$core$Task$perform, $author$project$Message$DrawPoint, $elm$time$Time$now)
							])));
			case 'LinkClicked':
				var urlRequest = msg.a;
				if (urlRequest.$ === 'Internal') {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.key,
							$elm$url$Url$toString(url)));
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			case 'UrlChanged':
				var url = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{url: url}),
					$elm$core$Platform$Cmd$none);
			case 'GoHelp':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{page: $author$project$Model$Help}),
					$elm$core$Platform$Cmd$none);
			case 'GoHome':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{page: $author$project$Model$Home}),
					$elm$core$Platform$Cmd$none);
			case 'GoGame':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{page: $author$project$Model$Game}),
					$elm$core$Platform$Cmd$none);
			case 'ChangeMusic':
				var music = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{music: music}),
					$elm$core$Platform$Cmd$none);
			default:
				var difficulty = msg.a;
				var max_life = function () {
					var _v5 = model.difficulty;
					switch (_v5.$) {
						case 'Normal':
							return 5;
						case 'Hard':
							return 3;
						default:
							return 1;
					}
				}();
				var life = function () {
					var _v4 = model.difficulty;
					switch (_v4.$) {
						case 'Normal':
							return 5;
						case 'Hard':
							return 3;
						default:
							return 1;
					}
				}();
				var expN = function () {
					var _v3 = model.difficulty;
					switch (_v3.$) {
						case 'Normal':
							return 1;
						case 'Hard':
							return 2;
						default:
							return 3;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							difficulty: difficulty,
							life: life,
							max_life: max_life,
							skills_cost: _List_fromArray(
								[25 * expN, 27 * expN, 29 * expN, 31 * expN, 33 * expN, 35 * expN, 40 * expN, 45 * expN, 50 * expN, 100 * expN])
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$Message$ChangeMusic = function (a) {
	return {$: 'ChangeMusic', a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Help$renderButton1 = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background', '#02020299'),
			A2($elm$html$Html$Attributes$style, 'color', '#28b8a9'),
			A2($elm$html$Html$Attributes$style, 'display', 'block'),
			A2($elm$html$Html$Attributes$style, 'height', '60px'),
			A2($elm$html$Html$Attributes$style, 'left', '430px'),
			A2($elm$html$Html$Attributes$style, 'top', '630px'),
			A2($elm$html$Html$Attributes$style, 'width', '200px'),
			A2($elm$html$Html$Attributes$style, 'border', '0'),
			$elm$html$Html$Events$onClick(
			$author$project$Message$ChangeMusic($author$project$Outlooks$TheOasis))
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Try \"The Oasis\"! (From movie \"Ready Player One\")')
		]));
var $author$project$Outlooks$ReturnOfAncients = {$: 'ReturnOfAncients'};
var $author$project$Help$renderButton2 = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background', '#0202024d'),
			A2($elm$html$Html$Attributes$style, 'color', '#28b8a9'),
			A2($elm$html$Html$Attributes$style, 'display', 'block'),
			A2($elm$html$Html$Attributes$style, 'height', '60px'),
			A2($elm$html$Html$Attributes$style, 'left', '630px'),
			A2($elm$html$Html$Attributes$style, 'top', '630px'),
			A2($elm$html$Html$Attributes$style, 'width', '200px'),
			A2($elm$html$Html$Attributes$style, 'border', '0'),
			$elm$html$Html$Events$onClick(
			$author$project$Message$ChangeMusic($author$project$Outlooks$ReturnOfAncients))
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Try \"Return of Ancients\"! (From game \"WarcraftIII\")')
		]));
var $author$project$Outlooks$InSearchOfLife = {$: 'InSearchOfLife'};
var $author$project$Help$renderButton3 = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background', '#02020299'),
			A2($elm$html$Html$Attributes$style, 'color', '#28b8a9'),
			A2($elm$html$Html$Attributes$style, 'display', 'block'),
			A2($elm$html$Html$Attributes$style, 'height', '60px'),
			A2($elm$html$Html$Attributes$style, 'left', '830px'),
			A2($elm$html$Html$Attributes$style, 'top', '630px'),
			A2($elm$html$Html$Attributes$style, 'width', '200px'),
			A2($elm$html$Html$Attributes$style, 'border', '0'),
			$elm$html$Html$Events$onClick(
			$author$project$Message$ChangeMusic($author$project$Outlooks$InSearchOfLife))
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Try \"In Search of Life\"! (From game \"Stellaris\")')
		]));
var $author$project$Outlooks$TheChordOfSpring = {$: 'TheChordOfSpring'};
var $author$project$Help$renderButton4 = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background', '#0202024d'),
			A2($elm$html$Html$Attributes$style, 'color', '#28b8a9'),
			A2($elm$html$Html$Attributes$style, 'display', 'block'),
			A2($elm$html$Html$Attributes$style, 'height', '60px'),
			A2($elm$html$Html$Attributes$style, 'left', '1030px'),
			A2($elm$html$Html$Attributes$style, 'top', '630px'),
			A2($elm$html$Html$Attributes$style, 'width', '200px'),
			A2($elm$html$Html$Attributes$style, 'border', '0'),
			$elm$html$Html$Events$onClick(
			$author$project$Message$ChangeMusic($author$project$Outlooks$TheChordOfSpring))
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Try \"The Chord of Spring\"! (From game \"Arknights\")')
		]));
var $author$project$Message$Alterpage = function (a) {
	return {$: 'Alterpage', a: a};
};
var $author$project$Outlooks$Previousone = {$: 'Previousone'};
var $author$project$Help$renderButtonLeft = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background', '#02020299'),
			A2($elm$html$Html$Attributes$style, 'color', '#8acce7'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2($elm$html$Html$Attributes$style, 'font-family', 'Chalkduster'),
			A2($elm$html$Html$Attributes$style, 'font-size', '40px'),
			A2($elm$html$Html$Attributes$style, 'font-weight', '300'),
			A2($elm$html$Html$Attributes$style, 'height', '90px'),
			A2($elm$html$Html$Attributes$style, 'width', '350px'),
			A2($elm$html$Html$Attributes$style, 'left', '1000px'),
			A2($elm$html$Html$Attributes$style, 'bottom', '600px'),
			A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
			A2($elm$html$Html$Attributes$style, 'border', '0'),
			$elm$html$Html$Events$onClick(
			$author$project$Message$Alterpage($author$project$Outlooks$Previousone))
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Previous Page')
		]));
var $author$project$Outlooks$Nextone = {$: 'Nextone'};
var $author$project$Help$renderButtonRight = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background', '#02020299'),
			A2($elm$html$Html$Attributes$style, 'color', '#8acce7'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2($elm$html$Html$Attributes$style, 'font-family', 'Chalkduster'),
			A2($elm$html$Html$Attributes$style, 'font-size', '40px'),
			A2($elm$html$Html$Attributes$style, 'font-weight', '300'),
			A2($elm$html$Html$Attributes$style, 'height', '90px'),
			A2($elm$html$Html$Attributes$style, 'width', '350px'),
			A2($elm$html$Html$Attributes$style, 'left', '1000px'),
			A2($elm$html$Html$Attributes$style, 'bottom', '200px'),
			A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
			A2($elm$html$Html$Attributes$style, 'border', '0'),
			$elm$html$Html$Events$onClick(
			$author$project$Message$Alterpage($author$project$Outlooks$Nextone))
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Next Page')
		]));
var $author$project$Help$renderDifficulty = function (model) {
	var content = function () {
		var _v0 = model.difficulty;
		switch (_v0.$) {
			case 'Normal':
				return 'Normal';
			case 'Hard':
				return 'Hard';
			default:
				return 'Nightmare';
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'color', '#ffffff'),
				A2($elm$html$Html$Attributes$style, 'display', 'block'),
				A2($elm$html$Html$Attributes$style, 'height', '600x'),
				A2($elm$html$Html$Attributes$style, 'left', '500px'),
				A2($elm$html$Html$Attributes$style, 'top', '730px'),
				A2($elm$html$Html$Attributes$style, 'width', '200px'),
				A2($elm$html$Html$Attributes$style, 'border', '0')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text('Current Difficulty: ' + content)
			]));
};
var $author$project$Message$ChangeDifficulty = function (a) {
	return {$: 'ChangeDifficulty', a: a};
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $author$project$Help$renderDifficulty1 = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background', '#524f4f99'),
			A2($elm$html$Html$Attributes$style, 'color', '#2fa11a'),
			A2($elm$html$Html$Attributes$style, 'display', 'block'),
			A2($elm$html$Html$Attributes$style, 'height', '30px'),
			A2($elm$html$Html$Attributes$style, 'left', '500px'),
			A2($elm$html$Html$Attributes$style, 'top', '730px'),
			A2($elm$html$Html$Attributes$style, 'width', '200px'),
			A2($elm$html$Html$Attributes$style, 'border', '0'),
			$elm$html$Html$Events$onClick(
			$author$project$Message$ChangeDifficulty($author$project$Outlooks$Normal)),
			$elm$html$Html$Attributes$title('A wise choice.')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Normal')
		]));
var $author$project$Outlooks$Hard = {$: 'Hard'};
var $author$project$Help$renderDifficulty2 = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background', '#adadad99'),
			A2($elm$html$Html$Attributes$style, 'color', '#e0dc48'),
			A2($elm$html$Html$Attributes$style, 'display', 'block'),
			A2($elm$html$Html$Attributes$style, 'height', '30px'),
			A2($elm$html$Html$Attributes$style, 'left', '700px'),
			A2($elm$html$Html$Attributes$style, 'top', '730px'),
			A2($elm$html$Html$Attributes$style, 'width', '200px'),
			A2($elm$html$Html$Attributes$style, 'border', '0'),
			$elm$html$Html$Events$onClick(
			$author$project$Message$ChangeDifficulty($author$project$Outlooks$Hard)),
			$elm$html$Html$Attributes$title('Emm.')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Hard')
		]));
var $author$project$Outlooks$Nightmare = {$: 'Nightmare'};
var $author$project$Help$renderDifficulty3 = A2(
	$elm$html$Html$button,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background', '#e0d4d499'),
			A2($elm$html$Html$Attributes$style, 'color', '#841707'),
			A2($elm$html$Html$Attributes$style, 'display', 'block'),
			A2($elm$html$Html$Attributes$style, 'height', '30px'),
			A2($elm$html$Html$Attributes$style, 'left', '900px'),
			A2($elm$html$Html$Attributes$style, 'top', '730px'),
			A2($elm$html$Html$Attributes$style, 'width', '200px'),
			A2($elm$html$Html$Attributes$style, 'border', '0'),
			$elm$html$Html$Events$onClick(
			$author$project$Message$ChangeDifficulty($author$project$Outlooks$Nightmare)),
			$elm$html$Html$Attributes$title('Do not try it.')
		]),
	_List_fromArray(
		[
			$elm$html$Html$text('Nightmare')
		]));
var $author$project$Message$GoHome = {$: 'GoHome'};
var $author$project$Color$RGBA = F4(
	function (red, green, blue, alpha) {
		return {alpha: alpha, blue: blue, green: green, red: red};
	});
var $author$project$Color$grey = A4($author$project$Color$RGBA, 200 / 255, 214 / 255, 229 / 255, 1);
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $j_panasiuk$elm_ionicons$Ionicon$Internal$toAlphaString = function (value) {
	return A2(
		$elm$core$String$left,
		5,
		$elm$core$String$fromFloat(
			A3($elm$core$Basics$clamp, 0, 1, value)));
};
var $j_panasiuk$elm_ionicons$Ionicon$Internal$toColorString = function (value) {
	return A2(
		$elm$core$String$left,
		5,
		$elm$core$String$fromFloat(
			A3($elm$core$Basics$clamp, 0, 255, 255 * value)));
};
var $j_panasiuk$elm_ionicons$Ionicon$Internal$fill = function (_v0) {
	var red = _v0.red;
	var green = _v0.green;
	var blue = _v0.blue;
	var alpha = _v0.alpha;
	var _v1 = ((0 <= alpha) && (alpha < 1)) ? _Utils_Tuple2(
		'rgba',
		_List_fromArray(
			[
				$j_panasiuk$elm_ionicons$Ionicon$Internal$toColorString(red),
				$j_panasiuk$elm_ionicons$Ionicon$Internal$toColorString(green),
				$j_panasiuk$elm_ionicons$Ionicon$Internal$toColorString(blue),
				$j_panasiuk$elm_ionicons$Ionicon$Internal$toAlphaString(alpha)
			])) : _Utils_Tuple2(
		'rgb',
		_List_fromArray(
			[
				$j_panasiuk$elm_ionicons$Ionicon$Internal$toColorString(red),
				$j_panasiuk$elm_ionicons$Ionicon$Internal$toColorString(green),
				$j_panasiuk$elm_ionicons$Ionicon$Internal$toColorString(blue)
			]));
	var colorSpace = _v1.a;
	var values = _v1.b;
	return colorSpace + ('(' + (A2($elm$core$String$join, ',', values) + ')'));
};
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $elm$svg$Svg$Attributes$enableBackground = _VirtualDom_attribute('enable-background');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$version = _VirtualDom_attribute('version');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $j_panasiuk$elm_ionicons$Ionicon$Internal$svg = function (size) {
	return $elm$svg$Svg$svg(
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$version('1.1'),
				$elm$svg$Svg$Attributes$x('0px'),
				$elm$svg$Svg$Attributes$y('0px'),
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromInt(size)),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromInt(size)),
				$elm$svg$Svg$Attributes$viewBox('0 0 512 512'),
				$elm$svg$Svg$Attributes$enableBackground('new 0 0 512 512')
			]));
};
var $j_panasiuk$elm_ionicons$Ionicon$Internal$pg = F3(
	function (points, size, color) {
		return A2(
			$j_panasiuk$elm_ionicons$Ionicon$Internal$svg,
			size,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$polygon,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$points(points),
							$elm$svg$Svg$Attributes$fill(
							$j_panasiuk$elm_ionicons$Ionicon$Internal$fill(color))
						]),
					_List_Nil)
				]));
	});
var $j_panasiuk$elm_ionicons$Ionicon$home = $j_panasiuk$elm_ionicons$Ionicon$Internal$pg('448,288 256,64 64,288 112,288 112,448 208,448 208,320 304,320 304,448 400,448 400,288');
var $author$project$Help$renderHome = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'top', '30px'),
			A2($elm$html$Html$Attributes$style, 'left', '30px'),
			$elm$html$Html$Attributes$title('Is everything OK?'),
			A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
			$elm$html$Html$Events$onClick($author$project$Message$GoHome)
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2($j_panasiuk$elm_ionicons$Ionicon$home, 50, $author$project$Color$grey)
				]))
		]));
var $elm$html$Html$audio = _VirtualDom_node('audio');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$controls = $elm$html$Html$Attributes$boolProperty('controls');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $author$project$Help$renderMusic = function (model) {
	var music = function () {
		var _v0 = model.music;
		switch (_v0.$) {
			case 'Null':
				return '';
			case 'ReturnOfAncients':
				return 'assets/musics/Return of Ancients.mp3';
			case 'TheOasis':
				return 'assets/musics/The Oasis.mp3';
			case 'TheChordOfSpring':
				return 'assets/musics/The Chord of Spring.mp3';
			default:
				return 'assets/musics/In Search of Life.mp3';
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'top', '430px'),
				A2($elm$html$Html$Attributes$style, 'left', '530px')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$audio,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$src(music),
						$elm$html$Html$Attributes$controls(true)
					]),
				_List_Nil)
			]));
};
var $author$project$Model$Point = F2(
	function (x, y) {
		return {x: x, y: y};
	});
var $elm$svg$Svg$image = $elm$svg$Svg$trustedNode('image');
var $elm$svg$Svg$Attributes$xlinkHref = function (value) {
	return A3(
		_VirtualDom_attributeNS,
		'http://www.w3.org/1999/xlink',
		'xlink:href',
		_VirtualDom_noJavaScriptUri(value));
};
var $author$project$Object$renderBooklet = F4(
	function (point, wid, hei, pic) {
		return A2(
			$elm$svg$Svg$image,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$xlinkHref(pic),
					$elm$svg$Svg$Attributes$x(
					$elm$core$String$fromFloat(point.x) + '%'),
					$elm$svg$Svg$Attributes$y(
					$elm$core$String$fromFloat(point.y) + '%'),
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromFloat(wid) + '%'),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromFloat(hei) + '%')
				]),
			_List_Nil);
	});
var $author$project$Help$renderNiceOutlook = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'backgroundColor', '#1d1d1d')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$svg,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$viewBox('0 0 400 200')
					]),
				_List_fromArray(
					[
						A4(
						$author$project$Object$renderBooklet,
						A2($author$project$Model$Point, 0, 0),
						80,
						100,
						model.showingpage)
					]))
			]));
};
var $author$project$Help$view = function (model) {
	return _List_fromArray(
		[
			$author$project$Help$renderNiceOutlook(model),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'backgroundColor', '#1d1d1d')
				]),
			_List_fromArray(
				[
					$author$project$Help$renderMusic(model),
					$author$project$Help$renderButton1,
					$author$project$Help$renderButton2,
					$author$project$Help$renderButton3,
					$author$project$Help$renderButton4,
					$author$project$Help$renderDifficulty1,
					$author$project$Help$renderDifficulty2,
					$author$project$Help$renderDifficulty3,
					$author$project$Help$renderHome,
					$author$project$Help$renderDifficulty(model),
					$author$project$Help$renderButtonLeft,
					$author$project$Help$renderButtonRight
				]))
		]);
};
var $author$project$Message$GoGame = {$: 'GoGame'};
var $author$project$Message$GoHelp = {$: 'GoHelp'};
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$li = _VirtualDom_node('li');
var $author$project$Object$renderInterface = F4(
	function (point, wid, hei, pic) {
		return A2(
			$elm$svg$Svg$image,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$xlinkHref(pic),
					$elm$svg$Svg$Attributes$x(
					$elm$core$String$fromFloat(point.x) + '%'),
					$elm$svg$Svg$Attributes$y(
					$elm$core$String$fromFloat(point.y) + '%'),
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromFloat(wid) + '%'),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromFloat(hei) + '%')
				]),
			_List_Nil);
	});
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Outlooks$viewbackground = 'assets/views/viewbkg.png';
var $author$project$Home$view = _List_fromArray(
	[
		A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'backgroundColor', '#1d1d1d')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$svg,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$viewBox('0 0 400 400')
					]),
				_List_fromArray(
					[
						A4(
						$author$project$Object$renderInterface,
						A2($author$project$Model$Point, 0, 0),
						100,
						65,
						$author$project$Outlooks$viewbackground)
					]))
			])),
		A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'backgroundColor', '#1d1d1d')
			]),
		_List_fromArray(
			[
				A2($elm$html$Html$img, _List_Nil, _List_Nil),
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'background', '#02020299'),
										A2($elm$html$Html$Attributes$style, 'color', '#8acce7'),
										A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
										A2($elm$html$Html$Attributes$style, 'font-family', 'Chalkduster'),
										A2($elm$html$Html$Attributes$style, 'font-size', '40px'),
										A2($elm$html$Html$Attributes$style, 'font-weight', '300'),
										A2($elm$html$Html$Attributes$style, 'height', '90px'),
										A2($elm$html$Html$Attributes$style, 'width', '350px'),
										A2($elm$html$Html$Attributes$style, 'left', '580px'),
										A2($elm$html$Html$Attributes$style, 'bottom', '450px'),
										A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
										A2($elm$html$Html$Attributes$style, 'border', '0'),
										$elm$html$Html$Events$onClick($author$project$Message$GoGame)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Play')
									]))
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$button,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'background', '#02020299'),
										A2($elm$html$Html$Attributes$style, 'color', '#8acce7'),
										A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
										A2($elm$html$Html$Attributes$style, 'font-family', 'Chalkduster'),
										A2($elm$html$Html$Attributes$style, 'font-size', '40px'),
										A2($elm$html$Html$Attributes$style, 'font-weight', '300'),
										A2($elm$html$Html$Attributes$style, 'height', '90px'),
										A2($elm$html$Html$Attributes$style, 'width', '350px'),
										A2($elm$html$Html$Attributes$style, 'left', '580px'),
										A2($elm$html$Html$Attributes$style, 'bottom', '300px'),
										A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
										A2($elm$html$Html$Attributes$style, 'border', '0'),
										$elm$html$Html$Events$onClick($author$project$Message$GoHelp)
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Help')
									]))
							]))
					]))
			]))
	]);
var $author$project$Outlooks$attacker = 'assets/main/attack.png';
var $author$project$Outlooks$background = 'assets/main/saveOasis.png';
var $author$project$Outlooks$ball = 'assets/main/ball.png';
var $author$project$Outlooks$bright = 'assets/main/brighten.png';
var $author$project$Outlooks$brighter = 'assets/main/brighterer.png';
var $author$project$Outlooks$circular = 'assets/main/circular.png';
var $author$project$Outlooks$cloverC = 'assets/main/clover/core.png';
var $author$project$Outlooks$cloverL = 'assets/main/clover/left.png';
var $author$project$Outlooks$cloverR = 'assets/main/clover/right.png';
var $author$project$Outlooks$cloverU = 'assets/main/clover/up.png';
var $author$project$Outlooks$downleft = 'assets/main/downleft.png';
var $author$project$Outlooks$downright = 'assets/main/downright.png';
var $author$project$Outlooks$forclover = 'assets/main/clover/forclover.png';
var $author$project$Outlooks$gold = 'assets/main/shootpaddle.png';
var $author$project$Outlooks$interface = 'assets/main/trans.png';
var $elm_community$list_extra$List$Extra$reverseAppend = F2(
	function (list1, list2) {
		return A3($elm$core$List$foldl, $elm$core$List$cons, list2, list1);
	});
var $elm_community$list_extra$List$Extra$interweaveHelp = F3(
	function (acc, list1, list2) {
		interweaveHelp:
		while (true) {
			var _v0 = _Utils_Tuple2(list1, list2);
			if (_v0.a.b) {
				if (_v0.b.b) {
					var _v1 = _v0.a;
					var x = _v1.a;
					var xs = _v1.b;
					var _v2 = _v0.b;
					var y = _v2.a;
					var ys = _v2.b;
					var $temp$acc = A2(
						$elm$core$List$cons,
						y,
						A2($elm$core$List$cons, x, acc)),
						$temp$list1 = xs,
						$temp$list2 = ys;
					acc = $temp$acc;
					list1 = $temp$list1;
					list2 = $temp$list2;
					continue interweaveHelp;
				} else {
					return A2($elm_community$list_extra$List$Extra$reverseAppend, acc, list1);
				}
			} else {
				return A2($elm_community$list_extra$List$Extra$reverseAppend, acc, list2);
			}
		}
	});
var $elm_community$list_extra$List$Extra$interweave = $elm_community$list_extra$List$Extra$interweaveHelp(_List_Nil);
var $author$project$Outlooks$pad = 'assets/main/bendpaddle.png';
var $author$project$Object$r = 1;
var $author$project$Object$renderBall = F4(
	function (point, side1, side2, pic) {
		return A2(
			$elm$svg$Svg$image,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$xlinkHref(pic),
					$elm$svg$Svg$Attributes$x(
					$elm$core$String$fromFloat(point.x - $author$project$Object$r) + '%'),
					$elm$svg$Svg$Attributes$y(
					$elm$core$String$fromFloat(point.y - $author$project$Object$r) + '%'),
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromFloat(side1) + '%'),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromFloat(side2) + '%')
				]),
			_List_Nil);
	});
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $j_panasiuk$elm_ionicons$Ionicon$Internal$p = F3(
	function (d, size, color) {
		return A2(
			$j_panasiuk$elm_ionicons$Ionicon$Internal$svg,
			size,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d(d),
							$elm$svg$Svg$Attributes$fill(
							$j_panasiuk$elm_ionicons$Ionicon$Internal$fill(color))
						]),
					_List_Nil)
				]));
	});
var $j_panasiuk$elm_ionicons$Ionicon$help = $j_panasiuk$elm_ionicons$Ionicon$Internal$p('M345.1,77.1C317.6,56.2,286.6,49,247.3,49c-29.8,0-55.3,6.1-75.5,19.7C142,89,128,123.1,128,177h76.8c0-14.4-1.4-29.9,7-43.2c8.4-13.3,20.1-23.5,40.2-23.5c20.4,0,30.9,5.9,40.8,18.1c8.4,10.4,11.6,22.8,11.6,36c0,11.4-5.8,21.9-12.7,31.4c-3.8,5.6-8.8,10.6-15.1,15.4c0,0-41.5,24.7-56.1,48.1c-10.9,17.4-14.8,39.2-15.7,65.3c-0.1,1.9,0.6,5.8,7.2,5.8c6.5,0,56,0,61.8,0c5.8,0,7-4.4,7.1-6.2c0.4-9.5,1.6-24.1,3.3-29.6c3.3-10.4,9.7-19.5,19.7-27.3l20.7-14.3c18.7-14.6,33.6-26.5,40.2-35.9c11.3-15.4,19.2-34.4,19.2-56.9C384,123.5,370.5,96.4,345.1,77.1zM242,370.2c-25.9-0.8-47.3,17.2-48.2,45.3c-0.8,28.2,19.5,46.7,45.5,47.5c27,0.8,47.9-16.6,48.7-44.7C288.8,390.2,269,371,242,370.2z');
var $elm$svg$Svg$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $j_panasiuk$elm_ionicons$Ionicon$refresh = $j_panasiuk$elm_ionicons$Ionicon$Internal$p('M416,352l96-111.9h-64.7c-2.3-27.9-10.5-54-23.5-77.3c-27.4-49.2-75.8-85.1-133-95.6c-0.7-0.1-1.5-0.3-2.2-0.4c-0.5-0.1-0.9-0.2-1.4-0.2C277.1,64.9,266.6,64,256,64c-0.1,0-0.3,0-0.4,0c0,0,0,0,0,0c-90.9,0.2-167,63.6-186.7,148.6c0,0,0,0.1,0,0.1c-0.3,1.1-0.5,2.2-0.7,3.3c-0.1,0.5-0.2,0.9-0.3,1.4c-0.1,0.7-0.3,1.4-0.4,2.1c-0.2,0.9-0.3,1.7-0.5,2.6c-0.1,0.4-0.1,0.7-0.2,1.1c-0.2,1.2-0.4,2.4-0.6,3.6c0,0.1,0,0.1,0,0.2c-1,6.3-1.6,12.7-1.9,19.1c0,0.3,0,0.6,0,0.8c-0.1,1.4-0.1,2.7-0.2,4.1c0,1.6-0.1,3.3-0.1,5c0,1.7,0,3.3,0.1,5c0,1.4,0.1,2.7,0.2,4.1c0,0.3,0,0.6,0,0.9c0.3,6.5,1,12.9,1.9,19.1c0,0.1,0,0.1,0,0.2c0.2,1.2,0.4,2.4,0.6,3.6c0.1,0.4,0.1,0.7,0.2,1.1c0.2,0.9,0.3,1.8,0.5,2.6c0.1,0.7,0.3,1.4,0.4,2.1c0.1,0.5,0.2,1,0.3,1.4c0.2,1.1,0.5,2.2,0.7,3.2c0,0,0,0.1,0,0.1c19.7,85,96.1,148.4,187.1,148.6c42.9-0.1,83.1-14.2,116.9-40.7l7.5-5.9l-43.2-46.2l-6.2,4.6c-22.1,16.3-47.5,24.2-75,24.2c-70.6,0-128-57-128-128c0-71,57.4-128,128-128c66.4,0,122.8,46.6,129.5,112H312L416,352z');
var $author$project$Dashboard$renderSettings = function () {
	var refresh = A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x('59%'),
				$elm$svg$Svg$Attributes$y('2.2%')
			]),
		_List_fromArray(
			[
				A2($j_panasiuk$elm_ionicons$Ionicon$refresh, 9, $author$project$Color$grey)
			]));
	var hype2 = A2(
		$elm$svg$Svg$rect,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x('62%'),
				$elm$svg$Svg$Attributes$y('4%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$fillOpacity('0'),
				$elm$svg$Svg$Events$onClick($author$project$Message$GoHelp)
			]),
		_List_Nil);
	var hype1 = A2(
		$elm$svg$Svg$rect,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x('62%'),
				$elm$svg$Svg$Attributes$y('1.2%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$fillOpacity('0'),
				$elm$svg$Svg$Events$onClick($author$project$Message$GoHome)
			]),
		_List_Nil);
	var home = A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x('62%'),
				$elm$svg$Svg$Attributes$y('1%')
			]),
		_List_fromArray(
			[
				A2($j_panasiuk$elm_ionicons$Ionicon$home, 9, $author$project$Color$grey)
			]));
	var help = A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x('62%'),
				$elm$svg$Svg$Attributes$y('3.8%')
			]),
		_List_fromArray(
			[
				A2($j_panasiuk$elm_ionicons$Ionicon$help, 9, $author$project$Color$grey)
			]));
	return _List_fromArray(
		[refresh, home, help, hype1, hype2]);
}();
var $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $author$project$Dashboard$skillCost = F2(
	function (model, num) {
		var xx = 65 + ((num - 1) * 2.5);
		var xxx = $elm$core$String$fromFloat(xx) + '%';
		var req_exp = A2(
			$elm_community$list_extra$List$Extra$getAt,
			$elm$core$Basics$floor(num) - 1,
			model.skills_cost);
		return A2(
			$elm$svg$Svg$text_,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x(xxx),
					$elm$svg$Svg$Attributes$y('4%'),
					$elm$svg$Svg$Attributes$fill('white'),
					$elm$svg$Svg$Attributes$fontSize('3')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					'C:' + $elm$core$String$fromInt(
						$author$project$Dashboard$fromJust(req_exp)))
				]));
	});
var $j_panasiuk$elm_ionicons$Ionicon$checkmarkRound = $j_panasiuk$elm_ionicons$Ionicon$Internal$p('M448,71.9c-17.3-13.4-41.5-9.3-54.1,9.1L214,344.2l-99.1-107.3c-14.6-16.6-39.1-17.4-54.7-1.8c-15.6,15.5-16.4,41.6-1.7,58.1c0,0,120.4,133.6,137.7,147c17.3,13.4,41.5,9.3,54.1-9.1l206.3-301.7C469.2,110.9,465.3,85.2,448,71.9z');
var $j_panasiuk$elm_ionicons$Ionicon$closeRound = $j_panasiuk$elm_ionicons$Ionicon$Internal$p('M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z');
var $author$project$Color$green = A4($author$project$Color$RGBA, 29 / 255, 209 / 255, 161 / 255, 1);
var $author$project$Color$red = A4($author$project$Color$RGBA, 255 / 255, 107 / 255, 107 / 255, 1);
var $author$project$Dashboard$skillStatus = F2(
	function (model, num) {
		var xx = 65 + ((num - 1) * 2.5);
		var xxx = $elm$core$String$fromFloat(xx) + '%';
		var sta = _Utils_eq(
			A2(
				$elm_community$list_extra$List$Extra$getAt,
				$elm$core$Basics$floor(num) - 1,
				model.skills_ok),
			$elm$core$Maybe$Just(true)) ? A2($j_panasiuk$elm_ionicons$Ionicon$checkmarkRound, 4, $author$project$Color$green) : A2($j_panasiuk$elm_ionicons$Ionicon$closeRound, 4, $author$project$Color$red);
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x(xxx),
					$elm$svg$Svg$Attributes$y('5.2%')
				]),
			_List_fromArray(
				[sta]));
	});
var $author$project$Outlooks$trait1 = 'assets/skills/Trait_charismatic.png';
var $author$project$Outlooks$trait10 = 'assets/skills/Trait_intelligent.png';
var $author$project$Outlooks$trait11 = 'assets/skills/Trait_very_intelligent.png';
var $author$project$Outlooks$trait12 = 'assets/skills/Trait_boss.png';
var $author$project$Outlooks$trait13 = 'assets/skills/Trait_rapid_speed.png';
var $author$project$Outlooks$trait2 = 'assets/skills/Trait_cybernetic.png';
var $author$project$Outlooks$trait4 = 'assets/skills/Trait_erudite.png';
var $author$project$Outlooks$trait5 = 'assets/skills/Trait_psionic.png';
var $author$project$Outlooks$trait6 = 'assets/skills/Trait_strong.png';
var $author$project$Outlooks$trait8 = 'assets/skills/Trait_enduring.png';
var $author$project$Dashboard$renderSkills = function (model) {
	var wid = 2.5;
	var stx = 65;
	var t1 = A2(
		$elm$svg$Svg$image,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(stx + (wid * 0)) + '%'),
				$elm$svg$Svg$Attributes$y('1%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$xlinkHref($author$project$Outlooks$trait8)
			]),
		_List_Nil);
	var t10 = A2(
		$elm$svg$Svg$image,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(stx + (wid * 9)) + '%'),
				$elm$svg$Svg$Attributes$y('1%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$xlinkHref($author$project$Outlooks$trait5)
			]),
		_List_Nil);
	var t2 = A2(
		$elm$svg$Svg$image,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(stx + (wid * 1)) + '%'),
				$elm$svg$Svg$Attributes$y('1%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$xlinkHref($author$project$Outlooks$trait11)
			]),
		_List_Nil);
	var t3 = A2(
		$elm$svg$Svg$image,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(stx + (wid * 2)) + '%'),
				$elm$svg$Svg$Attributes$y('1%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$xlinkHref($author$project$Outlooks$trait13)
			]),
		_List_Nil);
	var t4 = A2(
		$elm$svg$Svg$image,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(stx + (wid * 3)) + '%'),
				$elm$svg$Svg$Attributes$y('1%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$xlinkHref($author$project$Outlooks$trait2)
			]),
		_List_Nil);
	var t5 = A2(
		$elm$svg$Svg$image,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(stx + (wid * 4)) + '%'),
				$elm$svg$Svg$Attributes$y('1%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$xlinkHref($author$project$Outlooks$trait10)
			]),
		_List_Nil);
	var t6 = A2(
		$elm$svg$Svg$image,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(stx + (wid * 5)) + '%'),
				$elm$svg$Svg$Attributes$y('1%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$xlinkHref($author$project$Outlooks$trait6)
			]),
		_List_Nil);
	var t7 = A2(
		$elm$svg$Svg$image,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(stx + (wid * 6)) + '%'),
				$elm$svg$Svg$Attributes$y('1%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$xlinkHref($author$project$Outlooks$trait1)
			]),
		_List_Nil);
	var t8 = A2(
		$elm$svg$Svg$image,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(stx + (wid * 7)) + '%'),
				$elm$svg$Svg$Attributes$y('1%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$xlinkHref($author$project$Outlooks$trait12)
			]),
		_List_Nil);
	var t9 = A2(
		$elm$svg$Svg$image,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(stx + (wid * 8)) + '%'),
				$elm$svg$Svg$Attributes$y('1%'),
				$elm$svg$Svg$Attributes$width('2%'),
				$elm$svg$Svg$Attributes$height('2%'),
				$elm$svg$Svg$Attributes$xlinkHref($author$project$Outlooks$trait4)
			]),
		_List_Nil);
	return _List_fromArray(
		[
			t1,
			t2,
			t3,
			t4,
			t5,
			t6,
			t7,
			t8,
			t9,
			t10,
			A2($author$project$Dashboard$skillCost, model, 1),
			A2($author$project$Dashboard$skillCost, model, 2),
			A2($author$project$Dashboard$skillCost, model, 3),
			A2($author$project$Dashboard$skillCost, model, 4),
			A2($author$project$Dashboard$skillCost, model, 5),
			A2($author$project$Dashboard$skillCost, model, 6),
			A2($author$project$Dashboard$skillCost, model, 7),
			A2($author$project$Dashboard$skillCost, model, 8),
			A2($author$project$Dashboard$skillCost, model, 9),
			A2($author$project$Dashboard$skillCost, model, 10),
			A2($author$project$Dashboard$skillStatus, model, 1),
			A2($author$project$Dashboard$skillStatus, model, 2),
			A2($author$project$Dashboard$skillStatus, model, 3),
			A2($author$project$Dashboard$skillStatus, model, 4),
			A2($author$project$Dashboard$skillStatus, model, 5),
			A2($author$project$Dashboard$skillStatus, model, 6),
			A2($author$project$Dashboard$skillStatus, model, 7),
			A2($author$project$Dashboard$skillStatus, model, 8),
			A2($author$project$Dashboard$skillStatus, model, 9),
			A2($author$project$Dashboard$skillStatus, model, 10)
		]);
};
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $j_panasiuk$elm_ionicons$Ionicon$Internal$ps = F3(
	function (ds, size, color) {
		return A2(
			$j_panasiuk$elm_ionicons$Ionicon$Internal$svg,
			size,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$g,
					_List_Nil,
					A2(
						$elm$core$List$map,
						function (d) {
							return A2(
								$elm$svg$Svg$path,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$d(d),
										$elm$svg$Svg$Attributes$fill(
										$j_panasiuk$elm_ionicons$Ionicon$Internal$fill(color))
									]),
								_List_Nil);
						},
						ds))
				]));
	});
var $j_panasiuk$elm_ionicons$Ionicon$clock = $j_panasiuk$elm_ionicons$Ionicon$Internal$ps(
	_List_fromArray(
		['M255.988,32C132.285,32,32,132.298,32,256c0,123.715,100.285,224,223.988,224C379.703,480,480,379.715,480,256C480,132.298,379.703,32,255.988,32zM391.761,391.765c-10.099,10.098-21.126,18.928-32.886,26.42l-15.946-27.62l-13.856,8l15.955,27.636c-24.838,13.03-52.372,20.455-81.027,21.624V416h-16v31.825c-28.656-1.166-56.191-8.59-81.03-21.62l15.958-27.641l-13.856-8l-15.949,27.625c-11.761-7.492-22.79-16.324-32.889-26.424c-10.099-10.099-18.93-21.127-26.422-32.889l27.624-15.949l-8-13.855L85.796,345.03c-13.03-24.839-20.454-52.374-21.621-81.03H96v-16H64.175c1.167-28.655,8.592-56.19,21.623-81.029l27.638,15.958l8-13.856l-27.623-15.948c7.492-11.76,16.322-22.787,26.419-32.885c10.1-10.101,21.129-18.933,32.89-26.426l15.949,27.624l13.856-8l-15.958-27.64C191.81,72.765,219.345,65.34,248,64.175V96h16V64.176c28.654,1.169,56.188,8.595,81.026,21.626l-15.954,27.634l13.856,8l15.945-27.618c11.76,7.492,22.787,16.323,32.886,26.421c10.1,10.099,18.931,21.126,26.424,32.887l-27.619,15.946l8,13.856l27.636-15.956c13.031,24.839,20.457,52.373,21.624,81.027H416v16h31.824c-1.167,28.655-8.592,56.189-21.622,81.028l-27.637-15.957l-8,13.856l27.621,15.947C410.693,370.637,401.861,381.665,391.761,391.765z', 'M400,241H284.268c-2.818-5.299-7.083-9.708-12.268-12.708V160h-32v68.292c-9.562,5.534-16,15.866-16,27.708 c0,17.673,14.327,32,32,32c11.425,0,21.444-5.992,27.106-15H400V241z']));
var $author$project$Color$deep_grey = A4($author$project$Color$RGBA, 87 / 255, 101 / 255, 116 / 255, 1);
var $j_panasiuk$elm_ionicons$Ionicon$heart = $j_panasiuk$elm_ionicons$Ionicon$Internal$p('M429.9,95.6c-40.4-42.1-106-42.1-146.4,0L256,124.1l-27.5-28.6c-40.5-42.1-106-42.1-146.4,0c-45.5,47.3-45.5,124.1,0,171.4L256,448l173.9-181C475.4,219.7,475.4,142.9,429.9,95.6z');
var $j_panasiuk$elm_ionicons$Ionicon$leaf = $j_panasiuk$elm_ionicons$Ionicon$Internal$p('M456.7,378.7c-52.5-8-56.5-15.7-56.5-15.7c10.8-64.9-22.7-147.1-77.4-191.6c-72.8-59.2-183.5-16.2-269.7-106.2c-20.1-21-8.4,235.5,99.5,332.7c78.9,71,171.8,49.2,197.3,37.6c23.1-10.6,39.3-29.9,39.3-29.9c42.1,13,62.9,12.2,62.9,12.2C466.9,419.6,474.4,381.4,456.7,378.7zM360.6,383.1c-138.2-40.9-242.1-184.5-242.1-184.5s91.2,107.7,252,160.2C370.7,366.9,365.9,378.5,360.6,383.1z');
var $j_panasiuk$elm_ionicons$Ionicon$star = $j_panasiuk$elm_ionicons$Ionicon$Internal$pg('480,200 308.519,200 256.029,32 203.519,200 32,200 170.946,304.209 116,480 256,368 396,480 341.073,304.195');
var $author$project$Color$yellow = A4($author$project$Color$RGBA, 254 / 255, 202 / 255, 87 / 255, 1);
var $author$project$Dashboard$renderStatus = function (model) {
	var star = A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x('40%'),
				$elm$svg$Svg$Attributes$y('4%')
			]),
		_List_fromArray(
			[
				A2($j_panasiuk$elm_ionicons$Ionicon$star, 7, $author$project$Color$yellow)
			]));
	var out_second = $elm$core$String$fromInt(model.second);
	var out_minute = $elm$core$String$fromInt(model.minute);
	var life = A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x('40%'),
				$elm$svg$Svg$Attributes$y('1%')
			]),
		_List_fromArray(
			[
				A2($j_panasiuk$elm_ionicons$Ionicon$heart, 7, $author$project$Color$red)
			]));
	var leaf = A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x('48%'),
				$elm$svg$Svg$Attributes$y('1%')
			]),
		_List_fromArray(
			[
				A2($j_panasiuk$elm_ionicons$Ionicon$leaf, 7, $author$project$Color$green)
			]));
	var clock = A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$x('48%'),
				$elm$svg$Svg$Attributes$y('4%')
			]),
		_List_fromArray(
			[
				A2($j_panasiuk$elm_ionicons$Ionicon$clock, 7, $author$project$Color$deep_grey)
			]));
	return _List_fromArray(
		[
			life,
			A2(
			$elm$svg$Svg$text_,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('42%'),
					$elm$svg$Svg$Attributes$y('2.5%'),
					$elm$svg$Svg$Attributes$fill('white'),
					$elm$svg$Svg$Attributes$fontSize('4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					'Life: ' + ($elm$core$String$fromInt(model.life) + ('/' + $elm$core$String$fromInt(model.max_life))))
				])),
			star,
			A2(
			$elm$svg$Svg$text_,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('42%'),
					$elm$svg$Svg$Attributes$y('5.5%'),
					$elm$svg$Svg$Attributes$fill('white'),
					$elm$svg$Svg$Attributes$fontSize('4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					'Exp: ' + $elm$core$String$fromInt(model.exp))
				])),
			leaf,
			(model.leaf !== 1) ? A2(
			$elm$svg$Svg$text_,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('50%'),
					$elm$svg$Svg$Attributes$y('2.5%'),
					$elm$svg$Svg$Attributes$fill('white'),
					$elm$svg$Svg$Attributes$fontSize('4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$elm$core$String$fromInt(model.leaf) + ' Clovers collect')
				])) : A2(
			$elm$svg$Svg$text_,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('50%'),
					$elm$svg$Svg$Attributes$y('2.5%'),
					$elm$svg$Svg$Attributes$fill('white'),
					$elm$svg$Svg$Attributes$fontSize('4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$elm$core$String$fromInt(model.leaf) + ' Clover collect')
				])),
			clock,
			A2(
			$elm$svg$Svg$text_,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('50%'),
					$elm$svg$Svg$Attributes$y('5.5%'),
					$elm$svg$Svg$Attributes$fill('white'),
					$elm$svg$Svg$Attributes$fontSize('4')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Time Played' + (':' + (out_minute + (':' + out_second))))
				]))
		]);
};
var $author$project$View$renderDashboard = function (model) {
	return A2(
		$elm$core$List$append,
		A2(
			$elm$core$List$append,
			$author$project$Dashboard$renderSettings,
			$author$project$Dashboard$renderStatus(model)),
		$author$project$Dashboard$renderSkills(model));
};
var $author$project$Message$Keep = {$: 'Keep'};
var $author$project$Message$Start = {$: 'Start'};
var $author$project$View$renderGameButton = function (model) {
	var _v0 = (_Utils_eq(model.state, $author$project$Model$Stopped) && ((!model.minute) && (!model.second))) ? _Utils_Tuple2('New game', $author$project$Message$Start) : ((_Utils_eq(model.state, $author$project$Model$Stopped) && (((!(!model.minute)) || (!(!model.second))) && (!model.life))) ? _Utils_Tuple2('Failure. Start again!', $author$project$Message$Start) : ((_Utils_eq(model.state, $author$project$Model$Stopped) && (((!(!model.minute)) || (!(!model.second))) && (!(!model.life)))) ? _Utils_Tuple2('Victory!', $author$project$Message$Start) : _Utils_Tuple2('Enjoy the game!', $author$project$Message$Keep)));
	var txt = _v0.a;
	var msg = _v0.b;
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background', '#39393880'),
				A2($elm$html$Html$Attributes$style, 'border', '0'),
				A2($elm$html$Html$Attributes$style, 'top', '1%'),
				A2($elm$html$Html$Attributes$style, 'color', '#12ec02'),
				A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
				A2($elm$html$Html$Attributes$style, 'display', 'block'),
				A2($elm$html$Html$Attributes$style, 'font-family', 'Chalkduster'),
				A2($elm$html$Html$Attributes$style, 'font-size', '30px'),
				A2($elm$html$Html$Attributes$style, 'font-weight', '300'),
				A2($elm$html$Html$Attributes$style, 'height', '7%'),
				A2($elm$html$Html$Attributes$style, 'left', '2%'),
				A2($elm$html$Html$Attributes$style, 'line-height', '40px'),
				A2($elm$html$Html$Attributes$style, 'outline', 'none'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'padding', '0'),
				A2($elm$html$Html$Attributes$style, 'width', '30%'),
				A2($elm$html$Html$Attributes$style, 'z-index', '1'),
				$elm$html$Html$Events$onClick(msg)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(txt)
			]));
};
var $elm$html$Html$embed = _VirtualDom_node('embed');
var $elm$html$Html$Attributes$loop = $elm$html$Html$Attributes$boolProperty('loop');
var $author$project$View$renderMusic = function (model) {
	var music = function () {
		var _v0 = model.music;
		switch (_v0.$) {
			case 'Null':
				return '';
			case 'ReturnOfAncients':
				return 'assets/musics/Return of Ancients.mp3';
			case 'TheOasis':
				return 'assets/musics/The Oasis.mp3';
			case 'TheChordOfSpring':
				return 'assets/musics/The Chord of Spring.mp3';
			default:
				return 'assets/musics/In Search of Life.mp3';
		}
	}();
	return A2(
		$elm$html$Html$embed,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '50px'),
				A2($elm$html$Html$Attributes$style, 'width', '100px'),
				$elm$html$Html$Attributes$src(music),
				$elm$html$Html$Attributes$loop(true)
			]),
		_List_Nil);
};
var $author$project$Object$renderRandGem = F4(
	function (point, wid, hei, pic) {
		return A2(
			$elm$svg$Svg$image,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$xlinkHref(pic),
					$elm$svg$Svg$Attributes$x(
					$elm$core$String$fromFloat(point.x) + '%'),
					$elm$svg$Svg$Attributes$y(
					$elm$core$String$fromFloat(point.y) + '%'),
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromFloat(wid) + '%'),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromFloat(hei) + '%')
				]),
			_List_Nil);
	});
var $author$project$Outlooks$dec_leaf = 'assets/main/bricks/decreasing.png';
var $author$project$Outlooks$inc_leaf = 'assets/main/bricks/increasing.png';
var $author$project$Outlooks$nor_leaf = 'assets/main/bricks/normal.png';
var $author$project$Outlooks$nor_leaf_2 = 'assets/main/bricks/normal2.png';
var $author$project$Object$renderSomeBrick = F6(
	function (num1, num2, point, wid, hei, pic) {
		var b = point.y + (hei * num2);
		var a = point.x + (wid * num1);
		return A2(
			$elm$svg$Svg$image,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$xlinkHref(pic),
					$elm$svg$Svg$Attributes$x(
					$elm$core$String$fromFloat(a) + '%'),
					$elm$svg$Svg$Attributes$y(
					$elm$core$String$fromFloat(b) + '%'),
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromFloat(wid) + '%'),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromFloat(hei) + '%')
				]),
			_List_Nil);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Object$renderABrick = F5(
	function (a, model, point, wid, hei) {
		return (A2($elm$core$List$member, a, model.cyanLeaves) && (!A2($elm$core$List$member, a, model.emptyLeaves))) ? _List_fromArray(
			[
				A6($author$project$Object$renderSomeBrick, a.b, a.a, point, wid, hei, $author$project$Outlooks$nor_leaf_2)
			]) : ((A2($elm$core$List$member, a, model.pinkLeaves) && (!A2($elm$core$List$member, a, model.emptyLeaves))) ? _List_fromArray(
			[
				A6($author$project$Object$renderSomeBrick, a.b, a.a, point, wid, hei, $author$project$Outlooks$inc_leaf)
			]) : ((A2($elm$core$List$member, a, model.redLeaves) && (!A2($elm$core$List$member, a, model.emptyLeaves))) ? _List_fromArray(
			[
				A6($author$project$Object$renderSomeBrick, a.b, a.a, point, wid, hei, $author$project$Outlooks$dec_leaf)
			]) : (((!A2($elm$core$List$member, a, model.cyanLeaves)) && ((!A2($elm$core$List$member, a, model.pinkLeaves)) && ((!A2($elm$core$List$member, a, model.redLeaves)) && ((!A2($elm$core$List$member, a, model.emptyLeaves)) && A2($elm$core$List$member, a, model.blueLeaves))))) ? _List_fromArray(
			[
				A6($author$project$Object$renderSomeBrick, a.b, a.a, point, wid, hei, $author$project$Outlooks$nor_leaf)
			]) : _List_fromArray(
			[
				A2($elm$html$Html$div, _List_Nil, _List_Nil)
			]))));
	});
var $author$project$Object$renderColumnBrick = F6(
	function (point, model, wid, hei, num1, num2) {
		return (num1 >= 0) ? A2(
			$elm_community$list_extra$List$Extra$interweave,
			A5(
				$author$project$Object$renderABrick,
				_Utils_Tuple2(num1, num2),
				model,
				point,
				wid,
				hei),
			A6($author$project$Object$renderColumnBrick, point, model, wid, hei, num1 - 1, num2)) : _List_Nil;
	});
var $author$project$Object$renderRowBrick = F6(
	function (point, model, wid, hei, num1, num2) {
		return (num2 >= 0) ? A2(
			$elm_community$list_extra$List$Extra$interweave,
			A6($author$project$Object$renderColumnBrick, point, model, wid, hei, num1, num2),
			A6($author$project$Object$renderRowBrick, point, model, wid, hei, num1, num2 - 1)) : _List_Nil;
	});
var $elm$html$Html$Attributes$autoplay = $elm$html$Html$Attributes$boolProperty('autoplay');
var $author$project$View$renderSE = function (model) {
	var music = function () {
		var _v0 = model.se;
		switch (_v0.$) {
			case 'Quite':
				return '';
			case 'Fire':
				return 'assets/musics/SE/Fire.mp3';
			case 'Frozen':
				return 'assets/musics/SE/Frozen.mp3';
			default:
				return 'assets/musics/SE/Ordinary.mp3';
		}
	}();
	return A2(
		$elm$html$Html$audio,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '50px'),
				A2($elm$html$Html$Attributes$style, 'width', '100px'),
				$elm$html$Html$Attributes$src(music),
				$elm$html$Html$Attributes$autoplay(true),
				$elm$html$Html$Attributes$loop(true)
			]),
		_List_Nil);
};
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $author$project$Object$rotateCircle = F5(
	function (point, wid, hei, pic, angle) {
		return A2(
			$elm$svg$Svg$image,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$xlinkHref(pic),
					$elm$svg$Svg$Attributes$x(
					$elm$core$String$fromFloat(point.x) + '%'),
					$elm$svg$Svg$Attributes$y(
					$elm$core$String$fromFloat(point.y) + '%'),
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromFloat(wid) + '%'),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromFloat(hei) + '%'),
					$elm$svg$Svg$Attributes$transform(
					'rotate(' + ($elm$core$String$fromFloat((-1) * angle) + (',' + ($elm$core$String$fromFloat(4 * (point.x + 5)) + (',' + ($elm$core$String$fromFloat(4 * (point.y + 5)) + ')'))))))
				]),
			_List_Nil);
	});
var $author$project$Outlooks$upleft = 'assets/main/upleft.png';
var $author$project$Outlooks$upright = 'assets/main/upright.png';
var $author$project$Outlooks$vKernel0 = 'assets/main/stage0.png';
var $author$project$Outlooks$vKernel1 = 'assets/main/stage5.png';
var $author$project$Outlooks$vKernel2 = 'assets/main/stage4.png';
var $author$project$Outlooks$vKernel3 = 'assets/main/stage3.png';
var $author$project$Outlooks$vKernel4 = 'assets/main/stage2.png';
var $author$project$Outlooks$vKernel5 = 'assets/main/stage1.png';
var $author$project$Outlooks$vkf = 'assets/main/clover.png';
var $author$project$View$view = function (model) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'backgroundColor', '#1d1d1d')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$viewBox('0 0 400 400')
						]),
					A2(
						$elm_community$list_extra$List$Extra$interweave,
						$author$project$View$renderDashboard(model),
						A2(
							$elm_community$list_extra$List$Extra$interweave,
							A6(
								$author$project$Object$renderRowBrick,
								A2($author$project$Model$Point, 2, 8),
								model,
								4,
								4,
								10,
								19),
							_List_fromArray(
								[
									A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 0, 0),
									100,
									65,
									$author$project$Outlooks$background),
									A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 2, 0),
									80,
									60,
									$author$project$Outlooks$interface),
									A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 87, 32),
									10,
									10,
									$author$project$Outlooks$forclover),
									(model.life >= 5) ? A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 38, 26),
									8,
									8,
									$author$project$Outlooks$vKernel5) : ((model.life === 4) ? A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 38, 26),
									8,
									8,
									$author$project$Outlooks$vKernel4) : ((model.life === 3) ? A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 38, 26),
									8,
									8,
									$author$project$Outlooks$vKernel3) : ((model.life === 2) ? A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 38, 26),
									8,
									8,
									$author$project$Outlooks$vKernel2) : ((model.life === 1) ? A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 38, 26),
									8,
									8,
									$author$project$Outlooks$vKernel1) : A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 38, 26),
									8,
									8,
									$author$project$Outlooks$vKernel0))))),
									A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, model.pad_x, model.pad_y),
									10,
									10,
									$author$project$Outlooks$pad,
									model.pad_angle),
									A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, model.gold_x, model.gold_y),
									10,
									10,
									$author$project$Outlooks$gold,
									model.gold_angle),
									A4(
									$author$project$Object$renderBall,
									A2($author$project$Model$Point, model.ball_x, model.ball_y),
									2,
									2,
									$author$project$Outlooks$ball),
									A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 5, 25),
									10,
									10,
									$author$project$Outlooks$circular,
									model.wShell_left),
									A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 69, 25),
									10,
									10,
									$author$project$Outlooks$circular,
									model.wShell_right),
									A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 37, 9),
									10,
									10,
									$author$project$Outlooks$circular,
									model.wShell_up),
									A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 37, 41),
									10,
									10,
									$author$project$Outlooks$circular,
									model.wShell_down),
									A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 87, 32),
									10,
									10,
									$author$project$Outlooks$cloverC,
									0),
									model.clover.leftClover ? A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 87, 32),
									10,
									10,
									$author$project$Outlooks$cloverL,
									0) : A2($elm$svg$Svg$svg, _List_Nil, _List_Nil),
									model.clover.rightClover ? A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 87, 32),
									10,
									10,
									$author$project$Outlooks$cloverR,
									0) : A2($elm$svg$Svg$svg, _List_Nil, _List_Nil),
									model.clover.upClover ? A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 87, 32),
									10,
									10,
									$author$project$Outlooks$cloverU,
									0) : A2($elm$svg$Svg$svg, _List_Nil, _List_Nil),
									(!model.clover.upClover) ? A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 37, 9),
									10,
									10,
									$author$project$Outlooks$vkf,
									0) : A2($elm$svg$Svg$svg, _List_Nil, _List_Nil),
									(!model.clover.leftClover) ? A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 5, 25),
									10,
									10,
									$author$project$Outlooks$vkf,
									120) : A2($elm$svg$Svg$svg, _List_Nil, _List_Nil),
									(!model.clover.rightClover) ? A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 69, 25),
									10,
									10,
									$author$project$Outlooks$vkf,
									240) : A2($elm$svg$Svg$svg, _List_Nil, _List_Nil),
									(A5($author$project$Check$cValidB, model.wShell_down, model.ball_x, model.ball_y, 42, 46) && (model.life < 5)) ? A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 37, 41),
									10,
									10,
									$author$project$Outlooks$brighter,
									0) : A5(
									$author$project$Object$rotateCircle,
									A2($author$project$Model$Point, 37, 41),
									10,
									10,
									$author$project$Outlooks$bright,
									0),
									A4(
									$author$project$Object$renderRandGem,
									A2($author$project$Model$Point, model.block_x, model.block_y),
									2,
									2,
									$author$project$Outlooks$attacker),
									A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 2, 8),
									10,
									10,
									$author$project$Outlooks$upleft),
									A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 2, 42),
									10,
									10,
									$author$project$Outlooks$downleft),
									A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 72, 8),
									10,
									10,
									$author$project$Outlooks$upright),
									A4(
									$author$project$Object$renderInterface,
									A2($author$project$Model$Point, 72, 42),
									10,
									10,
									$author$project$Outlooks$downright)
								]))))
				])),
			A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$View$renderMusic(model)
				])),
			A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$View$renderSE(model)
				])),
			A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					$author$project$View$renderGameButton(model)
				]))
		]);
};
var $author$project$Main$view = function (model) {
	var title = function () {
		var _v1 = model.page;
		switch (_v1.$) {
			case 'Home':
				return 'Save Oasis-Home';
			case 'Help':
				return 'Save Oasis-Settings';
			default:
				return 'Save the oasis!';
		}
	}();
	var body = function () {
		var _v0 = model.page;
		switch (_v0.$) {
			case 'Home':
				return $author$project$Home$view;
			case 'Help':
				return $author$project$Help$view(model);
			default:
				return $author$project$View$view(model);
		}
	}();
	return {body: body, title: title};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{init: $author$project$Model$initial, onUrlChange: $author$project$Message$UrlChanged, onUrlRequest: $author$project$Message$LinkClicked, subscriptions: $author$project$Main$subscriptions, update: $author$project$Update$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));