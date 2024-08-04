export default function TopNavButton(
    { text, activeTab, onClick } :
        { text: string, activeTab: boolean, onClick: () => void })
{
    return (
        <div onClick={onClick} className={`${activeTab ? 'bg-dark-300' : 'bg-dark-200'} relative flex items-center justify-center w-36 p-2 pt-3 rounded-tr-2xl rounded-tl-2xl cursor-pointer`}>
            <span className={`${activeTab ? 'bg-dark-300 -bottom-6' : 'bg-dark-200 -bottom-4'} absolute w-full h-6`}></span>
            <div className={`${activeTab ? 'block' : 'hidden'} absolute pointer-events-none select-none bg-transparent h-[50px] w-full -left-[87%] top-[75%] border-b-[20px] border-r-[20px] border-dark-300 rounded-br-full`}></div>
            <div className={`${activeTab ? 'block' : 'hidden'} absolute pointer-events-none select-none bg-transparent h-[50px] w-full -right-[87%] top-[75%] border-b-[20px] border-l-[20px] border-dark-300 rounded-bl-full`}></div>
            <h1 className="text-sm dark:text-white">{text}</h1>
        </div>
    );
}