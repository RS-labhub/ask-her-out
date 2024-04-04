import AsyncStorage from "./async-storage";
import {IFlagsmith} from "./types";
import core from './flagsmith-core'

// @ts-ignore
globalThis.FlagsmithEventSource = typeof EventSource !== 'undefined' ? EventSource : null;
import eventSource from 'reconnecting-eventsource'


const flagsmith: IFlagsmith = core({
    AsyncStorage,
    eventSource: typeof window !=='undefined'?eventSource : null
});

if (typeof window !== "undefined") {
    // @ts-ignore
    window.flagsmith = flagsmith;
}
export default flagsmith;

export const createFlagsmithInstance = (): IFlagsmith => {
    return core({
        AsyncStorage,
        eventSource: typeof window !=='undefined'?eventSource : null
    })
}
