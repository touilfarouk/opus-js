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

dojo.provide("bespin.vcs");

dojo.require("bespin.util.webpieces");

/**
 * Command store for the VCS commands
 * (which are subcommands of the main 'vcs' command)
 */
bespin.vcs.commands = new bespin.command.Store(bespin.command.store, {
    name: 'vcs',
    preview: 'run a version control command',
    completeText: 'subcommands: add, clone, commit, diff, getkey, help, push, remove, resolved, update',
    subcommanddefault: 'help'
});

/**
 * Display sub-command help
 */
bespin.vcs.commands.addCommand({
    name: 'help',
    takes: ['search'],
    preview: 'show commands for vcs subcommand',
    description: 'The <u>help</u> gives you access to the various commands in the vcs subcommand space.<br/><br/>You can narrow the search of a command by adding an optional search params.<br/><br/>Finally, pass in the full name of a command and you can get the full description, which you just did to see this!',
    completeText: 'optionally, narrow down the search',
    execute: function(instruction, extra) {
        var output = this.parent.getHelp(extra, {
            suffix: "For more information about Bespin's VCS support see the <a href='https://wiki.mozilla.org/Labs/Bespin/UserGuide#VCS_Commands' target='_blank'>VCS section of the user guide</a>."
        });
        instruction.addOutput(output);
    }
});

/**
 * TODO: Is this called from anywhere? Probably not (this appears to be the only
 * instance of the string 'setProjectPassword' in an *.js file) however if
 * it is used then we've added the initial 'instruction' parameter.
 */
bespin.vcs.setProjectPassword = function(instruction, project) {
    var el = dojo.byId('centerpopup');

    el.innerHTML = '<form method="POST" id="vcsauth">'
            + '<table><tbody><tr><td>Keychain password</td><td>'
            + '<input type="password" name="kcpass"></td></tr>'
            + '<tr><td>Username</td><td><input type="text" name="username">'
            + '</td></tr><tr><td>Password</td><td>'
            + '<input type="password" name="password">'
            + '</td></tr><tr><td>&nbsp;</td><td>'
            + '<input type="hidden" name="type" value="password">'
            + '<input type="button" id="vcsauthsubmit" value="Save">'
            + '<input type="button" id="vcsauthcancel" value="Cancel">'
            + '</td></tr></tbody></table></form>';

    dojo.connect(dojo.byId("vcsauthcancel"), "onclick", bespin.vcs._createCancelHandler(instruction));

    dojo.connect(dojo.byId("vcsauthsubmit"), "onclick", function() {
        bespin.util.webpieces.hideCenterPopup(el);
        bespin.get("server").setauth(project, "vcsauth", {
            onSuccess: function() {
                instruction.addOutput("Password saved for " + project);
            },
            onFailure: function(xhr) {
                instruction.addErrorOutput("Password save failed: " + xhr.responseText);
            }
        });
    });

    bespin.util.webpieces.showCenterPopup(el, true);
};

/**
 * Presents the user with a dialog requesting their keychain password.
 * If they click the submit button, the password is sent to the callback.
 * If they do not, the callback is not called.
 */
bespin.vcs.getKeychainPassword = function(instruction, callback, errmsg) {
    var saveform = function(e) {
        callback(kcpass.value);
        instruction.unlink();
        dojo.stopEvent(e);
        return false;
    };

    var vcsauth = dojo.create("form", { onsubmit: saveform });
    var table = dojo.create("table", { }, vcsauth);

    var tr = dojo.create("tr", { }, table);
    dojo.create("td", { innerHTML: "Keychain password: " }, tr);
    var td = dojo.create("td", { }, tr);
    var kcpass = dojo.create("input", { type: "password" }, td);
    dojo.create("span", {
        style: "padding-left:5px; color:#f88;",
        innerHTML: errmsg || ""
    }, td);

    tr = dojo.create("tr", { }, table);
    dojo.create("td", { innerHTML: "&nbsp;" }, tr);
    td = dojo.create("td", { }, tr);

    dojo.create("input", {
        type: "button",
        value: "Submit",
        onclick: saveform
    }, td);

    dojo.create("input", {
        type: "button",
        value: "Cancel",
        onclick: bespin.vcs._createCancelHandler(instruction)
    }, td);

    instruction.setElement(vcsauth);
    kcpass.focus();
};

