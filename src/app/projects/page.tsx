import RenderCard from "@/components/RenderCard";

export default function Projects() {
    return (
        <div
            className="flex-1 flex flex-col justify-center items-center w-full max-w-6xl px-4 mx-auto font-sans pb-24"
            style={{
              color: "#e8eddfcb",
              zIndex: 1,
            }}
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {RenderCard(
                    "wisest.cc", 
                    "my personal website, built with next.js and tailwind css, and hosted on vercel", 
                    "check out the source code on github!", 
                    "https://github.com/mostwise/website/tree/v6"
                )}
                {RenderCard(
                    "evermind",
                    "an online student planner that I built to keep track of my assignments and tasks, built with next.js and tailwind css, and hosted on vercel",
                    "check it out for yourself! it's very useful and helps me a lot",
                    "https://evermind.shxrk.dev/"
                )}
                {RenderCard(
                    "winstro",
                    "a tool to make windows redistributable like linux, using all local backups based on disk space, built with typescript, next.js, and electron",
                    "check out the source code on github! it's still in early development but it's coming along nicely",
                    "https://github.com/WickedSoftworks/winstro"
                )}
                {RenderCard(
                    "clawk",
                    "a simple clock used for checking the time wherever in the world you'd like",
                    "check it out for yourself! it's very simple but it does the job",
                    "https://clawk.wisest.cc"
                )}
            </div>
        </div>
    )
}