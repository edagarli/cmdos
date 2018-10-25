import React from 'react';
import { say } from 'cowsay-browser';
import Iframe from 'react-iframe';

export const Mode = {
  default: 0,
  mail: 1
}

const text = [
  'Put that cookie down!',
  'What’s kickin’, little chicken?',
  'When nothing is going right, go left.',
  'Knock knock, cheese cake factory here.',
  'A day without sunshine is like, you know, night.',
  'If I’m driving you crazy, just remember to put on your seat belt.',
  'Mathematics is the language in which God has written the universe.',
  'It may look like I’m doing nothing, but in my head, I’m quite busy.',
  'The fool doth think he is wise, but the wise man knows himself to be a fool.',
  'Once you can accept the universe as\nmatter expanding into nothing that is\nsomething, wearing stripes with plaid\ncomes easy.',
];

export const CowsayConfig = {
  text: text,
  cow: ["bong", "moose", "small", "goat", "vader", "moofasa", "cower", "www", "default"],
  eyes: ['oo', 'oO', 'Oo', '><'],
  wrap: false,
  wrapLength: 40,
  mode: ['b', 'd', 'g', 'p', 's', 't', 'w', 'y']
};

export const cons = "";

export const CMD = {
  HELP: 'help',
  WHOAMI: 'whoami',
  GAMES: 'games',
  Video: 'goide',
  WECHAT: 'wechat',
  DIDI: 'didi',
  ZHIHU: 'zhihurb',
  SEGMENT: 'sf',
  NATIVE: 'native',
  MAIL: 'mail',
  CLEAR: 'clear',
  NULL: ''
};

const Cowsay = say({
  text: CowsayConfig.text[Math.floor(Math.random()*CowsayConfig.text.length)],
  f: CowsayConfig.cow[Math.floor(Math.random()*CowsayConfig.cow.length)],
  e: CowsayConfig.eyes[Math.floor(Math.random()*CowsayConfig.eyes.length)],
  n: CowsayConfig.wrap,
  W: CowsayConfig.wrapLength,
  mode: CowsayConfig.mode[Math.floor(Math.random()*CowsayConfig.mode.length)],
})

export const CMD_INFO = {
  LIST: '--list',
  FlappyBird: 'flappybird',
  Ttfe: '2048',
  tetris: 'tetris',
  wechat: '二维码登录',
  send: 'send    发送消息 (@username message)',
  message: 'msg     新消息 (new msg list)',
  reply: 'reply   自动回复 (content)',
  style: 'web     风格(默认原生native风格, web指令)',
  native: 'native',
  web: 'web'
};

export const CMD_NOTFOUND = 'Command not found: ';
export const CMD_PREFIX = 'INPUT-CMD ';

export const Greeding = [
  'cmd os是一个跨平台的命令行界面操作系统',
  '如果你对cmd os感兴趣,你可以在社区参与讨论,把你的想法分享出来',
  [<a href="https://segmentfault.com/g/cmdos" target="_blank">https://segmentfault.com/g/cmdos</a>],
  'Type \'help\' command to show command list.',
  Cowsay
];

export const Help = [
    `Commond Options:`,
    `  ${CMD.HELP}          Show command list.`,
    `  ${CMD.WHOAMI}        关于我.`,
    `  ${CMD.GAMES}         小游戏. --list Show command`,
    `  ${CMD.Video}         Go IDE`,
    `  ${CMD.WECHAT}        微信(默认原生风格) --list Show command`,
    `  ${CMD.DIDI}          滴滴打车`,
    `  ${CMD.ZHIHU}       知乎日报`,
    `  ${CMD.SEGMENT}            segmentfault`,
    `  ${CMD.NATIVE}        原生模式`,
    `  ${CMD.MAIL}          产品反馈.`,
    `  ${CMD.CLEAR}         Clear the display.`,
];

export const Whoami = [
  say({f: "", text: "Hello, 感谢关注cmd os!"}),
  'cmd os 是一个跨平台的命令行界面操作系统, 你可以打造属于你自己极客&黑客风格的系统',
  '你能在上面玩游戏,听歌,看视频,通讯聊天, 看新闻等等',
  'Type \'mail\' command to send me a request.'
];

export const GAMES = {
  default: ['Type \'games --list\' to get avialable list.'],
  list: [
    'Type \'games <OPTION>\' with the following OPTION:',
    CMD_INFO.FlappyBird + '   ' + CMD_INFO.Ttfe + '   ' + CMD_INFO.tetris
  ],
  me: [
    say({f: "", text: "Hello, I'm lurou."})
  ]
};

export const WECHATS = {
  default: ['Type \'wechat --list\' to get avialable list.'],
  list: [
    'Type \'wechat <OPTION>\' with the following OPTION:',
    CMD_INFO.send + '\n' + CMD_INFO.message + '\n' + CMD_INFO.reply + '\n' + CMD_INFO.style
  ],
  ok: ['okay']
};

export const NATIVES = {
  default: ['Type \'native --command\' to get result'],
};

export const GithubAddress = ["http://localhost:63342/cmdfrontend/"];

export const WECHAT = [<iframe position="absolute" width="410%" height="700" src="https://wx.qq.com/" frameBorder="0"></iframe>];

export const tetris = [<iframe title="tetris" src="https://chvin.github.io/react-tetris/" width="400" height="600" scrolling="no" frameBorder="0"></iframe>];

export const SEGMENT = [<iframe  title="segmentfault" src="https://segmentfault.com"  width="450" height="700" frameBorder="0"></iframe>]

export const ZHIHU = [<iframe  title="知乎" src="https://hello-tan.github.io/zhihu-daily/"  width="450" height="550" frameBorder="0"></iframe>];

export const FlappyBird = [<iframe  title="flappybird" src="https://cmd.to/cmd_files/games/flappybird/index.html" width="450" height="400" scrolling="no" frameBorder="0"></iframe>];

export const Ttfe = [<iframe title="2048" src="https://gabrielecirulli.github.io/2048/" width="450" height="450" scrolling="no" frameBorder="0"></iframe>];

export const Video = [<iframe position="absolute" width="410%" height="700" src="https://wide.b3log.org/" frameBorder="0" allowFullScreen></iframe>];

export const DIDI = [<iframe position="absolute" width="360" height="640" src="https://common.diditaxi.com.cn/general/webEntry?wx=true&bizid=257&channel=70365#/" frameBorder="0"></iframe>];

//export const Video = [<Iframe url="https://wide.b3log.org/" width="400" height="600" position="absolute"/>];

export const Mail = {
  stage: ['Enter your name: ','Enter your email: ', 'Enter your request: '],
  invalidMail: 'Invalid email address, please retry...',
  success: 'Finished...',
  fail: 'Error happened, fail to send email...',
  to: 'hangzhoulizhi@foxmail.com',
}
