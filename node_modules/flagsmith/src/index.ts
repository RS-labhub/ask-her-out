import { IFlagsmith } from './types';

// @ts-ignore
globalThis.FlagsmithEventSource = typeof EventSource!== "undefined"? EventSource: null;

import fetch from "unfetch"
import AsyncStorage from "./async-storage";
import core, { LikeFetch } from './flagsmith-core';
import _EventSource from 'reconnecting-eventsource'
// @ts-expect-error
const _fetch = fetch as LikeFetch
const flagsmith = core({AsyncStorage, fetch:_fetch, eventSource:_EventSource});
if (typeof window !== "undefined") {
    // @ts-expect-error, some people wish to use flagsmith globally
    window.flagsmith = flagsmith;
}

export default flagsmith;
export const createFlagsmithInstance = ():IFlagsmith=>{
    return core({ AsyncStorage, fetch:_fetch, eventSource:_EventSource})
}
