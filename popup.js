const api = typeof browser !== "undefined" ? browser : chrome;

document.getElementById("btn").onclick = async () => {
    const [tab] = await api.tabs.query({ active: true, currentWindow: true });

    api.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["inject.js"]
    });
};