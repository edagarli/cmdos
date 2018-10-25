import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import emitter from "./ev"

import {
  Medium
} from '../assets/style/Dimension';

import {
  SecondaryColor,
  GrayColor
} from '../assets/style/Color';

import {
  Mode,
  CMD,
  CMD_INFO,
  CMD_NOTFOUND,
  CMD_PREFIX,
  Greeding,
  Help,
  Whoami,
  GAMES,
  WECHAT,
  Mail,
  FlappyBird,
  Ttfe,
  ZHIHU,
  Video,
  SEGMENT,
  tetris,
  DIDI,
  cons,
  NATIVES,
  WECHATS
} from '../assets/static/TerminalConfig';

const TerminalContainer = styled.div`
  width: 100%;
  padding: 1.5% 0;
  overflow: hidden;
  @media (max-width: ${Medium}) {
    width: 100%;
  }
`;

const Lines = styled.ul`
  margin: 0;
  padding: 0;
  padding-right: 2.5%;
  height: 100%;
  width: 97.5%;
  list-style: none;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  color: ${GrayColor};
  font-size: 1.8rem;
  line-height: 2rem;
  overflow-y: scroll;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar { display: none; }
  @media (max-width: ${Medium}) {
    padding-right: 0%;
    width: 100%;
  }
`;

const LineContainer = styled.li`
  padding-bottom: 0.5rem;
  display: flex;
`;

const Line = styled.div`
  display: inline-block;
`;

const InputContainer = styled.form`
  display: inline-block;
  flex: 1;
`;

const InputLabel = styled.span`
  display: inline-block;
  line-height: 2rem;
`

const InputDefaultLabel = styled(InputLabel)`
  padding-right: 1rem;
  font-size: 1.3rem;
  color: ${SecondaryColor};
`;

const InputTextLabel = styled(InputLabel)`
  font-size: 1.8rem;
  color: ${GrayColor};
`;

const Input = styled.input`
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  font-family: Lekton, sans-serif;
  font-size: 1.8rem;
  line-height: 2rem;
  color: ${GrayColor};
  background-color: transparent;
`;

const endLine = {
  float: "left",
  clear: "both"
};

