(() => {
    const inject = (file) => {
        const script = document.createElement("script");

        script.src = browser.runtime.getURL(file);

        script.onload = () => script.remove();

        document.documentElement.appendChild(script);
    };

    inject("src/ksheader.js");

    console.log("✅ KSHeader v13 injected");

    inject("src/kstablecomp.js");

    console.log("✅ kstablecomp v14 injected");

    inject("src/ksvertical.js");

    console.log("✅ ksvertical v2.8 injected");

    inject("src/kstableonly.js");

    console.log("✅ kstableonly v3 injected");

})();