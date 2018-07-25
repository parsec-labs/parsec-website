---
template: post.html
title:    "Latest Development Update"
date:     2018-07-25 00:23:00
image:    RocketLaunch.jpg
author:
  name:   Victor
  link:   https://github.com/mateleshkavo
description: Status Of PARSEC Labs Development Updates
---

<img src="/img/blog/LatestDevelopmentUpdate.jpg" alt="LatestDevelopmentUpdate">

Hello, PARSEC Labs community, it’s Victor!

New blog post about our latest development results has arrived! As some of you remember, we started with Development Update blog posts in May and this is our second article in hopefully very long series. 

<h2>Our Plasma Chain</h2>

<img src="/img/blog/ProjectAlice.png" alt="ProjectAlice">

We are glad to share with you that we launched PARSEC Plasma chain. We have built a nice user friendly UI which communicates with our backend and Nodes so that everyone can test our chain, check it out here - <a href="http://alice.parseclabs.org/">Project Alice</a>.

<h2>Montenegro Workshop</h2>

<img src="/img/blog/JohannKostaAlex.jpg" alt="JohannKostaAlex">

In the middle of June three our developers met together in the Montenegro to do a workshop and to hang out a bit. It was very productive meetup as it’s very important for distributed team to met each other in real life. Here is a short summary of what was done there:

<h3>Our Blockchain Node</h3>

We are very happy to announce that our Node is up and running. In Montenegro couple of things were done:

- Binary release - We have published our node to <a href="https://www.npmjs.com/package/parsec-node">npm registry</a>. Anyone can install and run it on the local machine;

- Documentation - This part is usually the most important one as it simplifies developers life a lot. Currently we added <a href="https://parseclabs.readthedocs.io/en/latest/">Documentation</a> for our JSON RPC interface and for the node;

- Remove Coinbase Transaction - We have cleaned up the parsec-lib a bit, in particular we have removed this old old transaction type;

- Activation - Finished auction mechanism. Future validator should send <b>activation</b> transaction to become a validator in <a>activationEpoch</a>;

Couple of problems which were solved:

- Should we use <a href="https://en.wikipedia.org/wiki/Unspent_transaction_output">UTXO (Unspent transaction output)</a> merging and UTXO consolidation? Should we automatically add before each transaction? - Added new transaction type in parsec-lib that can merge all unspent outputs into one (prevents huge transactions with very big amount of inputs);

- Should we add colors to UTXOs? - Probably the biggest change during the workshop. We have added support of multiple tokens into our contract, library and node. So our customers will be able can deposit, transfer and exit not only PSC, but other ERC20 tokens as well.

<h3>Computation Without Proof</h3>

One of the workshops parts was around computation without proof, you can find results below:

- Added Transaction Type - Added support of computation request/response transactions into the node;

- <a href="https://github.com/ethereumjs/ethereumjs-vm">JS-EVM</a> - We just tried to run some compiled solidity code during computation request transaction and luckully - it works. For now it is a proof of concept. Here is an unfinished <a href="https://github.com/parsec-labs/parsec-node/pull/21">Pull Request</a> for computation without proof. We will continue with that after testing validators updates.

<h3>Plasma Development</h3>

Last but not least topic of the workshop was Plasma development. We have made a progress on that as well:

- Remove Burn Exits;
- Allow to exit any output (right now can exit only the first output).

<h2>Finished bounties</h2>

<img src="/img/blog/SpaceBounty.jpg" alt="SpaceBounty">

In the meantime we have delivered bunch of bounties which move us forward to finish milestones from the Grant Requirements (add link here to blog post).

<h3>Bounty 005 - Plasma Consensus Rules</h3>

<b><a href="https://github.com/johannbarbie">Johann</a></b> and <b><a href="https://github.com/sunify">Alex</a></b> have extended the node developed in Bounty 1 with Plasma consensus rules to enable block submission in our node. You can find full bounty description <a href="https://github.com/parsec-labs/parsec-node/issues/9">here</a>. 

<h3>Bounty 006 - Plasma Consensus Rules</h3>

<b><a href="https://github.com/troggy">Kosta</a></b> created JSON RPC server that is compatible with the Ethereum specification. You can find full bounty description <a href="https://github.com/parsec-labs/parsec-node/issues/10">here</a>. 

<h3>Bounty 011 - Project Alice - Parsec Testnet</h3>

<b><a href="https://github.com/sunify">Alex</a></b> switched over <a href="http://alice.parseclabs.org/">Project Alice</a> from Ethereum Testnet to Parsec Testnet. He used <a href="https://github.com/parsec-labs/parsec-node/issues/10">JSON RPC Server</a> implementation with Web3. You can find full bounty description <a href="https://github.com/parsec-labs/PIPs/wiki/Bounty_011">here</a>. 

<h3>Bounty 010 - Project Alice</h3>

<b><a href="https://github.com/maxkudla">Max</a></b> created Basic demo app using Ethereum testnet. Also he connect it to Ethereum testnet in the backend and added few hardcoded accounts that are preloaded with testnet Ether. Just a reminder that Project Alice was already switched to our PARSEC testnet. Design for Project Alice was created by <a href="https://github.com/a5kold">Sergey</a>. You can find full bounty description <a href="https://github.com/parsec-labs/PIPs/wiki/Bounty_011">here</a>. 

<h2>Parsec Faucet</h2>

<b><a href="https://github.com/johannbarbie">Johann</a></b> built <a href="https://github.com/parsec-labs/parsec-faucet">faucet</a> service for our chain. It allows to receive PSC tokens for testing purposes. Alex added a smooth minimalistic design to it, check it <a href="http://stake-dev.parseclabs.org/faucet">here</a>. Stay tuned to be able to receive some free PSC tokens in the future.

<h2>Stacking UI</h2>

<b><a href="https://github.com/sunify">Alex</a></b> built <a href="http://stake-dev.parseclabs.org/">stacking UI</a> which can be used in the future to buy a validators slot, <a href="ttp://stake-dev.parseclabs.org/deposit">make a deposit</a> to a chain and also claim some free PSC from the faucet service. For now it is just a nice tool that simplifies node development and testing. In the future will help our validators
https://github.com/parsec-labs/parsec-bridge-ui

That is it for the updates! If you are interested in our project and/or want to join our team - reach us in PARSEC Labs socials:
- PARSEC Labs website: https://www.parseclabs.org/
- Telegram: https://t.me/parseclabs
- Facebook: https://www.facebook.com/parsecIabs/
- Twitter: https://twitter.com/Parsec_Labs
