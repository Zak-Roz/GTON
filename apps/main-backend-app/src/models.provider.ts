import { User } from './model/user.entity';

export const modelProviders = [
  {
    provide: 'USER_MODEL',
    useValue: User,
  },
];
