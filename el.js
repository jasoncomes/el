const el = (type = null, props = {}, ...children) => {
  // Return, no type declared
  if (!type) {
    return console.error("Provide `type` to create document element.");
  }

  // Create element with optional attribute props
  const docEl = Object.assign(document.createElement(type), props);

  // children: string, array, or element
  children.flat().forEach((child) => {
    if (typeof child === "string") {
      child = document.createTextNode(child);
    }
    docEl.appendChild(child);
  });

  return docEl;
};