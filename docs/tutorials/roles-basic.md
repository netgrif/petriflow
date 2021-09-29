# Roles - basic

## What you will build

You will build a process-driven application that contains few basic roles. You will find out how simple is to create roles, assign them to tasks in Application builder, assign them to users in the Application Engine and work with them once process instance is created.

## What you will need

<ul>
    <li>10 - 15 minutes</li>
    <li>Netgrif SDK already installed</li>
    <li>Access to the internet for builder.netgrif.com site</li>
    <li>Created free account at demo.netgrif.com to test the process</li>
</ul>

## Tutorial

### Creation of roles

In the following process, you will create process with four states (places) and five tasks (transitions).

[Example process](#example-process)

<ol>
    <li>Each task will be assigned to different role. To create roles, you need to select Role edit view in the main toolbar.</li>
    <li>In order to create new role inside the Role edit view you need to click "Add role" button. After role was created open the role and specify its ID (by default it is generated, but you can change it) and Title.</li>
    <li>Create at least three roles: Admin, Role of the first user and Role of the second user.</li>
</ol>

_Detail where is Role edit view located:_

<p align="center">
    <img src="_media/roles-basic/1.png">
</p>

_Detail how to create one role in Role edit view:_

<p align="center">
    <img src="_media/roles-basic/2.png">
</p>

_Example of roles creation:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/roles-basic/1.mp4" type="video/mp4">
    </video>
</p>

### Assign roles to tasks

In order to assign roles to tasks you have to:
<ol>
    <li>Use the right mouse click while the Select tool is selected in Edit view and choose "Manage permissions".</li>
    <li>Dialog called "Transition Permitions" will appear with multiple options. In this tutorial we will go just with Perform column.</li>
    <li>For trantitions "Choose first", "Choose second" and "Task of the admin" click once in row admin, column Perform.</li>
    <li>For trantition "First" click once in row role_1, column Perform.</li>
    <li>For trantition "Second" click once in row role_1, column Perform.</li>
</ol>

_Detail of how to get to Manage Permissions:_

<p align="center">
    <img src="_media/roles-basic/3.png">
</p>

_Detail of how to assign role to Perform:_

<p align="center">
    <img src="_media/roles-basic/4.png">
</p>

_Example of roles assignment to tasks:_

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/roles-basic/2.mp4" type="video/mp4">
    </video>
</p>

### Upload process into the Application Engine

Before you will upload the process with all roles into the Application Engine, you have to download/save it.

_Detail of how to export created process:_

<p align="center">
    <img src="_media/roles-basic/5.png">
</p>

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/roles-basic/3.mp4" type="video/mp4">
    </video>
</p>

### Play with the roles

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/roles-basic/4.mp4" type="video/mp4">
    </video>
</p>

### Example process

```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://netgrif.github.io/petriflow/petriflow.schema.xsd">
	<id>roles</id>
	<initials>RLS</initials>
	<title>Roles tutorial</title>
	<defaultRole>true</defaultRole>
	<transitionRole>false</transitionRole>
	<!-- TRANSACTIONS -->
	<!-- ROLES -->
	<!-- PROCESS ROLE REFS -->
	<!-- PROCESS USER REFS -->
	<!-- DATA -->
	<!-- I18NS -->
	<!-- TRANSITIONS -->
	<transition>
		<id>t1</id>
		<x>180</x>
		<y>100</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Choose first</label>
	</transition>
	<transition>
		<id>t2</id>
		<x>340</x>
		<y>100</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>First</label>
	</transition>
	<transition>
		<id>t4</id>
		<x>500</x>
		<y>140</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Task of the  admin</label>
	</transition>
	<transition>
		<id>t5</id>
		<x>180</x>
		<y>180</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Choose second</label>
	</transition>
	<transition>
		<id>t6</id>
		<x>340</x>
		<y>180</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label>Second</label>
	</transition>
	<!-- PLACES -->
	<place>
		<id>p1</id>
		<x>100</x>
		<y>140</y>
		<label></label>
		<tokens>1</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p2</id>
		<x>260</x>
		<y>100</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p5</id>
		<x>420</x>
		<y>140</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p7</id>
		<x>260</x>
		<y>180</y>
		<label></label>
		<tokens>0</tokens>
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
		<id>a6</id>
		<type>regular</type>
		<sourceId>t2</sourceId>
		<destinationId>p5</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a7</id>
		<type>regular</type>
		<sourceId>p5</sourceId>
		<destinationId>t4</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a9</id>
		<type>regular</type>
		<sourceId>p1</sourceId>
		<destinationId>t5</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a10</id>
		<type>regular</type>
		<sourceId>t5</sourceId>
		<destinationId>p7</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a11</id>
		<type>regular</type>
		<sourceId>p7</sourceId>
		<destinationId>t6</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a13</id>
		<type>regular</type>
		<sourceId>t6</sourceId>
		<destinationId>p5</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
</document>
```