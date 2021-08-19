// Generally you should only need to change the host variable.
{
	var http = ('https:' == document.location.protocol ? 'https://' : 'http://');
  	var host='latex.codecogs.com';
	
	EQUATION_ENGINE = http+host;
	FAVORITE_ENGINE = http+host+'/json';
	EDITOR_SRC      = http+host;
	EMBED_ENGINE    = http+host+'/editor_embedded_json.php';
	EDIT_ENGINE     = http+'www.codecogs.com/eqnedit.php';
	EDITOR_SW_FLASH = http+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0';
	EDITOR_SW_PLAYER= http+'www.macromedia.com/go/getflashplayer';
}

// a unique code that identifies the user, allowing history and preferences to be remembered and saved.
// For this, we suggest choosing your email address and adding a random sequence of numbers to it for security reasons.
var SID = '';

// specifies the design of the editor to use.
// Parameters for design are covered separately here: http://latex.codecogs.com/eqneditor/docs/design.php
var design = '';

// defines the spoken language to use:
// zh-cn	Cantonese
// nl-nl	Dutch (Nederlands)
// nl-be	Dutch Belgian
// en-us	English USA
// en-en	English British
// fr-fr	French (Fraçais)
// de-de	German (Deutsch)
// el-el	Greek (Έλληνας)
// lt-lt	Lithuanian (lietuvių kalba)
// hu-hu	Hungarian (Magyar)
// it-it	Italian (Italiano)
// ir-fa	Persian (Farsi)
// pl-pl	Polish (Polski)
// ro-ro	Romanian (Roman)
// ru-ru	Rusian (русский язык)
// es-es	Spanish (Español)
// tr-tr	Turkish (Türkçe)
// uk-uk	Ukranian (українець)
// vi-vi	Vietnamese
var language = '';