import renderNode from "./renderNode.js";
import diff from "./diff.js";
import patch from "./patch.js";

let currentDOMObject = null;

const render = updatedDOMObject => {
  if (!currentDOMObject) {
    const renderedObject = renderNode(updatedDOMObject);
    document.getElementById("app").replaceWith(renderedObject);
  } else {
    const patches = diff(updatedDOMObject, currentDOMObject);
    patch(document.getElementById("app"), patches);
  }

  currentDOMObject = updatedDOMObject;
};

export default { render };
