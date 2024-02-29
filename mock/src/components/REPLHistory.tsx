import '../styles/main.css';

interface REPLHistoryProps {
    history: string[];
    verbose: boolean
}
export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {props.history.map((command) => typeof command === "string" ?
                !props.verbose ?
                   /*brief*/ <p>{command}</p> :/*verbose */ <p>command: {command} output: </p>

                : !props.verbose ? // command is now a string[][]
                    /*brief*/ <p>{command}</p> :/*verbose */ <p>command: {command} output: </p>
            )}

        </div>
    );
}