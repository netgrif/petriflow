::: keywords
Object-Centric Process, Petri nets, Application development
:::

# Introduction

Current advancements in process science have established Object-Centric
Processes (OCP) [@Gdowska2025-wh; @De_Weerdt2024-qq], represented by
Object-Centric Petri Nets (OCPN) [@aalst2019ocpn], as a specialized
subclass of Colored Petri Nets (CPN) [@jensen2009coloured] where tokens
are restricted to unique object identifiers. While OCPNs excel at
capturing the 'forest' of concurrent interactions as a runtime execution
model, they often result in complex, monolithic structures that are
difficult to re-implement.

To understand the spectrum of object-aware process modeling, we
categorize Petri net-based models into three categories based on whether
they model the runtime of a system or the definition of object types:

**Object-Centric Processes (The Observational Forest)**: Represented by
OCPN, this is a top-down approach where the entire 'forest' of
interactions is modeled in a single net. Here, objects are merely IDs
(tokens) flowing through a shared environment, primarily used for
descriptive analysis.

**Embedded Object Processes (Trees Embedded in a Forest)**: Represented
by the Nets-within-Nets paradigm [@moldt2004], where object nets act as
tokens within a higher-level system net. While this approach introduces
modularity through a hierarchical structure, the object 'trees' remain
embedded within and dependent on a predefined global 'forest' (the
system net) to orchestrate their lifecycle and cross-object
interactions.

**Process-Centric Objects (PCO) (The DNA of Trees)**: Represented by the
Petriflow language, this category focuses on modeling object types
(classes) by adding a lifecycle directly to the class definition. We
recognize Proclets (Lightweight Nets) as an early, seminal attempt at
this approach, modeling independent process fragments that interact via
messages. Petriflow evolves this concept into autonomous, encapsulated
blueprints where classes define the potential relationships and
interactions of their objects. PCO approach aligns with the vision given
in [@kindler2005], where the authors extend Petri nets into modular
components by formalizing interfaces and composition rules for net
modules.

In PCO approach, the classes define the potential relationships and
interactions of their objects. The 'forest', i.e. the runtime
application is not a static model; it is an emergent running program
created by the interaction of objects from independent Process-Centric
Classes composed like Lego bricks.

These classes can be utilized in two primary ways. First, as in
object-oriented programming, to design an application from scratch.
Second, as part of a two-step reverse engineering framework:

::: compactenum
Step 1: Process Mining from raw object-centric event logs into an OCPN
runtime model (The Forest).

Step 2: Synthesizing these observations into Process-Centric Classes
(The DNA) from the OCPN runtime model.
:::

This transition from a descriptive 'forest' to a prescriptive 'design
model' enables the automated generation of scalable, executable software
architectures directly from observed real-world behavior. Thus,
Process-Centric Object-oriented languages like Petriflow are not
competing with **object-centric process runtime models like OCPN**, but
rather complementing them by providing a direct path to implementation.

Netgrif Platform was designed for modelling and execution of
process-centric objects in language Petriflow [@Juhas2021builder].
Netgrif Platform is used to run many enterprise applications in
different industry fields like healthcare, insurance,
telecommunications, electric utility, and others. The platform is also
used on multiple universities for teaching and research purposes and
management of internal processes, namely on the Faculty of Informatics
and Information Technologies of the Slovak University of Technology, the
Faculty of Informatics of the Pan-European University in Bratislava, the
Faculty of Mathematics and Computer Science of the FernUniversität in
Hagen, and the Faculty of Applied Computer Science of the University of
Augsburg.

# Petriflow Language

Inspired by object-oriented programming (OOP), the basic building blocks
of the *Petriflow* language are **Petriflow classes**. A Petriflow class
serves as a blueprint that encapsulates three integrated layers: *data
attributes*, a *lifecycle* in the form of extended Petri nets, and *user
interfaces* (UI) as forms associated with tasks.

