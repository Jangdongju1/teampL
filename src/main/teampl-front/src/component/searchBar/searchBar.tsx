import "./style.css"
import {ChangeEvent} from "react";

type SearchBarProps = {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    cssOption?: {
        size?: {
            width: number,
            height: number
        }
        iconSize?: {
            width: number,
            height: number,
        },
        inputSize?: {
            width: number,
            height: number,
            fontSize?: number
        }
    }
    icon?: string
    placeHolder?: string
}

export default function SearchBar(props: SearchBarProps) {
    const {icon, value, onChange, cssOption, placeHolder} = props

    const defaultValue = {
        size: {width: 236, height: 32},
        iconSize: {width: 26, height: 26},
        inputSize: {width: 200, height: 14, fontSize: 14},

        icon: "search-icon"
    }


    const boxSize = () => {
        if (cssOption) {
            if (cssOption.size)
                return {width: cssOption.size.width, height: cssOption.size.height}
        }

        return defaultValue.size
    }
    const iconSize = () => {
        if (cssOption) {
            if (cssOption.iconSize) {
                return {width: cssOption.iconSize.width, height: cssOption.iconSize.height}
            }
        }

        return defaultValue.iconSize
    }
    const inputSize = () => {
        if (cssOption) {
            if (cssOption.inputSize) {
                return {width: cssOption.inputSize.width, height: cssOption.inputSize.height}
            }
        }

        return defaultValue.inputSize
    }


    return (
        <div className={"search-bar-box"} style={boxSize()}>
            <div className={"search-bar"}>
                <input className={"search-bar-input"} type={"text"} value={value}
                       onChange={onChange}
                       style={inputSize()}
                       placeholder={placeHolder? placeHolder : ""}/>
            </div>
            <div className={`icon search-icon-btn ${icon ? icon : defaultValue.icon}`}
                 style={iconSize()}></div>
        </div>
    )
}