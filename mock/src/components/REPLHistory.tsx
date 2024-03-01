import '../styles/main.css';
/**
 * interface that holds the repl history informstion and whether the output mode is verbose
 */
interface REPLHistoryProps {
    history: any[];
    verbose: boolean
}
/** Makes an HTML table out of data given as an any[][] 
 * 
 * @param object a [][] that represnts csv data
 * @returns an html table containing the data of object
 */
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
/** creates abd returns a scrollable block of repl cimmand and result history
 * 
 * @param props contains fields history, which is an any[] and verbose, a boolean
 * @returns a scrollable box of repl command and result history
 */
export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {props.history.map((object) =>
                !props.verbose ? //is it brief?
                    typeof (object[1]) == "string" ? // is the result a string?
                        //if brief and string result:
                        <p> {object[1]}</p> :
                        //if brief and not string result:
                        <p>{makeHTMLTable(object[1])} </p> :
                    /*verbose */
                    typeof (object[1]) == "string" ? // is the result a string?
                        //if verbose and string result:
                        <p> <div className="outputCommand"><strong>command:
                        </strong> </div>{object[0]} <div className="outputCommand">
                                <strong>output: </strong> </div>{object[1]} </p >

                        :   //if verbose and not string result:
                    /*verbose */ <p > <div className="outputCommand"><strong>command:
                        </strong> </div>{object[0]} <div className="outputCommand">
                                <strong>output: </strong> </div> {makeHTMLTable(object[1])} </p>
            )}

        </div >
    );
}