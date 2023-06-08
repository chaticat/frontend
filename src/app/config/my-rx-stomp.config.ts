import { RxStompConfig } from '@stomp/rx-stomp';

export const myRxStompConfig: RxStompConfig = {

  brokerURL: 'ws://localhost:8082/ws',

  connectHeaders: {
    Authorization: localStorage.getItem(`accessToken`),
    RefreshToken: localStorage.getItem(`refreshToken`)
  },

  heartbeatIncoming: 0,
  heartbeatOutgoing: 200000000,
  reconnectDelay: 50000000,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};
