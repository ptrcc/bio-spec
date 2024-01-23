'use client';

import {usePathname, useSearchParams} from 'next/navigation';
import {useRouter} from "next/navigation";

export default function Pagination({total}: { total: number }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1

    const navigate = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        router.push(pathname + "?" + params.toString())
    }

    return <div className="flex">
        {currentPage > 1 &&
            <a href="#"
               onClick={() => navigate(currentPage - 1)}
               className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Previous
            </a>}
        <a href="#"
           onClick={() => navigate(currentPage + 1)}
           className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next
        </a>
    </div>
}
