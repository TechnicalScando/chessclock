import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import clipb from './clipb.png';



class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <PlayArea />
        <CreateNewRoomArea />
        <ChatBox />
        <Footer />
      </div>
      
    );
  }
}

class PlayerTimer extends React.Component {
  render() {
    return (
      <div>
        <h1>00:00:00</h1>
      </div>
    );
  }
}

class TimerContainer extends React.Component {
  render() {
    return (
      <div>
        <PlayerTimer />
      </div>
    );
  }
}

class PlayerLabel extends React.Component {
  render(){
    return (
      <div>
        <h1>Player Name</h1>
      </div>
    );
  }
}

class TimerArea extends React.Component {
  render() {
    return (
      <div>
        <PlayerLabel />
        <TimerContainer />
      </div>
    );
  }
}

class PlayerTimerArea extends React.Component {
  render() {
    return (
      <div>
        <TimerArea />
        <TimerArea />
      </div>
    );
  }
}

class ReadyButton extends React.Component {
  render() {
    return (
      <div>
       <button type="button">I'm Ready!</button> 
      </div>
    );
  }
}

class SwitchYieldButton extends React.Component {
  render() {
    return (
      <div>
       <button type="button">Switch/Yield (press spacebar)</button> 
      </div>
    );
  }
}

class PlayArea extends React.Component {
  render() {
    return (
      <div>
        <PlayerTimerArea />
        <SwitchYieldButton />
        <ReadyButton />
      </div>
    )
  }
}

class CreateRoomButton extends React.Component {
  render() {
    return (
      <div>
        <button type="button">Create New Room</button> 
      </div>
    )
  }
}

class NewRoomLink extends React.Component {
  render() {
    return (
      <div>
        <h1>http://chessclock.app/room/490290jdskl</h1> 
        <ClipbImage />
      </div>
    )
  }
}

class ClipbImage extends React.Component {
  render() {
    return (
      <img src={clipb} alt="Copy to clipboard" />
    );
  }
}

class CreateNewRoomArea extends React.Component {
  render() {
    return (
      <div>
        <CreateRoomButton />
        <NewRoomLink />
      </div>
      
    );
  }
}

class SendButton extends React.Component {
  render() {
    return (
      <div>
        <button type="button">Send</button> 
      </div>
    );
  }
}


class ChatSendField extends React.Component {
  render() {
    return (
      <div>
        <h1>Type here for chattings</h1>
        <SendButton />
      </div>
    )
  }
}

class ChatHeader extends React.Component {
  render() {
    return (
      <div></div>
    );
  }
}

class ChatBox extends React.Component {
  render() {
    return (
      <div>
         <ChatHeader />
         <h1>Chat Box</h1>
         <ChatSendField />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div >
         <h1>Ultimate Chess Clock</h1>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div>
         <h1>Ultimate Chess Clock Footer</h1>
      </div>
    );
  }
}













export default App;
