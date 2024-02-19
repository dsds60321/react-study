import Player from './components/Player.jsx';
import TimerChallenger from "./components/TimerChallenger.jsx";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenger title="Easy" targetTime={1}/>
        <TimerChallenger title="Not easy" targetTime={5}/>
        <TimerChallenger title="Getting tough" targetTime={10}/>
        <TimerChallenger title="Pros only" targetTime={15}/>
      </div>
    </>
  );
}

export default App;
