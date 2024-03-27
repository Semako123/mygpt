const extractData = () => {
  const addChat = ({ url, name }) => {
    console.log(url, name);
  };

  const chat_links = document.querySelectorAll("a.flex.items-center.gap-2.p-2");
  for (let chat of chat_links) {
    const parent = chat.parentElement.lastChild;
    const data = { url: chat.href, name: chat.firstChild.textContent};

    if (parent.childNodes.length < 3) {
      const portal = document.createElement("div");
      const svgPath = chrome.runtime.getURL("plus.svg");
      portal.style.cursor = "pointer";
      portal.addEventListener("click", () => {
        addChat(data);
      });
      portal.innerHTML = `<img src="${svgPath}" alt="Add Icon" width="16" heigth="16"/>`;
      parent.appendChild(portal);
    }
  }
};

chrome.webRequest.onCompleted.addListener(
  async function updateChats(details) {
    if (details.method === "GET") {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: extractData,
      });
    }
  },
  { urls: ["https://chat.openai.com/backend-api/*"] }
);
