import React from 'react'
import clipb from './clipb.png'
// import { StyleSheet, css } from 'aphrodite'

// const styles = StyleSheet.create({
// })

class Room extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <PlayArea />
        <CreateNewRoomArea />
        <ChatBox />
        <Footer />
      </div>

    )
  }
}

const PlayerTimer = () => {
  return (
    <div>
      <h1>00:00:00</h1>
    </div>
  )
}

const TimerContainer = () => {
  return (
    <div>
      <PlayerTimer />
    </div>
  )
}

const PlayerLabel = () => {
  return (
    <div>
      <h1>Player Name</h1>
    </div>
  )
}

const TimerArea = () => {
  return (
    <div>
      <PlayerLabel />
      <TimerContainer />
    </div>
  )
}

const PlayerTimerArea = () => {
  return (
    <div>
      <TimerArea />
      <TimerArea />
    </div>
  )
}

const ReadyButton = () => {
  return (
    <div>
      <button type='button'>I'm Ready!</button>
    </div>
  )
}

const SwitchYieldButton = () => {
  return (
    <div>
      <button type='button'>Switch/Yield (press spacebar)</button>
    </div>
  )
}

const PlayArea = () => {
  return (
    <div>
      <PlayerTimerArea />
      <SwitchYieldButton />
      <ReadyButton />
    </div>
  )
}

const CreateRoomButton = () => {
  return (
    <div>
      <button type='button'>Create New Room</button>
    </div>
  )
}

const NewRoomLink = () => {
  return (
    <div>
      <h1>http://chessclock.app/room/490290jdskl</h1>
      <ClipbImage />
    </div>
  )
}

const ClipbImage = () => {
  return (
    <img src={clipb} alt='Copy to clipboard' />
  )
}

const CreateNewRoomArea = () => {
  return (
    <div>
      <CreateRoomButton />
      <NewRoomLink />
    </div>

  )
}

const SendButton = () => {
  return (
    <div>
      <button type='button'>Send</button>
    </div>
  )
}

const ChatSendField = () => {
  return (
    <div>
      <h1>Type here for chattings</h1>
      <SendButton />
    </div>
  )
}

const ChatHeader = () => {
  return (
    <div />
  )
}

const ChatBox = () => {
  return (
    <div>
      <ChatHeader />
      <h1>Chat Box</h1>
      <ChatSendField />
    </div>
  )
}

const Header = () => {
  return (
    <div>
      <h1>Ultimate Chess Clock</h1>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      <h1>Ultimate Chess Clock Footer</h1>
    </div>
  )
}

export default Room
