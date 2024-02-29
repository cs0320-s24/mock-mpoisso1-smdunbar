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
            {props.history.map((command, index) => <p>{command}</p>)}

        </div>
    );
}