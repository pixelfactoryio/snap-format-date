import _ from "lodash";

export function chnageValueByPath(object: any, path: any, value: any) {
  if (Array.isArray(path) && path[0] === "$") {
    const pathWithoutFirstElement = path.slice(1);
    _.set(object, pathWithoutFirstElement, value);
  }
}

export function changeValuesByPath(
  object: any,
  nodes: any,
  lastPropertyName: any
) {
  nodes.forEach((node: any) => {
    chnageValueByPath(object, node.path.concat(lastPropertyName), node.value);
  });

  return object;
}