Data attributes are XML-based objects defined by their type, identifier,
title, and various validations. The lifecycle layer is represented by
place/transition nets
[@DBLP:conf/apn/DeselJ01; @Desel05; @DBLP:journals/sosym/DeselR15],
enhanced with inhibitor [@DBLP:conf/apn/AlqarniJ15], read
[@DBLP:journals/tcs/Vogler02a], and reset arcs
[@DBLP:journals/topnoc/AalstHHSVVW09]. Furthermore, Petriflow supports
variable arc weights determined by data attribute values or place
markings, a concept inspired by self-modifying nets
[@DBLP:conf/icalp/Valk78]. The UI layer consists of forms, which are
subsets of data attributes defining permissions such as required,
editable, or read-only for each specific task.

The novelty of this paradigm lies in the vertical integration of these
layers within a single model. The Petriflow interpreter automatically
handles communication between the client-side device, the application
server, and the persistent database. This automation results in compact,
all-in-one, human-readable models that ensure business-aligned execution
while enabling the realization of complex relationships between
different objects.

Relations between **cases** (instances of Petriflow classes) are modeled
at the data layer. Data attributes can store references to one or
multiple related cases, mirroring concepts like foreign keys in SQL,
object references in OOP, or 1:N relationships in class diagrams.

The Petriflow language defines events for classes, cases, lifecycle
tasks, and data attributes. These events can be triggered manually by
users, automatically by the system, or by *actions*---anonymous Groovy
code snippets---as reactions to other events. For example, creating a
new case triggers a *create case event*, which generates a unique
instance (copy) of the underlying Petri net and data attributes defined
in the Petriflow class.

Tasks, represented as transitions, follow semantics based on the
*first-consume-then-produce* principle [@Juhas2000]. Unlike standard
Petri nets where firing is an atomic operation, here it is decomposed
into three discrete logical events:

**Assign (Start)**: Assigns a user to the task and consumes tokens from
the preset of the transition.

**Finish**: Completes the task and produces tokens in the postset of the
transition.

**Cancel**: Aborts the task, unassigns the user, and returns the tokens
consumed during the assign event back to the preset.

Data attributes feature *set* events for value modifications and *get*
events for data retrieval. Access to these events is governed by
role-based access control (RBAC) [@DBLP:conf/emisa/BergenthumDM11].

When an event is triggered, an action can be executed in either the
*pre-phase* or the *post-phase*. Actions in the *pre-phase* operate on
the state (data and markings) as it existed before the event, while
*post-phase* actions work with the updated state. These actions can
trigger a chain of subsequent events across different cases.

By combining data-level references with event synchronization, Petriflow
enables sophisticated coordination. For instance, finishing a task in a
parent case can programmatically trigger *finish* events for tasks in
referenced child cases. Because data attributes can store task
references, Petriflow allows the dynamic embedding of referenced task
forms as sub-forms within a parent form.

Finally, similar to SQL in relational databases, the Petriflow language
provides a powerful query language to create dynamic filters over cases
and their tasks
[@DBLP:conf/modellierung/JuhasMP24; @Juhas2022; @Juhas2023].

# Functional Specification of Order and Invoice Management

To illustrate a process-based application in the Petriflow language,
created and executed on the Netgrif platform, we use a practical example
of managing orders and their associated invoices. The system consists of
two main process classes: *Order* and *Invoice*. The life-cycle of the
classed is depicted in Figure
[1](#fig:builder_order){reference-type="ref"
reference="fig:builder_order"}.

<!-- ![The Netgrif Application Builder interface showing the Petri net
lifecycle for the Order class in editing mode and for Invoice class in
simulation mode with transition (task) Register invoice being assigned
to a user.](order_invoice.png){#fig:builder_order width="\\textwidth"} -->

**The Order Process Lifecycle** The *Order* class contains data
attributes such as *Order ID*, *Subject*, and *Supplier*. It also
includes an attribute for the *Approval Decision*, implemented as an
**enumeration map** (with options `[accept:Accept]`, `[back:Back]`, and
`[reject:Reject`\]).

When a new *Order* is created, the *Order ID* is automatically set.
Following initialization, in form associated with the transition (task)
*Request Order Approval* an employee fills out the order details.
Subsequently, an approving manager executes the *Order Approval* task.
Form of this task contains the enumeration map *Decision*.

