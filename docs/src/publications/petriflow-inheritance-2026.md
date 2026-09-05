::: titlepage
<!-- ![image](LOGA_PROJEKTY_R2R4.jpg){height="2cm"} -->\
Pan-European University, Faculty of Informatics\
Interim Research Report\
**Definition of inheritance and interface for object-centric
processes\**
of the project\
**Requirements and formal definition of a low-code language based on
object-centric processes - LowcodeOCP\**
Authors:\
Gabriel Juhás, Milan Mladoniczky, Juraj Mažári, Tomáš Kováčik and
Michaela Popovičová\
Contact:\
gabriel.juhas@paneurouni.com, milan.mladoniczky@paneurouni.com\
Funded by the EU NextGenerationEU through the Recovery and Resilience
Plan for Slovakia under the project No.\
09I03-03-V04-00493\
2026-09-05\
Version: v0.1
:::

# Executive Summary {#executive-summary .unnumbered}

Provide a non-technical 1--2 page summary: objectives, scope, key
achievements so far, preliminary results, notable deviations from plan,
upcoming milestones, and high-level risks.

# Introduction

## Background and Motivation

Context of the problem, why it matters, and who benefits.

## Objectives and Scope

List primary and secondary objectives. Define the scope and out-of-scope
items.

## Research Questions / Hypotheses

State the research questions or hypotheses driving the work.

# Related Work

Petri nets have several types of inheritance, and this article will
focus mainly on the concept of inheritance according to W. M. P. van der
Aalst and T. Basten, who described it in detail in their work
*Life-cycle inheritance: a Petri-Net-Based approach* 
[@vanDerAalst1996]. This inheritance is based on the basic principles of
object-oriented programming and uses their design. The most widespread
methodologies Object Modeling Technique and Object-Oriented Design use
state transition diagrams to specify the dynamics of behavior. A state
diagram is created for each class, which serves to represent the states
and the methods that change these states.[@VargThesis]

The inheritance described in the aforementioned work presents a Petri
net as a specification that represents the dynamics of a class of
objects. The states that the class can be in are represented by
*places*, while *transitions* represent the dynamics that change
individual states. [@VargThesis]

## Object Lifecycle

In order to define a lifecycle, we need to define some basic rules. The
first is the representation of the object itself and its properties.
Each object consists of 2 basic methods, namely 'Create' and 'Destruct'.
Another important aspect is to create a set of methods that are
internal, unable to communicate outside its object, and external, which
are freely available for use by other objects. The lifecycle itself
serves as a queue for the methods in which sequence they should be run.
In order to create a polynomial algorithm for verifying the conditions,
we define that the Petri nets that we will examine are bounded.
[@VargThesis]

### Benefits of using Petri Nets

Using Petri Nets instead of traditional state diagrams brings several
advantages [@VargThesis]:

- *Parallelism and Concurrency:* Petri Nets naturally model situations
  where multiple events can occur in parallel.

- *Synchronization:* They simply express situations where it is
  necessary to wait for multiple events or states at the same time.

- *Formal Analysis:* There are a number of tools and techniques for
  analyzing Petri Nets that allow detecting errors already in the design
  phase.

- *Extensions:* Petri Nets can be extended with colors (Coloured Petri
  Nets), time (Timed Petri Nets) or hierarchical structures, which
  allows modeling more complex behavior of objects and systems.

### Types of Petri Net Inheritance

The paper describes the four basic inheritances [@VargThesis]:

- *Protocol*

- *Projection*

- *Protocol/projection*

- *Lifecycle inheritance*

In the following part of the article, the individual inheritances will
be explained verbally and with examples [@VargThesis].

#### Protocol Inheritance {#sec:protocol-inheritance}

Protocol inheritance is based on the principle of encapsulation, where
it is assumed that the superclass (parent) class will block all newly
added methods in the subclass. In this case, the behavior of the
subclass when using only the original methods will remain identical to
the behavior of the superclass [@VargThesis].

As an example, we have the network in
Figure [2.1](#fig:petri-9){reference-type="ref"
reference="fig:petri-9"}, which consists of four locations *p1*, *p2*,
*p3* and *p4* and three transitions *t1*, *t2* and *t3*. The initial
marking is at location *p1*, which allows the transition *t1* to be
performed. Subsequently, the mark goes to *p2* and by activating the
transition *t2* we get to *p3*. The last step is to perform the
transition *t3*, which moves the tokens to the final state *p4*
[@VargThesis].

