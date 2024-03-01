import '../styles/main.css';
import { returnObj } from "./REPLInput";

interface REPLHistoryProps {
    history: (returnObj)[];
    verbose: boolean
}
export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {props.history.map((object) => typeof object.result === "string" ?
                !props.verbose ?
                    /*brief*/
                    <p>{object.result}</p> :
                   /*verbose */ <p>command: {object.command} output: {object.result} </p>

                : !props.verbose ? // command is now a string[][]
                    /*brief*/ <p>{object.result}</p> :
                    /*verbose */ <p>command: {object.command} output: </p>
            )}

        </div>
    );
}