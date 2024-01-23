export default async function PlantPage({params: {id}}: {
    params: { id: string };
}) {
    const plant = (await getPlant(id)).data

    return <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {plant["scientific_name"]}</h1>
        <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-1xl dark:text-white">
            {plant["common_name"]}</h2>

        <div className="flex mb-4">
        <span
            className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                    {plant["main_species"]["genus"]}</span>
            <span
                className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                                    {plant["main_species"]["family"]}</span>
        </div>
        <img className="object-contain h-50 w-100" src={plant["image_url"]}/>
    </main>
}

async function getPlant(id: string) {
    const token = "2h0izUSfnokKTXPsEp165op_2_CHwAHwrjd7JWNtPz8"
    const response = await fetch(
        "https://trefle.io/api/v1/plants/" + id + "?token=" + token
    );

    if (!response.ok) throw new Error("Failed to fetch plant with id " + id)

    return response.json()
}
