import RenderCard from "@/components/RenderCard"

export default function Contact() {
    return (
        <div
            className="min-h-screen flex flex-col justify-center w-full max-w-6xl px-4 mx-auto font-sans pt-12 pb-12"
            style={{
              color: "#e8eddfcb",
              zIndex: 1,
            }}
        >

            <div>
                <h2 className="text-3xl font-bold mb-1 tracking-tight">
                    contact:
                </h2>
                <p className="text-neutral-400 mb-4">
                    come and talk to me if you want, or don't, up to you
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {RenderCard(
                    "discord", 
                    "@imsoftaspowder", 
                    "add me on discord! this is my main mode of communication", 
                    "https://discord.com/users/1204149467251613756"
                )}
                {RenderCard(
                    "signal", 
                    "@wisest.33", 
                    "i also use signal if you prefer that over discord, but discord is generally better for keeping in touch", 
                    "https://signal.org/"
                )}
                {RenderCard(
                    "email", 
                    "dylan@wisest.cc", 
                    "email is generally the worst way to get in touch with me, but if you have something important to say then go ahead", 
                    "mailto:dylan@wisest.cc"
                )}
            </div>

            <div>
                <h2 className="text-3xl font-bold mb-1 tracking-tight">
                    socials:
                </h2>
                <p className="text-neutral-400 mb-4">
                    you can check what i'm doing without talking to me, or just stalk me
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RenderCard(
                    "github", 
                    "@mostwise", 
                    "check out some of my cool projects and maybe even contribute if you want", 
                    "https://github.com/mostwise"
                )}
                {RenderCard(
                    "spotify", 
                    "@dylan", 
                    "make fun of my horrible music taste, or admire it, i'm always open to talking about my music", 
                    "https://open.spotify.com/user/ip24s6xdgak5k5rjnuqc59qo4"
                )}
                {RenderCard(
                    "steam", 
                    "@mostwise", 
                    "check out some of the games that i play in my free time", 
                    "https://steamcommunity.com/id/mostwise"
                )}
                {RenderCard(
                    "monkeytype", 
                    "@dylnn", 
                    "check out some of my typing, i haven't been really active recently", 
                    "https://monkeytype.com/profile/dylnn"
                )}
                {RenderCard(
                    "mastodon", 
                    "@shxrk@defcon.social", 
                    "i literally never use this but i might start using it more frequently i kinda forgot about it", 
                    "https://defcon.social/@shxrk"
                )}
                {RenderCard(
                    "bluesky", 
                    "@0xdyl.bsky.social", 
                    "i don't even know if this still exists or works but i don't think i've ever used it either", 
                    "https://bsky.app/profile/0xdyl.bsky.social"
                )}
            </div>
        </div>
    )
}