<?php
/**
 * PSpellEngine.php
 *
 * Copyright, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

class TinyMCE_SpellChecker_PSpellEngine extends TinyMCE_SpellChecker_Engine
{
	/**
	 * Spellchecks an array of words.
	 *
     * @param String $lang Selected language code (like en_US or de_DE).1
	 * @param Array $words Array of words to check.
	 * @return Name/value object with arrays of suggestions.
	 */
    public function getSuggestions($lang, $words)
    {
		$config = $this->getConfig();
		$outWords = array();
        $plink    = $this->getPLink($lang);
		foreach ($words as $word) {
			if (!pspell_check($plink, trim($word))) {
 				$suggs = pspell_suggest($plink, $word);
    			$outWords[utf8_encode($word)] = $suggs;
			}
		}
		return $outWords;
	}

	/**
     * Opens a link for pspell.
     */
    public function getPLink($lang)
    {
		$config = $this->getConfig();

		switch ($config['pspell.mode']) {
			case "fast":
				$mode = PSPELL_FAST;
				break;

			case "slow":
				$mode = PSPELL_BAD_SPELLERS;
				break;

			default:
				$mode = PSPELL_NORMAL;
		}

        // Setup PSpell link
        $pspell_config = pspell_config_create($lang);   // http://php.net/manual/en/function.pspell-config-create.php

        $personal_dict = $config['personal.dictionary.path'] . DIRECTORY_SEPARATOR .  $lang . ".pws";

        pspell_config_personal($pspell_config, $personal_dict);
        pspell_config_mode($pspell_config, $mode);
        $plink = pspell_new_config($pspell_config);

        if (!$plink)
            throw new Exception("No PSpell link found opened.");

        return $plink;
    }

	/**
	 *
	 *
     * @param String $lang Selected language code (like en_US or de_DE).
	 * @param Array $words Array of words to check.
	 *
	 */
    public function addToDictionary($lang, $word)
    {
		$plink = $this->getPLink($lang);
        try {
            pspell_add_to_personal($plink, $word);
            pspell_save_wordlist($plink);
        }
        catch (Exception $e) {
			 throw new Exception("Failed to save into wordlist.");
		}
        return "true";
	}

	/**
	 * Return true/false if the engine is supported by the server.
	 *
	 * @return boolean True/false if the engine is supported.
	 */
    public function isSupported()
    {
		return function_exists("pspell_new");
	}
}

TinyMCE_Spellchecker_Engine::add("pspell", "TinyMCE_SpellChecker_PSpellEngine");
?>
