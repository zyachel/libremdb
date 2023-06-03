import { AppError as AppErrorClass } from 'src/utils/helpers';

export type AppError = Omit<InstanceType<typeof AppErrorClass>, 'name'>;
