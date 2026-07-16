(function(factory) {
	typeof define === "function" && define.amd ? define([], factory) : factory();
})(function() {
	//#region bin/header/v5/commands/header/template/v14/BuildMenuItem/createLi.js
	var createLi = (cls = "") => {
		const li = document.createElement("li");
		li.className = cls;
		return li;
	};
	//#endregion
	//#region bin/header/v5/commands/header/template/v14/BuildMenuItem/createAnchor.js
	var createAnchor = ({ inHtmlId = "", inHref = "#", inClass = "", inTableName = "", inSvgName = "", inSvgDivClass = "", inClassName, inTextToShow, inDropdownItems = [], inDropdownType = "" }) => {
		const isDropdown = Array.isArray(inDropdownItems) && inDropdownItems.length > 0;
		let a;
		if (isDropdown) if (inDropdownType === "inline") a = document.createElement("ks-dropdown-inline");
		else if (inDropdownType === "absolute") a = document.createElement("ks-dropdown-absolute");
		else a = document.createElement("ks-dropdown-responsive");
		else a = document.createElement("ks-menu-item");
		a.setAttribute("ks-id", inHtmlId || "");
		a.setAttribute("ks-href", inHref || "#");
		a.setAttribute("ks-class", inClass || "");
		a.setAttribute("ks-svgName", inSvgName || "");
		a.setAttribute("ks-svgDivClass", inSvgDivClass || "");
		a.setAttribute("ks-className", inClassName || "");
		a.setAttribute("ks-textToShow", inTextToShow || "");
		if (isDropdown) inDropdownItems.forEach((child) => {
			const childA = document.createElement("a");
			childA.href = child.href || "#";
			childA.textContent = child.text || "";
			if (child.id) childA.id = child.id;
			a.appendChild(childA);
		});
		return a;
	};
	//#endregion
	//#region bin/header/v5/commands/header/template/v14/BuildMenuItem/buildMenuItem.js
	var buildMenuItem = ({ inTextToShow, inHtmlId, inIconPaths, inHref, onClick, inTableName, inClasses, inSvgName, inConfigUiClasses, inDropdownItems, inDropdownType }) => {
		const li = createLi(inClasses.liClass);
		const a = createAnchor({
			inHtmlId,
			inHref,
			inClass: inClasses?.aClass,
			inTableName,
			inSvgName,
			inSvgDivClass: inClasses.svgClass,
			inTextToShow,
			inClassName: inClasses.spanClass,
			inDropdownItems,
			inDropdownType
		});
		li.appendChild(a);
		return li;
	};
	//#endregion
	//#region bin/header/v5/commands/header/template/v14/BuildNav/buildNav.js
	var buildNav = ({ inTitle = {}, inUiClasses = {} }) => {
		const nav = document.createElement("ks-nav");
		if ("text" in inTitle) nav.setAttribute("ks-title", inTitle.text || "");
		if ("htmlId" in inTitle) nav.setAttribute("ks-title-id", inTitle.htmlId || "");
		if ("ulClass" in inUiClasses) nav.setAttribute("ks-ul-class", inUiClasses?.ulClass || "");
		if ("navClass" in inUiClasses) nav.setAttribute("ks-nav-class", inUiClasses?.navClass || "");
		if ("brandClass" in inUiClasses) nav.setAttribute("ks-brand-class", inUiClasses?.brandClass || "");
		return nav;
	};
	//#endregion
	//#region bin/header/v5/commands/header/template/v14/initHeader.js
	var initHeader = (config = {}) => {
		const header = document.getElementById("header");
		if (!header) return;
		const nav = buildNav({
			inTitle: config.title,
			inUiClasses: config.uiClasses
		});
		header.appendChild(nav);
		const menu = document.getElementById("menu");
		if (!menu) {
			console.warn("KSHeader: #menu not found");
			return;
		}
		(config.items || []).forEach((item) => {
			const classes = {
				liClass: "md:text-center",
				aClass: `${item?.uiClasses?.aClass} flex justify-between items-center
        px-4 py-2 rounded-md
        hover:bg-gray-600
        active:bg-gray-500 active:scale-95
        transition-all duration-150
        md:flex-col md:justify-center md:items-center
        lg:bg-transparent lg:px-2 lg:py-1`,
				spanClass: `ml-3 text-right w-full text-base
        md:w-auto md:text-center md:ml-0 lg:text-lg`,
				svgClass: item?.uiClasses?.svgDivClass || "text-gray-300 w-6 h-6 lg:w-7 lg:h-7"
			};
			console.log("item : ", item);
			const li = buildMenuItem({
				inTextToShow: item.text,
				inHtmlId: item.id,
				inIconPaths: item.icon,
				inHref: item.href,
				onClick: item.onClick,
				inTableName: item.tableName,
				inClasses: classes,
				inSvgName: item.svgName,
				inConfigUiClasses: config.uiClasses,
				inDropdownItems: item.dropdownItems,
				inDropdownType: item.dropdownType
			});
			menu.appendChild(li);
		});
	};
	window.KSHeader = initHeader;
	window.ks = window.ks || {};
	window.ks.components = window.ks.components || {};
	window.ks.components.header = initHeader;
	window.ks.components.headerVersion = "v14";
	//#endregion
	//#region header.js
	(async () => {
		window.KSHeaderVersion = "v14";
		window.KSHeader = initHeader;
	})();
	//#endregion
});
