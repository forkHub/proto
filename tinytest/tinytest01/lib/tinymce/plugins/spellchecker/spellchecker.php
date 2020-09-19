<?php
/**
 * spellcheck.php
 *
 * Copyright, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 *
 * GY 04/2018 Modified to enable Enchant with Hunspell Dictionaries as main spellchecking engine. PSpell with ASpell Dictionaries no longer actively supported by PHP for years
 */

require('./includes/Engine.php');
require('./includes/EnchantEngine.php');
require('./includes/PSpellEngine.php');

header('Access-Control-Allow-Origin: *');		// Allow calls from any origin. Recommend updating this header with an approved list of origin URLs for hardened security, refer to docs for more info.
header('Access-Control-Allow-Headers: Origin, X-Requested-With');

$tinymceSpellCheckerConfig = array(
	'engine' => 'enchant', // enchant or pspell. enchant recommended, pspell not supported on windows.

	// Enchant Options
	'enchant.dictionary.path' => '/usr/share/myspell',  // Path that contains hunspell dictionaries for enchant. Set to RHEL default install path, refer to docs for more info.
	'enchant.default.en.dictionary' => 'en_US',  // English dictionary enchant \ hunspell will fall back to if 'en' is requested. Enchant only.

	// PSpell Options
	'pspell.mode' => 'fast',	// Available options are 'fast' or 'slow'. Can also unset this for pspell to default to it's normal mode.  Default is 'fast'.

	// Personal Dictionary Options - Applies to any Spellchecker Engine
	'personal.dictionary.path' => './dicts',  // writable path (for both webserver and php) to save personal word lists files in, refer to docs for more info
);

TinyMCE_Spellchecker_Engine::processRequest($tinymceSpellCheckerConfig);
?>
