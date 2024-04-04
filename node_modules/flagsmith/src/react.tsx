import React, {
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import Emitter from './emitter';
const events = new Emitter();

import { IFlagsmith, IFlagsmithTrait, IFlagsmithFeature, IState } from './types'

export const FlagsmithContext = createContext<IFlagsmith<string,string> | null>(null)
export type FlagsmithContextType = {
    flagsmith: IFlagsmith // The flagsmith instance
    options?: Parameters<IFlagsmith['init']>[0] // Initialisation options, if you do not provide this you will have to call init manually
    serverState?: IState
    children: React.ReactElement[] | React.ReactElement;
}

export const FlagsmithProvider: FC<FlagsmithContextType> = ({
  flagsmith, options, serverState, children,
                                                            }) => {
    const firstRenderRef = useRef(true)
    if (flagsmith && !flagsmith?._trigger) {
        flagsmith._trigger = () => {
            flagsmith.log("React - trigger event received")
            events.emit('event');
        }
    }

    if (flagsmith && !flagsmith?._triggerLoadingState) {
        flagsmith._triggerLoadingState = () => {
            events.emit('loading_event');
        }
    }

    if (serverState && !flagsmith.initialised) {
        flagsmith.setState(serverState)
    }

    if (firstRenderRef.current) {
        firstRenderRef.current = false
        if (options) {
            flagsmith.init({
                ...options,
                state: options.state || serverState,
                onChange: (...args) => {
                    if (options.onChange) {
                        options.onChange(...args)
                    }
                },
            })
        }
    }
    return (
        <FlagsmithContext.Provider value={flagsmith}>
            {children}
        </FlagsmithContext.Provider>
    )
}

const useConstant = function <T>(value: T): T {
    const ref = useRef(value)
    if (!ref.current) {
        ref.current = value
    }
    return ref.current
}


const flagsAsArray = (_flags: any): string[] => {
    if (typeof _flags === 'string') {
        return [_flags]
    } else if (typeof _flags === 'object') {
        // eslint-disable-next-line no-prototype-builtins
        if (_flags.hasOwnProperty('length')) {
            return _flags
        }
    }
    throw new Error(
        'Flagsmith: please supply an array of strings or a single string of flag keys to useFlags',
    )
}

const getRenderKey = (flagsmith: IFlagsmith, flags: string[], traits: string[] = []) => {
    return flags
        .map((k) => {
            return `${flagsmith.getValue(k)}${flagsmith.hasFeature(k)}`
        }).concat(traits.map((t) => (
            `${flagsmith.getTrait(t)}`
        )))
        .join(',')
}

export function useFlagsmithLoading() {
    const flagsmith = useContext(FlagsmithContext);
    const [loadingState, setLoadingState] = useState(flagsmith?.loadingState);
    const [subscribed, setSubscribed] = useState(false);
    const refSubscribed = useRef(subscribed)

    const eventListener = useCallback(() => {
        setLoadingState(flagsmith?.loadingState);
    }, [flagsmith])
    if (!refSubscribed.current) {
        events.on('loading_event', eventListener)
        refSubscribed.current = true
    }

    useEffect(() => {
        if (!subscribed && flagsmith.initialised) {
            events.on('loading_event', eventListener)
            setSubscribed(true)
        }
        return () => {
            if (subscribed) {
                events.off('loading_event', eventListener)
            }
        };
    }, [flagsmith, subscribed, eventListener])

    return loadingState
}

export function useFlags<F extends string=string, T extends string=string>(_flags: readonly F[], _traits: readonly T[] = []): {
    [K in F]: IFlagsmithFeature
} & {
    [K in T]: IFlagsmithTrait
} {
    const firstRender = useRef(true)
    const flags = useConstant<string[]>(flagsAsArray(_flags))
    const traits = useConstant<string[]>(flagsAsArray(_traits))
    const flagsmith = useContext(FlagsmithContext)
    const [renderRef, setRenderRef] = useState(getRenderKey(flagsmith as IFlagsmith, flags, traits));
    const eventListener = useCallback(() => {
        const newRenderKey = getRenderKey(flagsmith as IFlagsmith, flags, traits)
        if (newRenderKey !== renderRef) {
            flagsmith?.log("React - useFlags flags and traits have changed")
            setRenderRef(newRenderKey)
        }
    }, [renderRef])
    const emitterRef = useRef(events.once('event', eventListener));



    if (firstRender.current) {
        firstRender.current = false;
        flagsmith?.log("React - Initialising event listeners")
    }

    useEffect(()=>{
        return () => {
            emitterRef.current?.()
        }
    }, [])

    const res = useMemo(() => {
        const res: any = {}
    flags.map((k) => {
                res[k] = {
                    enabled: flagsmith!.hasFeature(k),
                    value: flagsmith!.getValue(k),
                }
    }).concat(traits?.map((v) => {
                    res[v] = flagsmith!.getTrait(v)
    }))
        return res
    }, [renderRef])

    return res
}

export function useFlagsmith<F extends string=string, T extends string=string>() {
    const context = useContext(FlagsmithContext)

    if (!context) {
        throw new Error('useFlagsmith must be used with in a FlagsmithProvider')
    }

    return context as IFlagsmith<F, T>
}
