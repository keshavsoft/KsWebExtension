(() => {
    const inject = (file) => {
        const script = document.createElement("script");

        script.src = browser.runtime.getURL(file);

        script.onload = () => script.remove();

        document.documentElement.appendChild(script);
    };

    inject("src/ksheader.js");

    console.log("✅ KSHeader v11 injected");

    inject("src/kstable.js");

    console.log("✅ KSTable v3.12 injected");

    inject("src/kstablecomp.js");

    console.log("✅ kstablecomp v3.13 injected");
})();