<!-- ![Parent Petri net](img/img9.png){#fig:petri-9 width="75%"} -->

Figure [2.2](#fig:petri-10){reference-type="ref"
reference="fig:petri-10"} shows a network of a subordinate (daughter)
object with the same number of locations, but with one additional
transition *t4*. This new transition creates an alternative path between
locations *p2* and *p3*. In normal execution, we can therefore use
either the original transition *t2* or the newly added transition *t4*
[@VargThesis].

However, if we apply the idea of protocol inheritance and disable
(so-called *block*) all new transitions -- in our case, *t4* -- only the
original transitions *t1*, *t2*, and *t3* remain in the daughter
network. As a result, the behavior of the child class network becomes
equivalent to that of the parent class network: we start at *p1*,
perform *t1* to *p2*, then *t2* to *p3*, and finally *t3* to *p4*. This
confirms that after restricting the new methods (transitions), the
achievable course is identical to the parent network, which corresponds
to the definition of protocol inheritance
[@vanDerAalst1996; @VargThesis].

<!-- ![Child Petri net with additional transition with protocol
inheritance](img/img10.png){#fig:petri-10 width="75%"} -->

#### Projection inheritance

The second basic type of inheritance that we can derive from
process-algebraic concepts is *projection inheritance*. In this case, we
consider new methods (or transitions in a Petri net) to be *internal* --
that is, the external environment does not observe them. Formally, this
corresponds to the operation of *abstraction* (so-called *hiding*,
renaming to $\tau$) [@VargThesis].

> *The idea of projection inheritance*:\
> Even when using new (internal) methods of a child (subordinate)
> object, the behavior *with respect to the original methods* must not
> change. In other words, if the environment \"does not notice\"
> internal methods, the observable behavior of the child object
> (subclass) is identical to the behavior of the parent (superior)
> object [@VargThesis].

In protocol inheritance, we *blocked* new methods to prove that after
disabling them, the behavior of the child Petri net is identical to the
behavior of the parent. In projection inheritance, on the other hand, we
*do not block* new methods, but instead *hide* (abstract) them, i.e. we
replace their marking with a *silent symbol* $\tau$, which the
environment does not see. If such hidden transitions do not affect the
original transitions in any way (i.e. they do not block them or change
their availability), the child network will exhibit the same behavior as
the parent from the perspective of the old transitions (methods)
[@VargThesis].

##### Why is our example of protocol inheritance not projection inheritance?

In the example in Figure [2.2](#fig:petri-10){reference-type="ref"
reference="fig:petri-10"}, we added a transition *t4* to the child
network, which creates an alternative path between *p2* and *p3*. To
preserve projection inheritance, this new transition would have to be
*internal* in the sense that it would not change the accessibility or
tracking of the old transitions *t1*, *t2*, *t3*. In other words, if we
were to hide (abstract) *t4*, the environment would not be able to
distinguish whether *t4* exists or not [@VargThesis].

In our example, however, the transition *t4* allows for an *alternative*
path, so it actually changes (extends) the achievable behavior of the
network (for example, it can speed up or change the transition between
older states). Thus, in the abstraction, *t4* would be , but it would
affect the original transitions (e.g. by not terminating *t2*, or by
changing the order of execution of other transitions). Thus, the
environment can distinguish (at least indirectly) that there is another
path, and thus the behavior is not identical to the original network.
For this reason, the example satisfies *protocol*, but not *projection*
inheritance. [@vanDerAalst1996; @VargThesis]

In practice, *projective inheritance* is used mainly when we do not need
to explicitly block new methods (transitions), but we want them to be
*invisible* from the perspective of the parent (superior) network. This
situation is typical in cases where new methods (e.g. auxiliary internal
calls) do not change the observable course of the object's life cycle in
the eyes of the external environment. [@vanDerAalst1996; @VargThesis]

An example of such inheritance is easy to demonstrate. Let's keep our
parent network from the previous example and create a new daughter
network that will have 2 additional places p5 and p6, transition t5.
[@VargThesis]

<!-- ![Child Petri Net with Projective
Inheritance](img/img11.png){#fig:petri-11 width="75%"} -->

When starting the child network, if we follow the parent's direction, we
will conclude that t3 is not executable. Let's focus on starting
internal $\tau$ transitions. After starting transition t5, we have the
option to start t3 and thus reach the final state. From the perspective
of the parent, who does not see the $\tau$ transitions, it appears that
the sequence of transitions is preserved. Therefore, we can call this
network a subordinate one with projection inheritance.
[@vanDerAalst1996; @VargThesis]

#### Protocol/Projection Inheritance

To achieve the strongest form of inheritance, we must use both
inheritances described so far. Combining them creates the so-called
Protocol/Projection Inheritance. [@vanDerAalst1996; @VargThesis]

#### Lifecycle Inheritance

This is the weakest form of inheritance. This inheritance requires that
each new method of a subclass fulfills at least one of the two
inheritances already described (protocol or projection) [@VargThesis].

As an example, we will use the parent network again and add a new
network to it, which is created by combining the two introduced child
networks. [@vanDerAalst1996; @VargThesis]

<!-- ![Child Petri net with combined elements](img/img12.png){#fig:petri-12
width="75%"} -->

In the previous sections, we saw that by adding the transition *t4* to
the network we achieved *protocol inheritance*, while by introducing the
$\tau$-transitions *t5* and *t6* we verified *projection inheritance*.
However, the transition *t4* does not satisfy the conditions of
projection inheritance (see the chapter *Why is our example of protocol
inheritance not projection inheritance?*), and since the
$\tau$-transition *t6* prevents the execution of *t3* (which violates
the protocol inheritance rule), we cannot consider this network as
*protocol/projection* inheritance either. As a result, it is *lifecycle
inheritance* -- the weakest of the presented forms.
[@vanDerAalst1996; @VargThesis]

#### Transformation rules preserving inheritance in Petri nets

##### First transformation rule

We have already used this rule when detecting protocol inheritance in
the previous example. It says that if we block all newly added
transitions, the old transitions will remain executable in their
original order. [@vanDerAalst1996; @VargThesis]

##### Second transformation rule

The second rule helps us verify that the life cycle extension satisfies
the conditions of projection inheritance [@VargThesis].

In simple terms:

- First, we extend the original (parent) life cycle with a new part
  (child net).

- We make sure that the original and new parts do not share any
  locations, so that there is no mixing.

- All transitions that are added in the new extension have completely
  new names (so that we know that they are really new).

- If the original lifecycle also removes tags from this child network,
  it must do so in a way that does not affect the behavior of the
  original transitions.

- Finally, it must be verified that the resulting connection is still a
  closed entity with a clear beginning and end (i.e. remains a valid
  lifecycle).

If all these conditions are met, we say that the extended lifecycle is,
from the perspective of projection inheritance a \"child\" of the
original (parent) lifecycle. Thus, the new transitions are considered
internal and, from the perspective of an external observer, do not
disrupt the behavior of the original transitions.
[@vanDerAalst1996; @VargThesis]

# Methods and Approach

## Methodology

## Inheritance in Petriflow

We took the Petriflow platform as a example because it is a low-code
platform that adheres to the principles of object-centric processes. We
will continue to build our concept on this solution. Currently, there is
no clearly implemented method of inheritance, but there are procedures
available that can achieve at least partial inheritance. In the next
section, we will therefore discuss the current inheritance options in
more detail [@VargThesis].

### Current state of inheritance

As an example, we present a simple example that demonstrates how to
create partial inheritance. In this case, the inheritance only concerns
data that we can \"propagate\" to a child process. In Petriflow, there
is currently no inheritance that preserves the entire lifecycle of an
object. The following example is taken from a proposal for a system
integrator using the Petriflow language [@VargThesis].

<!-- ![Illustrative example](img/img16.png){#fig:img16 width="50%"} -->

In the figure is shown,that there is a parent class *PermitVess*, which
has a relationship with the class *Temporary Permit VP*. This
relationship is called inheritance and in practice means that the
subclass *Temporary Permit VP* contains all the attributes of the class
*PermitVess/Permit*. To achieve this behavior, Petriflow offers several
ways to model individual processes [@VargThesis]:

- Duplicate creation of a network in the child class, which copies all
  parts of the original process.

- Use of predefined data structures capable of displaying entire tasks
  from other processes, which gives us access to their attributes.

To maintain a reference to a parent or child process, we can store their
identifiers in the `caseRef` data variable (or use a text variable),
which gives us access to both cases. Next, we need to determine which
data we want to reference and put it in a transition that will be
referenced in the child process. Since this is only a reference to the
respective task, if we change any data in it, it will also change in the
parent case. Technically, this is inheritance within the case, because
we are still referring to the existing task of the given case
[@VargThesis].

In this way, we can reference the data of the parent process within the
child process and simulate the inheritance logic we know from UML
diagrams in the context of the Petriflow language [@VargThesis].

### Current Inheritance Problems

In the previous section, we described how inheritance can be achieved as
represented in UML diagrams, but inheritance as conceived does not
address the entire life cycle of an object. Since it is only a matter of
referencing, we encounter the main disadvantage of this approach. If we
compare this to object-oriented languages, in which a subclass creates
its own attributes (or modified values), from the perspective of the
superclass, the original data remains unchanged [@VargThesis].

Similarly, in Petriflow, if we simply reference the original task
(parent class) in a child process, we can access the parent data, which
we then change the value of, which is undesirable behavior in
inheritance. At the same time, from a \"lifecycle\" perspective, each
process remains a separate entity. For this reason, in the current
version of Petriflow, full-fledged inheritance, such as we know from
object-oriented languages, cannot be achieved [@VargThesis].

### The Original Concept of Inheritance

The first point was to study the concepts of inheritance in Petri nets,
which represent the life cycle of a process in Petriflow. After studying
them, we created a table that briefly illustrates the three basic forms
of inheritance [@VargThesis]:

::: {#tab:inheritance-forms}
  *Inheritance type*         *When used*                                                                                                                                  *Example from practice (in Petriflow)*
  -------------------------- -------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  *Protocol inheritance*     When extending the original process with new, optional methods that can be \"blocked\" if necessary.                                         Extending the order with a new step *Skip discount verification*, which is called only when a special request is made, otherwise it is blocked.
  *Projection inheritance*   When adding new methods that are hidden (abstracted) from the old lifecycle perspective so that they do not change its order and behavior.   In a complaint, we can add internal *analysis/tests* to diagnose errors that do not externally affect the original steps (e.g. *Additional discount verification*).
  *Lifecycle inheritance*    The most general form of inheritance, where new methods can be either blocked or hidden (i.e. connects the protocol and projection paths).   In complex business workflows (e.g. wholesale orders), we choose whether to "hide" or block extended steps as needed.

  : Three forms of Petri lifecycle inheritance (according to Aalst &
  Basten, 1996).
:::

The literature mentions the *create* transition (represented by a
triangle symbol) and the *delete* transition (simulating the removal of
an object), so we focused on the so-called  *bounded networks*. Since
Petriflow automatically generates the *create* and *delete* transitions
in the background without the user having to explicitly model them, we
decided to represent these states in the model by adding a separate
*place* [@VargThesis].

# Results to Date

Summarise completed experiments/analyses. Use figures and tables with
clear captions.

## Quantitative Results

::: tabular
l S S S Model & Accuracy (%) & Precision (%) & Recall (%)\
Baseline A & 78.3 & 75.1 & 76.2\
Prototype B & 82.7 & 81.4 & 80.2\
:::

## Qualitative Results

Add representative examples, error analyses, ablation notes, or case
studies.

# Discussion

Interpret interim results, limitations, threats to validity, and
implications. Compare against related work.

# Work Plan

## Completed Milestones

Bullet list with dates.

## Upcoming Milestones and Timeline

Outline remaining tasks with target dates. A simple timeline table:

  Start        End          Task
  ------------ ------------ -------------------------------
  2025-10-01   2025-10-15   Data augmentation experiments
  2025-10-16   2025-11-05   Model tuning and validation
  2025-11-06   2025-11-20   Error analysis and ablations
  2025-11-21   2025-12-05   Write-up of final report

  : Planned timeline (next quarter)

## Risks and Mitigations

Identify top risks (technical, data, resourcing) and planned
mitigations.

# Resources and Budget (Optional)

Summarise compute, software, datasets, and estimated costs.

# Ethics, Privacy, and Data Management

Describe data handling, consent, privacy safeguards, bias assessment,
and data management plan.

# Conclusion

Recap progress, highlight contributions so far, and restate next steps.

# Supplementary Material

Additional figures, tables, or proofs.

# Glossary and Acronyms (Optional)

Define specialised terms and acronyms used in the report.
