import Constants from "./constants.js"
import renderNode from "./renderNode.js";

const setProps = (node, props) => {
  for (var key in props) {
    node.setAttribute(key, props[key]);
  }
}

const applyPatches = (node, currentPatch) => {
    switch (currentPatch.type) {
      case Constants.PATCH_CREATE_NODE:
        node.parentNode.appendChild(renderNode(currentPatch.newNode));
        break;
      case Constants.PATCH_REMOVE_NODE:
        node.parentNode.removeChild(node);
        break;
      case Constants.PATCH_REPLACE_NODE:
        node.parentNode.replaceChild(renderNode(currentPatch.newNode), node);
        break;
      case Constants.PATCH_PROPS:
        setProps(node, currentPatch.props);
        break;
      case Constants.PATCH_TEXT:
        node.parentNode.innerText = currentPatch.newNode;
        break;
  
      case Constants.PATCH_CHILD:
        let len = node.childNodes ? node.childNodes.length : 0;
  
        for (var i = 0; i < len; i++) {
          let child = node.childNodes[i];
          patch(child, currentPatch.patchArray[i]);
        }
  
        //TODO: Need to Optimize
        if (currentPatch.patchArray.length > len) {
          for (var i = len; i < currentPatch.patchArray.length; i++) {
            if (!currentPatch.patchArray[i]) return;
            for (var j = 0; j < currentPatch.patchArray[i].length; j++) {
              if (
                currentPatch.patchArray[i][j].type === Constants.PATCH_CREATE_NODE
              ) {
                const createdElement = renderNode(
                  currentPatch.patchArray[i][j].newNode
                );
  
                node.appendChild(createdElement);
              }
            }
          }
        }
  
        break;
      default:
        console.log("Unknown Patch Type.");
    }
  };
  
  const patch = (node, patches) => {

    if (patches && patches.length > 0) {
      patches.forEach(patch => {
        applyPatches(node, patch);
      });
    }
  }

  export default patch;