# Events - basic

## What you will build

You will learn about basic types of events and event's phases used during Netgrif applications development.
You will build multiple tasks inside one process-based application in order to see the difference between event types.
Mentioned event types are from two categories: task events - assign, finish, delegate and cancel - and data events - data and data refs. 

## What you will need

* 10 - 15 minutes
* Netgrif Application Engine CE already installed or created free account at [demo.netgrif.com](https://demo.netgrif.com)
* Access to the internet for [builder.netgrif.com](https://builder.netgrif.com) site

## Tutorial

_Task and data events:_
<p align="center">
    <img src="_media/events-basic/1.png">
</p>

### Task events

Task events are connected with firing a transition, which we have mentioned before in **Places, Transitions & Arcs**. Once a transition is fired it consumes token/s in input place/s and produces token/s in output place/s.
Three out of four task events are based on firing a transition - ASSIGN, CANCEL & FINISH. **Assign event** occurs when a user decides to assign a task to himself and transition consumes token/s from input place/s. **Cancel event** occurs when
user/system decides to not finish, but cancel a task and tokens are given back to input place/s. **Finish event** occurs when a user decides to finish the task and token/s are produced in output place/s.
The only task event that is not connected with the firing of transition is the Delegate event. **Delegate event** occurs when one user decides to delegate a task to another user.

_Example of task events simulated in builder:_

<p align="center">
    <video controls style="max-width: 750px;">
      <source src="_media/events-basic/1.mp4" type="video/mp4">
    </video>
</p>

_Example of actual task events inside NAE:_

<p align="center">
    <video controls style="max-width: 750px;">
      <source src="_media/events-basic/2.mp4" type="video/mp4">
    </video>
</p>

_Process used in examples above:_

<a href="_media/events-basic/task.xml" download="request" style="color:blue;">Download the process</a>

#### Task event's phases

Each task event action type has to have a phase. And we have only two phases: Pre and Post. **Pre phase** is evaluated before the actual event occurs. If something went wrong with actions inside this event phase, the state of the workflow does not change. Token/s stays at its location before the event was fired.
**Post phase** is evaluated after the actual event occurs. If something went wrong with actions inside this event phase, it won't affect the state of the workflow. Token/s will be consumed or produced anyway.

_Example of pre and post phases inside Finish task event:_

<p align="center">
    <img src="_media/events-basic/2.png">
</p>

_Process used in example above:_

<a href="_media/events-basic/request.xml" download="request" style="color:blue;">Download the process</a>

In the model above you can see pre and post phases inside the Finish task event:
* Pre phase action is evaluated at the time when a user is clicking the finish button. If the function/s inside the pre-phase is problematic, the token/s would return back to the task.
* Post phase action is evaluated at the time when token/s are produced in output place/s event if the function/s inside the post-phase is problematic.
    * E.g. this allows execution of another tasks as in the example above because token is already in place before them

### Data events
Data events - GET & SET - can be accessed in an assigned task by the user or in functions by reading or writing values. **Get event** is called when the data field with its value is loaded within a task.
**Get event** is called when the data field's value is set or changed.

_Example of GET and SET actions:_

<p align="center">
    <img src="_media/events-basic/4.png">
</p>

_Execution of process instance with GET and SET actions in NAE:_

<p align="center">
    <video controls style="max-width: 750px;">
      <source src="_media/events-basic/3.mp4" type="video/mp4">
    </video>
</p>

#### Data event vs. Data reference event
Actions assigned to data events can be both locally and globally within a process instance.
Locally you can assign an action to a data reference - **DataRef** - that is a reference of data within one task.
When you assign action into DataRef multiple business logic functions can be used while you are affecting the data that is referenced.
Globally you can assign an action to data itself. When you assign action into data itself one set of business logic functions is used.