import React from 'react'
import profile from '../images/profile.jpeg'
function About() {
    return (
        <div className="about-cont">

            <div className="paras">
            
                <p className="title-pic">
                    <h1>The Creator</h1>
                    <div><img src={profile} className="profile-pic" alt="profile picture"/></div>
                </p>
                
                <p>Hi there! Don't you love boxes with rounded corners? I sure do!</p>

                <p><b>My name's Richard,</b> and I'm a web developer. What you're seeing here is my final project for my online coding bootcamp at General Assembly.</p>
                
                <p><b>This project uses a React</b> front end and express/node backend to deliver your experience. React is fast, it's at times confusing, and it's kind of cool. </p>
                
                <p><b>Why flashcards?</b> I like to make things that are useful (or entertaining). Things that myself and others will actually want to use. My <a href="https://snippet-master.herokuapp.com/" className="link-sneaky" target="_blank">last project</a> aimed to save snippets of data that users could easily search through. Attaining a userbase who gives feedback would be awesome!</p>

                <p><b>The part I liked most</b> about this project was the little things that improved user experience.  For example, after you create a flashcard, the question field is refocused for you. When you delete a set, if the set has at least one flashcard, it will ask for confirmation.  Convenience is cool!  Thought there is still so much more to do!</p>

                <p><b>The future?</b> I hope to add a field where users can enter a guess before seeing the answer to the flashcard.  When they click the flashcard to see the answer, they should also see a history of their previous guesses. On top of that, I want to add a scoring system where users can see their score per flashcard that reflects the accuracy of their guesses.  There should also be an option to sort the flashcards based on score.  Ambitious? Yes? Useful and cool? Yes!</p>

                <p><b>My future?</b>  My time at General Assembly is coming to a close alarming fast!  What does the future hold?  More work!  More grinding!  I must learn the art of algorithms and data structures and interviewing!  I must increase my skills and improve my projects!  I must make time for <a className="link-sneaky" href="https://vimeo.com/332749292" target="_blank">animation</a> as well!  YOLO!</p>

                <p><b>Interested in learning more about me?</b>  Check out my info!  Have a good one! :P
                    <p className="mtr1">richardkentng@gmail.com</p>
                    <p><a href="https://www.linkedin.com/in/richard-kent-ng/" target="_blank">Linkedin</a></p>
                    <p><a href="https://github.com/richardkentng" target="_blank">Github</a></p>
                </p>
            </div>
            
        </div>
    )
}

export default About
