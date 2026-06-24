const link = document.createElement("link");

link.id = "KSTableTailwind";
link.rel = "stylesheet";
link.href = browser.runtime.getURL("tailwind-3-min.css");

document.head.appendChild(link);

console.log("✅ KSTable CSS min injected");