'use client';

// icons
import { arrowLeftIcon, arrowRightIcon } from '@/assets/icons';

interface PaginationProps {
    page: number;
    handleNextPage: () => void;
    handlePrevPage: () => void;
    handleFirstPage: () => void;
}

export default function Pagination ({ page, handleNextPage, handlePrevPage, handleFirstPage }: PaginationProps) {

    return (
        <div className="flex items-center justify-end gap-[1rem] my-[2rem] px-[2rem]">
            { page > 2 && (
                <p 
                    className='flex flex-col justify-center h-full cursor-pointer hover:underline'
                    onClick={() => handleFirstPage()}
                >
                    Prvá strana
                </p>
            )}
            <div
                className={`
                w-[35px] h-[35px]
                bg-[#fff]
                border border-[#D2D6DA] rounded-[7px]
                ${page <= 1 ? "cursor-not-allowed opacity-50 pointer-events-none" : "cursor-pointer"}
                shadow-[0_0.1875rem_0.1875rem_0rem_rgba(76,175,80,0.15),_0rem_0.1875rem_0.0625rem_-0.125rem_rgba(76,175,80,0.2),_0rem_0.0625rem_0.3125rem_0rem_rgba(76,175,80,0.15)]
                hover:text-[#F0EDE8]
                hover:shadow-[0_0.875rem_1.625rem_-0.75rem_rgba(76,175,80,0.4),_0rem_0.25rem_1.4375rem_0rem_rgba(76,175,80,0.15),_0rem_0.5rem_0.625rem_-0.3125rem_rgba(76,175,80,0.2)]
                active:opacity-75
                `}
                onClick={() => handlePrevPage()}
            >
                <div className="w-full h-full flex flex-row justify-center items-center">
                    {arrowLeftIcon}
                </div>
            </div>
            <p className='flex flex-col justify-center h-full' >
                {page}
            </p>
            <div
                className="
                w-[35px] h-[35px]
                bg-[#fff]
                border border-[#D2D6DA] rounded-[7px] 
                cursor-pointer
                shadow-[0_0.1875rem_0.1875rem_0rem_rgba(76,175,80,0.15),_0rem_0.1875rem_0.0625rem_-0.125rem_rgba(76,175,80,0.2),_0rem_0.0625rem_0.3125rem_0rem_rgba(76,175,80,0.15)]
                hover:text-[#F0EDE8]
                hover:shadow-[0_0.875rem_1.625rem_-0.75rem_rgba(76,175,80,0.4),_0rem_0.25rem_1.4375rem_0rem_rgba(76,175,80,0.15),_0rem_0.5rem_0.625rem_-0.3125rem_rgba(76,175,80,0.2)]
                active:opacity-75
                "
                onClick={() => handleNextPage()}
            >
                <div className="w-full h-full flex flex-row justify-center items-center">
                    {arrowRightIcon}
                </div>
            </div>
        </div>
    )
}
