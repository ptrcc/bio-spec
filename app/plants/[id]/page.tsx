export default async function PlantPage({params: {id}}: {
    params: { id: string };
}) {
    const plant = (await getPlant(id)).data
    const images = plant.main_species.images

    return <main className="flex min-h-screen flex-col items-center p-10">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {plant["scientific_name"]}</h1>
        <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-1xl dark:text-white">
            {plant["common_name"]}</h2>

        <div className="flex mb-4">
            <span
                className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                                    {plant["main_species"]["family"]}</span>
            <span
                className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                                    {plant["main_species"]["genus"]}</span>
        </div>
        <img className="object-contain h-50 w-100" src={plant["image_url"]}/>

        {images.leaf && <div>
            <h2 className="mb-4 mt-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
                Leafs</h2>
            <div className="grid grid-cols-3 gap-2">
                {images.leaf.map((l) =>
                    <img className="object-contain h-32 w-32 " src={l["image_url"]}/>
                )}
            </div>
        </div>
        }
        {images.habit && <div>
            <h2 className="mb-4 mt-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
                Habit</h2>
            <div className="grid grid-cols-3 gap-2">
                {images.habit.map((l) =>
                    <img className="object-contain h-32 w-32" src={l["image_url"]}/>
                )}
            </div>
        </div>
        }
        {images.fruit && <div>
            <h2 className="mb-4 mt-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
                Fruit</h2>
            <div className="grid grid-cols-3 gap-2">
                {images.fruit.map((l) =>
                    <img className="object-contain h-32 w-32" src={l["image_url"]}/>
                )}
            </div>
        </div>
        }
        {images.bark && <div>
            <h2 className="mb-4 mt-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
                Bark</h2>
            <div className="grid grid-cols-3 gap-2">
                {images.bark.map((l) =>
                    <img className="object-contain h-32 w-32" src={l["image_url"]}/>
                )}
            </div>
        </div>
        }
        <h2 className="mb-4 mt-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
            Sources</h2>
        {plant.sources && plant.sources.filter(s => s.name === "PlantNet").map(s =>
            <a href={s.url} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{s.name}</a>
        )}
    </main>
}

async function getPlant(id: string) {
    const token = process.env.TREFFLE_TOKEN
    const response = await fetch(
        "https://trefle.io/api/v1/plants/" + id + "?token=" + token
    );

    if (!response.ok) throw new Error("Failed to fetch plant with id " + id)

    return response.json()
}
