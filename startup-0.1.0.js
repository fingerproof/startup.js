/*!
 * startup.js v0.1.0
 * Startup images made easy
 * https://github.com/sebastien-p/startup.js
 *
 * Copyright © 2012 Sebastien P., fingerproof®
 * Released under the MIT license
 * https://github.com/sebastien-p/startup.js/blob/master/license.txt
 */

;(function (w) {

	var a = w.navigator,
		doc = w.document,
		startup = "startup",
		qS = doc.querySelector,
		has = "hasOwnProperty",
		append = "appendChild",
		orientation = "orientation",
		standalone = a.standalone === !0,
		orientations = ["portrait", "landscape"],
		atsi = "apple-touch-" + startup + "-image",
		def = w.devicePixelRatio > 1 ? "hd" : "sd",
		iDevice = /iP(hone|[ao]d)/i.exec(a.userAgent);

	a = function (a, insert, opt, b, c, d) {

		if (iDevice && qS && !qS.call(doc, "link[rel='" + atsi + "']")) {

			// Build defaults: 'rsrc/img/startup[–tablet[-landscape]][@2x].png'
			opt = { path: "rsrc/img/" + startup, hd: "@2x", ext: "png", sep: "-" };
			opt.phone = opt[orientations[0]] = opt.sd = "";
			opt[orientations[1]] = orientations[1];
			opt[d = "tablet"] = d;

			if (typeof a == "object")

				// Merge customization options if strings without any blank char
				for (b in a) if (a[has](b) && opt[has](b) && !/\s/.test(c = a[b]) && c === "" + c) opt[b] = c;

			a = [doc.createElement("link")];
			b = [opt.path];

			// Do not prepend 'opt.sep' if 'value' is an empty string
			function addPart(value, index) { b[index | 0] += value && opt.sep + value }

			if (iDevice[1] == "ad") {

				// 'd === "tablet"' here
				addPart(opt[d]);

				// Only get current device orientation
				if (standalone) addPart(opt[orientations[Math.abs(w[orientation] % 180 / 90 | 0)]]);

				// Get both orientations...
				else for (a[1] = a[0].cloneNode(), b[1] = b[d = 0]; c = orientations[d]; addPart(opt[c], d++))

					// ...using some mediaqueries
					a[d].media = "media screen and (" + orientation + ":" + c + ")"

			} else addPart(opt.phone);

			c = doc.createDocumentFragment();

			// Append every created 'link' tag to the 'fragment' while setting needed attributes
			for (; d = a.pop(); c[append](d)) d.rel = atsi, d.href = b.pop() + opt[def] + "." + opt.ext;

			// 'fragment' if the 'insert' parameter is 'false'
			// 'undefined' if failed or already found
			// 'true' if none of the above
			return insert === !1 ? c : !!doc.getElementsByTagName("head")[0][append](c)

		}

	};

	// Export as an AMD module or a global variable
	typeof define == "function" && define.amd ? define(a) : w[startup] = a

}(window));