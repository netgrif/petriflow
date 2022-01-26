# Places, Transitions & Arcs

## What you will build

You will build a simple Petriflow model composed of only three basic components: places, transitions and arcs. Petriflow (the name is composed of **Petri** nets & Work**flow**) is based on Petri nets and is a language meant to create understandable and easy to make Workflow models. In this tutorial, you will create a simple Petriflow model of a bus driver taking max. 5 people. Alongside this, you will find out everything important about three basic components.

## What you will need

* 10 - 15 minutes
* Netgrif Application Engine CE already installed or created free account at [demo.netgrif.com](https://demo.netgrif.com)
* Access to the internet for [builder.netgrif.com](https://builder.netgrif.com) site

## Building blocks of Petri nets

Petri nets are composed of two main components.
**Transitions (squares)** and **places (circles)**.
A place can contain **tokens (resources of places, a discrete number of marks).**

<p align="center">
    <img src="_media/plases_transitions_arcs/t1.png" height="150">
    <img src="_media/plases_transitions_arcs/p1.png" height="150">
</p>

## Basic rules

Transitions and places are connected with **arc (directed line)**.
Arcs can connect **places with transitions** or **transitions with places**.

<p align="center">
    <img src="_media/plases_transitions_arcs/1.gif" height="220">
</p>

It is **impossible** to **connect the transition with transition** or **place with the place**.
This is due to the fact that Petri Nets are [bipartite graphs](https://en.wikipedia.org/wiki/Bipartite_graph).

<p align="center">
    <img src="_media/plases_transitions_arcs/2.gif" height="220">
</p>

You can connect multiple places with one transition.
Same way you can connect multiple places with one transition.

<p align="center">
    <img src="_media/plases_transitions_arcs/3.gif" height="220">
    <img src="_media/plases_transitions_arcs/4.gif" height="220">
<p align="center">

In classical Petri nets, firing a transition is one atomic event.
During this event, a **transition consumes tokens from connected input places and produce tokens to output places**.
The number of consumed and produced tokens is according to the firing rule in original Petri nets. For more info please consider reading <a href="https://netgrif.com/petriflow-rapid-language-for-modelling-petri-nets-with-roles-and-data-fields/">our research paper on this topic</a>.

<p align="center">
    <img src="_media/plases_transitions_arcs/5.gif" height="220">
</p>

Transitions in Petri nets are executable only in the case that all basic firing conditions are fulfilled.
As we can see places **p26** and **p27** both contain a single token. That’s enough to make transition executable.

<p align="center">
    <img src="_media/plases_transitions_arcs/6.gif" height="220">
</p>

In this case we can see, that transition is **not executable** because place **p1 is missing a token**.
Transition will **not** be **executable** until both places **p1** and **p2** **contain at least one token**.

<p align="center">
    <img src="_media/plases_transitions_arcs/7.gif" height="220">
<p align="center">

The basic characteristic of arcs is their **multiplicity** (cardinality). The **default multiplicity** of **every arc is one**. That can be changed to any discrete number.

<p align="center">
    <img src="_media/plases_transitions_arcs/8.gif" height="220">
</p>

_Firing rules with multiplicity_

**Input places** have to contain **at least as many tokens** as the **multiplicity of** the corresponding **input arc**.

**Transition removes** as many **tokens** from **input places** as the **multiplicity of** the **corresponding input arc**.

**Transition creates** as many **tokens** in **output places** as the **multiplicity of** the **corresponding output arc**.

<p align="center">
    <img src="_media/plases_transitions_arcs/9.gif" height="220">
    <img src="_media/plases_transitions_arcs/10.gif" height="220">
</p>

Arcs can be used between **place and transition** in **both directions** in the **same pair**.

During the **firing event** token from the place is taken by **input arc**, but in this case, it is also **given back** by **output arc**.

All other basic rules are applied even in this case, e.g. multiplicity of arc.

<p align="center">
    <img src="_media/plases_transitions_arcs/11.gif" height="220">
</p>

<p align="center">
    <img src="_media/plases_transitions_arcs/12.gif" height="220">
</p>

## Tutorial

<p align="center">
    <video controls style="height: 400px;">
      <source src="_media/plases_transitions_arcs/13.mp4" type="video/mp4">
    </video>
</p>

An instance of this process will allow you to: 

<ol>
<li>Initialize application by first transition (task)</li>
<li>Decide if you want to use an upper or lower branch or by both (each branch can have different functionality)</li>
<li>Join both branches and finalize the main process</li>
<li>Wait until at least five transitions were fired in the main process and initialize new branch</li>
</ol>

### Used tools

<p align="center">
    <img src="_media/plases_transitions_arcs/14.gif">
<p align="center">

**Place** - Functionality that allows placing Place into the canvas.

**Transition** - Functionality that allows placing Transition into the canvas.

**Fast PN** - Functionality that allows the creation of complex models by placing Places and Transitions joined by Arcs into the canvas.

**Add token** - Increase marking of selected Place by one after each click.

**Remove token** - Decrease marking of selected Place by one after each click.

**Change marking** - Change marking of selected Place by any integer after each click.

**Arc** - Functionality that allows joining Places and Transitions and vice versa in the canvas.

**Arc Weight** - Change the weight of the selected Arc by any integer after each click.

**Align elements** - Align Places and Transitions into the grid in the canvas.

**Move** - Changes the current location of/move Places and Transitions in the canvas.

### Process application created in the tutorial (an XML file)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://netgrif.github.io/petriflow/petriflow.schema.xsd">
	<id>pta_process</id>
	<initials>PTA</initials>
	<title>New PTA model</title>
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
		<id>t11</id>
		<x>940</x>
		<y>620</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label></label>
	</transition>
	<transition>
		<id>t8</id>
		<x>1060</x>
		<y>300</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label></label>
	</transition>
	<transition>
		<id>t7</id>
		<x>820</x>
		<y>300</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label></label>
	</transition>
	<transition>
		<id>t5</id>
		<x>1300</x>
		<y>220</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label></label>
	</transition>
	<transition>
		<id>t4</id>
		<x>1060</x>
		<y>140</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label></label>
	</transition>
	<transition>
		<id>t3</id>
		<x>820</x>
		<y>140</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label></label>
	</transition>
	<transition>
		<id>t2</id>
		<x>500</x>
		<y>220</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label></label>
	</transition>
	<transition>
		<id>t1</id>
		<x>220</x>
		<y>220</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label></label>
	</transition>
	<transition>
		<id>t10</id>
		<x>740</x>
		<y>620</y>
		<layout>
			<offset>0</offset>
		</layout>
		<label></label>
	</transition>
	<!-- PLACES -->
	<place>
		<id>p12</id>
		<x>1020</x>
		<y>620</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p11</id>
		<x>860</x>
		<y>620</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p8</id>
		<x>980</x>
		<y>300</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p7</id>
		<x>660</x>
		<y>300</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p6</id>
		<x>1420</x>
		<y>220</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p5</id>
		<x>1180</x>
		<y>220</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p4</id>
		<x>980</x>
		<y>140</y>
		<label></label>
		<tokens>0</tokens>
		<static>false</static>
	</place>
	<place>
		<id>p3</id>
		<x>660</x>
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
	<place>
		<id>p10</id>
		<x>740</x>
		<y>500</y>
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
		<id>a9</id>
		<type>regular</type>
		<sourceId>p5</sourceId>
		<destinationId>t5</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a10</id>
		<type>regular</type>
		<sourceId>t5</sourceId>
		<destinationId>p6</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a12</id>
		<type>regular</type>
		<sourceId>t2</sourceId>
		<destinationId>p7</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a13</id>
		<type>regular</type>
		<sourceId>p7</sourceId>
		<destinationId>t7</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a14</id>
		<type>regular</type>
		<sourceId>t7</sourceId>
		<destinationId>p8</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a15</id>
		<type>regular</type>
		<sourceId>p8</sourceId>
		<destinationId>t8</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a16</id>
		<type>regular</type>
		<sourceId>t8</sourceId>
		<destinationId>p5</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a18</id>
		<type>regular</type>
		<sourceId>t1</sourceId>
		<destinationId>p10</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a19</id>
		<type>regular</type>
		<sourceId>t2</sourceId>
		<destinationId>p10</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a20</id>
		<type>regular</type>
		<sourceId>t3</sourceId>
		<destinationId>p10</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a21</id>
		<type>regular</type>
		<sourceId>t7</sourceId>
		<destinationId>p10</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a22</id>
		<type>regular</type>
		<sourceId>t4</sourceId>
		<destinationId>p10</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a23</id>
		<type>regular</type>
		<sourceId>t8</sourceId>
		<destinationId>p10</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a24</id>
		<type>regular</type>
		<sourceId>t5</sourceId>
		<destinationId>p10</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a25</id>
		<type>regular</type>
		<sourceId>p10</sourceId>
		<destinationId>t10</destinationId>
		<multiplicity>5</multiplicity>
	</arc>
	<arc>
		<id>a26</id>
		<type>regular</type>
		<sourceId>t10</sourceId>
		<destinationId>p11</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a27</id>
		<type>regular</type>
		<sourceId>p11</sourceId>
		<destinationId>t11</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
	<arc>
		<id>a28</id>
		<type>regular</type>
		<sourceId>t11</sourceId>
		<destinationId>p12</destinationId>
		<multiplicity>1</multiplicity>
	</arc>
</document>
```