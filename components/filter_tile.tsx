import SlideButton from "@/components/slide_button";
import {Filter} from "@/utils/types";

export default function FilterTile({ text, isActive, onClick } : { text: String, isActive: boolean, onClick: () => void }) {
    return (
        <div onClick = {() => onClick()} className="cursor-pointer flex items-center justify-between w-full p-2 rounded-lg bg-green-300">
            <p className="font-bold text-[10px] text-white">{text}</p>
            <SlideButton isActive={isActive} />
        </div>
    );
}