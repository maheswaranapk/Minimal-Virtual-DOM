import Constants from "./constants.js";

const isString = node => {
  return typeof node === "string";
};

const diffProps = (newNode, oldNode) => {
  let propsPatches = {};

  const oldProps = oldNode.props;
  const newProps = newNode.props;

  let isPatchesUpdated = false;

  for (const propKey in oldProps) {
    if (newProps[propKey] !== oldProps[propKey]) {
      isPatchesUpdated = true;
      propsPatches[propKey] = newProps[propKey];
    }
  }

  for (const propKey in newProps) {
    if (!oldProps.hasOwnProperty(propKey)) {
      isPatchesUpdated = true;
      propsPatches[propKey] = newProps[propKey];
    }
  }

  if (!isPatchesUpdated) {
    return null;
  }

  return propsPatches;
};

const diffChildren = (newNodeChildren, oldNodeChildren) => {
  const patches = [];

  const minChildrenlength = Math.min(
    newNodeChildren.length,
    oldNodeChildren.length
  );

  for (let i = 0; i < minChildrenlength; i++) {
    patches[i] = diffNode(newNodeChildren[i], oldNodeChildren[i]);
  }

  if (newNodeChildren.length > oldNodeChildren.length) {
    for (let i = oldNodeChildren.length; i < newNodeChildren.length; i++) {
      patches[i] = diffNode(newNodeChildren[i], { tag: null });
    }
  }

  if (newNodeChildren.length < oldNodeChildren.length) {
    for (let i = newNodeChildren.length; i < oldNodeChildren.length; i++) {
      patches[i] = diffNode({ tag: null }, oldNodeChildren[i]);
    }
  }

  return patches;
};

const diffNode = (newNode, oldNode) => {
  let currentPatchArray = [];

  if (isString(newNode) && isString(oldNode) && newNode !== oldNode) {
    currentPatchArray.push({ type: Constants.PATCH_TEXT, newNode });
  } else if (newNode.tag !== oldNode.tag) {
    if (oldNode.tag === null) {
      currentPatchArray.push({ type: Constants.PATCH_CREATE_NODE, newNode });
    } else if (newNode.tag === null) {
      currentPatchArray.push({ type: Constants.PATCH_REMOVE_NODE, oldNode });
    } else {
      currentPatchArray.push({ type: Constants.PATCH_REPLACE_NODE, newNode });
    }
  } else {
    let propsPatches = diffProps(newNode, oldNode);

    if (propsPatches !== null) {
      currentPatchArray.push({
        type: Constants.PATCH_PROPS,
        props: propsPatches
      });
    }

    if (oldNode.children && newNode.children) {
      currentPatchArray.push({
        type: Constants.PATCH_CHILD,
        patchArray: diffChildren(newNode.children, oldNode.children)
      });
    }
  }

  return currentPatchArray;
};

const diff = (newNode, oldNode) => {
  let patches = diffNode(newNode, oldNode);
  return patches;
};

export default diff;
