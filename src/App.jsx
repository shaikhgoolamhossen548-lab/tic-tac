import {useCallback, useEffect, useState} from 'react';
import{ User, Bot , Volume2, VolumeX, RotateCcw, X as XIcon , Circle} from 'lucide-react';
import {getWinner, getAiMove} from './game/ai';
import {playSound} from './game/sound';

const EMPTY = Array(9).fill(null);

export default function App(){
  const [board, setBoard] = useState(EMPTY);
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('ai');// 'pvp' | 'ai'
  const [level, setLevel] = useState('invincible');// 'easy' | 'medium' | 'hard' | 'invincible'
  const [scores, setScores] = useState({x: 0, o: 0, draws: 0});
  const[soundOn, setSoundOn] = useState(true);

  // ---- derived values ----
  const result = getWinner(board);
  const isDraw = !result && board.every(Boolean);
  const gameOver = Boolean(result) || isDraw;
  const current = xIsNext ? 'X' : 'O';
  const aiThinking = mode === 'ai' && current ==='O' && !gameOver;
  const winLine = result ? result.line :[];
  const oName = mode === 'ai' ? 'AI Bot' : 'Player O ';

  const sfx = useCallback((type) => soundOn && playSound(type), [soundOn]);

  //----core move function (used by human and AI)---
  const makeMove = useCallback((i) => {
    if(board[i] || gameOver ) return;

    const next = [...board];
    next[i] = current;
    setBoard(next);

    const res = getWinner(next);
    if (res) {
      const winner = res.winner.toLowerCase();
      setScores((s) => ({...s, [winner]: s[winner] + 1 }));
      sfx('win');
    }else if (next.every(Boolean)){
      setScores((s) => ({...s, draws: s.draws + 1 }));
      sfx('draw');
    }else{
      sfx(current === 'X' ? 'x' : 'o');
      setXIsNext(!xIsNext);
    }
  }, [board, current, gameOver, sfx, xIsNext]);

  function handleCellClick(i){
    if (aiThinking) return; //ignore the clicks while the bot "thinks"
    makeMove(i);
  }

  //----AI plays automatically when it's O's turn----
  useEffect(() =>{
    if (!aiThinking) return;
    const timer = setTime
    out(() => makeMove(getAiMove(board, level)), 0);
    return () => clearTimeout(timer);
  }, 
  [aiThinking, board, level, makeMove]
);

function playAgain(){
  setBoard(EMPTY);
  setXIsNext(true);
}

function resetScores(){
  setScores({x: 0, o: 0, draws: 0});
  playAgain();
}

function changeMode(m){
  setMode(m);
  resetScores();
}

// ---- status text----

let status;
if (result){
  const name = result.winner === 'X' ? 'Player X' : oName;
  status = <><span className={result.winner === 'X' ? 'cx' : 'co'}>{name}</span>Wins!</>;
}else if (isDraw){
  status="It is a Draw!";
}else if (aiThinking){
  status = 'AI is thinking...';
}else{
  status =<>Player <b className={current === 'X' ? 'cx' : 'co'}>{current}</b>'s Turn </>;
}

return(
  <main className="card">
    {/*header*/}
    <header>
    <h1>
      <span className="cx">TIC</span>
      <i>.</i>
      <span className="co"> TAC</span>
      <i>.</i>
      TOE
     </h1>
     <p className="subtitle"> CYBER NEON ARENA</p>
    </header>

    {/* mode bar  */}
    <div className="modeabar">
      <button className={`mode ${mode === 'pvp' ? 'active' : ''}`} onClick={()=> changeMode('pvp')}>
        <User size={16} /> 2 Player
      </button>
     <button className={`mode ${mode === 'ai' ? 'active' : ''}`} onClick={() => changeMode('ai')}>
          <Bot size={16} /> Vs AI Bot
        </button>

        {mode === 'ai' && (
          <label className="level">
            AI Level:
            <select value={level} onChange={(e)=> {setLevel(e.target.value); playAgain();

            }}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="invincible">Invincible</option>
              
            </select>
          </label>
        )}

        <button className="icon-btn" onClick={()=> setSoundOn(!soundOn)} aria-label="Toggle sound">
          {soundOn ? <Volume2 size={18}/> : <VolumeX size={18}/>}
        </button>
    </div>

    {/*----scoreBoard----- */}
    <section className="scoreboard">
      <div className={`score player-x ${current === 'X' && !gameOver ? 'active' : ''}`}>
        <span className="badge x"><XIcon size={20}/>
        </span>
        <div>
          <small>PLAYER X</small>
          <strong>{scores.x}</strong>
        </div>
        {current === 'X' && !gameOver && <span className="turn">TURN</span>}
      </div>

      <div className="score draws">
        <div>
          <small>DRAWS</small>
          <strong>{scores.draws}</strong>
        </div>
      </div>

       <div className={`score player-o ${current === 'O' && !gameOver ? 'active' : ''}`}>
          <div>
            <small>{oName.toUpperCase()}</small>
            <strong>{scores.o}</strong>
          </div>
          <span className="badge o"><Circle size={18} /></span>
        </div>
    </section>
    <p className="status">{status}</p>

    {/*--- board--- */}
    <section className="board">
      {board.map((value, i)=>(
        <button key={i}
        className={`cell ${value ? 'filled' : ''} ${winLine.includes(i) ? 'win' : ''}`  }
        onClick={()=> handleCellClick(i)}
        aria-label={`Cell ${i+1}`}>
          {value ==='X' && <XIcon className="mark mx" strokeWidth={3}/>}
           {value ==='O' && <Circle className="mark mo" strokeWidth={3}/>}
          
        </button>
        
      ))}

    </section>

    {/*----footer---- */}
    <footer>
      <button className="again" onClick={playAgain}>
        <RotateCcw size={16}/> Play Again
      </button>
      <button className="reset" onClick={resetScores}>Reset Scores</button>
    </footer>




  </main>
);
}