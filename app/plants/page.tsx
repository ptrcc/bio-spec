import {Suspense} from "react";
import Pagination from "@/components/pagination";
import PlantsSearch from "@/app/plants/plants-search";
import {PlantsList} from "@/app/plants/plants-list";

export default async function Page({searchParams}: {
    searchParams?: {
        query?: string;
        queryType?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const queryType = searchParams?.queryType || '';
    const page = Number(searchParams?.page) || 1;

    const plantsResponse = (await getPlants(page, query, queryType))
    const plants = plantsResponse.data
    const total = plantsResponse.meta.total

    return <main className="flex min-h-screen flex-col items-center p-10 ">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
            className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Bio</span> Spec</h1>

        <PlantsSearch placeholder={"Search Plant"}/>

        <Suspense key={query + page} fallback={<div>Loading</div>}>
            <PlantsList plants={plants}/>
        </Suspense>

        <Pagination total={total}/>
    </main>
}

async function getPlants(page: number, query: string, queryType: string) {
    const token = "2h0izUSfnokKTXPsEp165op_2_CHwAHwrjd7JWNtPz8"
    const response = await fetch(
        "https://trefle.io/api/v1/plants?token=" + token + "&page=" + page + "&filter[" + queryType + "]=" + query
    );

    if (!response.ok) throw new Error("Failed to fetch plants")

    return response.json()
}
