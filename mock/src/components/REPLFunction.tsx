/**
 * Interface that takes in an Array<string> and returns either a String or an String[][].
 */
export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

/**
 * Adds already defined functions (load_file,search,view) to the REPLFunction map
 *
 * @param load_file REPLFunctionn that loads a designated CSV file
 * @param view REPLFunctionn that views a loaded CSV file
 * @param search REPLFunctionn that searches a loaded CSV File for a provided value
 * @returns a Map containing key value pairs of a String and a REPLFunction
 */
export function starterFunc(
  load_file: REPLFunction,
  view: REPLFunction,
  search: REPLFunction
) {
  const funcMap = new Map();
  funcMap.set("search", search);
  funcMap.set("view", view);
  funcMap.set("load_file", load_file);
  return funcMap;
}

/**
 * Adds functions from the Map containing all REPLFunctions
 *
 * @param map A map mapping strings to REPLFunctions
 * @param name The name of the function to be added to the map, key value
 * @param newFunc The REPLFunction to be added to the map
 */
export function addFunc(
  map: Map<string, REPLFunction>,
  name: string,
  newFunc: REPLFunction
) {
  map.set(name, newFunc);
}

/**
 * Removes functions from the Map containing all REPLFunctions
 *
 * @param map A map mapping strings to REPLFunctions
 * @param name The name of the function to be removed from the map
 */
export function removeFunc(map: Map<string, REPLFunction>, name: string) {
  map.delete(name);
}
