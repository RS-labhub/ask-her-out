import { IFlagsmith } from './types';
import core from './flagsmith-core'
const flagsmith = core({});
export default flagsmith;
export const createFlagsmithInstance = ():IFlagsmith=>{
    return core({})
}
