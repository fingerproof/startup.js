/*!
 * startup.js v0.2.2
 * Startup images made easy
 * https://github.com/fingerproof/startup.js
 *
 * Copyright © 2012 fingerproof®, Sebastien P.
 * Released under the MIT license
 * https://github.com/fingerproof/startup.js/blob/master/license.txt
 */

;(function () {

	var window                 = this,
		document               = window.document,
		module                 = window.navigator,
		hasOwnProperty         = {}.hasOwnProperty,
		querySelector          = document.querySelector,
		startup                = "startup",
		appendChild            = "appendChild",
		orientation            = "orientation",
		orientations           = ["portrait", "landscape"],
		appleTouchStartupImage = "apple-touch-" + startup + "-image",
		standalone             = module.standalone,
		definition             = window.devicePixelRatio > 1 ? "hd" : "sd",
		iDevice                = /iP(hone|[ao]d)/i.exec(module.userAgent);

	module = function (links, insert, config, paths, fragment, link) {

		if (

			iDevice && querySelector &&
			!querySelector.call(document, "link[rel='" + appleTouchStartupImage + "']")

		) {

			// Build defaults: 'rsrc/img/startup[-(tablet[-landscape]|tall)][@2x].png'
			config                  = { path: "rsrc/img/" + startup, tall: "tall", hd: "@2x", ext: "png", sep : "-" };
			config.phone            = config[orientations[0]] = config.sd = "";
			config[link = "tablet"] = link;
			config[orientations[1]] = orientations[1];

			if (typeof links == "object") for (paths in links) if (

				// Merge into 'config' if strings without any blank char
				hasOwnProperty.call(links, paths) && hasOwnProperty.call(config, paths) &&
				!/\s/.test(fragment = links[paths]) && fragment === "" + fragment

			) config[paths] = fragment;

			links = [document.createElement("link")];
			paths = [config.path];

			// Do not prepend 'config.sep' if 'value' is an empty string
			function addPart(value, index) { paths[index | 0] += value && config.sep + value }

			// iPads cases
			if (iDevice[fragment = 1] == "ad") for (

				// 'link === "tablet"' here
				addPart(config[link]),
				// Only get current device orientation...
				link = standalone ? [orientations[window[orientation] / 90 & 1]] : (

					// ...or get both orientations...
					links[fragment++] = links[0].cloneNode(),
					paths[1]          = paths[0],
					orientations

				); fragment--; addPart(config[link[fragment]], fragment))

					// ...using some mediaqueries
					links[fragment].media = "screen and (" + orientation + ":" + link[fragment] + ")"

			// iPhones cases
			else addPart(config.phone), window.screen.height == 568 && addPart(config.tall);

			// Append every created 'link' tag to the 'fragment' after setting needed attributes
			for (fragment = document.createDocumentFragment(); link = links.pop(); fragment[appendChild](link))

				link.rel  = appleTouchStartupImage,
				link.href = paths.pop() + config[definition] + "." + config.ext;

			return insert !== !1 ?

				// 'fragment' if the 'insert' parameter is 'false'
				// 'undefined' if not and idevice or tag already inserted
				// 'true' if none of the above
				!!document.getElementsByTagName("head")[0][appendChild](fragment) : fragment

		}

	};

	// Export as an AMD module or a global variable
	typeof define == "function" && define.amd ? define(module) : window[startup] = module

}());