The selection in the enumeration map determines the subsequent path of
the order through the use of **variable arcs**. Upon finishing the
*Order Approval* task an action updates the value of attributes
*accept*, *finish* and *back* determining the weights of the
corresponding variable arcs.

Based on the decision, the token is moved accordingly:

::: compactitem
**Accept**: The token moves to the place *accepted* ($p_4$).
Subsequently, the task *Send Order to Supplier* must be executed to move
the token to the *sended* state (place $p_5$).

**Reject**: The token moves to the place *rejected*.

**Back**: The token is returned to the *start* place, allowing for
modifications.
:::

If accepted, the order moves to the *sended* state (represented by a
token in place $p_5$) by assigning and finishing task *Send Order to
Supplier*, making it available for *Bulk Approval* of associated
invoices.

**Invoice Registration and Linkage** Similar to the *Order* process, the
*Invoice ID* is automatically assigned by a script executed in response
to the `createCase` event upon the instantiation of a new *Invoice*
object. Subsequently, a person with the role *Invoice Processor* can
assign themselves the *Register Invoice* task.

In response to the `assign` event of this task, an action is executed to
perform a lookup of all active *Order* instances that currently hold a
token in the place $p_5$ (labeled *sended*). This filter ensures that
only orders already dispatched to a supplier are available for
selection. The *Order ID* values of these retrieved instances are then
populated as keys into the *Parent Order ID* enumeration map of the
invoice:

    // Triggered on 'assign' event of Register Invoice
    def orders = findCases { 
        it.processIdentifier.eq(workspace + "order")
        .and(it.activePlaces.get("p5").eq(1))
    }.collectEntries {  [(it.stringId): "Order: " + it.stringId] }
    change parent_order_id options { orders }

The transmission of the *Invoice ID* to the parent *Order* occurs when
the task is finished:

    // Triggered on 'finish' event of Register Invoice
    def parent_order_case=findCase({it._id.eq(parent_order_id.value)});
    setData("t1", parent_order_case, 
    ["new_invoice_id": ["value": invoice_id.value, "type": "text"]]);

In the *Order* class, a reactive action on the `set` event of the
*new_invoice_id* attribute ensures the ID is added to the collection of
child cases:

    // Triggered on 'set' event of new_invoice_id in the Order class
    if (new_invoice_id.value !in children_invoice_cases.value) {
        change children_invoice_cases value { 
            children_invoice_cases.value + new_invoice_id.value } }

**Continuation of the Invoice Lifecycle** Following registration, the
*Invoice* enters its approval phase. In the form associated with the
task *Invoice approval* the approver interacts with an *enumeration map*
(with options `[OK:Accept]`, `[later:Later]`, and `[KO:Reject`\]).
Similarly to the *Order* approval, a `finish` event action updates the
weights of variable arcs (*ok*, *ko*, and *later*) based on the selected
decision.

This logic directs the token to the corresponding state: **OK** moves
the token to the *accepted* place, **KO** to the *rejected* place, and
**later** returns it to the *registered* place for future
reconsideration.

**Bulk Approval and Sub-form Integration** The final stage is the *Bulk
Approval* task in the *Order* process. On the `assign` event, the system
identifies and assigns all unassigned *Invoice Approval* (transition
`t2`) tasks:

    // Triggered on 'assign' event of Bulk Approval
    change invoice_approvals value { findTasks{
            (it.caseId.in(children_invoice_cases.value))
            .and(it.transitionId.eq("t2"))
            .and(it.userId.isNull()) }?.collect{it.stringId} }
    invoice_approvals.value.each{ id ->
        def task = findTask({it._id.eq(id)}); assignTask(task) }

The situation is illustrated in Figure
[2](#fig:order_invoice_sync){reference-type="ref"
reference="fig:order_invoice_sync"}.

<!-- ![Detailed synchronization logic between *Order* and *Invoice* objects.
The *Assign Event* in the parent process triggers a lookup of child
references and dynamically composes the integrated user
task.](bulk_relationship.png){#fig:order_invoice_sync
width="\\textwidth"} -->

