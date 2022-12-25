import { BaseState } from '../base.state';

export interface GatewaysState extends BaseState {
  data?: {
    id: string;
    name: string;
    baseUrl: string;
    group: string;
  };
}
