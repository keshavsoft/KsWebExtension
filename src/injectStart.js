(() => {
    const inject = (file) => {
        const script = document.createElement("script");

        script.src = browser.runtime.getURL(file);

        script.onload = () => script.remove();

        document.documentElement.appendChild(script);
    };

    inject("src/KSComponents.js");

    console.log("✅ KSComponents v3.14 injected");
})();