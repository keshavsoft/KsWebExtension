const link = document.createElement("link");

link.id = "KSTableTailwind";
link.rel = "stylesheet";
link.href = browser.runtime.getURL("tailwind-3.css");

document.head.appendChild(link);

console.log("✅ KSTable CSS injected");