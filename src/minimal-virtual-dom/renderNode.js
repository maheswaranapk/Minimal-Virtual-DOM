const renderNode = vDomObject => {
  const node = document.createElement(vDomObject.tag);
  const props = vDomObject.props;
  const children = vDomObject.children;

  for (const propKey in props) {
    let propValue = props[propKey];
    node.setAttribute(propKey, propValue);
  }

  children.forEach(child => {
    let childElement =
      typeof child === "string"
        ? document.createTextNode(child)
        : renderNode(child);
    node.appendChild(childElement);
  });

  return node;
};

export default renderNode;
