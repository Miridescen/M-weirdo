/*
 * @Author: jianwen.Wang
 * @Date: 2022-02-09 15:58:40
 * @LastEditTime: 2022-02-10 16:25:03
 * @LastEditors: jiawen.wang
 */
import React, { useEffect, useRef, useState } from 'react'

interface IProps {
    inputbox: string
    changeInputWord: Function
}
export default function CaptchInput(props: IProps) {
    const { changeInputWord, inputbox } = props
    const [switchNum, setSwitchNum] = useState(1)
    const mytext = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        mytext.current?.focus()
    }, [])
    const changeValue = (e: any) => {
        if (e.keyCode == 8) {
            if (inputbox.length < 0) {
                return
            }
            e.target.value = ''
            changeInputWord([])
            setSwitchNum(1)

            return
        } else if (e.keyCode >= 65 && e.keyCode <= 90) {
            if (inputbox.length >= 4) {
                return
            }

            changeInputWord(e.target.value)
            setSwitchNum(switchNum + 1)
        } else {
            e.target.value = ''
            changeInputWord('')
            setSwitchNum(1)
            return
        }
    }
    const iptFun = (n: number) => {
        mytext.current?.focus()
    }

    return (
        <div className="input-box">
            <input
                className="input-style"
                ref={mytext}
                type="text"
                onBlur={e => {
                    setSwitchNum(0)
                }}
                onFocus={e => {
                    if (inputbox.length == 4) {
                        setSwitchNum(inputbox.length)
                    } else {
                        setSwitchNum(inputbox.length + 1)
                    }
                }}
                maxLength={4}
                onKeyUp={(e: any) => {
                    changeValue(e)
                }}
            />
            <div className="item-box" onClick={() => iptFun(1)}>
                {inputbox[0]}
                {switchNum === 1 && <div className="cursor-line"></div>}
            </div>
            <div className="item-box" onClick={() => iptFun(2)}>
                {inputbox[1]}

                {switchNum === 2 && <div className="cursor-line"></div>}
            </div>
            <div className="item-box" onClick={() => iptFun(3)}>
                {inputbox[2]}

                {switchNum === 3 && <div className="cursor-line"></div>}
            </div>
            <div className="item-box" onClick={() => iptFun(4)}>
                {inputbox[3]}

                {switchNum === 4 && <div className="cursor-line"></div>}
            </div>
        </div>
    )
}
