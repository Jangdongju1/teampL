import {useEffect, useRef} from "react";
import "./style.css";


interface InitialsImgProps {
    name: string,
    width: number,
    height: number;
    onClick?: () => void;
}

export default function InitialsImg(props: InitialsImgProps) {
    // ref
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const {name, height, width, onClick} = props;


    const getInitials = (name: string) => {
        return name.charAt(0).toUpperCase();
    }


    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext(`2d`);
        const initials = getInitials(name);

        if (!canvas || !context) return;

        const radius = canvas.width / 2;
        const fontSize = radius;


        context.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화

        context.beginPath();
        context.arc(radius, radius, radius, 0, Math.PI * 2)//원그리기
        context.fillStyle = '#4A90E2'; // 배경색
        context.fill();


        context.fillStyle = '#FFFFFF'; // 텍스트 색
        context.font = `bold ${fontSize}px Arial`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(initials, radius, radius);


    }, [name]);

    if (!name) return null;
    return (
        <div className={"canvas-wrapper"} onClick={onClick? onClick : ()=>{}}>
            <canvas className={"initial-canvas"} ref={canvasRef} width={width} height={height}/>
        </div>
    )
}