/**
 * Add command.
 * Add the specified files on the next commit
 */
bespin.vcs.commands.addCommand({
    name: 'add',
    preview: 'Adds missing files to the project',
    takes: ['*'],
    completeText: 'Use the current file, add -a for all files or add filenames',
    description: 'Without any options, the vcs add command will add the currently selected file. If you pass in -a, the command will add <em>all</em> files. Finally, you can list files individually.',
    execute: function(instruction, args) {
        bespin.vcs._performVCSCommandWithFiles("add", instruction, args);
    }
});

/**
 * Clone command.
 * Create a copy of an existing repository in a new directory
 */
bespin.vcs.commands.addCommand({
    name: 'clone',
    takes: ['url'],
    aliases: ['checkout'],
    preview: 'checkout or clone the project into a new Bespin project',
    /**
     * Display the clone dialog to allow the user to fill out additional details
     * to the clone process
     */
    execute: function(instruction, url) {
        url = url || "";
        
        var form = dojo.create('form', {
            onsubmit: function(e) {
                dojo.stopEvent(e);
                var data = dojo.formToObject(form);
                
                instruction.addOutput("");
                
                var newProjectName = data.dest;
                
                if (data.vcs == "svn") {
                    delete data.vcsuser;
                } else {
                    var currentVcsUser = bespin.get("settings").get("vcsuser");
                    if (!data.vcsuser || data.vcsuser == currentVcsUser) {
                        delete data.vcsuser;
                    }
                }

                // prune out unnecessary values
                if (data.remoteauth == "") {
                    delete data.push;
                    delete data.authtype;
                    delete data.username;
                    delete data.password;
                } else {
                    if (data.authtype == "ssh") {
                        delete data.password;
                    }
                }
                data = dojo.objectToQuery(data);
                bespin.get('server').clone(data, instruction, bespin.vcs._createStandardHandler(instruction, {
                    onSuccess: function() {
                        bespin.publish("project:created", {project: newProjectName});
                    }
                }));
            },
            method: "POST"
        })

        var setUserfields = function() {
            var newval = authtypeField.value;
            if (newval == "ssh") {
                dojo.query("tr.userfields").style("display", "none");
            } else {
                dojo.query("tr.userfields").style("display", "table-row");
            }
        };

        var table = dojo.create("table", {}, form);
        var tbody = dojo.create("tbody", {}, table);
        var row = dojo.create("tr", {}, tbody);
        var cell = dojo.create("th", {colspan: "2",
            innerHTML: "Add Project from Source Control?"}, row);

        row = dojo.create("tr", {}, tbody);
        cell = dojo.create("td", {innerHTML: "URL:"}, row);
        cell = dojo.create("td", {}, row);
        
        // vcs_source
        var sourceField = dojo.create("input", {type: "text", name: "source", value: url, 
            style: "width: 85%"}, cell);
        
        row = dojo.create("tr", {}, tbody);
        cell = dojo.create("td", {innerHTML: "Project name:"}, row);
        cell = dojo.create("td", {}, row);
        cell.innerHTML = '<input type="text" name="dest" value=""> (defaults to last part of URL path)';
        
        row = dojo.create("tr", {}, tbody);
        cell = dojo.create("td", {innerHTML: "VCS Type:"}, row);
        cell = dojo.create("td", {}, row);
        // vcs
        var vcsField = select = dojo.create("select", {name:"vcs",
            onchange: function(e) {
                if (this.value == "svn") {
                    dojo.style(vcsUserRow, "display", "none");
                } else {
                    dojo.style(vcsUserRow, "display", "table-row");
                }
            }
        }, cell);
        dojo.create("option", {value: "svn", innerHTML: "Subversion (svn)"}, select);
        dojo.create("option", {value: "hg", innerHTML: "Mercurial (hg)"}, select);
        
        // VCS User
        var vcsUserRow = row = dojo.create("tr", {
            style: "display: none"
        }, tbody);
        cell = dojo.create("td", {innerHTML: "VCS User:"}, row);
        cell = dojo.create("td", {}, row);
        var vcsUser = dojo.create("input", {
            name: "vcsuser",
            value: bespin.get("settings").get("vcsuser") || ""
        }, cell);
        
        row = dojo.create("tr", {}, tbody);
        cell = dojo.create("td", {innerHTML: "Authentication:"}, row);
        cell = dojo.create("td", {}, row);
        
        // remoteauth
        select = dojo.create("select", {name: "remoteauth",
            onchange: function(e) {
                var newval = this.value;
                if (newval == "") {
                    dojo.query("tr.authfields").style("display", "none");
                } else {
                    dojo.query("tr.authfields").style("display", "table-row");
                    if (authtypeField.value == "ssh") {
                        dojo.query("tr.userfields").style("display", "none");
                    }
                }
                if (vcsField.value == "svn") {
                    dojo.style(pushRow, "display", "none");
                    authtypeField.value = "password";
                    setUserfields();
                    dojo.style(authtypeRow, "display", "none");
                } else {
                    dojo.style(authtypeRow, "display", "table-row");
                }
                setTimeout(function() {kcpassField.focus()}, 10);
            }}, cell);
        dojo.create("option", {value: "", 
            innerHTML: "None (read-only access to the remote repo)"}, select);
        dojo.create("option", {value: "write",
            innerHTML: "Only for writing"}, select);
        dojo.create("option", {value: "both",
            innerHTML: "For reading and writing"}, select);
        
        row = dojo.create("tr", {style: "display: none", 
            className: "authfields"}, tbody);
        cell = dojo.create("td", {innerHTML: "Keychain password:"}, row);
        cell = dojo.create("td", {}, row);
        
        // kcpass
        var kcpassField = dojo.create("input", {type: "password", name: "kcpass"}, cell);
        
        // push_row
        var pushRow = row = dojo.create("tr", {style: "display:none", className: "authfields"}, tbody);
        dojo.create("td", {innerHTML: "Push to URL"}, row);
        cell = dojo.create("td", {}, row);
        // pushfield
        var pushField = dojo.create("input", {type: "text", name: "push", 
            style: "width:85%", value: url}, cell);
        
        // authtype_row
        var authtypeRow = row = dojo.create("tr", {style: "display: none", className: "authfields"}, tbody);
        cell = dojo.create("td", {innerHTML: "Authentication type"}, row);
        cell = dojo.create("td", {}, row);
        
        // authtype
        var authtypeField = select = dojo.create("select", {name: "authtype",
            onchange: setUserfields}, cell);
        dojo.create("option", {value: "ssh", innerHTML: "SSH"}, select);
        dojo.create("option", {value: "password", 
            innerHTML: "Username/Password"}, select);
        
        // username_row
        row = dojo.create("tr", {style: "display:none", 
            className: "authfields"}, tbody);
        dojo.create("td", {innerHTML: "Username"}, row);
        cell = dojo.create("td", {}, row);
        
        // usernamefield
        var usernameField = dojo.create("input", {type: "text", name: "username"}, cell);
        
        // password_row
        row = dojo.create("tr", {style: "display:none",
            className: "authfields userfields"}, tbody);
        dojo.create("td", {innerHTML: "Password"}, row);
        cell = dojo.create("td", {}, row);
        dojo.create("input", {type: "password", name: "password"}, cell);
        row = dojo.create("tr", {}, tbody);
        dojo.create("td", {innerHTML: "&nbsp;"}, row);
        cell = dojo.create("td", {}, row);
        // vcsauthsubmit
        dojo.create("input", {type: "submit", value: "Ok"}, cell);
        
        // vcsauthcancel
        dojo.create("input", {type: "button", value: "Cancel",
            onclick: bespin.vcs._createCancelHandler(instruction)}, cell);
        
        instruction.setElement(form);

        sourceField.focus();
    }
});

