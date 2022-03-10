/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-25 15:05:26
 * @LastEditTime: 2022-02-09 16:24:40
 * @LastEditors: jiawen.wang
 */
// import { Button, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks'

export default function CustomizedRadios(props: any) {
    const { selectState, changeSelectState } = props
    const sellStage = useAppSelector(state => {
        return state.app && state.app.sellStage
    })
    useEffect(() => {
        if (sellStage === 2 || sellStage === 0 || sellStage ===3) {
            changeSelectState(1)
        } else {
            changeSelectState(2)
        }
    }, [sellStage])
    return (
        <>
            {sellStage === 1 ? (
                <div className="radio-box">
                    <button
                        className={`selected-default ${selectState === 2 ? 'selected-two' : 'unselected-two'}`}
                        onClick={() => changeSelectState(2)}
                    ></button>
                    <button
                        className={`selected-default ${selectState === 1 ? 'selected-one' : 'unselected-one'}`}
                        onClick={() => changeSelectState(1)}
                    ></button>
                </div>
            ) : (
                ''
            )}
        </>
    )
}
