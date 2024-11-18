import "./style.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import React, {SetStateAction, useMemo, useState} from "react";

type EditProps = {
    value: string,
    setValue: React.Dispatch<SetStateAction<string>>,
    clickState?: boolean,
    setClickState?: React.Dispatch<SetStateAction<boolean>>
}
export default function Editor(props: EditProps) {
    const {value, setValue, clickState, setClickState} = props
    // 에디터 모듈


    const modules: {} = useMemo(() => ({
        toolbar: {
            container: [
                ["image"],
                [{header: [1, 2, 3, 4, 5, false]}],
                [{font: []}],
                [{color: []}],
                ["bold", "underline"],
                [{list: 'ordered'}, {list: 'bullet'}],
                ["code-block"],

            ]
        }
    }), []);

    const getCssClass = ():string =>{
        if (clickState === undefined) return "";  // 정의되지 않은 경우
        return clickState ? "" : "no-toolbar";
    }

    const getClickState = ():boolean=>{
        if (clickState === undefined) return false;

        return !clickState;
    }



    return (
        <>
        <div id={"edit-wrapper"}>
                <ReactQuill theme={"snow"}
                            value={value}
                            onChange={setValue}
                            modules={modules}
                            readOnly={getClickState()}
                            className={getCssClass()}/>

            </div>
        </>

    )
}