The manager interacts with embedded sub-forms. Upon finishing the *Bulk
Approval*, the system programmatically completes all child tasks,
triggering their individual variable arc logic:

    // Triggered on 'finish' event of Bulk Approval
    def list_of_tasks_ids = invoice_approvals.value; 
    change invoice_approvals value { []; } 
    list_of_tasks_ids.each{ id ->
        def task = findTask({it._id.eq(id)}); finishTask(task) }

## Discussion and Key Architectural Concepts

The presented example illustrates how complex relationships between
independent process instances are managed at the data and event levels
within the Petriflow framework. Several key architectural patterns can
be identified:

**Data-Level Relationships**: The system maintains a bidirectional link
where the parent *Order* stores a list of child *Invoice* IDs, and each
*Invoice* maintains a reference to its parent. This allows for efficient
traversal of the object hierarchy.

**Dynamic Object and Task Discovery**: Using powerful query functions
like `findCases` and `findTasks`, the system can dynamically locate
objects and their current states (active tasks) based on attributes or
place markings.

**Event-Based Synchronization**: By chaining event triggers (e.g., a
`finish` event in one process invoking a `finish` in another), the
system achieves seamless synchronization between distinct Petri net
instances. Task pointers (Task References) serve as the fundamental
mechanism for this inter-process communication.

**Hierarchical UI Composition**: The ability to store task pointers as
data attributes, combined with the platform's rendering engine, allows
for the creation of composite forms. Sub-forms of child objects are
dynamically embedded into the parent's context, providing a unified user
experience for complex operations like bulk approvals.

In conclusion, this approach demonstrates that Petriflow moves beyond
traditional monolithic Petri nets by treating process instances as
reactive objects that can be dynamically linked, queried, and
synchronized through a robust event-driven architecture.

# Netgrif Platform Architecture

The *Netgrif Platform* provides a model-driven environment for
process-based applications. As illustrated in
Figure [3](#fig:platform){reference-type="ref"
reference="fig:platform"}, the architecture is logically divided into
the design environment and the execution engine.

<!-- ![The Netgrif Application Engine architecture: A cloud-native stack
comprising Spring Boot services, MongoDB for persistence, and
Elasticsearch for object-centric querying.](platform.png){#fig:platform
width="\\textwidth"} -->

## Modeling Component: Netgrif Application Builder

The *Application Builder* is a specialized web-based IDE for visual
modeling of *Petriflow classes*. It serves as a standalone environment
where designers define the structural aspects of a process: data
attributes, Petri net lifecycles, and form layouts. The output is a
*Petriflow* XML file---a transportable, technology-agnostic artifact
that encapsulates the entire application logic.

The newest version of the *Application Builder* is freely available for
public use at <https://next.builder.netgrif.cloud>.

## Execution Component: Netgrif Application Engine

The core of the execution environment is the *Netgrif Application
Engine* (NAE), which acts as a dynamic interpreter for Petriflow models
uploaded via the *eTask* interface. The NAE follows a robust three-tier
technical stack:

**Presentation Layer**: An **Angular** client that dynamically renders
the UI based on the process marking and form definitions.

**Application Layer**: A **Java (Spring Boot)** backend that manages the
process lifecycle, integrates **Drools** for rule evaluation, and
executes Groovy scripts.

**Data Layer**: A hybrid persistence strategy using **MongoDB** for case
states, **Elasticsearch** for advanced querying, and **Redis** for
session caching.

The execution environment is accessible after registration at
<https://etask.netgrif.cloud>, where users can create their own
workspaces and deploy Petriflow models.

## The Modeling Workflow: Netgrif Application Builder

The *Netgrif Application Builder* (NAB) serves as a specialized IDE for
the visual design of *Petriflow classes*. The core functional workflow
is centered around three integrated phases:

**Data and Lifecycle Definition**: In the first phase, the designer
defines two independent layers of the class. First, the **data
attributes** (e.g., *Order ID, Price*) are specified to form the
object's data structure. Second, the **lifecycle** is modeled as an
extended Petri net (see
Figure [1](#fig:builder_order){reference-type="ref"
reference="fig:builder_order"}), defining abstract states given by
markings and tasks given by transitions.

