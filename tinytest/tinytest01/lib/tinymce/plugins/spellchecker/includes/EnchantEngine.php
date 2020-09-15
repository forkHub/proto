<?php
/**
* EnchantEngine.php
*
* Copyright, Moxiecode Systems AB
* Released under LGPL License.
*
* License: http://www.tinymce.com/license
* Contributing: http://www.tinymce.com/contributing
*/

class TinyMCE_SpellChecker_EnchantEngine extends TinyMCE_SpellChecker_Engine {
    /**
    * Spellchecks an array of words.
    *
    * @param String $lang Selected language code (like en_US or de_DE).
    * @param Array $words Array of words to check.
    * @return Name/value object with arrays of suggestions.
    */
    public function getSuggestions($lang, $words) {
        $suggestions = array();
        $enchant = enchant_broker_init();
        $config = $this->getConfig();
        $enchant_dicts_path = $config["enchant.dictionary.path"];
        $enchant_pwl_path = $config["personal.dictionary.path"];

        if (isset($enchant_dicts_path)) {
            enchant_broker_set_dict_path($enchant, ENCHANT_MYSPELL, $enchant_dicts_path);
        }

        if (!enchant_broker_describe($enchant)) {
            throw new Exception("Enchant spellchecker could not find any backends.");
        }

        // if requested dict is 'en' switch to configured default for enchant \ hunspell
        if ($lang == 'en'){
            $lang = $config['enchant.default.en.dictionary'];
        }
        $lang = $this->normalizeLangCode($lang);

        $dict = enchant_broker_request_dict($enchant, $lang);
        $pwldict = $this->getPersonalDictionary($enchant, $enchant_pwl_path, $lang);

        if ($dict == true) {
            foreach ($words as $word) {
                if (!enchant_dict_check($dict, $word) && !enchant_dict_check($pwldict, $word)) {
                    $dictSuggs = $this->getDictionarySuggestions($dict, $word);
                    $pwlSuggs = $this->getDictionarySuggestions($pwldict, $word);
                    $suggs = array_unique(array_merge($dictSuggs, $pwlSuggs));
                    $suggestions[$word] = $suggs;
                }
            }
            enchant_broker_free_dict($dict);
            enchant_broker_free_dict($pwldict);
            enchant_broker_free($enchant);
        } else {
            enchant_broker_free_dict($pwldict);
            enchant_broker_free($enchant);
            throw new Exception("Enchant spellchecker could not find dictionary for language: " . $lang);
        }

        $numberOfSuggestions = count($suggestions);
        if($numberOfSuggestions = 0) {
            throw new Exception("No misspellings Found.");
        }

        return $suggestions;
    }

    /**
    * Return true/false if the engine is supported by the server.
    *
    * @return boolean True/false if the engine is supported.
    */
    public function isSupported() {
        return function_exists("enchant_broker_init");
    }

    /**
     * Add word to personal word list.
     * @param String $lang Selected language code (like en_US or de_DE).
     * @param String $word word to be add to the personal word list.
     */
    public function addToDictionary($lang, $word) {
        $config = $this->getConfig();
        $enchant_pwl_path = $config["personal.dictionary.path"];
        if (!isset($enchant_pwl_path)) {
            throw new Exception("Enchant spellchecker could not find the wordlist location.");
        }

        $enchant = enchant_broker_init();
        $lang = $this->normalizeLangCode($lang);
        $pwldict = $this->getPersonalDictionary($enchant, $enchant_pwl_path, $lang);
        if($pwldict === false) {
            enchant_broker_free($enchant);
            throw new Exception("Enchant spellchecker could not write into the wordlist, because wordlist is unavailable.");
        } else {
            $success = enchant_dict_add_to_personal($pwldict, $word);
            enchant_broker_free_dict($pwldict);
            enchant_broker_free($enchant);
            if($success === false) {
                throw new Exception("Enchant spellchecker failed to save $word into wordlist.");
            }
        }
    }

    private function normalizeLangCode($lang) {
        return str_replace("-", "_", $lang);
    }

    private function getPersonalDictionary($enchant, $basePath, $lang) {
        $pwlpath = $basePath . DIRECTORY_SEPARATOR . $lang . ".pwl";
        return enchant_broker_request_pwl_dict($enchant, $pwlpath);
    }

    private function getDictionarySuggestions($dict, $word) {
        $suggs = enchant_dict_suggest($dict, $word);
        if (!is_array($suggs)) {
            $suggs = array();
        }
        return $suggs;
    }
}

TinyMCE_Spellchecker_Engine::add("enchant", "TinyMCE_SpellChecker_EnchantEngine");
?>
