(function () {
    if (window.KSTable) return;

    const script = document.createElement("script");
    script.src = browser.runtime.getURL("kstable.js");

    script.onload = () => {
        console.log("✅ KSTable injected");
        script.remove();
    };

    script.onerror = () => {
        console.error("❌ KSTable failed to load");
    };

    document.documentElement.appendChild(script);
})();