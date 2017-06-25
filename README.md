component lifecycle
Props
State
Function vs class component

+ React deeper dive
  + react component lifecycle
  + Class vs function components
  + State management
Some additional homework around filter/map/reduce, just to get people in the habit



## Specific Required Content
+ A document in the same vein of what we have for JS training, but in the react training repo, should cover the topics of:
  + Props
  + Component lifecycle
  + State
  + Function vs class component
+ A repository that partially applies more of these
+ Filter/map/reduce homework, ideally more challenging than what was done previously



+ Function component for a clock
  + sets the clock to current time

+ Class
  + timer and updates the UI every second ➡️ state
  + lifeCycle
    + We want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called "mounting" in React.
    + We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called "unmounting" in React.
    + also animated it at every point
  + State
    + Do Not Modify State Directly
    + State Updates May Be Asynchronous
  + Animation
    + circle expand
    + hands fade in while rotating
