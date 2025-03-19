// Create the sticky XPath input UI
const xpathContainer = document.createElement("div");
xpathContainer.id = "xpath-container";
xpathContainer.innerHTML = `
    <button id="close-btn">X</button>
    <textarea id="xpath-input" placeholder="Enter XPath..."></textarea>
    <textarea id="xpath-result" readonly></textarea>
`;

document.body.appendChild(xpathContainer);

// Initially hide the XPath UI
xpathContainer.style.display = "none";

// Event listener for real-time XPath execution
document.getElementById("xpath-input").addEventListener("input", () => {
    let xpath = document.getElementById("xpath-input").value;
    let resultBox = document.getElementById("xpath-result");

    if (!xpath.trim()) {
        resultBox.value = "";
        return;
    }

    try {
        let nodes = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
        let node = nodes.iterateNext();
        let results = [];
        
        while (node) {
            results.push(node.textContent.trim());
            node = nodes.iterateNext();
        }
        
        resultBox.value = results.length ? results.join("\n") : "No Match Found";
    } catch (error) {
        resultBox.value = "Invalid XPath!";
    }
});

// Close button functionality
document.getElementById("close-btn").addEventListener("click", () => {
    xpathContainer.style.display = "none";
});

// Listen for show or hide messages from the background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "show") {
        xpathContainer.style.display = "flex";
    } else if (request.action === "hide") {
        xpathContainer.style.display = "none";
    }
});
