---
external: false
author: "Utkarsh Maheshwari"
draft: false
publishDate: "2019-11-15 16:59:05"
title: "Going Mouseless on MacOS"
snippet: "I was used to the control and power of i3wm on my Arch Linux setup. Until I got a MacBook. But I am stubborn and I hate getting my fingers off the home row of my keyboard."
image:
  src: "https://images.unsplash.com/photo-1543514980-14becba33d86?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ"
  alt: "Going Mouseless on MacOS"
tags: ["Coffee Lounge"]
category: ""
---


When I was in college I owned a Dell laptop which had a really sucky trackpad. To avoid using it as much as I can I learnt the keyboard shortcuts of any application that I used more often than once. I learnt touch-typing around that time too and that made me not want get my fingers off the home row. This aversion to mouse and trackpad (and even arrow keys) led me to a gift from heaven that we mortals call [**i3wm**](https://utkarshme.github.io/blog/new-found-love-i3wm). The kind of control and power that **i3wm** provides is, in my opinion, criminal. It's addictive. And that is where this blog post starts.

> Its all about the keyboard, y'all!

When I started work at [Postman](https://www.getpostman.com/), I was given a choice between a MacBook and a Windows laptop. Having worked on solely Linux for the past 6 years and being a convicted felon for the crime to replacing Windows with Linux on any computer I could get my hands on (I actually installed Linux on a work computer assigned to me at a six months internship), I had little choice. I was ready to work at Postman but I was not ready to leave the ultimate power that comes with **i3wm**.

This premature breakup with **i3wm** hit me hard. As soon as I got a MacBook, I searched through the alleys of the internet for respite. I found myself using the trackpad more often than not. I was giving in.

I had tried setting custom keyboard shortcuts on MacOS, but there weren't any options to switch between windows. Floating windows almost always float over each other and that made to spend all my time shifting focus from one window to another.

Next, I switched to **[Amethyst](https://github.com/ianyh/Amethyst)**, the most popular, free tiling window manager available on MacOS. It did the task of tiling very well. Unable to find any alternative, I am ashamed to admit, I settled. I settled for whatever I could find. I was desperate.

But at the end, the desire for more control prevailed. I once again journeyed the fabled lands of the internet in search of the scrolls of wisdom. I could not find the scrolls of wisdom, but I did find a niche little program called [**chunkwm**](https://github.com/koekeishiya/chunkwm), an almost abandoned program which can be used tile (and control!) the windows. As I started using it, I found it to be as close I could get to **i3wm** on MacOS. The creator of **chunkwm** is also the creator of another piece of art called **[skhd](https://github.com/koekeishiya/skhd)** which can be used to set keyboard mapping for any command. Combined, these two powers create the ultimate tiling window setup that one can dream of on a Mac.

This setup was everything that I wanted from this world for a while, _until I got myself a secondary display_. Now MacOS enforces a stupid rule that you cannot change workspace (called a Desktop on Mac) via any keyboard mapper unless you disable SIP, which I could not (because reasons). So I was using custom keyboard shortcuts for this which I had set in the System Preferences. But these mapping would change the workspace on only the display which has the mouse pointer. To change workspace on the other display, I had to first move the mouse to that display which made me feel like helpless. But I was not ready to accept defeat yet.

Once again, I roamed the stingy streets of the internet and came across **CatchMouse**. Now I use it to move the mouse to the desired display before switching the workspace. It's not the ideal world yet in the Mac land, but it solves the purpose.

For now.

**TL;DR** Use **chunkwm** for tiling windows. Use **skhd** for keyboard mappings and controlling chunkwm. Use custom keyboard shortcuts in System Preferences to switch workspaces. Use **CatchMouse** for moving mouse between displays.

You can find my configs on [my GitHub](https://github.com/coditva/dotfiles).