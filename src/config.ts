import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://blog.shxrk.dev", // replace this with your deployed domain
  author: "dylan / shxrk",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "dylan ~ blog",
  ogImage: "",
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/rearrangement/",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:shxrk@shxrk.dev",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Discord",
    href: "https://dsc.gg/stxts/",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "Steam",
    href: "https://store.steampowered.com/community/sharkzies/",
    linkTitle: `${SITE.title} on Steam`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://defcon.social/@shxrk/",
    linkTitle: `${SITE.title} on Mastodon`,
    active: true,
  },
];
