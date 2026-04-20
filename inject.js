window.myTestFunction = function () {
    alert("Hello from REAL page context ✅");
};

console.log("myTestFunction attached");

// ✅ ADD THIS LINE
window.myTestFunction();

window.addEventListener("message", (event) => {
    if (event.data === "RUN_MY_FUNC") {
        window.myTestFunction();
    }
});