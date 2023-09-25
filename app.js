const express=require('express')
const bodyParser = require('body-parser');

const app=express()
app.use(bodyParser.urlencoded({ extended: true }));
let username=''

// Initialize an empty array to store chat messages
const chatMessages = [];

// Display the login form at the root ("/") route
app.get('/', (req, res) => {
    res.send(
        `<form action="/login" method="POST">
            <label>Name:</label>
            <input type="text" name="username"></input>
            <button type="submit">Login</button>
        </form>`
    );
});

// Handle the login form submission and redirect to "/chat" on success
app.post('/login', (req, res) => {
    username = req.body.username;
    
    res.redirect('/chat');
});

// Display the chat form at the "/chat" route
app.get('/chat', (req, res) => {
    // Check if a user is logged in
    if (username) {
        res.write(`<h1>Welcome, ${username}!</h1>`);

        // Display chat messages
        res.write('<div>');
        chatMessages.forEach(message => {
            res.write(`<p>${message.username}: ${message.text}</p>`);
        });
        res.write('</div>');

        // Chat input form
        res.write(`<form action="/chat" method="POST">
        <input type="text" name="message" placeholder="Type your message"></input>
        <button type="submit">Send</button>
    </form>`
);

res.end();
} else {
// If no user is logged in, redirect to the login page
res.redirect('/');
}
});

// Handle chat form submissions
app.post('/chat', (req, res) => {
const message = req.body.message;

// Add the chat message to the array
chatMessages.push({ username, text: message });

// Redirect back to the chat page
res.redirect('/chat');
});

app.listen(3000)