---
external: false
author: "Utkarsh Maheshwari"
draft: false
publishDate: "2021-06-12 05:30:00"
title: "Migrating from Ghost theme to NextJS and Tailwind"
snippet: "Ghost themes are good but not very customisable. I wanted to write my own theme and here's how I did it."
image:
  src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDZ8fHdlYnNpdGV8ZW58MHx8fHwxNjIzMzM2ODE3&ixlib=rb-1.2.1&q=80&w=2000"
  alt: "Migrating from Ghost theme to NextJS and Tailwind"
tags: ["Updates"]
category: ""
---


I have been using the [Ghost](https://ghost.org/) blogging platform for some time now because of the awesome features it provides like quick and easy setup and a great writing experience. It allows me to customise my blog however I want without getting into the "pay to remove ads" hostage situation. It keeps things simple and provides the essentials out of the box.

This is all great but Ghost is lacking in one thing – **Themes**.

It's not like it doesn't provide options; you can _actually_ find some very cool themes in their marketplace, but most of them require payment and are too expensive for me (I live in India and in INR the prices are a little steep).

I first started with an open-sourced theme that was available in the marketplace and modified it piece by piece, kind of like the ship of Theseus. I was able to add certain functionalities here and there that I thought were lacking and it was bliss... **until I wanted to modify the CSS.**

CSS inherently is not tough. It is tough because everyone has their own conventions that they use, and learning that style is a challenge. This is amplified in Ghost themes because they are written in vanilla CSS on top of vanilla Html. Because of the lack of components and modules, modifying the CSS introduces inconsistency and cascading effects where fixing one part leads to effects in other parts.

So, I decided to write a theme myself over the weekend. The amazing thing about Ghost is, and this is also one of the reasons I had chosen it in the first place, that it allows you to use it as a headless CMS. This means that you can pull and push all data from and to it using **the API**.

This meant that I was free to choose whatever framework, library, package, technology I want to use to make myself a blog while enjoying the editor experience that Ghost provides. _Love live the JAMStack!_

I knew I wanted to use React because who writes Html anymore?! And what better way to write React than [NextJS](https://nextjs.org/)! I wanted to get this out fast (did I mention I only had one weekend?) and NextJS is so damn easy to set up and get working. I think I'm in love.

The next thing needed was either a React component library or a CSS framework. Taking into consideration the speed and customizability, I took up [TailwindCSS](https://tailwindcss.com/). It is yet another library to get started quickly without being too bulky.

The best thing that I found about Tailwind is that we get a design system with sane defaults. It's much easier to keep consistency since you're not writing ad-hoc CSS anymore. In fact, you're not writing CSS at all – you're just adding classes!

I was able to build the front page on the first day. The first page had a header, a footer and a list of posts. Since I only have close to 5 posts, I didn't implement pagination in the first iteration.

Next, I built the page and post views. These again are not feature-complete and currently do not support pictures, embeds, etc. I don't have these in any of my blogs yet so they were not a priority. I also haven't implemented tags yet because I didn't have enough time on the weekend. _Coming soon_.

One thing that I'm not too happy about is that Ghost does not provide an API for subscriptions. I could've just figured it out from the DevTools by looking at the Network tab but I didn't want to use something that might change and is not officially supported.

I've discovered[Buttondown](https://buttondown.email/) for subscriptions. It is yet another awesome product that has, wait for it, **the APIs**. I was reluctant to embed third-party components because it kills the aesthetic. With Buttondown, I was able to set up a custom signup component in my blog that subscribes to the newsletter without any Hacks™.

_What about hosting?_ I'm using [Vercel](https://vercel.com/) to host it because of the fast and agile deployments with close to no work required to set it up. I just hooked it up with my GitHub repo and that's it – new builds with every push. The edge network CDN that they provide is definitely a bonus too. Also, free to get started!

Time for retrospection.

What went well?
---------------

1.  The updated blog is out on production and works much much faster than my previous blog.
2.  The new theme is uniquely mine. I love it.

What went wrong?
----------------

1.  The subscribers API is not present which meant that I could not use Ghost's members feature.
2.  I couldn't finish up the tags feature but I will be taking it up in the next iteration.

* * *

I think this turned out to be a pretty good experience writing the whole blog from scratch on a weekend. I'm pretty satisfied with the results in terms of speed, optimisations and agility. I can push out changes incrementally and see them **in production in a minute**.

_More features coming in, stay tuned!_