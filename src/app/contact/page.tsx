import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Contact() {
    const renderCard = (title: string, desc: string, message: string = "important", link: string = "#") => (
        <Link href={link} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <Card className="w-full h-full rounded-xl shadow-sm bg-[#292927] hover:bg-[#323230] transition-colors text-[#e8eddf]">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-neutral-400">
                        {desc}
                    </CardDescription>
                    <div className="mt-4 pt-4 border-t border-neutral-700 text-sm text-neutral-400">
                        {message}
                    </div>
                </CardHeader>
            </Card>
        </Link>
    );

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
                {renderCard("discord", "@imsoftaspowder", "add me on discord! this is my main mode of communication", "https://discord.com/users/1204149467251613756")}
                {renderCard("signal", "@wisest.33", "i also use signal if you prefer that over discord, but discord is generally better for keeping in touch", "https://signal.org/")}
                {renderCard("email", "dylan@wisest.cc", "email is generally the worst way to get in touch with me, but if you have something important to say then go ahead", "mailto:dylan@wisest.cc")}
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
                {renderCard("github", "@mostwise", "check out some of my cool projects and maybe even contribute if you want", "https://github.com/mostwise")}
                {renderCard("spotify", "@dylan", "make fun of my horrible music taste, or admire it, i'm always open to talking about my music", "https://open.spotify.com/user/ip24s6xdgak5k5rjnuqc59qo4")}
                {renderCard("steam", "@mostwise", "check out some of the games that i play in my free time", "https://steamcommunity.com/id/mostwise")}
                {renderCard("monkeytype", "@dylnn", "check out some of my typing, i haven't been really active recently", "https://monkeytype.com/profile/dylnn")}
                {renderCard("mastodon", "@shxrk@defcon.social", "i literally never use this but i might start using it more frequently i kinda forgot about it", "https://defcon.social/@shxrk")}
                {renderCard("bluesky", "@0xdyl.bsky.social", "i don't even know if this still exists or works but i don't think i've ever used it either", "https://bsky.app/profile/0xdyl.bsky.social")}
            </div>
        </div>
    )
}