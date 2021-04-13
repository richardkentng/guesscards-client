# [Guesscards](https://guesscards.herokuapp.com/)

### Description:
[Guesscards](https://guesscards.herokuapp.com/) is a site where you can easily create sets of flashcards to study!

[Click to see the backend repo!](https://github.com/richardkentng/guesscards-api/)

![setshow_page](/src/rm_images/setshow_page.png)

### The homepage will display the following steps:
![steps123](/src/rm_images/steps123.png)
![steps456](/src/rm_images/steps456.png)

### Sign Up
![signup](/src/rm_images/signup.png)

### Log In
![login](/src/rm_images/login.png)

### Mobile Responsiveness 
![wf1](/src/rm_images/wf1.png)
![wf2](/src/rm_images/wf2.png)
![wf3](/src/rm_images/wf3.png)
![wf4](/src/rm_images/wf4.png)

### Technologies Used:
- Mongoose
- Express
- React
- Node
- SASS

### package.json
![dependencies](/src/rm_images/dependencies.png)

### User Stories:
##### AUTH
- AAU, I want to sign up for an account with a username and password.
- AAU, I want to log in to my account to see study sets made by me.
-
##### CRUD
- AAU, I want to create a set that can contain flashcards, where each set has a name.
- AAU, I want to create a flashcard for a particular set, where each card has a question and an - answer.
- AAU, I want every card’s answer to be displayed, but the answer hidden.
- AAU, I want to click on a card to toggle the answer’s visibility.
- AAU, I want to edit a card’s question and answer.
- AAU, I want to edit a set’s name.
- AAU, I want to delete a card.
- AAU, I want to delete a set of cards.

##### GUESSES
- AAU, I want to enter an optional guess before I see the answer to the flashcard.  When I see the answer, I should see my guess(es) below it.
- AAU, I want to see a score on every card that shows how many guesses I got right and wrong.
- AAU, I want to sort the flashcards by lowest score first, so that I can review the cards that challenge me most.

##### MARKED CARDS
- AAU, I want to mark a card by clicking on a box next to the card’s question, so that later I can review this card specifically.
- AAU, I want to sort the cards by marked cards first.


### ERD:
![erd](/src/rm_images/erd.png)

### Installation Instructions
- Clone down this repo
- `npm install`
- `npm start`

- Clone down the [backend repo](https://github.com/richardkentng/guesscards-api/)
- Create a .env file. Reference the env.temp file to see which variables need defining.
- `npm install`
- `npm run dev`


### Errors
##### React Hook useEffect has a missing dependency.
![useEffect_error](/src/rm_images/useeffect_error.png)

More often than not, when I try to use useEffect, I get this error.
At the same time, my state values would stop updating, which
was a problem. My quick research did not yield easy solutions. As
a result, I had to refactor some functional components to use class
components, which I'm more comfortable with.


### Cool features
##### Delete Confirmation
![delete](/src/rm_images/delete.png)

If you want to delete a set of cards, you need only click the 
edit icon to see the delete button above.  If your set has no
cards, then the delete button will work right away.  But if it 
has at least one card, then it will ask for confirmation as shown
below.  Isn't that cute!!

![delete_confirm](/src/rm_images/delete_confirm.png)


### Final Thoughts

#### SASS
SASS makes CSS so much more intuitive.  
Nested rules are a great way to visualize exactly which elements are being styled.
This was especially helpful because I wrote my own CSS for this projet instead of 
using a CSS library. I like how it turned out!

#### React
It's great how React how updates specific components without reloading the whole page!
Though I'd better figure out why useEffect is giving me that dependency error.

#### The Backend
It was pretty cool creating my own backend for this project.
The data that my backend sent back looked just like the json data
that I saw from APIs that we've worked with in the past!

#### Guesscards
The functionality of this project is rather basic.  If you read my user stories 
and checked out my deployed app, you'd notice that there were SO MANY features that
I did not get to implement.  I hope to keep updating this project so that it becomes
something that myself and others actually want to use!

#### A New Beginning?
This was my final project for my online bootcamp and general assembly.
I must keep up the grind and keep learning! :P

- Contact
  - richardkentng@gmail.com
  - [My Linkedin](https://www.linkedin.com/in/richard-kent-ng/)

### Some Wireframes
[wf1](/src/rm_images/wf1.png)
[wf2](/src/rm_images/wf2.png)
[wf3](/src/rm_images/wf3.png)
[wf4](/src/rm_images/wf4.png)

### Have a good one!
