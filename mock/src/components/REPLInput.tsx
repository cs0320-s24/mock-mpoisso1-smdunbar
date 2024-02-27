import '../styles/main.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { ControlledInput } from './ControlledInput';

interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  verbose: boolean;
  setVerbose: Dispatch<SetStateAction<boolean>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)



export function REPLInput(props: REPLInputProps) {

  // Remember: let React manage state in your webapp. 
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [loaded, setLoaded] = useState<string>("");
  const handleClick = () => {
    setCount(count + 1);
  };

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
    [
      "search 1 Maddie",
      ["the", "Maddie", "parrot"
      ],
    ],
    [
      "2 Simone",
      ["the", "green", "grass"
      ],
    ]
  ]);

  function getResult(commandString: string, verbose: boolean): any {

    var result;
    if (commandString === "mode") {
      if (verbose) {
        result = "state: verbose";
      } else {
        result = "state: brief"
      }
      return result;
    } else if (commandString.split(" ")[0] === "load_file" && commandString.split(" ").length === 2) {
      var file = commandString.split(" ")[1];
      setLoaded(file);
      result = "loaded file " + loaded;
      return result;

    } else if (commandString.split(" ")[0] === "search" && commandString.split(" ").length === 3) {
      var list = commandString.split(" ");
      var search_val = list[2];
      var columns = list[1];
      if (loaded != "") {


      }

    }
    else if (commandString.split(" ")[0] === "view" && commandString.split(" ").length === 1) {
      if (loaded != "") {
        if (view_csv.has(loaded)) {
          const value = view_csv.get(loaded);
          return (
            <div className="html-table" aria-label='html-table'>
              {value.map((command, index) => (
                <tr key={index}>
                  {command.map((command2, index2) => (
                    <td key={index2}>{command2}</td>
                  ))}
                </tr>
              ))}
            </div>
          );
        }

        //   }
      }
      result = "not a valid command, please try again";
      return result;

    }
    /**
     * We suggest breaking down this component into smaller components, think about the individual pieces 
     * of the REPL and how they connect to each other...
     */
    function handleSubmit(commandString: string) {


      if (commandString === "mode") {
        props.setVerbose(!props.verbose);
      }
      setCount(count + 1);
      if (props.verbose === false) {
        props.setHistory([...props.history, getResult(commandString, props.verbose)]);
      } else {
        props.setHistory([...props.history,
        "Command: " + commandString + "\n" + "Output: " +
        getResult(commandString, props.verbose)]);
      }

      setCommandString("");
      return <h1>props.history</h1>

    }




    return (
      <div className="repl-input">
        {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
        {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
        <fieldset>
          <legend>Enter a command:</legend>
          <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"} />
        </fieldset>
        {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
        {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}

        <button onClick={() => handleSubmit(commandString)}>Submit</button>
      </div>
    );
  }