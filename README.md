## The problem

Never again the vicious cycle of not drink enough water causing you to forget to drink more water, then you dehydrated and not being able to remember to drink more water, and you don't even know that you are not thinking straight.

Not on warden's watch, you will drink your water and you will think straight.

## Hydration

It is recommended that you drink 240ml every hour for the first 10 hours of the day upon waking up.

So warden will keen an eye on you during those hours

## How to use

- Hit start when you wake up or set a time when you usually wake up
- The timer will start counting down 10 hours, and for every hour
- For every hour, the cup to drink will accumulate (equation)
- After drink a some water you can choose the amount

  - manual input
  - Take a sip (50ml?)
  - A small cup (150ml)
  - A big cup (300ml)
  - A bottle (500ml)

- The drank amount will subtract the accumulate amount

## Flow

- First open of the day
  - set wakeup time
  - ...
- Open during the day
  - The accumulator will be filled according time
  - Click drink button will decrease accumulator
  - Over click will make accumulator negative, until the daily limit is reached
  -

## Tech Stack

startTime
endTime = startTime + 10 hours

countDown = endTime - currentTime

## Todo

#### Features / Functions

##### Client

- [x] Timer

  - [x] Countdown timer
  - [x] Set wake up time
  - [x] Manual update wake up time
  - [x] Sync new update time to countdown

- [x] Water accumulator

  - [x] Water drinks options

- [ ] Stats

  - [ ] Daily average

- [ ] History
  - [ ] Consecutive days that hit goal
  - [ ] Over view

##### Internal

- [x] Create contexts
  - [x] Water context
  - [x] Time context

##### Server and backend

- [ ] Setup DB

  - [ ] User table

- [ ] Auth
  - [ ] Social auth probably just use github

#### Styles and animations

- [x] Animate opening
- [x] Drawer animation
