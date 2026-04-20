(function () {
    if (window.__KSTABLE__) return;
    window.__KSTABLE__ = true;

    const script = document.createElement("script");
    script.src = browser.runtime.getURL("kstable.js");

    script.onload = () => {
        console.log("✅ KSTable injected");
        script.remove();
    };

    (document.head || document.documentElement).appendChild(script);
})();