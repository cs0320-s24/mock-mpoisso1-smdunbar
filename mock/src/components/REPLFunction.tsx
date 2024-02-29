export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

interface basics {
  search: REPLFunction;
  load: REPLFunction;
  view: REPLFunction;
}

export function starterFunc(props: basics) {
  const funcMap = new Map();
  funcMap.set("search", props.search);
  funcMap.set("view", props.view);
  funcMap.set("load", props.load);
  return funcMap;
}
