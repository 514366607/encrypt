
var encrypt = require( './encrypt' );

var test = encrypt.encode( "testzxcva" );
test = encrypt.decode( test );
console.log( "OK:" + test + ";" );