**Binding, Roles, and UI Composition**: The integration occurs by
binding data and permissions to the process. Forms are created as views
on data attributes and bound to transitions. NAB allows designers to
drag-and-drop attributes into forms, automatically synchronizing them
with the data model. Crucially, this phase also includes **Role
Definition**, where user roles (e.g., *Manager, Accountant*) are created
and assigned to specific transitions. Designers can define fine-grained
permissions for each task's events (e.g., who can *assign*, *cancel*, or
*finish* a task), ensuring a robust RBAC model within the application.

**Logic Implementation and Interactive Simulation**: Complex business
rules are scripted via Groovy actions attached to events. To verify the
integrated model, NAB provides an **interactive simulation** mode. This
allows for manual triggering of assign, finish and cancel events of
transitions to play token game to manually check the correctness of the
life-cycle.

## Deployment and Runtime Interpretation

Once the XML artifacts are uploaded to *eTask*, the platform immediately
instantiates the application without recompilation.

**Instance and Task Management** The engine manages concurrent instances
(cases) within a unified workspace. It dynamically calculates enabled
transitions, i.e. available tasks for each user based on the Petri net
marking and RBAC permissions.

**Cross-Process Coordination** The runtime's unique capability is
demonstrated during the **Bulk Approval** of invoices (see
Figure [4](#fig:bulk_approval){reference-type="ref"
reference="fig:bulk_approval"}). When a finish event is triggered in the
*Order* case, the engine automatically synchronizes this event with all
referenced *Invoice* cases, ensuring atomic and consistent state updates
across the process hierarchy.

<!-- ![A dynamic form in eTask demonstrating Bulk Approval: parent process
(Order) synchronizing events across multiple child objects
(Invoices).](bulk_approval.png){#fig:bulk_approval width="\\textwidth"} -->

# Related Work and Comparison

The *Netgrif Platform* occupies a unique niche by integrating formal
modeling with rapid application development in *NAB* and execution in
*eTask*.

**Petri Net Tools:** Unlike *CPN Tools* [@westergaard2013cpn], *Renew*
[@cabac2009renew], or *ProM* [@vanderaalst2005prom], which prioritize
formal analysis and model checking, the *NAB* is a **generative**
environment. Its primary goal is the visual composition of executable
*Petriflow classes*, avoiding manual XML coding and bridging the gap
between theory and runtime.

**BPMN and Process Engines:** Compared to business-oriented modelers
(*Signavio, Bizagi*) or engines like *Camunda*, Netgrif provides tighter
vertical integration. While *Camunda* often requires external services
for persistence and frontend, the *eTask* powered by *NAE* natively
manages the entire state, including MongoDB persistence and
Elasticsearch indexing within a single artifact.

**Low-Code Platforms:** Unlike *Microsoft Power Apps* or *Mendix*, which
often rely on fragmented logic (e.g., combining with Power Automate and
external DBs), Netgrif offers a **process-centric object-oriented**
paradigm. It treats the Petri net not as documentation, but as the
\"DNA\" of the application, where data, logic, and UI are inseparable.
In conclusion, Netgrif is a platform designed for seamless
object-lifecycle coordination through a formal foundation.

# Conclusion

We presented the *Netgrif Platform* as a model-driven environment for
object-centric processes using *Petriflow*. Unlike traditional BPM, it
provides vertical integration of lifecycles, data, and UIs in executable
artifacts. The platform is proven in **academia** for teaching
process-driven application development and in **industry** for scalable
applications in the healthcare, insurance, utility, telecom, and public
sectors.

**Evolution and Future Roadmap.** The platform's development continues
toward a fully integrated ecosystem. While the *Builder* and *eTask*
currently require manual XML synchronization, our immediate roadmap
includes a unified API-based integration to enable seamless, direct
deployment from the modeling to the execution environment. Furthermore,
we aim to simplify the query language and introduce graphical modeling
for class inheritance, interfaces and cross-class synchronization. By
bridging the gap between descriptive object-centric models and
prescriptive executable applications, the Netgrif Platform offers a path
toward a next-generation paradigm of process-centric software
engineering.
