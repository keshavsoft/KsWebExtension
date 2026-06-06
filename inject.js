(function () {
    if (window.KSTable) return;

    const script = document.createElement("script");
    script.src = browser.runtime.getURL("kstable.js");

    script.onload = () => {
        console.log("✅ KSTable injected");
        script.remove();
    };

    document.documentElement.appendChild(script);
})();