import { useState } from 'react';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';

/** controls the main history and input components of the webpage
 * 
 * @returns the repl blocks on the webpage
 */
export default function REPL() {
  const [history, setHistory] = useState<any[]>([]);
  const [verbose, setVerbose] = useState<boolean>(false);
  return (
    <div className="repl">
      <REPLHistory history={history} verbose={verbose} />
      <hr></hr>
      <REPLInput history={history} setHistory={setHistory} verbose={verbose} setVerbose={setVerbose} />
    </div>
  );
}
