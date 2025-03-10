---
title: How I (sorta) Dualboot Windows and Linux
author: Dylan / Shark
description: This is how I managed to (sorta) dualboot linux (Pop!_OS) and Windows 10 (22H2).
pubDatetime: 2024-05-08T18:54:19.949Z
modDatetime: 2025-03-10T16:01:34.136Z
slug: dualbooting-win-and-linux
featured: true
draft: false
tags:
  - dualbooting
  - linux
  - windows
  - tech
---

This is how I managed to (kind of) dualboot Windows and Linux.

## Why dualboot?

I would like to dualboot because I still get access to Windows along with the many quality features of Linux. I have also
been having lots of bugs on windows and at this point, I only use it for gaming.

## Why leave Windows?

I have (partially) left the Windows community because of many bugs, little customizability, and a massive dependency on Microsoft Store.

## Windows Bugs:

### Microsoft Store

Microsoft Store doesn't work (very often). I try to download TranslucentTB off of Microsoft Store
(which is like the only thing I download) and it requires me to login. I login and such, but it still won't let me install it.

> The only error I get is the word 'Error'. How am I supposed to understand what it is trying to indicate?

**_I can't._**

I love winget because I don't have to login to download from the store, but winget is very annoying most of the time because I still have to
go through one of those generic installer files to install the program I want. Although it works, still very bad.

### Little Customizability

Windows is very hard to customize without having to take apart the entire shell (explorer) to understand how everything works.

> Want an invisible taskbar?

**_Either learn C++ or download something off of the Microsoft Store. Oh wait... it doesn't work._**

> Want a taskbar that doesn't touch the edge of the screen?

**_Nope, learn C++ or download some program off of some sketchy website._**

### Everything needs Microsoft Store

If you try to use Calculator without Microsoft Store, it will just refuse to open. My question is why do you need
Microsoft Store to calculate numbers?

It isn't just me that is having these issues. There are many other people complaining about this in the Windows community aswell.

## Choosing a Linux Distro

I have used many Linux distros in the past such as Debian, Ubuntu, Arch, Pop!_OS, VanillaOS, Mint, and Alpine to name a few.

I didn't want to use an extremely bleeding-edge / rolling release OS, I would rather have a stable one because this was my main PC at the time (I have gotten a new one since, I will eventually write a blog on that) and I also don't have lots of time to spend configuring my machine.

Now, I had narrowed it down to 3. Debian. Ubuntu, and Pop!_OS

Lets go over the pros and cons of all of them. First, Debian!

**Debian's pros**:
- Already built with a DE / WM
- Easy to use
- Beginner friendly (at the time I was a noob)
- Barely any time spent configuring

**Debian's cons**:
- Very slow (this seemed to be an issue with my PC, still couldn't get it to work)
- DE / WM wasn't really pretty or polished IMO
- IMO, apt is a pretty bad package manager

Next I will cover Ubuntu!

**Ubuntu's pros**:
- Already built with a DE / WM (a very good one too, GNOME)
- Easy to use
- Beginner friendly
- Fun to use

**Ubuntu's cons**:
- Very bloated (just the installation took 8gb alone, doesn't matter for me though because I have a lot of space)
- apt still isn't very good

Finally, Pop!_OS!

**Pop's pros**:
- Very simple to use
- Very user and beginner friendly
- Already built with a DE / WM (GNOME)
- Fun to use and configure
- Has a dedicated store for downloading apps straight from (wasn't the best when I used it, pretty buggy)

**Pop's cons**:
- Very very bloated (had more features than Ubuntu for about the same size, still a lot for some people)
- Again, apt kinda sucks

### So, I decided to go with, Pop!_OS

## Now actually dualbooting..

Dualbooting was a very challenging switch to make (and still is) for me. I have used a more advanced and modern tool for
booting with EFI and swapping between them (bootloader / bootmanager).

The tool that I have used is [rEFInd](https://www.rodsbooks.com/refind/).
It is a very nice and easy-to-use tool. Not so easy-to-setup though (_ba dum bum pshhh_). Seriously though, it was very hard
to setup at first.

I kept on having Windows take over boot priority over rEFInd, then Linux took boot priority. Now I have it
working somewhat correctly (after about 5 tutorials).

This tool doesn't have the best documentation (for issues) compared to other tools, so if you have an issue, you're all on your own (for the most part).

*Quick note: I wasn't the sharpest tool in the shed while writing this blog, this tool does have great documentation, make sure to check it out*



**_(This post is unfinished and will be updated sometime in the future.)_**
