# Events - basic

## What you will build

You will learn about basic types of events and event's phases used during Netgrif applications development.
You will build multiple tasks inside one process-based application in order to see the difference between event types.
Event types covered in this tutorial fall in two categories: task events: `assign`, `finish`, `delegate` and `cancel` - and data events: `data` and `data refs`. 

## What you will need

* 10 - 15 minutes
* Netgrif Application Engine CE already installed or created free account at [demo.netgrif.com](https://demo.netgrif.com)
* Access to the internet for [builder.netgrif.com](https://builder.netgrif.com) site

## Tutorial

_Types of task and data events explained in this tutorial:_

<p align="center">
    <img src="_media/events-basic/1.png">
</p>

### Task events

Task events are connected with firing a transition, which we have mentioned before in **Places, Transitions & Arcs**. Once a transition is fired it consumes token/s in input place/s and produces token/s in output place/s.
Three out of four task events are based on firing a transition - `Assign`, `Cancel` & `Finish`. **Assign event** occurs when a user decides to assign a task to himself and transition consumes token/s from input place/s. **Cancel event** occurs when
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

Each task event action type has to have a phase. And we have only two phases: `Pre` and `Post`. **Pre phase** is evaluated before the actual event occurs. If something went wrong with actions inside this event phase, the state of the workflow does not change. Token(s) stays at its location before the event was fired.
**Post phase** is evaluated after the actual event occurs. If something went wrong with actions inside this event phase, it won't affect the state of the workflow. Token(s) will be consumed or produced anyway.

_Example of pre and post phases inside Finish task event:_

<p align="center">
    <img src="_media/events-basic/2.png">
</p>

_Process used in example above:_

<a href="_media/events-basic/request.xml" download="request" style="color:blue;">Download the process</a>

In the model above you can see pre and post phases inside the Finish task event:
* Pre phase action is evaluated at the time when a user is clicking the finish button. If the function(s) inside the pre-phase is problematic, the token(s) would return back to the task.
* Post phase action is evaluated at the time when token(s) are produced in output place(s) event if the function(s) inside the post-phase is problematic.
    * E.g. this allows execution of another tasks as in the example above because token is already in place before them

### Data events
Data events - `Get` & `Set` - can be accessed in an assigned task by the user or in functions by reading or writing values. **Get event** is called when the data field with its value is loaded within a task.
**Get event** is called when the data field's value is set or changed.

_Example of Get and Set actions:_

<p align="center">
    <img src="_media/events-basic/4.png">
</p>

_Execution of process instance with Get and Set actions in NAE:_

<p align="center">
    <video controls style="max-width: 750px;">
      <source src="_media/events-basic/3.mp4" type="video/mp4">
    </video>
</p>

#### Data event vs. Data reference event
Actions assigned to data events can be both local and global within a process instance.
Locally you can assign an action to a data reference - **DataRef** - that is a reference of data within one task.
When you assign action into DataRef multiple business logic functions can be used while you are affecting the data that is referenced.
Globally you can assign an action to data itself. When you assign action to data itself, one set of business logic functions is used.

_Example of Get data action:_

<p align="center">
    <img src="_media/events-basic/5.png">
</p>

_Example of Get data reference action:_

<p align="center">
    <img src="_media/events-basic/6.png">
</p>

_Example of difference between local and global get event actions in actual task:_

<p align="center">
    <video controls style="max-width: 750px;">
      <source src="_media/events-basic/2.mp4" type="video/mp4">
    </video>
</p>

_Process used in all data events examples above:_

<a href="_media/events-basic/setget.xml" download="setget" style="color:blue;">Download the process</a>

### Process of Request application created in the tutorial (an XML file)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://modeler.netgrif.com/petriflow_schema.xsd">
	<id>request</id>
	<initials>REQ</initials>
	<title>Request</title>
	<defaultRole>true</defaultRole>
	<transitionRole>false</transitionRole>
	<caseName>New Request</caseName>
	<!-- TRANSACTIONS -->
	<!-- ROLES -->
	<role>
		<id>system</id>
		<title>System</title>
	</role>
	<role>
		<id>registration</id>
		<title>Registration</title>
	</role>
	<role>
		<id>first_department</id>
		<title>First Department</title>
	</role>
	<role>
		<id>second_department</id>
		<title>Second Department</title>
	</role>
	<!-- PROCESS ROLE REFS -->
	<!-- PROCESS USER REFS -->
	<!-- DATA -->
	<data type="text">
		<id>text_0</id>
		<title>First name</title>
	</data>
	<data type="text">
		<id>text_1</id>
		<title>Surname</title>
	</data>
	<data type="text">
		<id>text_2</id>
		<title>Email</title>
	</data>
	<data type="number">
		<id>number_0</id>
		<title>Contract number</title>
		<validations>
			<validation>
				<expression>inrange 1000,2999</expression>
				<message></message>
			</validation>
		</validations>
	</data>
	<data type="text">
		<id>text_3</id>
		<title>Request text</title>
		<values>area</values>
	</data>
	<data type="taskRef">
		<id>taskRef_0</id>
		<title></title>
		<init>t1</init>
	</data>
	<data type="text">
		<id>text_4</id>
		<title>Status</title>
	</data>
	<data type="enumeration">
		<id>enumeration_0</id>
		<title>Channel</title>
		<values>Web</values>
		<values>Call center</values>
	</data>
	<data type="text">
		<id>text_5</id>
		<title>Answer of department</title>
		<values>area</values>
	</data>
	<data type="text">
		<id>text_6</id>
		<title>Answer</title>
		<values>area</values>
	</data>
	<!-- I18NS -->
	<!-- TRANSITIONS -->
	<transition>
		<id>t1</id>
		<x>340</x>
		<y>100</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Request form</label>
		<roleRef>
			<id>system</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
		<dataGroup>
			<id>DataGroup_0</id>
			<layout>grid</layout>
			<dataRef>
				<id>text_0</id>
				<logic>
					<behavior>editable</behavior>
					<behavior>required</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>0</y>
					<rows>1</rows>
					<cols>2</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>text_1</id>
				<logic>
					<behavior>editable</behavior>
					<behavior>required</behavior>
				</logic>
				<layout>
					<x>2</x>
					<y>0</y>
					<rows>1</rows>
					<cols>2</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>text_2</id>
				<logic>
					<behavior>editable</behavior>
					<behavior>required</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>1</y>
					<rows>1</rows>
					<cols>2</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>number_0</id>
				<logic>
					<behavior>editable</behavior>
					<behavior>required</behavior>
				</logic>
				<layout>
					<x>2</x>
					<y>1</y>
					<rows>1</rows>
					<cols>2</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>text_3</id>
				<logic>
					<behavior>editable</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>2</y>
					<rows>2</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
		</dataGroup>
	</transition>
	<transition>
		<id>t2</id>
		<x>180</x>
		<y>260</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Submit a form</label>
		<dataGroup>
			<id>DataGroup_0</id>
			<layout>grid</layout>
			<dataRef>
				<id>taskRef_0</id>
				<logic>
					<behavior>editable</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>0</y>
					<rows>1</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
		</dataGroup>
		<event type="finish">
			<id>t2_finish</id>
			<actions phase="post">
				<action>status: f.text_4;

change status value {
    "Request submitted"
}</action>
			</actions>
		</event>
	</transition>
	<transition>
		<id>t3</id>
		<x>420</x>
		<y>260</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Registration of a form</label>
		<roleRef>
			<id>registration</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
		<dataGroup>
			<id>DataGroup_0</id>
			<layout>grid</layout>
			<dataRef>
				<id>taskRef_0</id>
				<logic>
					<behavior>visible</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>1</y>
					<rows>1</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>enumeration_0</id>
				<logic>
					<behavior>editable</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>0</y>
					<rows>1</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
		</dataGroup>
		<event type="finish">
			<id>t3_finish</id>
			<actions phase="post">
				<action>contract_number: f.number_0,
status: f.text_4;

if (contract_number.value &lt; 2000) {
    async.run {
        assignTask("t4")
        finishTask("t4")
    }
} else {
    async.run {
        assignTask("t5")
        finishTask("t5")
    }
}

change status value {
    "Request registered"
}</action>
			</actions>
		</event>
	</transition>
	<transition>
		<id>t4</id>
		<x>660</x>
		<y>180</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>To first department</label>
		<roleRef>
			<id>system</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
	</transition>
	<transition>
		<id>t5</id>
		<x>660</x>
		<y>340</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>To second department</label>
		<roleRef>
			<id>system</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
	</transition>
	<transition>
		<id>t6</id>
		<x>900</x>
		<y>180</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Answer of first deparment</label>
		<roleRef>
			<id>first_department</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
		<dataGroup>
			<id>DataGroup_0</id>
			<layout>grid</layout>
			<dataRef>
				<id>taskRef_0</id>
				<logic>
					<behavior>visible</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>2</y>
					<rows>1</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>text_5</id>
				<logic>
					<behavior>editable</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>0</y>
					<rows>2</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
		</dataGroup>
	</transition>
	<transition>
		<id>t7</id>
		<x>900</x>
		<y>340</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Answer of second department</label>
		<roleRef>
			<id>second_department</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
		<dataGroup>
			<id>DataGroup_0</id>
			<layout>grid</layout>
			<dataRef>
				<id>taskRef_0</id>
				<logic>
					<behavior>visible</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>2</y>
					<rows>1</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>text_5</id>
				<logic>
					<behavior>editable</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>0</y>
					<rows>2</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
		</dataGroup>
	</transition>
	<transition>
		<id>t8</id>
		<x>1140</x>
		<y>260</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Answer</label>
		<roleRef>
			<id>registration</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
		<dataGroup>
			<id>DataGroup_0</id>
			<layout>grid</layout>
			<dataRef>
				<id>taskRef_0</id>
				<logic>
					<behavior>visible</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>4</y>
					<rows>1</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>text_5</id>
				<logic>
					<behavior>visible</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>2</y>
					<rows>2</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>text_6</id>
				<logic>
					<behavior>editable</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>0</y>
					<rows>2</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
		</dataGroup>
		<event type="finish">
			<id>t8_finish</id>
			<actions phase="post">
				<action>answer: f.text_6,
status_task: t.t9,
status: f.text_4;

change status value {
    "Request answered"
}
make answer,visible on status_task when { true }</action>
			</actions>
		</event>
	</transition>
	<transition>
		<id>t9</id>
		<x>420</x>
		<y>340</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Status</label>
		<dataGroup>
			<id>DataGroup_0</id>
			<layout>grid</layout>
			<dataRef>
				<id>taskRef_0</id>
				<logic>
					<behavior>visible</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>3</y>
					<rows>1</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>text_4</id>
				<logic>
					<behavior>visible</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>0</y>
					<rows>1</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
			<dataRef>
				<id>text_6</id>
				<logic>
					<behavior>hidden</behavior>
				</logic>
				<layout>
					<x>0</x>
					<y>1</y>
					<rows>2</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
		</dataGroup>
	</transition>
	<!-- PLACES -->
	<place>
		<id>p1</id>
		<x>60</x>
		<y>260</y>
		<label></label>
		<tokens>1</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p2</id>
		<x>300</x>
		<y>260</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p3</id>
		<x>540</x>
		<y>260</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p4</id>
		<x>780</x>
		<y>180</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p5</id>
		<x>780</x>
		<y>340</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p6</id>
		<x>1020</x>
		<y>260</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p7</id>
		<x>1260</x>
		<y>260</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p8</id>
		<x>300</x>
		<y>340</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<!-- ARCS -->
	<arc>
		<id>a1</id>
		<type>regular</type>
		<sourceId>p1</sourceId>
		<destinationId>t2</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a2</id>
		<type>regular</type>
		<sourceId>t2</sourceId>
		<destinationId>p2</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a3</id>
		<type>regular</type>
		<sourceId>p2</sourceId>
		<destinationId>t3</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a4</id>
		<type>regular</type>
		<sourceId>t3</sourceId>
		<destinationId>p3</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a5</id>
		<type>regular</type>
		<sourceId>p3</sourceId>
		<destinationId>t4</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a6</id>
		<type>regular</type>
		<sourceId>p3</sourceId>
		<destinationId>t5</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a7</id>
		<type>regular</type>
		<sourceId>t4</sourceId>
		<destinationId>p4</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a8</id>
		<type>regular</type>
		<sourceId>t5</sourceId>
		<destinationId>p5</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a9</id>
		<type>regular</type>
		<sourceId>p4</sourceId>
		<destinationId>t6</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a10</id>
		<type>regular</type>
		<sourceId>p5</sourceId>
		<destinationId>t7</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a11</id>
		<type>regular</type>
		<sourceId>t6</sourceId>
		<destinationId>p6</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a12</id>
		<type>regular</type>
		<sourceId>t7</sourceId>
		<destinationId>p6</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a13</id>
		<type>regular</type>
		<sourceId>p6</sourceId>
		<destinationId>t8</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a14</id>
		<type>regular</type>
		<sourceId>t8</sourceId>
		<destinationId>p7</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a15</id>
		<type>regular</type>
		<sourceId>t2</sourceId>
		<destinationId>p8</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a16</id>
		<type>read</type>
		<sourceId>p8</sourceId>
		<destinationId>t9</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
</document>
```