window.addEventListener("message", (event) => {
    if (event.data.action === "simplify-page") {
      const paragraphs = document.querySelectorAll("p");
      paragraphs.forEach(p => {
        const originalText = p.textContent;
        const simplifiedText = dummySimplify(originalText);
        p.textContent = simplifiedText;
      });
    }
  });
  
  function dummySimplify(text) {
    return text.replace(/\butilize\b/g, "use")
               .replace(/\bcommence\b/g, "start")
               .replace(/\bterminate\b/g, "end")
               + " [simplified]";
  }
  