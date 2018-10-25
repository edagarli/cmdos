import React, { Component } from 'react';
import styled from 'styled-components';
import recognizeSpeech from 'recognize-speech'
import emitter from "./ev"

import {
  Container,
} from '../assets/style/ComponentStyle';

import {
  PrimaryColor,
  SecondaryColor,
  GrayColor,
  WhiteColor,
  PinkColor,
} from '../assets/style/Color';

import {
  Medium
} from '../assets/style/Dimension';

import {
  GithubAddress,
} from '../assets/static/TerminalConfig';

const HeadContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${GrayColor};
`;

const Title = styled.div`
  padding-top: 0.8vh;
  font-size: 4rem;
  @media (max-width: ${Medium}) {
    padding-top: 0.5vh;
    font-size: 3.5rem;
  }
`;

const DrawerButtonContainer = styled.div`
  display: none;
  @media (max-width: ${Medium}) {
    display: inline-block;
  }
`;

const DrawerButton = styled.button`
  height: 100%;
  padding: 0 1rem;
  border: none;
  color: ${WhiteColor};
  font-size: 2.3rem;
  cursor: pointer;
  background-color: ${SecondaryColor};

  &:focus, &:hover {
    outline: none;
    color: ${PinkColor};
  }
`;

const Menu = styled.div`
  display: flex;
  width: 50%;
  background-color: ${PrimaryColor};
  @media (max-width: ${Medium}) {
    display: none;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const Tabs = styled.ul`
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0 4%;
  align-items: center;
`;

const Tab = styled.li`
  display: inline-block;
  padding: 0 1vw;
`;

const TabLink = styled.a`
  text-decoration: none;
  color: ${WhiteColor};
  font-size: 2.5rem;
  outline: none;

  &:focus, &:hover {
    color: ${PinkColor};
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    recognizeSpeech({ lang: 'en-US' , interimResults: true,  maxAlternatives: 1})
      .then(res => {
        console.log("语音输入")
        console.log(res.transcript)
        this.setState(state => ({
          text: res.transcript
        }));
        // 触发自定义事件
        emitter.emit("callMe", this.state.text)
      });
  }

  //tick = () => {
  //  if(this.state.text.length === 0) {
  //    recognizeSpeech({ lang: 'en-US' , interimResults: true,  maxAlternatives: 1})
  //      .then(res => {
  //        console.log(res.transcript)
  //        this.setState(state => ({
  //          text: res.transcript
  //        }));
  //        // 触发自定义事件
  //        emitter.emit("callMe", this.state.text)
  //      });
  //  }
  //}

  componentWillUnmount() {
    //clearInterval(this.interval);
  }

  componentDidMount() {
    //this.interval = setInterval(() => this.tick(), 10000);
  }

  render() {
    return (
      <HeadContainer>
        <Title>CMD-OS</Title>
        <DrawerButtonContainer>
          <DrawerButton>
            <i className="fas fa-bars"></i>
          </DrawerButton>
        </DrawerButtonContainer>
        <Menu>
          <Spacer />
          <Tabs>
            <Tab>
              <TabLink>
                <i>你的语音指令:{this.state.text}</i>
              </TabLink>
              &nbsp;
              <TabLink onClick={this.handleClick}>
                <i class="fas fa-microphone-alt"></i>
              </TabLink>
            </Tab>
            <Tab>
              <TabLink href={GithubAddress} target="_blank">
                <i class="fab fa-connectdevelop"></i>
              </TabLink>
            </Tab>
          </Tabs>
        </Menu>
      </HeadContainer>
    );
  }
};

export default Header;