/**
 * Commit command.
 * Commit all outstanding changes
 */
bespin.vcs.commands.addCommand({
    name: 'commit',
    takes: ['message'],
    aliases: [ 'ci' ],
    preview: 'Commit to the local (in-bespin) repository',
    execute: function(instruction, message) {
        var doCommit = function(message) {
            var project;

            bespin.withComponent('editSession', function(editSession) {
                project = editSession.project;
            });

            if (!project) {
                instruction.addErrorOutput("You need to pass in a project");
                return;
            }
            bespin.get('server').vcs(project,
                                    { command: [ 'commit', '-m', message ] },
                                    instruction,
                                    bespin.vcs._createStandardHandler(instruction));
        }

        // for now, be a nagger and ask to save first using an ugly confirm()
        if (bespin.get("editor").dirty) {
        	if (confirm("The file that is currently open has unsaved content. Save the file first, and then rerun the command?")) {
        	    bespin.get("editor").saveFile();
        	}
        } else if (!message) {
            var messageForm = dojo.create("form", {onsubmit:
                function(e) {
                    doCommit(messagefield.value);
                    instruction.unlink();
                    instruction.commandLine.focus();
                    dojo.stopEvent(e);
                    return false;
                }});
            dojo.create("div", {}, messageForm).innerHTML = "Commit message:<br>";
            var messagefield = dojo.create("textarea", {rows: 5, cols: 65},
                messageForm);
            dojo.create("div", {}, messageForm).innerHTML = "<br>";
            dojo.create("input", {type: "submit"}, messageForm);

            instruction.setElement(messageForm);

            setTimeout(function() { messagefield.focus() }, 10);
        } else {
            doCommit(message);
        }
    }
});

