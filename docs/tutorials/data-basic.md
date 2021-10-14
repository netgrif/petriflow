# Data - basic

## What you will build

You will build a basic data form and most common data variables - text and numbers - in a process-driven application. You will find out how simple are data used, created and initialized in Netgrif Application Builder.

## What you will need

<ul>
    <li>10 - 15 minutes</li>
    <li>Netgrif SDK already installed</li>
    <li>Access to the internet for builder.netgrif.com site</li>
    <li>Created free account at demo.netgrif.com to test the process</li>
</ul>

## Tutorial
### Creation of new variable (Data edit view)

The creation of new data variables is done in the Data edit view and in the Data form view. In Data edit view new data variables can be created and existing data variables can be managed or deleted.

<p align="center">
    <img src="_media/data-basic/8.png">
</p>

Once the data variable is created, (by a plus sign - "Add data variable") you can set its attributes:

<ol>
    <li> <b>ID.</b> Default, the ID is generated, but it is possible to change it by the button "Refactor field ID".</li>
    <li> <b>Title.</b></li>
    <li> <b>Type.</b> The default type is Text. This can be easily changed to e.g. Number or Enumeration by clicking on the drop-down list.</li>
    <li> <b>Is Immediate?</b> By default its value is false. If changed to true, the data variable could be used in the Application Engine for searching.</li>
    <li> <b>Set Description.</b></li>
    <li> <b>Set Placeholder.</b> If the data variable has no value, the placeholder will be shown instead of it.</li>
    <li> <b>Set Init Value.</b> Is an initial value for every usage of the data variable.</li>
    <li> <b>Set Validations.</b> One validation can be added by clicking plus sign. Multiple validations can be applied. Validates whether the value of a data variable matches the pattern specified by a regular expression.</li>
</ol>

_Example of creation of data in data edit view:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/data-basic/1.mp4" type="video/mp4">
    </video>
</p>

_Detail of data edit view:_
<img src="_media/data-basic/4.png">

### Drag'n'Drop of existing elements into the data form grid (Form edit view)

When you have placed at least one transition (task) into the canvas, you are able to create data forms. One data form can be assigned to one task. To create a data form you have to use the right mouse click while the Select tool is selected in Edit view and choose "Create form".

<p align="center">
    <img src="_media/data-basic/9.png">
</p>

Once Data from view is opened, you are able to place into the grid any existing or new data variables.
Placing data variables into the grid is simple - it is done by drag'n'drop. Then they can be resized and modified.
Almost all data variable attributes can be changed in the right navigation panel instead of validations, type and property immediate.
Validations and Is Immediate? can be set only in the Data edit view. The type of the data variable dragged into the form is defined by
a group from which you choose the field in the list from left navigation.

_Example of placing existing and new data variables into the data form:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/data-basic/2.mp4" type="video/mp4">
    </video>
</p>

_Detail:_

<p align="center">
    <img src="_media/data-basic/5.png">
</p>

### Creation of new variable (Form edit view)

_Example of placing new data variables into the data form and then setting its validation:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/data-basic/3a.mp4" type="video/mp4">
    </video>
</p>

_Detail of the data form:_

<p align="center">
    <img src="_media/data-basic/6.png">
</p>

_Detail of the data edit view:_

<p align="center">
    <img src="_media/data-basic/7.png">
</p>

[comment]: <> (Application Engine Representation)

### Upload process into the Application Engine

Before you will upload the process with all roles into the Application Engine, you have to download/save it.

_Detail of how to export created process:_

<p align="center">
    <img src="_media/data-basic/10.png">
</p>

In order to upload the process into Demo of the Netgrif Application Engine follow the same steps that were used in the Roles basic tutorial in section "Upload process into the Application Engine".

### Play with the instance of uploaded process

_Example of uploading new process into the NAE. Following the creation of a new process instance and playing with data inside the task:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/data-basic/4.mp4" type="video/mp4">
    </video>
</p>

In order to play with the data of your process in <a href="https://demo.netgrif.com/" target="_blank">the Demo of the Netgrif Application Engine</a> follow steps:
<ol>
    <li>Once you are logged in go to the section Role management in the left navigation menu.</li>
    <li>Go to the section, All cases click plus button on the top right side of the screen.</li>
    <li>If only one process was uploaded, there is no need to specify the process you want to choose. If there are multiple processes choose the one called "Data tutorial".</li>
    <li>Once you choose your process, press Create button and now your process instance/case is created.</li>
    <li>After clicking Create button, a new screen with all available tasks of your process will appear. (In this case, only one task is present, so it will automatically expand for you.)</li>
    <li>In the task window, you need to click the Assign button to assign task under your user. Once the task is assigned to you, you can work with data fields inside the task.</li>
    <li>To change values inside each task, click the data field (e.g. My variable) and write a new value inside it.</li>
    <li>To save a value of the data field, click anywhere outside the data field.</li>
    <li>If the value of a data field is not correct (e.g. My number inrange field), the system won't allow you to finish the task. All data need to satisfy their condistions.</li>
</ol>

### Process application created in the tutorial (an XML file)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://netgrif.github.io/petriflow/petriflow.schema.xsd">
	<id>data</id>
	<initials>DTA</initials>
	<title>Data tutorial</title>
	<defaultRole>true</defaultRole>
	<transitionRole>false</transitionRole>
	<!-- TRANSACTIONS -->
	<!-- ROLES -->
	<!-- PROCESS ROLE REFS -->
	<!-- PROCESS USER REFS -->
	<!-- DATA -->
	<data type="text" immediate="true">
		<id>my_variable1</id>
		<title>My variable</title>
		<placeholder>Place here your text.</placeholder>
		<desc>This is text variable</desc>
	</data>
	<data type="text">
		<id>my_second_variable</id>
		<title>My second variable</title>
		<desc>Put your another text here</desc>
	</data>
	<data type="number">
		<id>my_number_field</id>
		<title>My number inrange field</title>
		<desc>Put your number in range 100,1000</desc>
		<validations>
			<validation>
				<expression>inrange 100,1000</expression>
				<message></message>
			</validation>
		</validations>
	</data>
	<!-- I18NS -->
	<!-- TRANSITIONS -->
	<transition>
		<id>t1</id>
		<x>380</x>
		<y>220</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label></label>
		<dataGroup>
			<id>DataGroup</id>
			<layout>grid</layout>
			<dataRef>
				<id>my_second_variable</id>
				<logic>
					<behavior>editable</behavior>
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
				<id>my_variable1</id>
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
			<dataRef>
				<id>my_number_field</id>
				<logic>
					<behavior>editable</behavior>
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
		</dataGroup>
	</transition>
	<!-- PLACES -->
	<!-- ARCS -->
</document>
```