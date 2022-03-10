
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export { useWeb3Context, useAddress } from "./web3Context";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function debounce(fn: Function, ms: number) {
    let timer: any;
    return function (...args: any) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, ms);
    };
}
export function useDebounce(fn: Function, time: number) {
    return debounce(fn, time);
}
