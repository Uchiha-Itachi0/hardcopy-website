export default function SlideButton({ isActive }: { isActive: boolean }) {
    return (
        <div className={` ${isActive ? 'border-green-100' : 'border-white'} w-12 rounded-lg bg-transparent border-[1px]  p-[2px]`}>
            <div className={`h-4 w-4 rounded-lg ${isActive ? 'translate-x-[150%] bg-green-100' : 'translate-x-0 bg-white'} transition-all duration-300 ease-out`}></div>
        </div>
    );
}