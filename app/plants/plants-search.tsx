'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function PlantsSearch({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const [queryType, setQueryType] = useState<string>("scientific_name")
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        if (searchParams.get('queryType')) {
            setQueryType(searchParams.get('queryType')!.toString())
        }
    }, [searchParams])

    function handleSearch() {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set('page', '1');
            params.set('query', query);
            params.set('queryType', queryType);
        } else {
            params.delete('query');
            params.delete('queryType');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    function reset() {
        const params = new URLSearchParams(searchParams);
        params.delete('query');
        params.delete('queryType');
        setQueryType('scientific_name');
        setQuery("")
        params.set('page', '1');
        replace(`${pathname}?${params.toString()}`);
    }

    return <div>
        <div className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <input type="text" id="simple-search"
                       onChange={(e) => setQuery(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder={placeholder}
                       defaultValue={searchParams.get('query')?.toString()}
                       required/>
            </div>
        </div>

        <ul className="mt-4 flex w-full gap-2">
            <li>
                <input type="radio" id="scientific_name" name="hosting" value="hosting-small" className="hidden peer"
                       checked={queryType == "scientific_name"}/>
                <label htmlFor="scientific_name" onClick={_ => setQueryType("scientific_name")}
                       className="inline-flex items-center justify-between  p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">Name</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id="family" name="hosting" value="hosting-big" className="hidden peer"
                       checked={queryType == "family_name"}/>
                <label htmlFor="family" onClick={_ => setQueryType("family_name")}
                       className="inline-flex items-center justify-between p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">Family</div>
                    </div>
                </label>
            </li>
            <li>
                <input type="radio" id="genus" name="hosting" value="hosting-big" className="hidden peer"
                       checked={queryType == "genus_name"}/>
                <label htmlFor="genus" onClick={_ => setQueryType("genus_name")}
                       className="inline-flex items-center justify-between p-1 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div className="block">
                        <div className="w-full text-lg font-semibold">Genus</div>
                    </div>
                </label>
            </li>
        </ul>

        <div className={"mt-4 flex w-full"}>
            <button
                className="inline-flex items-center justify-between text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => handleSearch()}>
                Search
            </button>
            <button
                className="inline-flex items-center justify-between text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                onClick={() => reset()}>
                Reset
            </button>
        </div>
    </div>
}
