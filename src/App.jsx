import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-geometry-component';
import 'babel-polyfill';
import { Event } from 'react-socket-io';

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Entity, Scene} from 'aframe-react';

@observer
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {color: 'red', cameraPosition: '0 0 3.8'};
    this.onMessage = this.onMessage.bind(this);
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  onMessage(message) {
    this.setState({cameraPosition: '0 10 3.8'});
    console.log(message);
  }

  render () {
    return (
      <Scene>
        <Event event='message' handler={this.onMessage} />
        <a-assets></a-assets>

        <Entity position={this.state.cameraPosition} camera="" look-controls="" >
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
          >
          </a-cursor>
        </Entity>

        <Entity
          geometry={{primitive: 'sphere', radius: 100}}
          material={{shader: 'flat', src: "url(https://rawgit.com/aframevr/assets/gh-pages/360-image-gallery-boilerplate/img/sechelt.jpg)"}}
          scale="1 1 -1"/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

        <Entity
          animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
          animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          geometry='primitive: box'
          material={{color: this.state.color, opacity: 0.6}}
          position='0 -0.5 -3'
          onClick={this.changeColor.bind(this)}>
          <Entity
            animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
            geometry='primitive: box; depth: 0.2; height: 0.2; width: 0.2'
            material={{color: '#24CAFF'}}/>
        </Entity>
      </Scene>
    );
  }
}

export default App;
