---
template: post.html
title:    "Event Recap: PARSEC Labs at EhCC 2018 and BlockchainUA"
date:     2018-04-24 00:23:00
image:    blog01-banner.png
---

Aloha, our community! Welcome to our very first blog post, which is devoted to two amazing blockchain events: <b>EthCC 2018</b> (Paris, France) and <b>BlockchainUA </b> (Kyiv, Ukraine). Our team has visited both events and it was a very interesting and valuable experience for us: we spoke a lot about PARSEC Labs and Plasma, shared our vision, mission and goals and met many smart and outstanding people! Our Development Lead Link Johann will tell you more!

<b>Hi, Johann, its Ross (PARSEC Labs Community Manager)! March was a busy month for our team - we worked on our goals and also visited two conferences: EthCC and BlockchainUA. Paris was first, can you share your memories about that event?</b>

One big topic at the Ethereum Community Conference in Paris was the aftermath of the Parity fund freeze that was caused by a faulty multi-sig wallet implementation. While controversy has been ongoing about ways to reactive the lost funds, at the conference a group of developers has created a new organization: the Ethereum Magicians.

<img src="blogPost11.png">

The Ethereum Magicians aim to create means for social consensus to be better able to deal with contentious protocol decisions. Read the logs <a href="https://www.reddit.com/r/ethereum/comments/835lob/notes_from_the_first_meeting_of_the_fellowship_of/">here</a>.

Besides governance, Scalability has been on everyone’s lips. @karl_dot_tech and <a href="https://github.com/DavidKnott">David Knott</a> have talked about Minimum Viable Plasma, while Vitalik Buterin has presented Plasma Cash for the first time.

Another interesting phenomenon was the appearance of more and more blockchain game startups. Experimental, the team behind <a href="https://cryptowars.e11.io">CryptoWars</a> organized a meetup and explained limits and challenges developing games with the ethereum blockchain.

<b>Vitalik Buterin presented Plasma Cash in Paris. What do you think about this solution? How often speakers in Paris mentioned the scalability problem?</b>

Plasma Cash is interesting as it addresses some of the limitations that Plasma classic showed. Plasma is a technology that provides an execution venue for transactions and computation that can be much cheaper than the main chain, while being as secure as the main chain. In fact, the security of any Plasma child chain is protected with the mining power of the Ethereum miners.

There is one attack vector in the Plasma Classic design which can not be prevented: block data withholding. If this attack is detected, all users need to leave the plasma chain within a specific time, which is of course very inconvenient.

Plasma Cash circumvents the described problem, and users only need to watch the chain for the coins that are in their possession. This brings another advantage - Plasma Cash chains can scale to much more transactions, as users don’t need to verify the full block, but only the transactions that affect them.

I find Plasma and Plasma Cash exiting because they don’t require a hardfork before they can’t be used. Rather both can be deployed by anyone as smart contracts. Teams and Businesses can start profiting today from higher transaction throughput and cheaper transactions.

<b>Kyiv and BlockchainUA were next. How was the conference? Was you a one of the speakers and pitched there your vision of Plasma? Where we can find the slides?</b>

Yes, I have been to Kyiv few times before. The conference was good: 3 stages (main, product, technology) and many interesting speakers and projects. You can find my slides <a href="https://drive.google.com/file/d/1zWoHB86UAzuYcagOoqr60aJZoB7jj5jp/view">here</a>.

<img src="blogPost12.png">

<b>Which events will be next for PARSEC Labs team? </b>

Last week I visited <a href="http://dappdev.org/conference/">DApp DEV Conference 2018 in Kyiv</a>. I was giving a hands on scalability workshop to show developers how to build more scalable applications. After Kyiv we’ll travel to <a href="https://edcon.io/">EDCON Toronto</a> - this will be a big event for the Ethereum community. Come and hang out with Jonathan and me.

<img src="blogPost13.png">

<b>People are asking us about the possibility to join PARSEC Labs. Сan you shed some light on specific positions/roles that are needed?</b>

PARSEC Labs is open to anyone to join, just <a href="http://join.parseclabs.org">subscribe</a> or <a href="https://t.me/parseclabs">Telegram</a>.

We operate using <a href="https://www.holacracy.org/how-it-works/">holacracy</a> and every our circle has its open tasks and roles. An easy start to join our community is to look through the <a href="https://github.com/parsec-labs">GitHub</a> of a specific circle and pick some bounties.

<b>Thanks for your answers! Good luck on next events!</b>

You’re welcome!
