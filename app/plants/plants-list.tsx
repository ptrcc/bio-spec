'use client'

import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export function PlantsList({plants}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    function handleSearch(query: string, queryType: string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.set('query', query);
        params.set('queryType', queryType);

        replace(`${pathname}?${params.toString()}`);
    }

    return <ul className="max-w-md divide-gray-200 dark:divide-gray-700 mt-5">
        {plants.map(plant => <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                        <img className="w-10 h-10 " src={plant["image_url"]}/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <Link href={`/plants/${plant["id"]}`}>
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {plant["scientific_name"]}
                            </p>
                        </Link>
                        <span onClick={_ => handleSearch(plant["family"], "family_name")}
                              className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                                    {plant["family"]}</span>
                        <span onClick={_ => handleSearch(plant["genus"], "genus_name")}
                              className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                    {plant["genus"]}</span>

                    </div>
                </div>
            </li>
        )}
    </ul>
}