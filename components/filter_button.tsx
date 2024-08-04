import {IoArrowDownCircleOutline} from "react-icons/io5";
import FilterTile from "@/components/filter_tile";
import '../styles/filter_button.css';
import {Filter, Filters} from "@/utils/types";
import {useEffect, useRef, useState} from "react";

export default function FilterButton(
    { text, filters, isFilterOpen, onApply, onUnapply, onClickFilterButton }: { text: string; filters: Filters; isFilterOpen: boolean, onApply: (filter: Filter) => void; onUnapply: (filter: Filter) => void, onClickFilterButton: () => void }) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownContentRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownContentRef.current &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
            !dropdownContentRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            // Cleanup: Remove the event listener when the component is unmounted
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className="relative">
            <div ref={dropdownRef} onClick={() => toggleDropdown()} className="flex items-center justify-between px-4 cursor-pointer w-44 h-10 rounded-lg bg-blue-100">
                <p className="font-bold text-sm">{text}</p>
                <IoArrowDownCircleOutline className="text-xl dark:text-white"/>

            </div>
            <div ref={dropdownContentRef} className={` ${isDropdownOpen ? 'h-44 overflow-y-scroll p-2 pr-[2px]': 'h-0 overflow-hidden p-0 pr-0'} filter_button_scroll absolute flex flex-col gap-3 w-full left-0 bg-blue-100 top-12 rounded-lg transition-all ease-out duration-100`}>
                <div className = "flex flex-col gap-3 pr-[4px] overflow-y-scroll">
                    {/*    Applied */}
                    {filters.applied.length > 0
                        &&
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] text-white">Applied</span>
                            {filters.applied.map(
                                (filter: Filter, index: number) =>
                                    <FilterTile key={index} text={filter.text} isActive={filter.isActive} onClick={() => onUnapply(filter)}/>
                            )}
                        </div>
                    }
                    {/*    Apply*/}
                    {filters.apply.length > 0
                        &&
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] text-white">Apply</span>
                            {filters.apply.map(
                                (filter: Filter, index: number) =>
                                    <FilterTile key={index} text={filter.text} isActive={filter.isActive} onClick={() => onApply(filter)}/>
                            )}
                        </div>
                    }
                </div>


            </div>
        </div>


    );
}