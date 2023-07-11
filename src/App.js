
import { useEffect, useMemo, useState } from 'react';
import Confetti from 'react-confetti'

import './App.css';
const gameIcone = ["😂", "❤", "👀", "🎂", "🎁", "🎶"]

function App() {
  const [icon, setIcon] = useState([])
  const GameFinshd=useMemo(()=>{
  if(icon.length > 0 && icon.every((piece)=> piece.solved)){
    return true;
  }
  return false;
  },
  [icon]);

     
    
  
  const strtGame = () => {
    const duplicateItem = [...gameIcone, ...gameIcone]
    const newgameicons = []
    while (newgameicons.length < gameIcone.length * 2) {
      const randomno = Math.floor(Math.random() * duplicateItem.length);

   
      newgameicons.push({
        emaji: duplicateItem[randomno],
        flippd: false,
        solved: false,
        positon: newgameicons.length
      });
      duplicateItem.splice(randomno, 1);
    }
    setIcon(newgameicons)

  };
  useEffect(() => {
    strtGame()
  }, [])
  const handilActive = (data) => {
    const filterdata=icon.filter(data=>data.flippd && !data.solved)
    if(filterdata.length === 2)return;
    const newpesses = icon.map(piece => {
      if (piece.positon === data.positon) {
        piece.flippd = !piece.flippd;
      }
      return piece;
    })
    setIcon(newpesses)

  };
  const FlipedTruOrFalse = () => {
    const flippedData = icon.filter((data) => data.flippd && !data.solved);
    if (flippedData.length === 2) {
      setTimeout(() => {
        if (flippedData[0].emaji === flippedData[1].emaji) {
          setIcon(icon.map((data) => {
            if (
              data.positon === flippedData[0].positon || data.positon === flippedData[1].positon
            ) {
              data.solved= true
            }
            return data
          })
          
          )

      } else {
        setIcon(icon.map((data) => {
          if (
            data.positon === flippedData[0].positon || data.positon === flippedData[1].positon
          ) {
            data.flippd = false
          }
          return data
        })
    )
    }
  }, 800)
}

  };
  
useEffect(() => {
  FlipedTruOrFalse();
  
}, [icon]);
console.log(GameFinshd)

return (
  <main>
    <h1>memory game in react</h1>
    <div className='condainer'>
      {icon.map((data, index) => (


        <div className={`flip-card ${data.flippd ? "active" : ""}`}
          key={index} onClick={() => handilActive(data)}>
          <div className="flip-card-inner">
            <div className="flip-card-front"> </div>
            <div className="flip-card-back">{data.emaji}</div>




          </div>
        </div>
      ))} 
      </div>
      {GameFinshd && (
      <div className='game-combleted'>
        <h1>YOU WINN!!!</h1>
           <Confetti
      width={window.innerWidth}
      height={window.innerWidth}
    />
        </div>
        )}
     
    
   
    
  </main>
);
}


export default App;
