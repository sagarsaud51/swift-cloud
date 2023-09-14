import { ServerContext } from './context';

declare global {
    namespace Express {
        export interface Request {
            context: ServerContext;
        }
    }
}
