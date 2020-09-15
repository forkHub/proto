/**
 * Compiled inline version. (Library mode)
 */

/*jshint smarttabs:true, undef:true, latedef:true, curly:true, bitwise:true, camelcase:true */
/*globals $code */

(function(exports, undefined) {
	"use strict";

	var modules = {};

	function require(ids, callback) {
		var module, defs = [];

		for (var i = 0; i < ids.length; ++i) {
			module = modules[ids[i]] || resolve(ids[i]);
			if (!module) {
				throw 'module definition dependecy not found: ' + ids[i];
			}

			defs.push(module);
		}

		callback.apply(null, defs);
	}

	function define(id, dependencies, definition) {
		if (typeof id !== 'string') {
			throw 'invalid module definition, module id must be defined and be a string';
		}

		if (dependencies === undefined) {
			throw 'invalid module definition, dependencies must be specified';
		}

		if (definition === undefined) {
			throw 'invalid module definition, definition function must be specified';
		}

		require(dependencies, function() {
			modules[id] = definition.apply(null, arguments);
		});
	}

	function defined(id) {
		return !!modules[id];
	}

	function resolve(id) {
		var target = exports;
		var fragments = id.split(/[.\/]/);

		for (var fi = 0; fi < fragments.length; ++fi) {
			if (!target[fragments[fi]]) {
				return;
			}

			target = target[fragments[fi]];
		}

		return target;
	}

	function expose(ids) {
		var i, target, id, fragments, privateModules;

		for (i = 0; i < ids.length; i++) {
			target = exports;
			id = ids[i];
			fragments = id.split(/[.\/]/);

			for (var fi = 0; fi < fragments.length - 1; ++fi) {
				if (target[fragments[fi]] === undefined) {
					target[fragments[fi]] = {};
				}

				target = target[fragments[fi]];
			}

			target[fragments[fragments.length - 1]] = modules[id];
		}
		
		// Expose private modules for unit tests
		if (exports.AMDLC_TESTS) {
			privateModules = exports.privateModules || {};

			for (id in modules) {
				privateModules[id] = modules[id];
			}

			for (i = 0; i < ids.length; i++) {
				delete privateModules[ids[i]];
			}

			exports.privateModules = privateModules;
		}
	}

// Included from: js/tinymce/plugins/spellchecker/classes/DomTextMatcher.js

/**
 * DomTextMatcher.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2015 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*eslint no-labels:0, no-constant-condition: 0 */

/**
 * This class logic for filtering text and matching words.
 *
 * @class tinymce.spellcheckerplugin.TextFilter
 * @private
 */
define("tinymce/spellcheckerplugin/DomTextMatcher", [], function() {
	function isContentEditableFalse(node) {
		return node && node.nodeType == 1 && node.contentEditable === "false";
	}

	// Based on work developed by: James Padolsey http://james.padolsey.com
	// released under UNLICENSE that is compatible with LGPL
	// TODO: Handle contentEditable edgecase:
	// <p>text<span contentEditable="false">text<span contentEditable="true">text</span>text</span>text</p>
	return function(node, editor) {
		var m, matches = [], text, dom = editor.dom;
		var blockElementsMap, hiddenTextElementsMap, shortEndedElementsMap;

		blockElementsMap = editor.schema.getBlockElements(); // H1-H6, P, TD etc
		hiddenTextElementsMap = editor.schema.getWhiteSpaceElements(); // TEXTAREA, PRE, STYLE, SCRIPT
		shortEndedElementsMap = editor.schema.getShortEndedElements(); // BR, IMG, INPUT

		function createMatch(m, data) {
			if (!m[0]) {
				throw 'findAndReplaceDOMText cannot handle zero-length matches';
			}

			return {
				start: m.index,
				end: m.index + m[0].length,
				text: m[0],
				data: data
			};
		}

		function getText(node) {
			var txt;

			if (node.nodeType === 3) {
				return node.data;
			}

			if (hiddenTextElementsMap[node.nodeName] && !blockElementsMap[node.nodeName]) {
				return '';
			}

			if (isContentEditableFalse(node)) {
				return '\n';
			}

			txt = '';

			if (blockElementsMap[node.nodeName] || shortEndedElementsMap[node.nodeName]) {
				txt += '\n';
			}

			if ((node = node.firstChild)) {
				do {
					txt += getText(node);
				} while ((node = node.nextSibling));
			}

			return txt;
		}

		function stepThroughMatches(node, matches, replaceFn) {
			var startNode, endNode, startNodeIndex,
				endNodeIndex, innerNodes = [], atIndex = 0, curNode = node,
				matchLocation, matchIndex = 0;

			matches = matches.slice(0);
			matches.sort(function(a, b) {
				return a.start - b.start;
			});

			matchLocation = matches.shift();

			out: while (true) {
				if (blockElementsMap[curNode.nodeName] || shortEndedElementsMap[curNode.nodeName] || isContentEditableFalse(curNode)) {
					atIndex++;
				}

				if (curNode.nodeType === 3) {
					if (!endNode && curNode.length + atIndex >= matchLocation.end) {
						// We've found the ending
						endNode = curNode;
						endNodeIndex = matchLocation.end - atIndex;
					} else if (startNode) {
						// Intersecting node
						innerNodes.push(curNode);
					}

					if (!startNode && curNode.length + atIndex > matchLocation.start) {
						// We've found the match start
						startNode = curNode;
						startNodeIndex = matchLocation.start - atIndex;
					}

					atIndex += curNode.length;
				}

				if (startNode && endNode) {
					curNode = replaceFn({
						startNode: startNode,
						startNodeIndex: startNodeIndex,
						endNode: endNode,
						endNodeIndex: endNodeIndex,
						innerNodes: innerNodes,
						match: matchLocation.text,
						matchIndex: matchIndex
					});

					// replaceFn has to return the node that replaced the endNode
					// and then we step back so we can continue from the end of the
					// match:
					atIndex -= (endNode.length - endNodeIndex);
					startNode = null;
					endNode = null;
					innerNodes = [];
					matchLocation = matches.shift();
					matchIndex++;

					if (!matchLocation) {
						break; // no more matches
					}
				} else if ((!hiddenTextElementsMap[curNode.nodeName] || blockElementsMap[curNode.nodeName]) && curNode.firstChild) {
					if (!isContentEditableFalse(curNode)) {
						// Move down
						curNode = curNode.firstChild;
						continue;
					}
				} else if (curNode.nextSibling) {
					// Move forward:
					curNode = curNode.nextSibling;
					continue;
				}

				// Move forward or up:
				while (true) {
					if (curNode.nextSibling) {
						curNode = curNode.nextSibling;
						break;
					} else if (curNode.parentNode !== node) {
						curNode = curNode.parentNode;
					} else {
						break out;
					}
				}
			}
		}

		/**
		* Generates the actual replaceFn which splits up text nodes
		* and inserts the replacement element.
		*/
		function genReplacer(callback) {
			function makeReplacementNode(fill, matchIndex) {
				var match = matches[matchIndex];

				if (!match.stencil) {
					match.stencil = callback(match);
				}

				var clone = match.stencil.cloneNode(false);
				clone.setAttribute('data-mce-index', matchIndex);

				if (fill) {
					clone.appendChild(dom.doc.createTextNode(fill));
				}

				return clone;
			}

			return function(range) {
				var before, after, parentNode, startNode = range.startNode,
					endNode = range.endNode, matchIndex = range.matchIndex,
					doc = dom.doc;

				if (startNode === endNode) {
					var node = startNode;

					parentNode = node.parentNode;
					if (range.startNodeIndex > 0) {
						// Add "before" text node (before the match)
						before = doc.createTextNode(node.data.substring(0, range.startNodeIndex));
						parentNode.insertBefore(before, node);
					}

					// Create the replacement node:
					var el = makeReplacementNode(range.match, matchIndex);
					parentNode.insertBefore(el, node);
					if (range.endNodeIndex < node.length) {
						// Add "after" text node (after the match)
						after = doc.createTextNode(node.data.substring(range.endNodeIndex));
						parentNode.insertBefore(after, node);
					}

					node.parentNode.removeChild(node);

					return el;
				}

				// Replace startNode -> [innerNodes...] -> endNode (in that order)
				before = doc.createTextNode(startNode.data.substring(0, range.startNodeIndex));
				after = doc.createTextNode(endNode.data.substring(range.endNodeIndex));
				var elA = makeReplacementNode(startNode.data.substring(range.startNodeIndex), matchIndex);
				var innerEls = [];

				for (var i = 0, l = range.innerNodes.length; i < l; ++i) {
					var innerNode = range.innerNodes[i];
					var innerEl = makeReplacementNode(innerNode.data, matchIndex);
					innerNode.parentNode.replaceChild(innerEl, innerNode);
					innerEls.push(innerEl);
				}

				var elB = makeReplacementNode(endNode.data.substring(0, range.endNodeIndex), matchIndex);

				parentNode = startNode.parentNode;
				parentNode.insertBefore(before, startNode);
				parentNode.insertBefore(elA, startNode);
				parentNode.removeChild(startNode);

				parentNode = endNode.parentNode;
				parentNode.insertBefore(elB, endNode);
				parentNode.insertBefore(after, endNode);
				parentNode.removeChild(endNode);

				return elB;
			};
		}

		function unwrapElement(element) {
			var parentNode = element.parentNode;
			parentNode.insertBefore(element.firstChild, element);
			element.parentNode.removeChild(element);
		}

		function getWrappersByIndex(index) {
			var elements = node.getElementsByTagName('*'), wrappers = [];

			index = typeof index == "number" ? "" + index : null;

			for (var i = 0; i < elements.length; i++) {
				var element = elements[i], dataIndex = element.getAttribute('data-mce-index');

				if (dataIndex !== null && dataIndex.length) {
					if (dataIndex === index || index === null) {
						wrappers.push(element);
					}
				}
			}

			return wrappers;
		}

		/**
		 * Returns the index of a specific match object or -1 if it isn't found.
		 *
		 * @param  {Match} match Text match object.
		 * @return {Number} Index of match or -1 if it isn't found.
		 */
		function indexOf(match) {
			var i = matches.length;
			while (i--) {
				if (matches[i] === match) {
					return i;
				}
			}

			return -1;
		}

		/**
		 * Filters the matches. If the callback returns true it stays if not it gets removed.
		 *
		 * @param {Function} callback Callback to execute for each match.
		 * @return {DomTextMatcher} Current DomTextMatcher instance.
		 */
		function filter(callback) {
			var filteredMatches = [];

			each(function(match, i) {
				if (callback(match, i)) {
					filteredMatches.push(match);
				}
			});

			matches = filteredMatches;

			/*jshint validthis:true*/
			return this;
		}

		/**
		 * Executes the specified callback for each match.
		 *
		 * @param {Function} callback  Callback to execute for each match.
		 * @return {DomTextMatcher} Current DomTextMatcher instance.
		 */
		function each(callback) {
			for (var i = 0, l = matches.length; i < l; i++) {
				if (callback(matches[i], i) === false) {
					break;
				}
			}

			/*jshint validthis:true*/
			return this;
		}

		/**
		 * Wraps the current matches with nodes created by the specified callback.
		 * Multiple clones of these matches might occur on matches that are on multiple nodex.
		 *
		 * @param {Function} callback Callback to execute in order to create elements for matches.
		 * @return {DomTextMatcher} Current DomTextMatcher instance.
		 */
		function wrap(callback) {
			if (matches.length) {
				stepThroughMatches(node, matches, genReplacer(callback));
			}

			/*jshint validthis:true*/
			return this;
		}

		/**
		 * Finds the specified regexp and adds them to the matches collection.
		 *
		 * @param {RegExp} regex Global regexp to search the current node by.
		 * @param {Object} [data] Optional custom data element for the match.
		 * @return {DomTextMatcher} Current DomTextMatcher instance.
		 */
		function find(regex, data) {
			if (text && regex.global) {
				while ((m = regex.exec(text))) {
					matches.push(createMatch(m, data));
				}
			}

			return this;
		}

		/**
		 * Unwraps the specified match object or all matches if unspecified.
		 *
		 * @param {Object} [match] Optional match object.
		 * @return {DomTextMatcher} Current DomTextMatcher instance.
		 */
		function unwrap(match) {
			var i, elements = getWrappersByIndex(match ? indexOf(match) : null);

			i = elements.length;
			while (i--) {
				unwrapElement(elements[i]);
			}

			return this;
		}

		/**
		 * Returns a match object by the specified DOM element.
		 *
		 * @param {DOMElement} element Element to return match object for.
		 * @return {Object} Match object for the specified element.
		 */
		function matchFromElement(element) {
			return matches[element.getAttribute('data-mce-index')];
		}

		/**
		 * Returns a DOM element from the specified match element. This will be the first element if it's split
		 * on multiple nodes.
		 *
		 * @param {Object} match Match element to get first element of.
		 * @return {DOMElement} DOM element for the specified match object.
		 */
		function elementFromMatch(match) {
			return getWrappersByIndex(indexOf(match))[0];
		}

		/**
		 * Adds match the specified range for example a grammar line.
		 *
		 * @param {Number} start Start offset.
		 * @param {Number} length Length of the text.
		 * @param {Object} data Custom data object for match.
		 * @return {DomTextMatcher} Current DomTextMatcher instance.
		 */
		function add(start, length, data) {
			matches.push({
				start: start,
				end: start + length,
				text: text.substr(start, length),
				data: data
			});

			return this;
		}

		/**
		 * Returns a DOM range for the specified match.
		 *
		 * @param  {Object} match Match object to get range for.
		 * @return {DOMRange} DOM Range for the specified match.
		 */
		function rangeFromMatch(match) {
			var wrappers = getWrappersByIndex(indexOf(match));

			var rng = editor.dom.createRng();
			rng.setStartBefore(wrappers[0]);
			rng.setEndAfter(wrappers[wrappers.length - 1]);

			return rng;
		}

		/**
		 * Replaces the specified match with the specified text.
		 *
		 * @param {Object} match Match object to replace.
		 * @param {String} text Text to replace the match with.
		 * @return {DOMRange} DOM range produced after the replace.
		 */
		function replace(match, text) {
			var rng = rangeFromMatch(match);

			rng.deleteContents();

			if (text.length > 0) {
				rng.insertNode(editor.dom.doc.createTextNode(text));
			}

			return rng;
		}

		/**
		 * Resets the DomTextMatcher instance. This will remove any wrapped nodes and remove any matches.
		 *
		 * @return {[type]} [description]
		 */
		function reset() {
			matches.splice(0, matches.length);
			unwrap();

			return this;
		}

		text = getText(node);

		return {
			text: text,
			matches: matches,
			each: each,
			filter: filter,
			reset: reset,
			matchFromElement: matchFromElement,
			elementFromMatch: elementFromMatch,
			find: find,
			add: add,
			wrap: wrap,
			unwrap: unwrap,
			replace: replace,
			rangeFromMatch: rangeFromMatch,
			indexOf: indexOf
		};
	};
});

// Included from: js/tinymce/plugins/spellchecker/classes/Plugin.js

/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2015 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*jshint camelcase:false */

/**
 * This class contains all core logic for the spellchecker plugin.
 *
 * @class tinymce.spellcheckerplugin.Plugin
 * @private
 */
define("tinymce/spellcheckerplugin/Plugin", [
	"tinymce/spellcheckerplugin/DomTextMatcher",
	"tinymce/PluginManager",
	"tinymce/util/Tools",
	"tinymce/ui/Menu",
	"tinymce/dom/DOMUtils",
	"tinymce/util/XHR",
	"tinymce/util/URI",
	"tinymce/util/JSON"
], function(DomTextMatcher, PluginManager, Tools, Menu, DOMUtils, XHR, URI, JSON) {
	PluginManager.add('spellchecker', function(editor, url) {
		var languageMenuItems, self = this, lastSuggestions, started, suggestionsMenu, settings = editor.settings;
		var hasDictionarySupport, parameters;

		function getTextMatcher() {
			if (!self.textMatcher) {
				self.textMatcher = new DomTextMatcher(editor.getBody(), editor);
			}

			return self.textMatcher;
		}

		function buildMenuItems(listName, languageValues) {
			var items = [];

			Tools.each(languageValues, function(languageValue) {
				items.push({
					selectable: true,
					text: languageValue.name,
					data: languageValue.value
				});
			});

			return items;
		}

		// draw back if power version is requested and registered
		if (/(^|[ ,])tinymcespellchecker([, ]|$)/.test(settings.plugins) && PluginManager.get('tinymcespellchecker')) {
			/*eslint no-console:0 */
			if (typeof console !== "undefined" && console.log) {
				console.log(
					"Spell Checker Pro is incompatible with Spell Checker plugin! " +
					"Remove 'spellchecker' from the 'plugins' option."
				);
			}
			return;
		}

		var languagesString = settings.spellchecker_languages ||
			'English=en,Danish=da,Dutch=nl,Finnish=fi,French=fr_FR,' +
			'German=de,Italian=it,Polish=pl,Portuguese=pt_BR,' +
			'Spanish=es,Swedish=sv';

		languageMenuItems = buildMenuItems('Language',
			Tools.map(languagesString.split(','), function(langPair) {
				langPair = langPair.split('=');

				return {
					name: langPair[0],
					value: langPair[1]
				};
			})
		);

		function isEmpty(obj) {
			/*jshint unused:false*/
			/*eslint no-unused-vars:0 */
			for (var name in obj) {
				return false;
			}

			return true;
		}
		
		// Modify to clean null and string empty from suggestions
		function showSuggestions(word, spans) {
			var items = [], suggestions = lastSuggestions[word];
			
			//clean suggestions
			var cpSuggestios = []; var it = 0;
			if(suggestions != null && suggestions.length > 0){
				for(i=0; i<suggestions.length;i++){
					if(suggestions[i] == null || suggestions[i] == ""){
						continue;
					} else {
						cpSuggestios[it] = suggestions[i];
						it++;
					}
				}
			}
			
			suggestions = cpSuggestios;
			
			Tools.each(suggestions, function(suggestion) {
				items.push({
					text: suggestion,
					onclick: function() {
						editor.insertContent(editor.dom.encode(suggestion));
						editor.dom.remove(spans);
						checkIfFinished();
					}
				});
			});

			items.push({text: '-'});

			if (hasDictionarySupport) {
				items.push({text: 'Add to Dictionary', onclick: function() {
					addToDictionary(word, spans);
				}});
			}

			items.push.apply(items, [
				{text: 'Ignore', onclick: function() {
					ignoreWord(word, spans);
				}},

				{text: 'Ignore all', onclick: function() {
					ignoreWord(word, spans, true);
				}}
			]);

			// Render menu
			suggestionsMenu = new Menu({
				items: items,
				context: 'contextmenu',
				onautohide: function(e) {
					if (e.target.className.indexOf('spellchecker') != -1) {
						e.preventDefault();
					}
				},
				onhide: function() {
					suggestionsMenu.remove();
					suggestionsMenu = null;
				}
			});

			suggestionsMenu.renderTo(document.body);

			// Position menu
			var pos = DOMUtils.DOM.getPos(editor.getContentAreaContainer());
			var targetPos = editor.dom.getPos(spans[0]);
			var root = editor.dom.getRoot();

			// Adjust targetPos for scrolling in the editor
			if (root.nodeName == 'BODY') {
				targetPos.x -= root.ownerDocument.documentElement.scrollLeft || root.scrollLeft;
				targetPos.y -= root.ownerDocument.documentElement.scrollTop || root.scrollTop;
			} else {
				targetPos.x -= root.scrollLeft;
				targetPos.y -= root.scrollTop;
			}

			pos.x += targetPos.x;
			pos.y += targetPos.y;

			suggestionsMenu.moveTo(pos.x, pos.y + spans[0].offsetHeight);
		}

		function getWordCharPattern() {
			// Regexp for finding word specific characters this will split words by
			// spaces, quotes, copy right characters etc. It's escaped with unicode characters
			// to make it easier to output scripts on servers using different encodings
			// so if you add any characters outside the 128 byte range make sure to escape it
			return editor.getParam('spellchecker_wordchar_pattern') || new RegExp("[^" +
				"\\s!\"#$%&()*+,-./:;<=>?@[\\]^_{|}`" +
				"\u00a7\u00a9\u00ab\u00ae\u00b1\u00b6\u00b7\u00b8\u00bb" +
				"\u00bc\u00bd\u00be\u00bf\u00d7\u00f7\u00a4\u201d\u201c\u201e\u00a0\u2002\u2003\u2009" +
			"]+", "g");
		}

		// Move data lang to outside so we can always pass language as parameter
		function defaultSpellcheckCallback(method, text, doneCallback, errorCallback) {
			var data = {method: method, lang: settings.spellchecker_language}, postData = '';

			data[method == "addToDictionary" ? "word" : "text"] = text;

			Tools.each(data, function(value, key) {
				if (postData) {
					postData += '&';
				}

				postData += key + '=' + encodeURIComponent(value);
			});

			XHR.send({
				url: new URI(url).toAbsolute(settings.spellchecker_rpc_url),
				type: "post",
				content_type: 'application/x-www-form-urlencoded',
				data: postData,
				success: function(result) {
					result = JSON.parse(result);

					if (!result) {
						var message = editor.translate("Server response wasn't proper JSON.");
						errorCallback(message);
					} else if (result.error) {
						errorCallback(result.error);
					} else {
						doneCallback(result);
					}
				},
				error: function() {
					var message = editor.translate("The spelling service was not found: (") +
							settings.spellchecker_rpc_url +
							editor.translate(")");
					errorCallback(message);
				}
			});
		}

		function sendRpcCall(name, data, successCallback, errorCallback) {
			var spellCheckCallback = settings.spellchecker_callback || defaultSpellcheckCallback;
			spellCheckCallback.call(self, name, data, successCallback, errorCallback);
		}

		function spellcheck(ui, params) {
			parameters = params;
			
			if (finish()) {
				return;
			}

                        function errorCallback(message) {
                            if(self.formComponent.spellcheckOnEnterActive) {
                                editor.windowManager.confirm(message + ". Do you want to send anyway?", function(ok) {
                                    if (ok) {
                                        editor.setProgressState(false);
                                        started = false;
                                        callSpellcheckCompleteCallback(false);
                                    } else {
                                        self.formComponent.spellcheckOnEnterActive = false;
                                        editor.setProgressState(false);
                                        finish();
                                    }
                                });
                            } else {
                                editor.windowManager.alert(message);
                                editor.setProgressState(false);
                                finish();
                            }
                        }
			
			// Report back go Ciboodle platform
			callSpellcheckStartCallback();
			editor.setProgressState(true);
			
			var textToSpellcheck = getTextMatcher().text;
			
			// Remove Content Links from text to spellcheck if appropriate property is set
			if (settings.spellchecker_ignore_content_links){
				textToSpellcheck = removeContentLinks(textToSpellcheck);	
			}				
			
			// Remove URLs from text to spellcheck if appropriate property is set
			if(settings.spellchecker_ignore_urls){
				textToSpellcheck = removeURLs(textToSpellcheck);
			}
			
			sendRpcCall("spellcheck", textToSpellcheck, markErrors, errorCallback);
			editor.focus();
		}
		
		function removeContentLinks(text) {				
			if (text == null)
				return text;
			// Remove Content Links Article, Alert, FAQ, Upload etc.
			var newtext = text.replace(new RegExp('(\\[\\[--ContentED.*?\\|\\|)(.*?)(\\|\\|KM.*?\\|\\|.*?--]])', 'mgi'), "$2");
			
			// remove Decision Trees
			return newtext.replace(new RegExp('(\\[\\[--ContentED.*?\\|\\|)(.*?)(\\|\\|.*?\\|\\|DT.*?\\|\\|.*?--]])', 'mgi'), "$2");
		}
		
		function removeURLs(text) {
			var regExes = getURLRegExes(), i;
			for(i = 0; i < regExes.length; i++) {
				text = text.replace(regExes[i], "");
			}
			return text;
		}		
	 
		function getURLRegExes() {
				var regExes = [];
				regExes.push(new RegExp("http://.+?(?= |$)", "mgi"));
				regExes.push(new RegExp("https://.+?(?= |$)", "mgi"));
				regExes.push(new RegExp("ftp://.+?(?= |$)", "mgi"));
				regExes.push(new RegExp("ftps://.+?(?= |$)", "mgi"));
				regExes.push(new RegExp("file://.+?(?= |$)", "mgi"));
				regExes.push(new RegExp("www\\..+?(?= |$)", "mgi"));
				return regExes;
		}

		function checkIfFinished() {
			if (!editor.dom.select('span.mce-spellchecker-word').length) {
				finish();
			}
		}

		function addToDictionary(word, spans) {
			editor.setProgressState(true);

			sendRpcCall("addToDictionary", word, function() {
				editor.setProgressState(false);
				editor.dom.remove(spans, true);
				checkIfFinished();
			}, function(message) {
				//editor.notificationManager.open({text: message, type: 'error'});
				editor.windowManager.alert(message);
				editor.setProgressState(false);
			});
		}

		function ignoreWord(word, spans, all) {
			editor.selection.collapse();

			if (all) {
				Tools.each(editor.dom.select('span.mce-spellchecker-word'), function(span) {
					if (span.getAttribute('data-mce-word') == word) {
						editor.dom.remove(span, true);
					}
				});
			} else {
				editor.dom.remove(spans, true);
			}

			checkIfFinished();
		}

		function finish() {
			getTextMatcher().reset();
			self.textMatcher = null;

			if (started) {
				started = false;
				editor.fire('SpellcheckEnd');
				return true;
			}
		}

		function getElmIndex(elm) {
			var value = elm.getAttribute('data-mce-index');

			if (typeof value == "number") {
				return "" + value;
			}

			return value;
		}

		function findSpansByIndex(index) {
			var nodes, spans = [];

			nodes = Tools.toArray(editor.getBody().getElementsByTagName('span'));
			if (nodes.length) {
				for (var i = 0; i < nodes.length; i++) {
					var nodeIndex = getElmIndex(nodes[i]);

					if (nodeIndex === null || !nodeIndex.length) {
						continue;
					}

					if (nodeIndex === index.toString()) {
						spans.push(nodes[i]);
					}
				}
			}

			return spans;
		}

		editor.on('click', function(e) {
			var target = e.target;

			if (target.className == "mce-spellchecker-word") {
				e.preventDefault();

				var spans = findSpansByIndex(getElmIndex(target));

				if (spans.length > 0) {
					var rng = editor.dom.createRng();
					rng.setStartBefore(spans[0]);
					rng.setEndAfter(spans[spans.length - 1]);
					editor.selection.setRng(rng);
					showSuggestions(target.getAttribute('data-mce-word'), spans);
				}
			}
		});

		editor.addMenuItem('spellchecker', {
			text: 'Spellcheck',
			context: 'tools',
			onclick: spellcheck,
			selectable: true,
			onPostRender: function() {
				var self = this;

				self.active(started);

				editor.on('SpellcheckStart SpellcheckEnd', function() {
					self.active(started);
				});
			}
		});

		function updateSelection(e) {
			var selectedLanguage = settings.spellchecker_language;

			e.control.items().each(function(ctrl) {
				ctrl.active(ctrl.settings.data === selectedLanguage);
			});
		}

		/**
		 * Find the specified words and marks them. It will also show suggestions for those words.
		 *
		 * @example
		 * editor.plugins.spellchecker.markErrors({
		 *     dictionary: true,
		 *     words: {
		 *         "word1": ["suggestion 1", "Suggestion 2"]
		 *     }
		 * });
		 * @param {Object} data Data object containing the words with suggestions.
		 */
		function markErrors(data) {
			var suggestions;
			var suppressAlerts = (parameters && parameters.suppressAlerts) ? parameters.suppressAlerts : false;
			var useWizard = settings.spellchecker_use_wizard;

			if (data.words) {
				if(useWizard){
					hasDictionarySupport =settings.spellchecker_enable_learn_rpc;
				}else{
					hasDictionarySupport = !!data.dictionary;
				}
				suggestions = data.words;
			} else {
				// Fallback to old format
				suggestions = data;
			}

			editor.setProgressState(false);

			if (isEmpty(suggestions)) {
				if(!suppressAlerts)	{
					var message = editor.translate('No misspellings found.');
					editor.windowManager.alert(message);
					//editor.notificationManager.open({text: message, type: 'info'});
				}
				started = false;
				callSpellcheckCompleteCallback(false);
				return;
			}

			lastSuggestions = suggestions;

			getTextMatcher().find(getWordCharPattern()).filter(function(match) {
				return !!suggestions[match.text];
			}).wrap(function(match) {
				return editor.dom.create('span', {
					"class": 'mce-spellchecker-word',
					"data-mce-bogus": 1,
					"data-mce-word": match.text
				});
			});
			
			if(useWizard) {
				openPopup();
			}
				
			started = true;
			editor.fire('SpellcheckStart');
		}

		var buttonArgs = {
			tooltip: 'Spellcheck',
			onclick: spellcheck,
			onPostRender: function() {
				var self = this;

				editor.on('SpellcheckStart SpellcheckEnd', function() {
					self.active(started);
				});
			}
		};

		if (languageMenuItems.length > 1) {
			buttonArgs.type = 'splitbutton';
			buttonArgs.menu = languageMenuItems;
			buttonArgs.onshow = updateSelection;
			buttonArgs.onselect = function(e) {
				settings.spellchecker_language = e.control.settings.data;
			};
		}

		editor.addButton('spellchecker', buttonArgs);
		editor.addCommand('mceSpellCheck', spellcheck);

		editor.on('remove', function() {
			if (suggestionsMenu) {
				suggestionsMenu.remove();
				suggestionsMenu = null;
			}
		});

		editor.on('change', checkIfFinished);

		this.getTextMatcher = getTextMatcher;
		this.getWordCharPattern = getWordCharPattern;
		this.markErrors = markErrors;
		this.getLanguage = function() {
			return settings.spellchecker_language;
		};

		// Set default spellchecker language if it's not specified
		settings.spellchecker_language = settings.spellchecker_language || settings.language || 'en';
		
		
		/**
        * Spellchecker plugin modification by development team.
		* The modification is to support wizard popup for spellchecker
		*/
		
		function openPopup(){
			/**
			 * initiation var
			 */
			var Spellplugin = function(){
				this.language = '';
				this.selectedLang = '';
				this.languages = '';
				this.editor = editor;
				this.useSpellcheckWizard = settings.spellchecker_use_wizard;
				this.allowAddToDictionary = settings.spellchecker_enable_learn_rpc;
				this.ignoredElementTags = 'abbr,em,strong,b,i,u,small,s,big,strike,tt,font,span,sub,sup';
				this.ignoredElementTags = this.ignoredElementTags.split(',');
				if(!Array.prototype.indexOf) {
					this.ignoredElementTags.indexOf = function(n) {
						for(var i = 0; i < this.length; ++i) {
							if(this[i] === n) {
								return i;
							}
						}
						return -1;
					};
				}

				this.wordSeparatorChars = editor.getParam('spellchecker_wordchar');
				this.suggestions = lastSuggestions;
			}
			
			/**
			 * convert languages that get from representation to object
			 * @return object of languages, e.g {English=en,Danis=da}
			 */
			Spellplugin.prototype.getLanguages = function(){
				var langs = {}; var l = (settings.spellchecker_languages).split(',');
				for(i=0; i < l.length;i++){
					var each;
					if(l[i].charAt(0) == '+'){								
						each = (l[i].replace('+','')).split('=');								
						this.selectedLang = each[1];
					} else {
						each = l[i].split('=');
					}
					langs[each[0]] = each[1];
				}
				return langs;
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 * Function to convert array into true/false map.
			 *
			 * @param array the array to convert
			 * @return object containing the map
			 */
			Spellplugin.prototype.toMap = function(arraySuggestions){
				var map = {}, i;
				for(i = 0; i < arraySuggestions.length; i++) {
						var value = arraySuggestions[i];
						map[value] = true;
				}
				return map;
			}
			
			/**
			 * get key of suggestions and save it into array
			 * @return array of key
			 */
			Spellplugin.prototype.getArraySuggestions = function(){
				var keys = []; var i = 0;
				for (var key in this.suggestions) {
					keys[i] = key; 
					i++;
				}
				return keys;
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 */
			Spellplugin.prototype.getSeparators = function(){
				var re = '', i, str = this.wordSeparatorChars;

				// Build word separator regexp
				for (i=0; i<str.length; i++)
						re += '\\' + str.charAt(i);

				return re;
			}
								
			/**
			 * moved from spellchecker/editor_plugin.js
			 * modified : disable spellckecker icon << handled by tinymce
			 */
			Spellplugin.prototype.done = function(){
				//add disable spell icon
				finish();
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 * support walking through non-text node
			 */
			Spellplugin.prototype.walk = function(n, f){
				var d = this.editor.getDoc(), w;
				if(this.editor.editorManager.isIE === "8"){
					ie8Walk(n, f);
					return;
				}

				if (d.createTreeWalker) {
						w = d.createTreeWalker(n, NodeFilter.SHOW_ALL, null, false);

						while ((n = w.nextNode()) != null)
								f.call(this, n);
				} else {
					this.walk(n, f, 'childNodes');
				}
						
			}
			
			function ie8Walk(node, f){
				for (var i = 0; i < node.childNodes.length; i++) {
					var curNode = node.childNodes[i];
					if (curNode.nodeName === "#text") {
						f.call(this, curNode);
					}else{
						ie8Walk(curNode, f);
					}
				}
			}

			/**
			 * moved from spellchecker/editor_plugin.js
			 * Function to return nodes which contains misspeled word.
			 * @return a list of nodes
			 */
			Spellplugin.prototype.getMisspelledNodes = function(){
				var ed = this.editor, dom = ed.dom, rng = dom.createRng();
				var nodes = [];
				
				this.walk(ed.getBody(), function(n) {
						if (n.nodeType == 3 && n.parentNode) {
								if (dom.hasClass(n.parentNode, 'mce-spellchecker-word')) {
										nodes.push(n);
								}
						}
				});
				
				return nodes;
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 * Function to replace separator character with a blank space.
			 * @param tx the text 
			 */
			Spellplugin.prototype.stripOutSeparator = function(tx){
				return tx.replace(new RegExp('([0-9]|[' + this.getSeparators() + '])', 'g'), ' ');
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 * Function to get previous node
			 * @param n node
			 * @return node
			 */
			Spellplugin.prototype.getPrevNode = function(n){
				if (!n.previousSibling) {
						return n.parentNode;
				} else {
						n = n.previousSibling;
						while (n && n.lastChild) {
								n = n.lastChild;
						}
						return n;
				}
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 * Function to get next node
			 * @param n node
			 * @return node
			 */
			Spellplugin.prototype.getNextNode = function(n){
				if (n.firstChild) {
						return n.firstChild;
				} else {
						while (n && !n.nextSibling) {
								n = n.parentNode;
						}
						if (n) {
								return n.nextSibling;
						} else {
								return n;
						}
				}
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 * Function to check whether the given node is an element node and in the given ignored element list, or a text node, but contains no text
			 * @param n the node 
			 */
			Spellplugin.prototype.isInIgnoredElement = function(n){
				return (n.nodeType == 1 && this.ignoredElementTags.indexOf(n.nodeName.toLowerCase()) != -1) ||
						n.nodeType != 1;
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 * Function to return the whole word of the last word in a text node except when there's a separator in the end of the node.
			 * Also set the end point (but not the starting point) of the given DOM Range object.
			 * 
			 * @param n node
			 * @param rng DOM Range object to be set
			 * @return will return null if there's a separator in the end of the node, else the whole last word
			 */
			Spellplugin.prototype.findLastWord = function(n, rng){
				var t = this, w, nw, s, el, found = false;
				
				if (n.nodeType == 3) {  
						// Check if there's a separator in the end
						w = this.stripOutSeparator(n.nodeValue).match(/\S+$/);
						if(w != null) { // There is no separator
								w = w[0];
								if (rng) {
										// Set the DOM range starting point
										rng.setEnd(n, w.length);
								}
								// To the next node
								while ((n = this.getNextNode(n)) && !found) {
										if (n.nodeType == 3 && n.nodeValue.length > 0) {
												s = this.stripOutSeparator(n.nodeValue);
												// Next node may contain other part if there's no separator in the beginning
												if (nw = s.match(/^\S+/)) {
														if (s.match(/^\S+\s/)) {
																// If the next node contains a separator after the first word, get the first word only 
																w += nw[0];
																if (rng) {
																		// Set the DOM range starting point
																		rng.setEnd(n, nw[0].length);
																}
														} else {
																// If there's no separator in the next node then recursively process it
																w += this.findLastWord(n, rng);
														}
												}
												found = true;
										} else if (!this.isInIgnoredElement(n)) {
												found = true;   // There's an unignored element
										} else if (el = n.previousSibling) {
												if (!this.isInIgnoredElement(el)) {
														found = true;   // There's an unignored element
												}
										}
								}
						}
						return w;
				} else if (n.firstChild) {
						// In case targetted at the outer element, get the child node
						return this.findLastWord(n.firstChild, rng);
				} else {
						return null;
				}						
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 * Function to return the whole word of the first word in a text node except when there's a separator in the beginning of the node.
			 * Also set the starting point and end point the given DOM Range object.
			 * 
			 * @param n node
			 * @param rng DOM Range object to be set
			 * 
			 * @return will return null if there's a separator in the beginning of the node, else the whole first word
			 */
			Spellplugin.prototype.findFirstWord = function(n, rng){
				var t = this, s, w, el, last, sfound = false;
				
				if (n.nodeType == 3) {
						last = n;
						// Check if there's a separator in the beginning
						s = this.stripOutSeparator(n.nodeValue);
						if (w = s.match(/^\S+/)) {
								// There is no separator
								w = w[0];
								while (this.getPrevNode(n) != t.editor.getBody()) {
										if (el = n.previousSibling) {
												if (!this.isInIgnoredElement(el)) {
														// If the previous node in same DOM hierarchy is a block element
														sfound = true;
												}
										}
										
										if (!sfound) {
												n = this.getPrevNode(n);        // To the previous node                                         
												if (n.nodeType == 3 && n.nodeValue.length > 0) {
														s = this.stripOutSeparator(n.nodeValue);
														// Previous node may contain other part if there's no separator in the end
														if (s.match(/\S+$/)) {
																if (s.match(/\s\S+$/)) {
																		// If the previous node contains a separator before the last word, that is,
																		// the starting point is in the middle of the previous node then proceed
																		// the from the last word
																		if (rng) {
																				// Set the DOM range starting point
																				rng.setStart(n, s.length - s.match(/\s\S+$/)[0].length)
																		}
																		return this.findLastWord(n, rng);
																}
																last = n;
														} else {
																// There's a separator in the end of the previous node
																sfound = true;
														}
												} else if (!this.isInIgnoredElement(n)) {
														// There's a block element
														sfound = true;
												}
										}
										
										if (sfound) {
												// Starting point of the first word is found in the beginning of the text node
												n = last; // Return to the last text node
												s = this.stripOutSeparator(n.nodeValue);
												if (rng) {
														// Set the DOM range starting point
														rng.setStart(n, 0);
												}
												if (s.match(/^\S+\s/)) {
														// If there's a separator after the first word of the last text node
														// then return the word before the separator 
														return s.match(/^\S+/);
												} else {
														// If there's no separator in the end of the last text node therefore
														// it has continuation in the next node
														return this.findLastWord(n, rng);
												}                                                       
										}
								}
						}
                        rng.setStart(last, 0);
						return w;
				} else if (n.firstChild) {
						// In case targetted at the outer element, get the child node
						return this.findFirstWord(n.firstChild, rng);
				} else {
						return null;
				}
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 * Function to return the whole word of the first word in a text node except when there's a separator in the beginning of the node.
			 * Also set the starting point and end point the given DOM Range object.
			 * 
			 * @param n node
			 * @param rng DOM Range object to be set
			 * 
			 * @return the whole word
			 */
			Spellplugin.prototype.findWord = function(n, rng){
				return this.findFirstWord(n, rng);
			}
			
			/**
			 * get suggestions for misspellword
			 * @param misspellword
			 * @return array of suggestions
			 */
			Spellplugin.prototype.getSuggestions = function(word){
				var result = lastSuggestions[word];						
				return result;
			}
			
			/** 
			 * 
			 * @return array of span
			 */
			Spellplugin.prototype.getMisspelledSpans = function(){
				var spans = editor.getBody().getElementsByTagName('span');
				return spans;
			}
			
			/** 
			 * @param misspellword
			 * @return array of span
			 */
			Spellplugin.prototype.getSpanByWord = function(word){
				var spans = editor.getBody().getElementsByTagName('span');
				var span = [];
				var count = 0;
				for(i = 0; i < spans.length;i++){
					var wd = spans[i].getAttribute('data-mce-word');
					if(wd == word){
						span[count++] = spans[i];
					}
				}
				return span;
			}
			
			/**
			 * moved from spellchecker/editor_plugin.js
			 * modified : use addTodictionary() from new tinymce
			 */
			Spellplugin.prototype.learnWord = function(lang, word){						
				var span = this.getSpanByWord(word);
				addToDictionary(word, span);
			}
			
			/**
			* moved from spellchecker/editor_plugin.js
			*/
			Spellplugin.prototype.checkForMissSpellingsAndCallSpellcheckCompleteCallback = function(){
				var ed = editor, dom = ed.dom, hasMisspellings = false;
				Tools.each(dom.select('span'), function(n) {
					if (n && dom.hasClass(n, 'mce-spellchecker-word')) {
							hasMisspellings = true;
					}
				});
				callSpellcheckCompleteCallback(hasMisspellings);
			}
			
			Spellplugin.prototype.stripRemainingSpans = function() {
                            Tools.each(editor.dom.select('span.mce-spellchecker-word'), function(span) {
                                editor.dom.remove(span, true);
                            });
                        }
			
			
			/**
			 * open spellchecker popup
			 */										
			Spellplugin.prototype.doPopup = function(){
				var t = this;
				var ed = t.editor;
				t.languages = t.getLanguages();
				t.selectedLang = settings.spellchecker_language;
				t.language = settings.spellchecker_language;
				
				ed.toolbarClicked = true;
				
				var callback = { scope : t, func : t.done };
				ed.windowManager.open({
						url : ed.baseURI.source + '/plugins/spellchecker/spellcheckwizard.htm',
						width : 352 + parseInt(ed.getLang('spellcheck.delta_width', 0), 10),
						height : 366 + parseInt(ed.getLang('spellcheck.delta_height', 0), 10),
						inline : 1,
						onClose : function() {
						    t.stripRemainingSpans();
						}
				}, {
						plugin_url : ed.baseURI.source + '/plugins/spellchecker',
						plugin : t,
						selectedLang: t.selectedLang,
						wordNodes : t.getMisspelledNodes(),
						misspelledWords: t.toMap(t.getArraySuggestions()),
						callback : callback,
						allowAddToDictionary : t.allowAddToDictionary,
						mce_auto_focus : true
				});
			}					
			
			/**
			 * inisiate & doPopup
			 */
			function openWizard(){
				var spellplugin = new Spellplugin();
				spellplugin.doPopup();
			}
			
			//open wizard
			openWizard();
		}
		
		/**
		 * moved from spellchecker/editor_plugin.js
		 * Function to let Ciboodle platform know that the spellchecker is started.
		 */
		function callSpellcheckStartCallback() {
			if(self.formComponent && self.formComponent.spellcheckStartHandler) {
				self.formComponent.spellcheckStartHandler();
			}
		}
			
		/**
		 * moved from spellchecker/editor_plugin.js
		 * Function to let Ciboodle platform know that the spellchecker is completed.
		 */
		function callSpellcheckCompleteCallback(hasMisspellings){
			if(self.formComponent && self.formComponent.spellcheckCompleteHandler) {
				self.formComponent.spellcheckCompleteHandler(hasMisspellings);
			}
		}
		
		// copy form component value
		self.formComponent = settings.form_component;
        /**
        * End of modification.
        */
	});
});

expose(["tinymce/spellcheckerplugin/DomTextMatcher"]);
})(this);