/**
 * Diff command.
 * Report on the changes between the working files and the respository
 */
bespin.vcs.commands.addCommand({
    name: 'diff',
    preview: 'Display the differences in the checkout out files',
    takes: ['*'],
    completeText: 'Use the current file, add -a for all files or add filenames',
    description: 'Without any options, the vcs diff command will diff the currently selected file against the repository copy. If you pass in -a, the command will diff <em>all</em> files. Finally, you can list files to diff individually.',
    execute: function(instruction, args) {
        bespin.vcs._performVCSCommandWithFiles("diff", instruction, args);
    }
});

/**
 * Revert command.
 * Report on the changes between the working files and the respository
 */
bespin.vcs.commands.addCommand({
    name: 'revert',
    preview: 'Revert files back to their checked-in state',
    takes: ['*'],
    completeText: 'Use the current file, add -a for all files or add filenames',
    description: 'Without any options, the vcs revert command will revert the currently selected file against the repository copy. If you pass in -a, the command will revert <em>all</em> files. Finally, you can list files to revert individually. No backups are kept!',
    execute: function(instruction, args) {
        bespin.vcs._performVCSCommandWithFiles("revert", instruction, args,
            {
                acceptAll: true,
                onSuccess: function() {
                    // null means leave the same
                    editor.openFile(null, null, { reload:true });
                }
            });
    }
});

/**
 * Retrieve an SSH public key for authentication use
 */
bespin.vcs.getkey = {
    name: 'getkey',
    takes: [ 'password' ],
    completeText: 'Recommended: Don\'t pass in a password, put it in the following dialog',
    preview: 'Get your SSH public key that Bespin can use for remote repository authentication. (May prompt for your keychain password)',
    execute: function(instruction, kcpass) {
        if (kcpass == '') kcpass = undefined;
        var server = bespin.get('server');
        server.getkey(kcpass, {
            onSuccess: function(key) {
                var parent = dojo.create("div", {
                    innerHTML: "SSH public key that Bespin can use for remote repository authentication:<br/>"
                });
                var textarea = dojo.create("textarea", {
                    style: "width:400px; height:100px; overflow:auto;",
                    innerHTML: key,
                    readonly: true
                }, parent);
                instruction.setElement(parent);
                textarea.select();
            },

            /**
             * Retrieve the user's SSH public key using their keychain password.
             * This is required if they have not already set up a public key.
             */
            on401: function(xhr) {
                // If kcpass is non-empty then this is due to a rejected password
                var errmsg = (!kcpass || kcpass === "") ? "" : "Wrong password";
                bespin.vcs.getKeychainPassword(instruction, function(kcpass) {
                    bespin.vcs.getkey.execute(instruction, kcpass);
                }, errmsg);
            },

            onFailure: function(xhr) {
                instruction.addErrorOutput("getkey failed: " + xhr.response);
            }
        });
    }
};

