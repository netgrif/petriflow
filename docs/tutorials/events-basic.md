# Events - basic

## What you will build

You will learn about basic types of events and event's phases used during Netgrif applications development.
You will build multiple tasks inside one process-based application in order to see the difference between event types.
Mentioned event types are from two categories: task events - assign, finish, delegate and cancel - and data events - data and data refs. 

<p align="center">
    <img src="_media/events-basic/1.png">
</p>

## What you will need

* 10 - 15 minutes
* Netgrif SDK already installed or created free account at [demo.netgrif.com](https://demo.netgrif.com)
* Access to the internet for [builder.netgrif.com](https://builder.netgrif.com) site

## Tutorial

### Task events

Task events connected with firing a transition, which we have mentioned before in **Places, Transitions & Arcs**. Once a transition is fired it consumes token/s in input place/s and produces token/s in output place.
3/4 task events are based on firing a transition. **Assign event** occurs when a user decides to assign a task to himself and transition consumes token/s from input place/s. **Cancel event** occurs when
user/system decides to not finish a task and tokens are given back to input place/s. **Finish event** occurs when a user decides to finish the task and token/s are produced in output place/s.
The only task event that is not connected with the firing of transition is the Delegate event. **Delegate event** occurs when one user decides to delegate a task to another user.

#### Task event's phases

Each task event action type has to have phase. And we have only two phases: Pre and Post. **Pre phase** happens before actual event is   

#### First action - decision split

Decision split action is simple Groovy If/Else Statement function, where condition is evaluated by value of enumeration field - Which branch?. If its value is equal to "To First" async function will execute task t2 - "To First". Else its value is not equal to "To First" async function will execute task t6 - "To Second". 

_Decision split action code snipet:_
```java
enumeration: f.enumeration_0;

if (enumeration.value == "To First") {
    async.run{
        assignTask("t2")
        finishTask("t2")
    }
}else {
    async.run{
        assignTask("t6")
        finishTask("t6")
    }
}    
```

_Example of decision split action:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/actions-basic/4.mp4" type="video/mp4">
    </video>
</p>
