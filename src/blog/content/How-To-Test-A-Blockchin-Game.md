---
template: post.html
title:    "How to Test a Blockchain Game"
date:     2018-04-30 00:23:00
image:    blog03-bg.png
---

<img src="/img/blog/blog03-banner.png">

Hello, Victor here, just wanted to share with you my story. Hope you will find useful. Everything started about a year ago, I was invited to join a team of great people who were developing poker platform on the blockchain called Acebusters. I immediately accepted the proposal and dived into exciting blockchain world. I was a professional poker player in the past and this project sounded like a solution to all my concerns because of which, I stopped playing poker and switched to IT sphere. Few key moments, which supported my decision, were:

- Acebusters have lowest rake on the market - 1%, just enough to be able to support execution of all transactions on the blockchain;

- Acebusters have an open RNG system which is 100% fair, there are no hidden tricks as all RNG code is open source - that is, I guess, the greatest idea ever. I had always the fear that after every big cash-out from the poker room I will catch a two weeks downswing and Acebusters busted this fear;

- All Acebusters wallets are on the blockchain, which means that only you as a player control your funds. I was always nervous when I had solid amount of money on my wallet on regular poker room because of - what if poker room will ban my account for no reason, what if they will put me in some blacklist or what if new Black Friday happen.

<img src="/img/blog/blog03-01.png">

Becoming a part of this great project was also a big challenge for me, as I was not very familiar with a blockchain technology before. On the first look, everything was like in all other usual development companies. There is a web application, with reasonably good UI, which needs to be tested manually and needs to be covered by some simple automated tests.
 
First steps were common as for any other kind of similar web projects:
 
<b>Step 1. Create test cases.</b>

We were not using any test case management systems so I just used standard google sheets. Overall, there were eight different pages:

- Login Page;
- Register Page;
- Email confirmation Page;
- Generate Secret Page;
- Forgot Password Page;
- Lobby Page;
- Dashboard Page;
- Table Page.
 
Totally, I prepared near 500 test cases and most of them were regular verifications of user experience flow. After every release I was executing all manual test cases and preparing sort of release helt metrics table as shown on the screenshot: 

<img src="/img/blog/blog03-02.png">

However, three pages had actually some blockchain integration behind them.
 
<b>Step 2. Concentrate on blockchain related test cases.</b>

Generate Secret Page was the page were user was creating a random entropy for his account based on which we were creating a new blockchain wallet with his own restore phrase. This was my first interaction with a blockchain and what we really need to test here is that every time for every new user we are actually creating a new wallet on the blockchain. This can be verified by checking a unique wallet id on <a href=”https://etherscan.io/”>EtherScan</a>.

Then we need to check if the wallet was saved into our database and basically that is all we need to verify here.

<img src="/img/blog/blog03-03.png">

Dashboard Page contains all the transactions, which were performed by user. This page is very important, as it is the only way for user to actually see, that our game is using Ethereum blockchain for submitting transactions. We have implemented our own scalable solution called - multi party state channel to not submit every single bet of user to Ethereum blockchain. Instead of that, we are submitting only table join and table left transactions to Ethereum blockchain, but all in games bets are submitted to our own blockchain. Here, as a QA I was responsible for verifying that all transaction are being recorded to the dashboard.

In addition, users have a possibility to exchange ETH to our own cryptocurrency called Nutz (NTZ) on the Dashboard. Here there was lots of different test cases such as:
- verify that we are showing appropriate error message if user do not have a MetaMask installed;

- verify amount of gas prediction for transaction - this is very important verification as big gas limit can brake successful submit of transactions and could cause additional not required expansions for our customers;

- verify amount of gas price prediction - same as gas limit prediction, very important to predict correct price, cause if price will be too low, users transaction will stuck (at those times Metamask haven't implemented possibility to resubmit transactions with a higher price), if price will be too high - user will pay more money than is needed for transaction mining. To recheck average prices for gas I used <a href=”https://ethgasstation.info/”>Gas Station</a>;

- verify that after transaction was mined successfully correct amount of crypto currency was added to customers wallet - it was important for this feature to work without any need for customer to refresh the page.

<img src="/img/blog/blog03-04.png">

Table Page - this is the page were actually customers are playing poker, so this page is the most important page in the whole application. It was needed to verify that transactions are submitted correctly to Ethereum blockchain when player joins and lefts table. In addition, every in-game move like bet/raise/all should be performed ideally, as if there will be any issue with this - customer will lose his money and will never return back to our site.
 
<b>Step 3. Play Poker</b>

It was obvious to have all test cases written down for this functionality but to perform all these test cases only once was just literally not enough. Therefore, if all test cases were verified with simple game logic, only then the fun was beginning. Imagine that your job is just to play poker as much as you can, trying any different types of flows for the game (Sounds like a dream job).

It was especially funny to test our new releases on production, as we do not had any micro-stakes on our platform, so you should have a good poker experience to not lose all your salary while testing production :) Luckily, my skills of playing poker online were good enough to benefit even from production testing on average 0.5 ETH per release.

<img src="/img/blog/blog03-05.png">

Alongside with playing poker on our platform I needed to play poker on some big poker rooms like PokerStars, Full Tilt Poker etc. to be able to compare different experiences. This way we can understand what makes this poker rooms so popular between players and which features we are missing. I was actually responsible for adding new feature requests for our developers and that was awesome experience to build your own dream poker platform.

In case you will have any additional questions don’t hesitate to drop me a message <a href="mailto:victor@parseclabs.org">Victor</a>