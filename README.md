# [Guesscards](https://guesscards.herokuapp.com/)
(Click the text above to be redirected to Guesscards!)

### Description:
Guesscards - a site where you can easily create sets of flashcards to study!

![setshow_page](/src/images/setshow_page.png)

### Technologies Used:
- Mongoose
- Express
- React
- Node
- SASS

### package.json
![dependencies](/src/images/dependencies.png)


### Backend repo
[Checkout the backend!:](https://github.com/richardkentng/guesscards-api/tree/richard)

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

### ERD:
![dependencies](/src/images/erd.png)

### Installation Instructions
- Clone down the repo
- `npm install`
- Create a .env with this variable: 
  - MONGODB_URL=<your_connection_string>
- `npm run dev`


### Errors
##### React Hook useEffect has a missing dependency.
![useEffect_error](/src/images/useeffect_error.png)
More often than not, when I try to use useEffect, I get this error.
At the same time, my state values would stop updating, which
was a problem. My quick research did not yield easy solutions. As
a result, I had to refactor some functional components to use class
components, which I'm more comfortable with. But I hear that 
funcitonal components are popular, so I best figure out this 
error soon!


### Cool features
##### Delete Confirmation
![delete](/src/images/delete.png)

If you want to delete a set of cards, you need only click the 
edit icon to see the delete button above.  If your set has no
cards, then the delete button will work right away.  But if it 
has at least one card, then it will ask for confirmation as shown
below.  Isn't that cute!!
![delete_confirm](/src/images/delete_confirm.png)


### Final Thoughts
SASS makes CSS so much more intuitive.  
Nested rules are a great way to visualize exactly which elements are being styled.
It's fantastic how React how reload specific components without reloading the whole page!
Speediness is awesome!
The functionality of this project itself is rather basic.  I hope to flush it out
with many more cool features!


