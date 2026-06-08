(() => {
    const inject = (file) => {
        const script = document.createElement("script");
        script.src = browser.runtime.getURL(file);
        script.onload = () => script.remove();
        document.documentElement.appendChild(script);
    };

    inject("ksheader.js");

    console.log("✅ KSHeader JS injected");

    inject("kstable.js");

    console.log("✅ KSTable JS injected");
})();