import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPLFunction";
import { starterFunc } from "./REPLFunction";

interface REPLInputProps {
  history: any[];
  setHistory: Dispatch<SetStateAction<any[]>>;
  verbose: boolean;
  setVerbose: Dispatch<SetStateAction<boolean>>;
}
export interface returnObj {
  command: string;
  result: string | string[][];
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)

export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [loaded, setLoaded] = useState<string>("");
  const load: REPLFunction = (args: string[]): string | string[][] => {
    if (args.length == 2) {
      setLoaded(args[1]);
      const result = "loaded file " + args[1];
      return result;
    } else {
      return "incorrect number of arguments";
    }
  };

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

  var funcMap = starterFunc(load, view, search);


  const view_csv = new Map([
    [
      "filepath1.csv",
      [
        ["Hi", "i'm", "simone"],
        ["Hi", "i'm", "Maddie"],
      ],
    ],
    [
      "filepath2.csv",
      [
        ["the", "dog", "barks"],
        ["The", "cat", "meows"],
      ],
    ],
    [
      "filepath3.csv",
      [
        ["track", "and", "field"],
        ["water", "polo"],
      ],
    ],
  ]);

  const search_csv = new Map([
    ["1 Maddie", [["the", "Maddie", "parrot"]]],
    ["2 grass", [["the", "green", "grass"]]],
  ]);


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
      if ((func = funcMap.get(commandString.split(" ")[0])) != undefined) {
        return [commandString, func(commandString.split(" "))];
      }
    }
    result = "not a valid command, please try again";
    console.log(result);
    return [commandString, result];
  }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
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
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}

      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
