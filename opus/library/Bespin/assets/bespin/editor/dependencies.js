/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and
 * limitations under the License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * ***** END LICENSE BLOCK ***** */

dojo.provide("bespin.editor.dependencies");

dojo.require("dojo.cookie");
dojo.require("dojo.fx.easing");

dojo.require("bespin.bespin");
dojo.require("bespin.command");
dojo.require("bespin.events");

dojo.require("bespin.util.canvas");
dojo.require("bespin.util.keys");
dojo.require("bespin.util.navigate");
dojo.require("bespin.util.path");
dojo.require("bespin.util.tokenobject");
dojo.require("bespin.util.util");
dojo.require("bespin.util.mousewheelevent");
//dojo.require("bespin.util.urlbar");
dojo.require("bespin.util.webpieces");

dojo.require("bespin.client.filesystem");
dojo.require("bespin.client.settings");
dojo.require("bespin.client.status");
dojo.require("bespin.client.server");
dojo.require("bespin.client.session");

//dojo.require("th.helpers"); // -- Thunderhead... hooooo
//dojo.require("th.css");
//dojo.require("th.th");
//dojo.require("th.models");
//dojo.require("th.borders");
//dojo.require("th.components");

dojo.require("bespin.worker.worker");

dojo.require("bespin.editor.actions");
dojo.require("bespin.editor.clipboard");
dojo.require("bespin.editor.cursor");
dojo.require("bespin.editor.editor");
dojo.require("bespin.editor.events");
dojo.require("bespin.editor.model");
dojo.require("bespin.editor.toolbar");
dojo.require("bespin.editor.history");
dojo.require("bespin.editor.quickopen");
//dojo.require("bespin.editor.filesearch");
dojo.require("bespin.editor.formatter");
dojo.require("bespin.editor.codecompletion");

dojo.require("bespin.themes.default");

dojo.require("bespin.syntax.base");
dojo.require("bespin.syntax.simple._base");

dojo.require("bespin.parser.parser");

dojo.require("bespin.cmd.cmd");
dojo.require("bespin.cmd.config");
dojo.require("bespin.cmd.editor");
dojo.require("bespin.cmd.file");
dojo.require("bespin.cmd.other");
dojo.require("bespin.cmd.project");
//dojo.require("bespin.cmd.debug"); // add this to your config to load for yourself

dojo.require("bespin.test");
dojo.require("bespin.testTest");

dojo.require("bespin.plugins");
dojo.require("bespin.plugins.loader");
dojo.require("bespin.plugins.loaderTest");

dojo.require("bespin.preview");

dojo.require("bespin.test");
dojo.require("bespin.testTest");

dojo.require("bespin.wizard");
dojo.require("bespin.wizardTest");

dojo.require("bespin.social");
dojo.require("bespin.socialTest");

dojo.require("bespin.mobwrite.core");
dojo.require("bespin.mobwrite.diff");
dojo.require("bespin.mobwrite.integrate");

dojo.require("bespin.client.pubsub");
