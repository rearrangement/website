---
title: "How I dualbooted Fedora and Windows 11 on my PC"
publishDate: 2026-06-03
description: "My first post, but also how I was able to dualboot after many struggles on my PC"
tags: [ dualboot, windows, linux, pc ]
---

Hello and welcome to my first blog post! I'm glad you made it! Anyway, let's cut to the chase. This is the story on how I was able to dualboot Fedora and Windows using the rEFInd tool.

## My History of Dualbooting
First off, I'd like to start with my history of dualbooting.

It hasn't really been great. I've tried to dualboot plenty before and that never ended up well.

The first time I tried dualbooting, I kept on getting boot coups where Windows would take priority of the bootloader, then after the installation of 3 different boot order programs, I was able to get Windows off the priority, and then... Linux took it.

Much of the same happened the second time that I tried to dualboot, and the third. But the fourth time came around, and well, *it finally worked*.

## Why are you Dualbooting to begin with?
Windows sucks. It's evident.

I'm sure there are many other developers (like myself) who'd love to only use Linux, but they're also gamers, and their favorite games aren't supported on Linux.

But let's get into exactly why Windows sucks.

### Performance issues
Windows (for some reason) just can't run programs as *smoothly* as Linux can.

For example, on my school laptop, it takes around **16 seconds** to run a dev server using *vite*. A super simple task that can be done on my main PC (on windows) in around **273 milliseconds**.

On a backup Linux laptop that I have that's about 9 times as old *(17 years old!)*, I can run the same project in **2 seconds!** That's insane! This doesn't even come down to the specs either because that old laptop has 4gb of DDR3 ram, while the school laptop has around 8gb of DDR4 ram.


### Microsoft Store dependability
Tell me why literally **EVERYTHING** requires Microsoft Store.

There was a test done a long time ago *(that I'm sure many of you are aware of)* that shows that the **CALCULATOR** requires Microsoft Store to run!

That's insane! The **CALCULATOR** requires Microsoft Store. This was proven when the Windows installation that didn't have the Microsoft Store on it would refuse to run the calculator without it.

Now back to games, you can't play Minecraft: Bedrock on Windows without the Microsoft Store. Now this is understandable, Microsoft owns Minecraft *(and they have for about 12 years now)* and they want to make their game only accessable through their market. 

*But..* you can literally play the Java editon almost anywhere! There are tons and tons of [unofficial launchers](https://prismlauncher.org) that allow you to play the other version of the game that aren't produced by Microsoft!

### Tracking & PUP Bloatware
Now, everyone's aware that Windows tracks you. They have a kernel-level software to ensure that they can always have eyes on you called *Recall*

I'm not 100% sure if *Recall* has been actually deployed yet, but I know that Windows isn't afraid of letting you know that they have it ready whenever.

Now, the Bloatware. This stuff is basically just a bunch of PUPs *(potentially unwanted program(s))* that is almost useless to advanced users.

We don't need Candy Crush, Clipchamp, TikTok, Spotify, and other programs shipping with our operating systems. We just need applications such as a browser, a file explorer *(even if it's just a command, shoutout ls!)*, a shell, somewhere to customize the OS, and that's about it. Everything else can honestly just get thrown away.

Alright, now that I'm done trashing Windows, lets get into depth about my configuration.

## Linux Distro
As you most likely read in the title, I chose Red Hat's *Fedora* as my Linux distro of choice. Why?

Here's my awesome list:
- GPU Passthrough to Virtual Machines (iommu)
- Had KDE Plasma avaliable as a DE *(desktop environment)* out of the box as a distributed ISO
- *dnf* is a very strong package manager (very important to me)
- Has great gaming performance
- Backed by an enterprise (not just some hobbyists [can be good/bad])
- Includes support for stable software along with lots of bleeding-edge / rolling release software

## Which software did you use for Dualbooting?
I went with [rEFInd](https://https://www.rodsbooks.com/refind/), the most common (I believe) software / firmware for getting the dualbooting job done.

In the past, I had stated that this tool had bad documentation, but I was just stupid as this tool has THE best documentation I think i've ever read. It goes into depth about the most common issues and even some advanced issues. Now, the developer isn't very present in the scene anymore (atleast according to the last update) 