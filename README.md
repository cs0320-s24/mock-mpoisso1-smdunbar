# <<<<<<< HEAD

> > > > > > > 116b33d (chore: prep for merge)

# Project Details

Project Name: Mock

Partners: smdunbar and mpoisso1

Estimated time for completion: 13 hours

Github repository: https://github.com/cs0320-s24/mock-mpoisso1-smdunbar

# Design Choices

There are seven relevant typescript component files in our project: App, ControlledInput, LoginButton, REPL, REPLInput, REPLFunction, REPLHistory.

App is the highest level component. Here, There is a use state that keeps track of whether a user is logged in or not as well as HTML that builds the app header and relevant blocks on the screen. App calls LoginButton and (if user is logged in) REPL.

LoginButton controls the interface shown when the user is logged in versus when they are not. A user can not enter commands if they are not logged in.

REPL controls the input and output of the main REPL. Here, there exists two use states. One controls history and the other controls whether or not the output is in verbose mode.It returns a new divider that calls REPLHistory and another divider that calls REPLInput. There dividers build up the output and input boxed on the screens respectively.

REPLHistory returns the scrollable repl output box that can be seen in the center of the interface. It maps through the history array and outputs the results for each item in the array. Depending on the output mode (brief or verbose), different forms of output will be returned. If the result of a command is a string[][], then an HTMLTable will get made dynamically and returned with the makeHTMLTable helper. Whenever the history use state changes, the REPLHistory function updates and the screen changes.

REPLInput contains commandString and loaded use states, which control the commandString and the loaded filepath respectively. Three functions are created here that implement the REPLFunction interface: load, view, and search. They are then effectively added to the function map for easy callback. REPLInput maintains control of the input box and submit button. When the submit button is clicked, handle submit is called which sets the history to itself concatenated with

# Errors/Bugs

No known Bugs

# Tests

### Unit Tests

a. "adding to map" - tests the addFunc function that adds a function to the function map
b. "remove from map" - tests the removeFunc function that removes a function from the function map

### Playwright Tests

Our Playwright testing file was extremely extensive. To determine what need to be tested we focused on three main categories, brief, verbose, errors. For each functionality we checked that the proper output was printed when the program was in either verbose or brief mode. For both of these mode we tested outputs of various shapes, 2D arrays, 1D arrays, empty arrays, malformaed data, etc. We also tested the output when errors occured (file had not been loaded and view or search was called, incorrect nuber of arguments, not a command)

# How to

### Run the Program

To build and run our program, navigate to the mock folder in the directory, run npm start in terminal, and navigate to the provided localhost link.

### Run Tests

To run tests, navigate to any of the testing files, navigate to the mock folder, run npm run test.

# Collaboration
