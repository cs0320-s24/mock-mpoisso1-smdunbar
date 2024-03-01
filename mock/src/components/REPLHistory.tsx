import '../styles/main.css';

interface REPLHistoryProps {
    history: any[];
    verbose: boolean
}
function makeHTMLTable(object: any[][]) {
    return (
        <table className="html-table" aria-label="html-table">
            {object.map((command, index) => (
                <tr key={index}>
                    {command.map((command2, index2) => (
                        <td key={index2}>{command2}</td>
                    ))}
                </tr>
            ))}
        </table>
    );
}
export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {props.history.map((object) =>
                !props.verbose ?
                    typeof (object[1]) == "string" ?
                        /*brief*/
                        <p> {object[1]}</p> : <p>{makeHTMLTable(object[1])} </p> :
                   /*verbose */ typeof (object[1]) == "string" ?
                        <p> <div className="outputCommand"><strong>command: </strong> </div>{object[0]} <div className="outputCommand"><strong>output: </strong> </div>{object[1]} </p >

                        : // command is now a string[][]
                    /*verbose */ <p > <div className="outputCommand"><strong>command: </strong> </div>{object[0]} <div className="outputCommand"><strong>output: </strong> </div> {makeHTMLTable(object[1])} </p>
            )}

        </div >
    );
}