class Terminal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      lines: Greeding,
      mode: Mode.default,
      cons: '',
      flag: 0,
      wefo: ''
    };

    this.mail = [];
    this.mailState = 0;
    this.mailSenderName = React.createRef();
    this.mailSenderEmail = React.createRef();
    this.mailSenderMessage = React.createRef();
    this.mailSenderSend = React.createRef();

    this.log = [];
    this.logIndex = -1;

    this.endLine = null;
  }

  generateOutput(buffer, input, history, output) {
    const arg = buffer.split(' ').filter(i => i !== '');
    console.log('lurou-'+arg)
    const cmd = arg.length === 0 ? CMD.NULL : arg.shift().toLowerCase();
    console.log('lurou-'+cmd)

    switch(cmd) {
      case CMD.HELP: return Help;
      case CMD.WHOAMI: return Whoami;
      case CMD.GAMES: return this.generateInfo(arg);
      case CMD.Video: return Video;
      case CMD.WECHAT: {
        return this.generateWechatInfo(arg);
      }
      case CMD.DIDI: return DIDI;
      case CMD.ZHIHU: return ZHIHU;
      case CMD.MAIL: return this.generateMail();
      case CMD.SEGMENT: {
        //return this.generateSf(arg, input, history, output);
        return SEGMENT;
      }
      case CMD.NATIVE: {
        return this.generateNative(arg, input, history, output);
      }
      case CMD.CLEAR: return [];
      case CMD.NULL: return [];
      default: return [CMD_NOTFOUND + cmd];
    }
  }

  generateWechat(arg, input) {
    axios.get('http://api.l.whereask.com/wechat/qrcode', {
      withCredentials:true
    }).then(res => {
      //const base64 = btoa(
      //  new Uint8Array(res.data).reduce(
      //    (data, byte) => data + String.fromCharCode(byte),
      //    ''
      //  )
      //);
      console.log(res.data)
      //this.setState({ cons: "data:;base64," + base64 });
      //console.log(this.state.cons)
      const tep = [<img src={res.data}/>];
      this.setState({ flag : 1});
      this.setState({
        input: '',
        lines: [
          ...this.state.lines,
          ...input,
          ...tep
        ]
      });

      this.log = [...this.log, arg];
      this.logIndex = -2;
      return;
    });
  }


  generateNative(arg, input, history, output) {
    if (arg.length === 0) {
      console.log(1);
      this.setState({
        input: '',
        lines: [
          ...this.state.lines,
          ...input,
          [NATIVES.default]
        ]
      });
      this.log = [...this.log, arg];
      this.logIndex = -2;
      return;
    }

    //const arg1 = arg.shift().toLowerCase();
    var argArray = Array.prototype.slice.call(arg);
    var arg1 = '';
    argArray.map(function(arr){
      arg1 = arg1 + arr + ' ';
    })
    console.log("arg1=" + arg1)
    axios.get('http://api.l.whereask.com/cmd/exec/api/exe', {
        params: {
          p: arg1
        },
        withCredentials:true
      }).then(res => {
        console.log(2);
        console.log(res.data.msg);
        this.setState({
          input: '',
          lines: [
            ...this.state.lines,
            ...input,
            [res.data.msg]
          ]
        });

        this.log = [...this.log, arg];
        this.logIndex = -2;
        return;
      });
  }

  onKeyPressDefault() {
    const buffer = this.state.input.trim();
    const history = buffer === CMD.CLEAR ? [] : this.state.lines;
    const input = buffer === CMD.CLEAR ? [] : [CMD_PREFIX + buffer];
    const arg = buffer.split(' ').filter(i => i !== '');
    const cmd = arg.length === 0 ? CMD.NULL : arg.shift().toLowerCase();
    console.log(cmd)
    if(cmd == CMD.NATIVE) {
      console.log(3)
      this.generateOutput(buffer, input, history, '');
      return;
    } else if(cmd == CMD.WECHAT && buffer.length === 6) {
      this.generateWechat(buffer, input);
      return;
    } else {
      console.log(4)
      const output = this.generateOutput(buffer, input, history, output);
      console.log(this.state.lines);
      console.log(history);
      this.setState({
        input: '',
        lines: [
          ...history,
          ...input,
          ...output
        ]
      });

      console.log(this.state.lines);
      this.log = [...this.log, buffer];
      this.logIndex = -2;
    }
  }


  //generateIDEConf(arg) {
  //  const arg1 = arg.shift().toLowerCase();
  //  if (arg1 === CMD_INFO.LIST) {
  //    return GAMES.list;
  //  } else if (arg1 === CMD_INFO.FlappyBird) {
  //    return FlappyBird;
  //  } else {
  //    return [CMD_NOTFOUND + CMD.GAMES + arg]
  //  }
  //}


  generateInfo(arg) {
    if (arg.length === 0) { return GAMES.default; }

    const arg1 = arg.shift().toLowerCase();
    if (arg1 === CMD_INFO.LIST) {
      return GAMES.list;
    } else if (arg1 === CMD_INFO.FlappyBird) {
      return FlappyBird;
    } else if (arg1 === CMD_INFO.Ttfe) {
      return Ttfe;
    } else if (arg1 == CMD_INFO.tetris) {
      return tetris;
    } else {
      return [CMD_NOTFOUND + CMD.GAMES + arg]
    }
  }

  generateWechatInfo(arg) {
    console.log("wechatinfo:"+arg)
    const arg1 = arg.shift().toLowerCase();
    var argArray = Array.prototype.slice.call(arg);
    console.log("wechatinfo:"+argArray[0])
    if (arg1 === CMD_INFO.LIST) {
      return WECHATS.list;
    } else if (arg1 === 'send') {
      var sc = ''
      console.log(this.state.wefo)
      Object.entries(this.state.wefo).map(([make, type]) => {
        console.log(type.UserName)
        if( type.NickName === argArray[0]) {
          sc = type.UserName;
        }
      });
      console.log("sc=" + sc)
      axios.get('https://api.l.whereask.com/wechat/sendMessage', {
        params: {
          ToUserName: sc,
          Type:1,
          Content:argArray[1] + '\n-----来自cmd os系统发出'
        },
        withCredentials:true
      }).then(res => {
        console.log(res.data);
      });
      return WECHATS.ok;
    } else if (arg1 === CMD_INFO.web) {
      return WECHAT;
    } else {
      return [CMD_NOTFOUND + CMD.WECHAT + ' ' + arg]
    }
  }

  generateMail() {
    this.setState({ mode: Mode.mail })
    return [];
  }

  onInputSubmit(e) {
    e.preventDefault();
  }

  onInputChange(e) {
    this.setState({ input: e.target.value });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      switch(this.state.mode) {
        case Mode.default:
          this.onKeyPressDefault();
          break;
        case Mode.mail:
          this.onKeyPressMail(e);
          break;
        default:
          break;
      }
    }
    if (e.key === 'Esc') {
      console.log('sssss');
    }
  }

  onKeyPressMail(e) {
    const buffer = this.state.input.trim();
    const history = this.state.lines;
    var input = [Mail.stage[this.mailState] + buffer];
    var flag = false;

    if (this.mailState === 1 && !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(buffer)) {
      input = [...input, Mail.invalidMail];
      this.setState({ mode: Mode.default });
    } else {
      flag = true;
      this.mail.push(buffer);
    }

    if (this.mailState === Mail.stage.length-1) {

      if(this.mailSenderName && this.mailSenderEmail && this.mailSenderMessage && this.mailSenderSend) {
        this.mailSenderName.value = this.mail[0];
        this.mailSenderEmail.value = this.mail[1];
        this.mailSenderMessage.value = this.mail[2];
        this.mailSenderSend.click();
        input = [...input, Mail.success];
      }
      else {
        console.log(this.mailSenderName.current);
        console.log( this.mailSenderEmail.current);
        console.log(this.mailSenderMessage.current);
        console.log(this.mailSenderSend.current);
        input = [...input, Mail.fail];
      };

      this.mailState = 0;
      this.mail = [];
      this.setState({ mode: Mode.default });
    }
    else if(flag){
      this.mailState += 1;
    }

    this.setState({
      input: '',
      lines: [
        ...history,
        ...input
      ]
    })
  }

  onKeyDown(e) {
    var index;
    var buffer;

    if (e.ctrlKey && e.keyCode === 67) {
      this.setState({
        input: '',
        lines: [
          ...this.state.lines
        ]
      });
      this.logIndex = -1;
    }
    else if (e.keyCode === 38) {
      if (this.log.length === 0) { return; }

      index = this.logIndex;

      if (index === -2) { index = this.log.length - 1; }
      else if(index !== -1) { index = index - 1; }


      index === -1 ? buffer = '' : buffer = this.log[index];
      this.setState({ input: buffer });

      this.logIndex = index;
    }
    else if (e.keyCode === 40) {
      if (this.log.length === 0) { return; }

      index = this.logIndex;

      if (index === -2) { index = this.log.length; }
      else if(index !== this.log.length) { index = index + 1; }

      index === this.log.length ? buffer = '' : buffer = this.log[index];
      this.setState({ input: buffer });

      this.logIndex = index;
    }
  }

  tick = () => {
    const fla = this.state.flag;
    console.log("flag === " + this.state.flag);
    //const tll = '{"User":{"UserName":"@de254eeb85ba9e30e27e51b013269faee0c305b0f26d41dae7a5d350ee651b64","Uin":1802111012,"NickName":"李智edagarli","HeadImgUrl":"/cgi-bin/mmwebwx-bin/webwxgeticon?seq=1647696162\u0026username=@de254eeb85ba9e30e27e51b013269faee0c305b0f26d41dae7a5d350ee651b64\u0026skey=@crypt_7a726de4_bbd561ea709bd3c3faff2fb97bc6f338","RemarkName":"","PYInitial":"","PYQuanPin":"","RemarkPYInitial":"","RemarkPYQuanPin":"","HideInputBarFlag":0,"StarFriend":0,"Sex":1,"Signature":"停下来时时想想内心的那个一直奋斗的声音！","AppAccountFlag":0,"VerifyFlag":0,"ContactFlag":0,"WebWxPluginSwitch":1,"HeadImgFlag":1,"SnsFlag":17},"ContactList":[{"UserName":"@851946f796070d1bbda358b88f5f9ac5032d8b2b50d6d588b5adb3b082331122","NickName":"Jason"},{"UserName":"@3153767a803498978fb4d12df41c0a6638d5404e352dd0218ecd1fa3fe1645cb","NickName":"薰衣草"},{"UserName":"@b0989ed723c99782eb7ad2380a617c8958825c3a34ea6baaaa30fa72094d71ef","NickName":"轻应用@huosu.com"},{"UserName":"@2639d1c25aada099a48458b69b83359b609073be5bbdaeefd16c1b0eaa0cc364","NickName":"小艾"},{"UserName":"@a111cac8993332c5310146024b0d83eab39850e2a247a0ee23dc033f7e316952","NickName":"青林"},{"UserName":"@beed46d8f29f2fac43074dca71c2b17b9ccc40f9c57c27d777c0056a03c49174","NickName":"重剑"},{"UserName":"@742dab4c3f711338878bbc91a01c5a4681c3d118281694f5556458ecdc080f57","NickName":"祝景浩"},{"UserName":"@f45ec23791ad0299eb435e0095013032c8df3531630de35795612cfbcdc64479","NickName":"Monica·海盗密探"},{"UserName":"@4c9b0da9ac744cfd5a851764c2862b3830a5c5f41ca7eb7f0153fe1c6bdab6a9","NickName":"蓝色百褶裙"},{"UserName":"@2ab158d1f446a2c4a3b0f8803d5c18bcc1b7c6691cc35992039fd7f19105b27a","NickName":"雷慧敏"},{"UserName":"@1e216900c8e1e8df3f508b9aff615b227542d10e674c957a350214362378631e","NickName":"吴翠荷"},{"UserName":"@0ff191cfc7e916db8c9df6e3af8e574451740e5e9f7b051e7e88110c798f65ff","NickName":"李春璐"},{"UserName":"@f942790e012b5f00695629ac6f6d5f47e0a784da6dc924a8391537b9b187160c","NickName":"夏逢"},{"UserName":"@64a13c59e1e9e91d32335702776723dd9bcc176b9de9268910d4293f2ab12394","NickName":"张云"},{"UserName":"@c26bf9466c8219ce29177230db717740327c2f6905742b8facb5ca9e6739ab26","NickName":"若飞"},{"UserName":"@ca62111980b0acc23b9455733eff03f59f6262aaad77a9185eb34fdf32bdb0fd","NickName":"测试号"},{"UserName":"@79228123ba5d2e5fe9e5a0616b3f8805d9de11c59cf9cc8bdf20a40204ceb7d8","NickName":"Reiki"},{"UserName":"@c82ad83c21e37cee2da3bf84871038d0e9c7b635f6184baec103c6a3f7535b56","NickName":"俞尧"},{"UserName":"@16688f22a48e9533c55a685aaf13e501","NickName":"葛志刚"},{"UserName":"@b59de1b3fc323d4099d02f0d0cbf078bafad81ceb4ee591897935678f46db24e","NickName":"欣欣"}]}';
    //console.log(JSON.parse(tll))
    //Object.entries(JSON.parse(tll).ContactList).map(([make, type]) => {
      //console.log(make)
      //console.log(type)
      //console.log(type.UserName)
      //return ;
    //});
    if(fla === 1) {
      console.log('sss');
      axios.get('http://api.l.whereask.com/wechat/canLogin', {
        withCredentials:true
      }).then(res => {
        console.log("111----" + res.data)
        const ll = this.state.cons.length;
        console.log( this.state.cons)
        console.log( this.state.cons.length)
        console.log('222222');
        if(res.data === 1) {
          this.setState({
            flag : 0
          });
          axios.get('http://api.l.whereask.com/wechat/login', {
            withCredentials:true
          }, {timeout : 60000}).then(res => {
            console.log(res.data.ContactList)
            var nameList = '  '
            const ll = res.data.ContactList
            Object.entries(res.data.ContactList).map(([make, type]) => {
              console.log(type.NickName)
              nameList = nameList + '[' + make + ']' + type.NickName + '  ';
            });
            this.setState({
              cons: [
                ...this.state.cons,
                [nameList]
              ]
            });
            this.setState({
              wefo: [...ll],
            });

            this.setState({
              input: '',
              lines: [
                ...this.state.lines,
                ...this.state.cons
              ]
            });
            return;
          });
        }
      });
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    emitter.removeListener(this.eventEmitter);
  }

  componentDidMount() {
    if (this.endLine) { this.endLine.scrollIntoView({ behavior: "instant" }); }
    this.interval = setInterval(() => this.tick(), 5000);
    this.eventEmitter = emitter.addListener("callMe",(msg)=>{
      this.setState({ input : msg })
      this.onKeyPressDefault()
    });
  }

  componentDidUpdate() {
    if (this.endLine) { this.endLine.scrollIntoView({ behavior: "instant" }); }
  }

  render() {
    const { input, lines, mode, cons , flag, wefo } = this.state;

    return (
      <TerminalContainer>
        <Lines>
          {lines.map((line, index) =>
            <LineContainer key={index}>
              {(typeof line === 'string' &&
                line.substring(0, CMD_PREFIX.length) === CMD_PREFIX) ?
                <Line>
                  <InputDefaultLabel className="fas fa-chevron-right" />
                  {line.substring(CMD_PREFIX.length)}
                </Line> :
                <Line>
                  {line}
                </Line>}
          </LineContainer>)}

          <LineContainer>
            {mode === Mode.default ?
              <InputDefaultLabel className="fas fa-chevron-right" /> :
              <InputTextLabel>{Mail.stage[this.mailState]}</InputTextLabel>
            }
            <InputContainer onSubmit={this.onInputSubmit}>
              <Input
                autoFocus
                type="text"
                spellCheck="false"
                value={input}
                onChange={this.onInputChange.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}
                onKeyDown={this.onKeyDown.bind(this)}
              />

            </InputContainer>
          </LineContainer>
          <div style={endLine} ref={(el) => this.endLine = el}/>
        </Lines>
        <div hidden>
          <form action={"//formspree.io/"+Mail.to} method="POST">
            <input type="text" name="name" ref={(ref) => this.mailSenderName = ref} />
            <input type="text" name="email" ref={(ref) => this.mailSenderEmail = ref} />
            <input type="text" name="message" ref={(ref) => this.mailSenderMessage = ref} />
            <button type="submit" value="Send" ref={(ref) => this.mailSenderSend = ref } />
            <input type="hidden" name="_format" value="plain" />
            <input type="text" name="_gotcha" />
          </form>
        </div>
      </TerminalContainer>
    );
  }
};

export default Terminal;