bespin.vcs.commands.addCommand(bespin.vcs.getkey);

/**
 * Push command.
 * Push changes to the specified destination
 */
bespin.vcs.commands.addCommand({
    name: 'push',
    preview: 'push to the remote repository',
    execute: function(instruction, args) {
        var project;

        bespin.withComponent('editSession', function(editSession) {
            project = editSession.project;
        });

        if (!project) {
            instruction.addErrorOutput("You need to pass in a project");
            return;
        }

        bespin.vcs.getKeychainPassword(instruction, function(kcpass) {
            bespin.get('server').vcs(project,
                                    { command: ['push', '_BESPIN_PUSH'], kcpass: kcpass },
                                    instruction,
                                    bespin.vcs._createStandardHandler(instruction));
        });
    }
});

/**
 * Remove command.
 * Remove the specified files on the next commit
 */
bespin.vcs.commands.addCommand({
    name: 'remove',
    aliases: [ 'rm' ],
    preview: 'Remove a file from version control (also deletes it)',
    takes: ['*'],
    description: 'The files presented will be deleted and removed from version control.',
    execute: function(instruction, args) {
        bespin.vcs._performVCSCommandWithFiles("remove", instruction, args,
            { acceptAll: false });
    }
});

/**
 * Resolved command.
 * Retry file merges from a merge or update
 */
bespin.vcs.commands.addCommand({
    name: 'resolved',
    takes: ['*'],
    aliases: [ 'resolve' ],
    preview: 'Mark files as resolved',
    completeText: 'Use the current file, add -a for all files or add filenames',
    description: 'Without any options, the vcs resolved command will mark the currently selected file as resolved. If you pass in -a, the command will resolve <em>all</em> files. Finally, you can list files individually.',
    execute: function(instruction, args) {
        bespin.vcs._performVCSCommandWithFiles("resolved", instruction, args);
    }
});

/**
 * Status command.
 * Show changed files under the working directory
 */
bespin.vcs.commands.addCommand({
    name: 'status',
    aliases: [ 'st' ],
    preview: 'Display the status of the repository files.',
    description: 'Shows the current state of the files in the repository<br>M for modified, ? for unknown (you may need to add), R for removed, ! for files that are deleted but not removed',
    execute: function(instruction, args) {
        var project;

        bespin.withComponent('editSession', function(editSession) {
            project = editSession.project;
        });

        if (!project) {
            instruction.addErrorOutput("You need to pass in a project");
            return;
        }

        bespin.get('server').vcs(project,
                                { command: ['status'] },
                                instruction,
                                bespin.vcs._createStandardHandler(instruction));
    }
});

/**
 * Update command.
 * Pull updates from the repository into the current working directory
 */
bespin.vcs.commands.addCommand({
    name: 'update',
    aliases: [ 'up', 'co' ],
    preview: 'Update your working copy from the remote repository',
    execute: function(instruction) {
        var project;

        bespin.withComponent('editSession', function(editSession) {
            project = editSession.project;
        });

        if (!project) {
            instruction.addErrorOutput("You need to pass in a project");
            return;
        }

        var sendRequest = function(kcpass) {
            var command = {
                command: ['update', '_BESPIN_REMOTE_URL']
            };

            if (kcpass !== undefined) {
                command.kcpass = kcpass;
            }

            bespin.get('server').vcs(project,
                                    command,
                                    instruction,
                                    bespin.vcs._createStandardHandler(instruction));
        };

        bespin.vcs._getRemoteauth(project, function(remoteauth) {
            console.log("remote auth is: " + remoteauth);
            if (remoteauth == "both") {
                bespin.vcs.getKeychainPassword(instruction, sendRequest);
            } else {
                sendRequest(undefined);
            }
        });

    }
});

