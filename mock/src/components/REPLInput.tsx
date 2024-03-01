import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPLFunction";
import { starterFunc } from "./REPLFunction";
import { search_csv } from "./MockData";
import { view_csv } from "./MockData";

interface REPLInputProps {
  history: any[];
  setHistory: Dispatch<SetStateAction<any[]>>;
  verbose: boolean;
  setVerbose: Dispatch<SetStateAction<boolean>>;
}
/**
 *
 * @param props contains fields
 * history - array to hold history information
 * setHistory - function that sets the history array
 * verbose -  true if verbose mode is on, false otherwise
 * setVerbose - function that sets the verbose boolean
 * @returns repl input command box
 */
export function REPLInput(props: REPLInputProps) {
  // useStates
  const [commandString, setCommandString] = useState<string>("");
  const [loaded, setLoaded] = useState<string>("");

  //functions to control commands
  const load: REPLFunction = (args: string[]): string | string[][] => {
    if (args.length == 2) {
      setLoaded(args[1]);
      const result = "loaded file " + args[1];
      return result;
    } else {
      return "incorrect number of arguments";
    }
  };
  //view command handler
  const view: REPLFunction = (args: string[]): string | string[][] => {
    if (loaded != "") {
      if (args.length == 1) {
        const result = view_csv.get(loaded);
        if (result === undefined) {
          return "No file to view";
        }
        return result;
      } else {
        return "incorrect number of arguments";
      }
    } else {
      return "no file is loaded, please try again";
    }
  };

  //search command handler
  const search: REPLFunction = (args: string[]): string | string[][] => {
    if (loaded != "") {
      if (args.length == 3) {
        const result = search_csv.get(args[1] + " " + args[2]);
        if (result === undefined) {
          return "Query not found";
        }
        return result;
      } else {
        return "incorrect number of arguments";
      }
    } else {
      return "no file is loaded, please try again";
    }
  };
  // map containing the commands and their functions
  var funcMap = starterFunc(load, view, search);

  /**
   *
   * @param commandString the command entered by the user into the input box
   * @param verbose whether the repl is in verbose mode or not
   * @returns an array where the first element is the command and the second is the result
   * either a string or a string[][] depending on the command
   */
  function getResult(commandString: string, verbose: boolean): any {
    var result;
    if (commandString === "mode") {
      if (verbose) {
        result = "mode changed to brief";
      } else {
        result = "mode changed to verbose";
      }
      props.setVerbose(!verbose);
      console.log(result);
      return [commandString, result];
    } else {
      var func;
      //get the function from the function map
      if ((func = funcMap.get(commandString.split(" ")[0])) != undefined) {
        return [commandString, func(commandString.split(" "))];
      }
    }
    result = "not a valid command, please try again";
    return [commandString, result];
  }

  /** Sets history array to include the newest command and result and resets the
   * command string to ""
   *
   * @param commandString the command entered by the user into the input box
   * @return a command box and submit button
   */
  function handleSubmit(commandString: string) {
    props.setHistory([
      ...props.history,
      getResult(commandString, props.verbose),
    ]);

    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
