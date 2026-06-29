(() => {
    const inject = (file) => {
        const script = document.createElement("script");

        script.src = browser.runtime.getURL(file);

        script.onload = () => script.remove();

        document.documentElement.appendChild(script);
    };

    inject("KSTableComponents.js");

    console.log("✅ KSTableComponents v2.3 injected");
})();