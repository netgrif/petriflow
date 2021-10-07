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
    <img src="_media/data-basic/1.gif">
</p>

_Detail of data edit view:_
<img src="_media/data-basic /4.png">

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
    <img src="_media/data-basic/2.gif">
</p>

_Detail:_

<p align="center">
    <img src="_media/data-basic/5.png">
</p>

### Creation of new variable (Form edit view)

Example of placing new data variables into the data form and then setting its validation:
<p align="center">
    <img src="_media/data-basic/3.gif">
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