/**
 * Command store for the Mercurial commands
 * (which are subcommands of the main 'hg' command)
 */
bespin.vcs.hgCommands = new bespin.command.Store(bespin.command.store, {
    name: 'hg',
    preview: 'run a Mercurial command',
    subcommanddefault: 'help'
});

/**
 * Display sub-command help
 */
bespin.vcs.hgCommands.addCommand({
    name: 'help',
    takes: ['search'],
    preview: 'show commands for hg subcommand',
    description: 'The <u>help</u> gives you access to the various commands in the hg subcommand space.<br/><br/>You can narrow the search of a command by adding an optional search params.<br/><br/>Finally, pass in the full name of a command and you can get the full description, which you just did to see this!',
    completeText: 'optionally, narrow down the search',
    execute: function(instruction, extra) {
        var output = this.parent.getHelp(extra);
        instruction.addOutput(output);
    }
});

/**
 * Initialize an HG repository
 */
bespin.vcs.hgCommands.addCommand({
    name: 'init',
    preview: 'initialize a new hg repository',
    description: 'This will create a new repository in this project.',
    execute: function(instruction) {
        var project;

        bespin.withComponent('editSession', function(editSession) {
            project = editSession.project;
        });

        if (!project) {
            instruction.addErrorOutput("You need to pass in a project");
            return;
        }
        bespin.get('server').vcs(project,
                                { command: ['hg', 'init'] },
                                instruction,
                                bespin.vcs._createStandardHandler(instruction));
    }
});

/**
 * Command store for the Subversion commands
 * (which are subcommands of the main 'svn' command)
 */
bespin.vcs.svnCommands = new bespin.command.Store(bespin.command.store, {
    name: 'svn',
    preview: 'run a Subversion command',
    subcommanddefault: 'help'
});

/**
 * Display sub-command help
 */
bespin.vcs.svnCommands.addCommand({
    name: 'help',
    takes: ['search'],
    preview: 'show commands for svn subcommand',
    description: 'The <u>help</u> gives you access to the various commands in the svn subcommand space.<br/><br/>You can narrow the search of a command by adding an optional search params.<br/><br/>Finally, pass in the full name of a command and you can get the full description, which you just did to see this!',
    completeText: 'optionally, narrow down the search',
    execute: function(instruction, extra) {
        var output = this.parent.getHelp(extra);
        instruction.addOutput(output);
    }
});


/**
 * Generic vcs remote command handler
 */
bespin.vcs._performVCSCommandWithFiles = function(vcsCommand, instruction, args, options) {
    options = options || { acceptAll: true };
    var project;
    var path;

    bespin.withComponent('editSession', function(editSession) {
        project = editSession.project;
        path = editSession.path;
    });

    if (!project) {
        instruction.addErrorOutput("You need to pass in a project");
        return;
    }

    if (args.varargs.length == 0) {
        if (!path) {
            var dasha = "";
            if (options.acceptAll) {
                dasha = ", or use -a for all files.";
            }
            instruction.addErrorOutput("You must select a file to " + vcsCommand + dasha);
            return;
        }
        var command = [vcsCommand, path];
    } else if (args.varargs[0] == "-a" && options.acceptAll) {
        var command = [vcsCommand];
    } else {
        var command = [vcsCommand].concat(args.varargs);
    }

    var handlerOptions = {};
    if (options.onSuccess) {
        handlerOptions.onSuccess = options.onSuccess;
    }

    bespin.get('server').vcs(project,
                            { command: command },
                            instruction,
                            bespin.vcs._createStandardHandler(instruction, handlerOptions));
};

