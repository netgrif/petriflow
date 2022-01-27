# Actions - basic

## What you will build

You will build an application with three types of event-based actions. Two types of actions are dedicated to changing the properties of data fields - value and behaviour. Third type of action allows automatic decision making. This process-based application example introduces multiple departments, a status tracker, and hidden/visible data fields.     

## What you will need

* 10 - 15 minutes
* Netgrif Application Engine CE already installed or created free account at [demo.netgrif.com](https://demo.netgrif.com)
* Access to the internet for [builder.netgrif.com](https://builder.netgrif.com) site* 10 - 15 minutes
* Netgrif Application Engine CE already installed or created free account at [demo.netgrif.com](https://demo.netgrif.com)
* Access to the internet for [builder.netgrif.com](https://builder.netgrif.com) site

## Tutorial

### Process preparation

#### Modelling of the process

Model the process model as in the video below.

_Example of modelling the process :_
<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/actions-basic/1.mp4" type="video/mp4">
    </video>
</p>

#### Data forms and data fields

Create data and data forms in the process as in the video below.

_Example of creating data and data forms in the process:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/actions-basic/2.mp4" type="video/mp4">
    </video>
</p>

#### Roles

Create roles and assign them to each task as in the video below.

_Example of creating and assigning roles to tasks:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/actions-basic/3.mp4" type="video/mp4">
    </video>
</p>

### Actions 

Petriflow `Actions` are pieces of Groovy/Java code that define reactions to events invoked in process execution. Thanks to the robust Action API, events can be chained and further enrich business logic of an application process. You can find out more about Actions <a href="#/specification?id=actions">here</a>.

#### First action - decision split

Decision split action is simple Groovy If/Else Statement function, where condition is evaluated by value of enumeration field - Which branch?. If its value is equal to `To First`, async function will execute task `t2` - `To First`. Otherwise its value is not equal to `To First` so async function will execute task `t6` - `To Second`. 

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

In order to make this action work create it in the event **Finish** phase **Post**.

<p align="center">
    <img src="_media/actions-basic/1.png">
</p>

#### Second action - change value of status text field

Change value action generally works as a systematic function that changes the data field's value. In our case, this function works as
a status tracker value changing function. Every time a task assigned to an employee is finished, the value of status is changed to a predefined value in the process instance.

_Change value action code snipet:_
```java
status: f.text_2;

change status value { "Branch answered."; } 
```

_Example of decision split action:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/actions-basic/5.mp4" type="video/mp4">
    </video>
</p>

In order to make this action work create it in the event **Finish** phase **Pre**.

<p align="center">
    <img src="_media/actions-basic/2.png">
</p>

#### Third action - change behaviour of the conclusion text field in status

Change behaviour action generally works as a systematic function that changes the behaviour of the data field.
In our case, this function changes the behaviour of the `Conclusion` text field from hidden to visible in the Status task.
So the `Conclusion` text field is visible only when the `Conclusion` task is finished.

_Change behaviour action code snipet:_
```java
transition: t.t9,
conclusion: f.text_1;

make conclusion, visible on transition when { true }
```

_Example of change behaviour action:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/actions-basic/6.mp4" type="video/mp4">
    </video>
</p>

### Testing the application

_Process used in examples above:_

<a href="_media/actions-basic/actions.xml" download="actions" style="color:blue;">Download the process</a>

In the video below, you can see all the mentioned actions from the created application quickly compiled by Netgrif Application Engine.
Roles have to be changed during the demonstration in order to simulate multiple users.  

_Example of uploading process into the NAE. Following the creation of a new process instance and playing with tasks:_
<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/actions-basic/7.mp4" type="video/mp4">
    </video>
</p>

In order to make this action work create it in the event **Finish** phase **Post**.

<p align="center">
    <img src="_media/actions-basic/3.png">
</p>

### Process application created in the tutorial (an XML file)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://netgrif.github.io/petriflow/petriflow.schema.xsd">
	<id>actions</id>
	<initials>ACT</initials>
	<title>Actions tutorial</title>
	<defaultRole>true</defaultRole>
	<transitionRole>false</transitionRole>
	<!-- TRANSACTIONS -->
	<!-- ROLES -->
	<role>
		<id>main</id>
		<title>Main</title>
	</role>
	<role>
		<id>first</id>
		<title>First</title>
	</role>
	<role>
		<id>second</id>
		<title>Second</title>
	</role>
	<role>
		<id>system</id>
		<title>System</title>
	</role>
	<!-- PROCESS ROLE REFS -->
	<!-- PROCESS USER REFS -->
	<!-- DATA -->
	<data type="enumeration">
		<id>enumeration_0</id>
		<title>Which branch?</title>
		<values>To First</values>
		<values>To Second</values>
	</data>
	<data type="text">
		<id>text_0</id>
		<title>Answer of the branch</title>
		<values>area</values>
	</data>
	<data type="text">
		<id>text_1</id>
		<title>Final answer</title>
		<values>area</values>
	</data>
	<data type="text">
		<id>text_2</id>
		<title>Status</title>
	</data>
	<!-- I18NS -->
	<!-- TRANSITIONS -->
	<transition>
		<id>t7</id>
		<x>780</x>
		<y>300</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Second</label>
		<roleRef>
			<id>second</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
		<dataGroup>
			<id>DataGroup</id>
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
					<rows>2</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
		</dataGroup>
		<event type="finish">
			<id>t7_finish</id>
			<actions phase="pre">
				<action>text_2: f.text_2;
change text_2 value { "Branch answered."; }
</action>
			</actions>
		</event>
	</transition>
	<transition>
		<id>t6</id>
		<x>500</x>
		<y>300</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>To Second</label>
		<roleRef>
			<id>system</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
	</transition>
	<transition>
		<id>t4</id>
		<x>980</x>
		<y>220</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Conclusion</label>
		<roleRef>
			<id>main</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
		<dataGroup>
			<id>DataGroup</id>
			<layout>grid</layout>
			<dataRef>
				<id>text_1</id>
				<logic>
					<behavior>editable</behavior>
					<behavior>required</behavior>
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
			<dataRef>
				<id>text_0</id>
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
		</dataGroup>
		<event type="finish">
			<id>t4_finish</id>
			<actions phase="pre">
				<action>text_2: f.text_2;
change text_2 value { "Conclusion made."; }
</action>
			</actions>
			<actions phase="post">
				<action>t9: t.t9,
text_1: f.text_1;
make text_1, visible on t9 when { true }
</action>
			</actions>
		</event>
	</transition>
	<transition>
		<id>t3</id>
		<x>780</x>
		<y>140</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>First</label>
		<roleRef>
			<id>first</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
		<dataGroup>
			<id>DataGroup</id>
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
					<rows>2</rows>
					<cols>4</cols>
					<offset>0</offset>
					<template>material</template>
					<appearance>outline</appearance>
				</layout>
			</dataRef>
		</dataGroup>
		<event type="finish">
			<id>t3_finish</id>
			<actions phase="pre">
				<action>text_2: f.text_2;
change text_2 value { "Branch answered."; }
</action>
			</actions>
		</event>
	</transition>
	<transition>
		<id>t2</id>
		<x>500</x>
		<y>140</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>To First</label>
		<roleRef>
			<id>system</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
	</transition>
	<transition>
		<id>t1</id>
		<x>260</x>
		<y>220</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Decide</label>
		<roleRef>
			<id>main</id>
			<logic>
				<perform>true</perform>
			</logic>
		</roleRef>
		<dataGroup>
			<id>DataGroup</id>
			<layout>grid</layout>
			<dataRef>
				<id>enumeration_0</id>
				<logic>
					<behavior>editable</behavior>
					<behavior>required</behavior>
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
			<id>t1_finish</id>
			<actions phase="pre">
				<action>text_2: f.text_2;
change text_2 value { "Decision made."; }
</action>
			</actions>
			<actions phase="post">
				<action>enumeration_0: f.enumeration_0;

if (enumeration_0.value == "To First") {
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
</action>
			</actions>
		</event>
	</transition>
	<transition>
		<id>t9</id>
		<x>620</x>
		<y>420</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Status</label>
		<dataGroup>
			<id>DataGroup</id>
			<layout>grid</layout>
			<dataRef>
				<id>text_1</id>
				<logic>
					<behavior>hidden</behavior>
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
				<id>text_2</id>
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
		</dataGroup>
	</transition>
	<!-- PLACES -->
	<place>
		<id>p6</id>
		<x>620</x>
		<y>300</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p5</id>
		<x>1100</x>
		<y>220</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p4</id>
		<x>860</x>
		<y>220</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p3</id>
		<x>620</x>
		<y>140</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p2</id>
		<x>380</x>
		<y>220</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p1</id>
		<x>100</x>
		<y>220</y>
		<label></label>
		<tokens>1</tokens>
		<static>false</static>
	</place>
	<!-- ARCS -->
	<arc>
		<id>a1</id>
		<type>regular</type>
		<sourceId>p1</sourceId>
		<destinationId>t1</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a2</id>
		<type>regular</type>
		<sourceId>t1</sourceId>
		<destinationId>p2</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a3</id>
		<type>regular</type>
		<sourceId>p2</sourceId>
		<destinationId>t2</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a4</id>
		<type>regular</type>
		<sourceId>t2</sourceId>
		<destinationId>p3</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a5</id>
		<type>regular</type>
		<sourceId>p3</sourceId>
		<destinationId>t3</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a6</id>
		<type>regular</type>
		<sourceId>t3</sourceId>
		<destinationId>p4</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a7</id>
		<type>regular</type>
		<sourceId>p4</sourceId>
		<destinationId>t4</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a8</id>
		<type>regular</type>
		<sourceId>t4</sourceId>
		<destinationId>p5</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a10</id>
		<type>regular</type>
		<sourceId>p2</sourceId>
		<destinationId>t6</destinationId>
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
		<sourceId>p6</sourceId>
		<destinationId>t7</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a13</id>
		<type>regular</type>
		<sourceId>t7</sourceId>
		<destinationId>p4</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
</document>
```