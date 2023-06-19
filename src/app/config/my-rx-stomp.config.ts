import { RxStompConfig } from '@stomp/rx-stomp';

export const myRxStompConfig: RxStompConfig = {

  brokerURL: 'ws://localhost/ws',

  connectHeaders: {
    Authorization: localStorage.getItem(`accessToken`),
    RefreshToken: localStorage.getItem(`refreshToken`)
  },

  heartbeatIncoming: 0,
  heartbeatOutgoing: 200000,
  reconnectDelay: 50000000,

  debug: (msg: string): void => {
  //console.log(new Date(), msg);
  },
};
