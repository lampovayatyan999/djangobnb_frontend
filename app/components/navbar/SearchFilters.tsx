'use client';

import useSearchModal from "@/app/hooks/useSearchModal";

const SearchFilters = () => {
    const searchModal = useSearchModal();

    return (
        <div 
            onClick={() => searchModal.open('location')}
            className="h-[48px] lg:h-[64px] flex flex-row items-center justify-between border rounded-full p-[1px] bg-white"
        >
            <div className="hidden lg:block">
                <div className="flex flex-row items-center justify-between w-full h-full rounded-full">
                    <div className="cursor-pointer w-[250px] h-full px-8 flex flex-col justify-center rounded-full hover:bg-gray-100 transition">
                        <p className="text-xs font-semibold">Where?</p>
                        <p className="text-sm">Wanted Location</p>
                    </div>

                    <div className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100 transition">
                        <p className="text-xs font-semibold">Check in</p>
                        <p className="text-sm">add states</p>
                    </div>

                    <div className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100 transition">
                        <p className="text-xs font-semibold">check out</p>
                        <p className="text-sm">Add dates</p>
                    </div>

                    <div className="cursor-pointer h-[48px] lg:h-[64px] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100 transition">
                        <p className="text-xs font-semibold">Who?</p>
                        <p className="text-sm">Add Guests</p>
                    </div>

                </div>
            </div>
            <div className="p-2">
                <div className="cursor-pointer p-2 lg:p-4 bg-red-400 hover:bg-red-600 transition rounded-full text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" 
                        style={{display:'block', fill:'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth:4, overflow:'visible'}}
                        aria-hidden="true" role="presentaition" focusable="false"
                    >
                        <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
