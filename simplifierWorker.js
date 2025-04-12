self.onmessage = function (e) {
    const { text, level } = e.data;
  
    // Placeholder simplification logic
    const simplified = text
      .replace(/\billustrious\b/gi, "famous")
      .replace(/\bpseudonym\b/gi, "nickname")
      .replace(/\bprominent\b/gi, "important")
      .replace(/\bassociated\b/gi, "connected");
  
    self.postMessage({ simplified });
  };