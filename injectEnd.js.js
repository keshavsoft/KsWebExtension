(() => {
    const inject = (file) => {
        const script = document.createElement("script");

        script.src = browser.runtime.getURL(file);

        script.onload = () => script.remove();

        document.documentElement.appendChild(script);
    };

    inject("ksheader.js");

    console.log("✅ KSHeader v11 injected");

    inject("kstable.js");

    console.log("✅ KSTable v3.12 injected");

    inject("kstablecomp.js");

    console.log("✅ KSTableComponents v3.10 injected");
})();