/**
 * The cache for <pre>bespin.vcs._getRemoteauth</pre>
 * @see bespin.vcs._getRemoteauth
 */
bespin.vcs._remoteauthCache = {};

/**
 * Looks in the cache or calls to the server to find out if the given project
 * requires remote authentication.
 * The result is published at vcs:remoteauth:project
 */
bespin.vcs._getRemoteauth = function(project, callback) {
    var cached = bespin.vcs._remoteauthCache[project];
    if (cached === undefined) {
        bespin.get('server').remoteauth(project, callback);
        return;
    }
    // work from cache
    callback(cached);
};

/**
 * Catch publishes primarily from bespin.client.Server.remoteauth (below)
 */
bespin.subscribe("vcs:remoteauthUpdate", function(event) {
    bespin.vcs._remoteauthCache[event.project] = event.remoteauth;
});

/**
 * Most of the VCS commands just want to output to the CLI
 */
bespin.vcs._createStandardHandler = function(instruction, options) {
    options = options || {};
    return {
        onPartial: function(response) {
            instruction.addOutput("<pre>" + response + "</pre>");
        },
        onSuccess: instruction.link(function(response) {
            console.dir(response);
            if (!response.success) {
                instruction.addErrorOutput("<pre>" + response.output + "</pre>")
                instruction.unlink();
                if (options.onFailure) {
                    console.log("Calling other onfailure");
                    options.onFailure(response);
                }
            } else {
                instruction.addOutput("<pre>" + response.output + "</pre>");
                instruction.unlink();
                if (options.onSuccess) {
                    console.log("Calling other onsuccess");
                    options.onSuccess(response);
                }
            }
        }),
        onFailure: instruction.link(function(xhr) {
            instruction.addErrorOutput(xhr.response);
            instruction.unlink();
        })
    };
};

/**
 * Create an event handler to sort out the output if the user clicks cancel
 * in one of the popup dialogs
 */
bespin.vcs._createCancelHandler = function(instruction) {
    return instruction.link(function() {
        var el = dojo.byId('centerpopup');
        bespin.util.webpieces.hideCenterPopup(el);
        instruction.addErrorOutput("Cancelled");
        instruction.unlink();
    });
};

/**
 * Extension to bespin.client.Server
 */
dojo.extend(bespin.client.Server, {
    /**
     * Finds out if the given project requires remote authentication the values
     * returned are "", "both" (for read and write), "write" when only writes
     * require authentication the result is published as an object with project,
     * remoteauth values to vcs:remoteauthUpdate and sent to the callback.
     */
    remoteauth: function(project, callback) {
        var url = '/vcs/remoteauth/' + escape(project) + '/';
        this.request('GET', url, null, {
            onSuccess: function(result) {
                var event = {
                    project: project,
                    remoteauth: result
                };
                bespin.publish("vcs:remoteauthUpdate", event);
                callback(result);
            }
        });
    },

    /**
     * Run a Version Control System (VCS) command.
     * The command object should have a command attribute on it that is a list
     * of the arguments.
     * Commands that require authentication should also have kcpass, which is a
     * string containing the user's keychain password.
     */
    vcs: function(project, command, instruction, opts) {
        var url = '/vcs/command/' + project + '/';
        this.requestDisconnected('POST', url, dojo.toJson(command), instruction, opts);
    },

    /**
     * Sets authentication for a project
     */
    setauth: function(project, form, opts) {
        this.request('POST', '/vcs/setauth/' + project + '/',
                    dojo.formToQuery(form), opts || {});
    },

    /**
     * Retrieves the user's SSH public key that can be used for VCS functions
     */
    getkey: function(kcpass, opts) {
        if (kcpass == null) {
            this.request('POST', '/vcs/getkey/', null, opts || {});
        } else {
            this.request('POST', '/vcs/getkey/', "kcpass=" + escape(kcpass), opts || {});
        }
    },

    /**
     * Clone a remote repository
     */
    clone: function(data, instruction, opts) {
        this.requestDisconnected('POST', '/vcs/clone/', data, instruction, opts);
    }
});