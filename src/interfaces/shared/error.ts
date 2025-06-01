import { AppError as AppErrorClass } from 'src/utils/helpers';

export type AppError = Pick<InstanceType<typeof AppErrorClass>, 'message' | 'statusCode' | 'stack'>;
