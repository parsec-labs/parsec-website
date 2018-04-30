---
template: post.html
title:    "How to Test a Blockchain Game"
date:     2018-04-30 00:23:00
image:    blog03-bg.png
---

<img src="/img/blog/blog03-banner.png">

Hello, my name is Victor, I’m Communication Circle lead link and also I have a role of QA in Dapp Development circle. I wanted to share with you my story. Hope you will find this blog post useful. Everything started about a year ago, when I was invited to join an open team of great people who were developing poker platform on the blockchain called <a href="https://dapp.acebusters.com/lobby">Acebusters</a>. I immediately accepted the proposal and dived into exciting blockchain world. I was a professional poker player in the past and this project sounded like a solution to all my concerns that caused me to stop playing poker and switch to IT. Here are a few key moments that my decision accounts for:

- Acebusters has the lowest rake on the market - 1%, just enough to be able to support execution of all transactions on the blockchain;

- Acebusters has an open RNG system which is 100% fair, there are no hidden tricks as all RNG code is open source - that is, I guess, the greatest idea ever. I’d always feared that after every big cash-out from the poker room a two weeks downswing would ensue and Acebusters allayed my fears;

- All Acebusters wallets are set on the blockchain, which enables you as a player to exercise sole control over all your funds. I used to get really nervous when entering a regular poker room having a solid amount of money on my wallet. What if poker room banned my account for no reason? What if they blacklisted me? What if new Black Friday happened?

<img src="/img/blog/blog03-01.png">

Becoming a part of this great project was also a big challenge to me, as I hadn’t been very familiar with blockchain technology before. At first view, everything was no different from any other usual development companies. There was a web application with reasonably good UI, which needed to be tested manually and covered by some simple automated tests.
 
First steps were similar to any other kind of suchlike web projects:
 
<b>Step 1. Create test cases.</b>

We were not using any test case management systems, so I just used standard google sheets. Overall, there were eight different pages:

- Login Page;
- Register Page;
- Email confirmation Page;
- Generate Secret Page;
- Forgot Password Page;
- Lobby Page;
- Dashboard Page;
- Table Page.
 
I prepared nearly 500 test cases in total and most of them were regular verifications of user experience flow. After every release I was executing all manual test cases and preparing sort of release helt metrics table as shown on the screenshot: 

<img src="/img/blog/blog03-02.png">

However, three pages had actually some blockchain integration behind them.
 
<b>Step 2. Concentrate on blockchain related test cases.</b>

Generate Secret Page was the page where user could create a random entropy for his account based on which we created a new blockchain wallet with his own restore phrase. This was my first interaction with blockchain and what we really needed to test here was that every time for every new user we are actually creating a new wallet on the blockchain. This could be verified by checking a unique wallet id on <a href="https://etherscan.io/">EtherScan</a>.

Finally, the last thing we had to make sure here was whether the wallet was stored in our database.

<img src="/img/blog/blog03-03.png">

Dashboard Page contains all the transactions, which were performed by user. This page is very important, as it is the only way for user to actually see that our game is using Ethereum blockchain for submitting transactions. We have implemented our own scalable solution called - <a href="https://www.acebusters.com/files/acebusters_yellowpaper.pdf">Multiparty state channels</a> to avoid submitting every single bet of user to Ethereum blockchain. Instead of that, we submit only table join and table left transactions to Ethereum blockchain, whereas all game bets are submitted to our own blockchain. Here, as a QA, I was responsible for verifying that all transactions were being recorded to the dashboard.

In addition, users had a possibility to exchange ETH into our own cryptocurrency called Nutz (NTZ) on the Dashboard. Here there were lots of different test cases such as:

- verify that we show appropriate error message if user does not have a MetaMask installed;

- verify amount of gas prediction for transaction - this is very important verification as big gas limit can brake successful submit of transactions and could cause additional, not required expansions for our customers;

- verify amount of gas price prediction - same as gas limit prediction, it’s very important to predict correct price, cause if price is too low, users transaction will get stuck (for such cases Metamask doesn’t provide the possibility to resubmit transactions with a higher price), if price is too high - user will pay more money than it is needed for transaction mining. To recheck average prices for gas I used <a href="https://ethgasstation.info/">Gas Station</a>;

- verify that after transaction was mined successfully correct amount of crypto currency was added to customers wallet - it was important for this feature to work without any need for customer to refresh the page.

<img src="/img/blog/blog03-04.png">

Table Page, being the page where customers play poker, is the most important page in the whole application. It was necessary to verify that transactions were submitted correctly to Ethereum blockchain when player joined and left the table. In addition, every in-game move like bet/raise/all had to be performed perfectly, since if there were any issue with this - customer would lose their money and would never return back to our site.
 
<b>Step 3. Play Poker</b>

It was obvious to have all test cases written down for this functionality, but to perform all these test cases only once was literally not enough. Therefore, if all test cases were verified with simple game logic, only then the fun started. Imagine that your job is just to play poker as much as you can, trying out all the different types of flows for the game (Sounds like a dream job).

It was especially fun to test our new releases on production, as we didn't have any micro-stakes on our platform, so you had to have a good poker experience not to blow all your salary while testing production :) Luckily, my skills of playing poker online were good enough to benefit even from production testing by 0.5 ETH on average per release.

<img src="/img/blog/blog03-05.png">

Alongside with playing poker on our platform I needed to play poker in some big poker rooms like PokerStars, Full Tilt Poker etc. to be able to compare different experiences. This way we can understand what makes these poker rooms so popular with players and what features we are missing. I was actually responsible for adding new feature requests for our developers and that was awesome experience to build your own dream poker platform.

Currently Acebusters is a stand alone decentralized application which is managed by <a href="https://www.parseclabs.org/">PARSEC Labs team</a>. Currently PARSEC Labs is developing scalable solution for Ethereum Blockchain which will allow us to run our own super fast, secure and cheap sidechain which can be used by any kind of a real time game.

In case you will have any additional questions don’t hesitate to drop me a <a href="mailto:victor@parseclabs.org">message</a>.