var windowsConsoleTitle;


if (process.platform == 'win32') {
	// On Windows, the default console does not support ANSI escape sequences.
	// Instead, we must call SetConsoleTitleW.
	try {
		windowsConsoleTitle = require('windows-console-title');
	} catch (ex) {
		// ignore errors
	}
}



exports = module.exports = function(title) {
	if (windowsConsoleTitle) {
		windowsConsoleTitle.setTitle(title);
	} else {
		// ANSI escapes are parsed and discarded by libuv on Windows
		process.stdout.write('\x1b]2;' + title + '\x1b\x5c');
	}
};

