import Link from "next/link";

export default async function Plants() {

    return <main className="flex min-h-screen flex-col items-center p-24 ">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
            className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Bio</span> Spec</h1>

        <Link href={`/plants`}>
            <button
                className="relative inline-flex items-center justify-center p-0.5 mt-10 mb-2 me-2 overflow-hidden
            text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-sky-400 to-emerald-600
            group-hover:from-sky-400 group-hover:to-emerald-600 hover:text-white dark:text-white focus:ring-4
            focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span
                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Start browsing
            </span>
            </button>
        </Link>

    </main>
}