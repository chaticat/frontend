import { RxStompService } from './rx-stomp.service';
import { myRxStompConfig } from '../config/my-rx-stomp.config';

export function rxStompServiceFactory() {
  const rxStomp = new RxStompService();
  rxStomp.configure(myRxStompConfig);
  rxStomp.activate();
  return rxStomp;
}
