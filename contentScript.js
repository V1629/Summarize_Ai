// Load the worker
const worker = new Worker(chrome.runtime.getURL("simplifierWorker.js"));

// --- Handler to receive simplified text from worker ---
worker.onmessage = (event) => {
  const simplifiedText = event.data.text;

  // Replace selected text with simplified version
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(simplifiedText));
  }
};

// --- Listen to popup message: "simplify-page" ---
window.addEventListener("message", (event) => {
  if (event.data.action === "simplify-page") {
    const paragraphs = document.querySelectorAll("p");

    paragraphs.forEach(p => {
      if (p.dataset.simplified === "true") return;

      const originalHTML = p.innerHTML;
      const simplifiedHTML = highlightSimplify(originalHTML);
      p.innerHTML = simplifiedHTML;
      p.dataset.simplified = "true";
    });
  }
});

// --- Function: Replace complex words with simple ones ---
function highlightSimplify(html) {
  const replacements = new Map([
    [/\billustrious\b/gi, "famous"],
    [/\bpseudonym\b/gi, "nickname"],
    [/\bprominent\b/gi, "important"],
    [/\bassociated\b/gi, "connected"],
    [/\butilize\b/gi, "use"],
    [/\bcommence\b/gi, "start"],
    [/\bterminate\b/gi, "end"],
    [/\bendeavor\b/gi, "try"],
    [/\bsufficient\b/gi, "enough"],
    [/\bexpedite\b/gi, "speed up"],
    [/\bproceed\b/gi, "go"],
    [/\bmanifest\b/gi, "show"],
    // [/\btruncate\b/gi, "shorten"],
    [/\bubiquitous\b/gi, "everywhere"],
    [/\byearn\b/gi, "long for"],
    // Add more...
  ]);

  let modified = html;

  for (const [pattern, simple] of replacements) {
    modified = modified.replace(pattern, match =>
      `<span style="background: yellow; font-weight: bold;" title="Simplified from '${match}'">${simple}</span>`
    );
  }

  return modified + ` <span style="color: red;">[simplified]</span>`;
}

// --- Optional: Detect selection & simplify via worker ---
document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText.length > 0) {
    worker.postMessage({ type: "simplify", text: selectedText });
  }
});
