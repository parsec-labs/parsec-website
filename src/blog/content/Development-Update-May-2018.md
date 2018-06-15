---
template: post.html
title:    "Development Update: May 2018"
date:     2018-06-15 00:23:00
image:    PARSECRocket.jpg
description: PARSEC Labs made big progress in development our own blockchain
---

<img src="/img/blog/DevelopmentUpdateMay.jpg" alt="DevelopmentUpdate">

Heylo, community! Few weeks ago we decided to start writing special monthly blog posts with development updates from our R&D and Dapp Development circles. This specific blog post is devoted to May 2018. Let's start! 

<b>Kosta</b>: First of all we have incepted a client library to work with PARSEC network, but only primitives so far. The Parsec library was required in all aspects of the implementation, being it contracts, node, CLI or frontend. It was our Bounty_007 and you can find more about it <a href="https://github.com/parsec-labs/PIPs/wiki/Bounty_007">here</a>.

<b>Alex</b>: Probably the main achievement of the month is the first version of our <a href="https://github.com/parsec-labs/PIPs/wiki/Bounty_001">node</a>, which can check transactions using <a href="https://lotionjs.com/">LotionJS</a>. There were few options how to make it:
- make everything by ourselves (p2p protocol, transaction storage, etc.);
- to fork a bcoin (we have same transactions format as Bitcoin, plus we could theoretically use its code base + our code on top. But later we figured out that this is not the best option);
- tendermint (we chose this method + lotion library, which wraps it. In this case everything is much simpler, almost everything is already made, we only needed to implement our own logic). To be honest, here we also forked a lot of stuff : ) For example, selection of technologies + first stage realization (without submitting blocks to the contract).

<b>Johann</b>: We have extended our Plasma contracts with PoS magic. Part of this implementation is are Slot auctions. Slot auctions allow validators to purchase the rights to validate blocks and submit their results to earn rewards. Check the screenshot below for the final state machine that defines all transitions in the Slot model! 

<img src="/img/blog/SlotModel.png" alt="SlotModel">

We have also implemented a reflexive block reward function that is based on the percentage of total supply bonded. This will ensure a healthy competition between the validators without ever binding all tokens into the staking contract, so that the token economy on chain will stay unaffected by validator staking. We have found a neat little formula that can be implemented in solidity: 

<img src="/img/blog/Formula.jpg" alt="Formula">

Where <b>α</b> is <i>active supply</i>, <b>β</b> is <i>block reward</i>, and <b>ω</b> represents <i>total supply</i>. The function looks like this:

<img src="/img/blog/BlockRewardsGraph.png" alt="FoBlockRewards">

On top of that we have started to collaborate with <a href="https://matic.network/">matic.network</a> and <a href="https://decentraland.org/">decentraland.org</a> to implement EVM fraud proof verification on our nodes. You can check out a first design document <a href="https://docs.google.com/document/d/1UsC3RbGNQuOla8EPwPDjXnsRKrpJt3IlUQTKnlrjHTg">here</a>. Stay tuned for bounties and code that will come out of this collaboration.

And finally, <b>Alex Core</b> made a gas oracle! Alex proposed two variants of gas oracle. 
- Store gasprice amount in block struct. With function getAverageGasPrice() calculated and returned average gasprice of 20 last blocks. 
- Store gas price in variable and modify with every block submission. avgGasPrice = avgGasPrice - avgGasPrice/15 + tx.gasprice/15.
In first approach tx with getting average gas price costs approx 28864. Every block submission costs 21500 gas more. Second - getter is simple reading storage, and every block submission costs aprox 6500 (21500 at first block).You can find more about it <a href="https://github.com/parsec-labs/parsec-contracts/pull/18">here</a>. By the way it was our <a href="https://github.com/parsec-labs/PIPs/wiki/Bounty_015">Bounty_15</a>. 

That was everything we had for May 2018! If you are interested in our project and/or want to join our team - reach us in PARSEC Labs socials:
- PARSEC Labs website: https://www.parseclabs.org/
- Telegram: https://t.me/parseclabs
- Facebook: https://www.facebook.com/parsecIabs/
- Twitter: https://twitter.com/Parsec_Labs