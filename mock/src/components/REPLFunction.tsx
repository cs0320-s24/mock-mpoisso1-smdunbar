export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

export function starterFunc(load_file: REPLFunction, view: REPLFunction, search: REPLFunction) {
  const funcMap = new Map();
  funcMap.set("search", search);
  funcMap.set("view", view);
  funcMap.set("load_file", load_file);
  return funcMap;
}

export function addFunc(map: Map<string, REPLFunction>, name: string, newFunc: REPLFunction) {
  map.set(name, newFunc);
}
export function removeFunc(map: Map<string, REPLFunction>, name: string) {
  map.delete(name);
}