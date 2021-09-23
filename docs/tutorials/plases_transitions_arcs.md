# Places, transitions & arcs

## What you will build

You will build a simple Petriflow model composed of only three basic components: places, transitions and arcs. Petriflow (the name is composed of **Petri** nets & Work**flow**) is based on Petri nets and is a language meant to create understandable and easy to make Workflow models. In this tutorial, you will create a simple Petriflow model of a bus driver taking max. 5 people. Alongside this, you will find out everything important about three basic components.

##What you will need

<ul>
    <li>10 - 15 minutes</li>
    <li>Netgrif SDK already installed</li>
    <li>Access to the internet for builder.netgrif.com site</li>
</ul>

##Tutorial
###Building blocks of Petri nets

Petri nets are composed of two main components.
**Transitions (squares)** and **places (circles)**.
A place can contain **tokens (resources of places, a discrete number of marks).**

<img src="https://netgrif.com/wp-content/uploads/2021/01/t1.png" height="200">
<img src="https://netgrif.com/wp-content/uploads/2021/01/p1.png" height="200">

###Basic rules

Transitions and places are connected with **arc (directed line)**.
Arcs can connect **places with transitions** or **transitions with places**.

<img src="https://netgrif.com/wp-content/uploads/2021/01/1.gif" height="220">

It is **impossible** to **connect the transition with transition** or **place with the place**.
This is due to the fact that Petri Nets are <a href="https://en.wikipedia.org/wiki/Bipartite_graph">bipartite graphs</a>.

<img src="https://netgrif.com/wp-content/uploads/2021/01/2.gif" height="220">

You can connect multiple places with one transition.
Same way you can connect multiple places with one transition.

<img src="https://netgrif.com/wp-content/uploads/2021/01/3.gif" height="220">
<img src="https://netgrif.com/wp-content/uploads/2021/01/4.gif" height="220">

In classical Petri nets, firing a transition is one atomic event.
During this event, a **transition consumes tokens from connected input places and produce tokens to output places**.
The number of consumed and produced tokens is according to the firing rule in original Petri nets. For mo   re info please consider reading <a href="https://netgrif.com/petriflow-rapid-language-for-modelling-petri-nets-with-roles-and-data-fields/">our research paper on this topic</a>.

<img src="https://netgrif.com/wp-content/uploads/2021/01/6.gif" height="220">

Transitions in Petri nets are executable only in the case that all basic firing conditions are fulfilled.
As we can see places **p26** and **p27** both contain a single token. That’s enough to make transition executable.

<img src="https://netgrif.com/wp-content/uploads/2021/09/animation_500_ktwqiztd.gif" height="220">

In this case we can see, that transition is not executable because place p1 is missing a token.
Transition will not be executable until both places p1 and p2 contain at least one token.

<img src="https://netgrif.com/wp-content/uploads/2021/09/animation_500_ktwqiztd.gif" height="220">

