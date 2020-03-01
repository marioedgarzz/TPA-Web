import { Users } from './types';
import { TrainSchedule } from './train';

export class TrainTransactions {
    TrainTransactionId : number;
    User : Users;
    TrainSchedule : TrainSchedule;
    TrainTransactionDate : string;
}