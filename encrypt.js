
/**
* @Content		:	加密解密方法
* @Author		:	hehs
* @Version		:	1.0.0
*/
var encrypt	=	module.exports;

encrypt.encrypt_key = "testkey";	//密钥

encrypt.encode = function( content ) {

	var en_data = new Array();
	for (var i = 0 ; i < content.length ; i++ ) {
		en_data.push( content.charCodeAt(i) );
	}
	
	var en_key	=	new Array();
    for (var i = 0 ; i < this.encrypt_key.length ; i++ ) {
		en_key.push( this.encrypt_key.charCodeAt(i) );
	}
	
	en_data[0] = en_data[0] ^ en_data[0];
	for( var i = 1 ; i < en_data.length ; i++ ){
		en_data[ i ] = en_data[ i ] ^ en_data[ i - 1 ] ^ en_key[ i & 7 ];
	}
	en_data[3] = en_data[3] ^ en_key[2];
	en_data[2] = en_data[2] ^ en_data[3] ^ en_key[3];
	en_data[1] = en_data[1] ^ en_data[2] ^ en_key[4];
	en_data[0] = en_data[0] ^ en_data[1] ^ en_key[5];
	
	result = '';  
    for (var i = 0 ; i < en_data.length ; i++ ) {
		result += String.fromCharCode( en_data[i] )
	}
	
	return result;
};

encrypt.decode = function( content ) {
	var de_data = new Array();
	for (var i = 0 ; i < content.length ; i++ ) {
		de_data.push( content.charCodeAt(i) );
	}
	
    var de_key	=	new Array();
    for (var i = 0 ; i < this.encrypt_key.length ; i++ ) {
		de_key.push( this.encrypt_key.charCodeAt(i) );
	}
	
	de_data[0] = de_data[0] ^ de_data[1] ^ de_key[5];
	de_data[1] = de_data[1] ^ de_data[2] ^ de_key[4];
	de_data[2] = de_data[2] ^ de_data[3] ^ de_key[3];
	de_data[3] = de_data[3] ^ de_key[2];
	
	for ( var i = de_data.length - 1 ; i > 0 ; i-- ) {
		de_data[ i ] =  de_data[ i ] ^ de_data[ i - 1 ] ^ de_key[ i & 7 ];
	}
	de_data[0] = de_data[0] ^ de_key[0];
	
	result = '';  
    for (var i = 0 ; i < de_data.length ; i++ ) {
		result += String.fromCharCode( de_data[i] )
	}
	
	return result;
};