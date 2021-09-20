# Specification
TODO brief introduction, main terms, naming layers and components


Every source code of Petriflow process is a XML file with well-defined structure. The process document consists of
process metadata like `id`, `version` etc., structural workflow data (transitions, places, arcs), roles, data and their mappings
to other objects of the process, and actions.

## Process Application
TODO what is application, namespace, process etc. How id tight together, diagram would be nice

An application, in Petriflow language, is a set of processes that together solves complex business problem or problem case.
Process application can be grouped by common virtual space, called application namespace (or namespace for short).
In Petriflow processes can communicate with each other sending data, triggering event etc. but only processes within the same namespace.
This pattern creates logical hierarchy between namespaces, applications and processes.

TODO obrázok hierarchie

## Event system

Events are very important part of Petriflow language. Events represents change, modification, signalization and many more, depending on which part of Petriflow is event invoked.
Every event can be invoked according to its definition (i.e. an assign event on a task is invoked when a user is asigned to the task). Some events are triggered by the system
other can be called by user or as a function (see Action API). On every event can be attached reaction (or reactions). Reaction on a event is in Petriflow called [Action](#actions).

Event definition, its invocation, purpose and context of execution is described within each part of Petriflow specification that emmits events. 
Following objects emmit events:
- Process
- Instance (Case)
- Task
- Data variable
- Data Reference
- Role

Events are atomic -> execution of an event change cannot be interapted and can be only fully successful or ending in error. Executing of an event and its defined reactions
has several phases.

- Pre-Action phase - Actions in pre phase are executed. If any of the executed action returnes an error the event execution does not continue and the error is returned as a error state of the event.
- Event - Execution of event logic described in the event definition.
- Post-Action phase - Actions in post phase are executed. Actions that return an error does not influence the event execution thus it has been already finished. If an actions returnes an error, it is logged and returned as an outcome of the event but the event execution is considered successful.

TODO obrázok fází

### Event context

**Event Payload**

### Event outcome
Every event execution creates object called event outcome. Event outcome object contents result of the event execution, that is all changes that event made, errors that where returned, context in which were event executed, actor of executed (user or systemd whose activity triggred the event), timestamp, and event phases.

In Petriflow within a reaction on a event (Action) can be invoked another event, this leads to technique called event chaining. Result of the event chain is event outcome in tree structure. Because every event execution result is one node of the tree structure if an event that was already executed in the same context is next to execution, it will ignored and the chain ends.

TODO dať príklad na eventy a strom outcomov
TODO lepšie vysvetliť eventy


## User


## Process

Every Petriflow application is build from one or more processes. Process is a template or definition for all application
data, behaviour and business logic. To run the deployed process an instance of the process is created, in Petriflow it
is called a `Case`.

**Versioning**

**Validity** 

!> Experimental

A process in Petriflow has configurable period of operation when process can function. If the validity period is not specified the valid-from time is set to time of deployment
and the valid-to is not set. If new version of the same process is deployed, the valid-to time of the currently running process is set to the deployment time of the new version.
The two validity times can be set in process definition (source code). The valid-from time cannot be set to the past. If a process with the valid-from time is set in the past the time of deployment is used instead. The valid-to time has to be chronologicaly in the future from the valid-from time, otherwise an error is retunered.

<!-- tabs:start -->

#### **XML Schema**

```xml

<xs:element name="document">
  <xs:complexType>
    <xs:sequence>
      <xs:element ref="id" minOccurs="0"/>
      <xs:element ref="version" minOccurs="0"/>
      <xs:element ref="initials" minOccurs="0"/>
      <xs:element name="title" minOccurs="0" type="i18nStringType"/>
      <xs:element ref="icon" minOccurs="0"/>
      <xs:element ref="defaultRole" minOccurs="0"/>
      <xs:element ref="transitionRole" minOccurs="0"/>
      <xs:element ref="caseName" minOccurs="0"/>
      <xs:element ref="transaction" maxOccurs="unbounded" minOccurs="0"/>
      <xs:element ref="role" maxOccurs="unbounded" minOccurs="0"/>
      <xs:element ref="data" maxOccurs="unbounded" minOccurs="0"/>
      <xs:element ref="mapping" maxOccurs="unbounded" minOccurs="0"/>
      <xs:element ref="i18n" maxOccurs="unbounded" minOccurs="0"/>
      <xs:element ref="transition" maxOccurs="unbounded"/>
      <xs:element ref="place" maxOccurs="unbounded" minOccurs="0"/>
      <xs:element ref="arc" maxOccurs="unbounded" minOccurs="0"/>
    </xs:sequence>
  </xs:complexType>
</xs:element>
```

#### **Engine Object**

```groovy
class Process {
    ObjectId _id
    String importId
    String identifier
    I18nString title
    I18nString defaultCaseName
    String initials
    String icon
    LocalDateTime creationDate
    String version
    Author author
    Map<String, Place> places
    Map<String, Transition> transitions
    Map<String, List<Arc>> arcs
    Map<String, Field> dataSet
    Map<String, ProcessRole> roles
    Map<String, Transaction> transactions
    boolean initialized
    String importXmlPath
}
```

#### **Example**

```xml

<document
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance "
        xsi:noNamespaceSchemaLocation="petriflow_schema.xsd">
  <id>namespace:myapplication:myprocess</id>
  <initials>PR</initials>
  <title>My Process</title>
  <defaultRole>true</defaultRole>
  <caseName>My Case</caseName>
  <transaction>...</transaction>
  ...
  <role>...</role>
  ...
  <data>...</data>
  ...
  <mapping>...</mapping>
  ...
  <i18n>...</i18n>
  ...
  <transition>...</transition>
  ...
  <place>...</place>
  ...
  <arc>...</arc>
  ...
</document>
```

<!-- tabs:end -->

##### Events

| Name | Trigger | Context | Description |
| --- | --- | --- | --- |
| deploy | when the process is deployed into an engine | application | When the process is deployed to an engine that executes the process the event is triggered. The context of the event is `application` because in its execution the process is not ready to operate. The payload of the event is deployed process. The result is message if the deployed process process is ready to be operational or an error was returned. |
| delete | when the process is deleted from application | process | When the process is deleted the event is triggered. This event can be used for finishing clean ups before process is gone from the application. If error is returned the process itself is not deleted. |

### Net

As a process model, Petriflow uses place/transition Petri nets enriched by reset arcs, inhibitor arcs and read arcs. 
Petri nets offers accurate and matematically defined structure which has several benefits, like behaviour simulation, reachability and complaxety analyzis and many more.
Every algorithm can be implemented in Petri nets and so in Petriflow.

TODO formal definition of PN

#### Transition

<!-- tabs:start -->

#### **XML schema**

```xml

<xs:element name="transition">
  <xs:complexType>
    <xs:sequence>
      <xs:element ref="id"/>
      <xs:element ref="x"/>
      <xs:element ref="y"/>
      <xs:element ref="label"/>
      <xs:element ref="icon" minOccurs="0"/>
      <xs:element ref="priority" minOccurs="0"/>
      <xs:element ref="assignPolicy" minOccurs="0"/>
      <xs:element ref="dataFocusPolicy" minOccurs="0"/>
      <xs:element ref="finishPolicy" minOccurs="0"/>
      <xs:element ref="trigger" minOccurs="0" maxOccurs="unbounded"/>
      <xs:element ref="transactionRef" minOccurs="0"/>
      <xs:element ref="roleRef" maxOccurs="unbounded" minOccurs="0"/>
      <xs:element ref="dataRef" maxOccurs="unbounded" minOccurs="0"/>
      <xs:element ref="dataGroup" maxOccurs="unbounded" minOccurs="0"/>
      <xs:element ref="event" maxOccurs="unbounded" minOccurs="0"/>
    </xs:sequence>
  </xs:complexType>
</xs:element>
```

#### **Engine Object**

```groovy
class Transition {
    ObjectId _id
    String importId
    Position position
    I18nString title
    Map<String, DataGroup> dataGroups
    LinkedHashMap<String, DataFieldLogic> dataSet
    Map<String, Set<RolePermission>> roles
    List<Trigger> triggers
    Integer priority
    AssignPolicy assignPolicy
    String icon
    DataFocusPolicy dataFocusPolicy
    FinishPolicy finishPolicy
    Map<EventType, Event> events
    String defaultRoleId
}        
```

<!-- tabs:end -->


#### Place

`Miesto musí mať v rámci procesu unikátne id
. Pre grafickú vizualizáciu definuje miesto
svoje súradnice ako x, y a názov ako label.
Miesto môže obsahovať nezáporný
celočíselný počet značiek (tokenov).
Počiatočná hodnota značkovania je
definovaná nezápornou celočíselnou
hodnotou tokens.`

<!-- tabs:start -->

#### **XML Schema**

```xml

<xs:element name="place">
  <xs:complexType>
    <xs:sequence>
      <xs:element ref="id"/>
      <xs:element ref="x"/>
      <xs:element ref="y"/>
      <xs:element ref="label"/>
      <xs:element ref="tokens"/>
      <xs:choice>
        <xs:element ref="isStatic"/>
        <xs:element ref="static"/>
      </xs:choice>
    </xs:sequence>
  </xs:complexType>
</xs:element>
```

#### **Engine Object**

```groovy
class Place {
    ObjectId _id
    String importId
    Position position
    I18nString title
    Integer tokens
    Boolean isStatic
}
```

<!-- tabs:end -->

#### Static Place

`Statické miesto je miesto, ktorého značkovanie je zdieľané naprieč všetkými inštanciami daného
procesu. Statické miesto je definované pravdivou hodnotou isStatic.`

#### Arc

Arc is a connection between place and transition or transition and place. In Petriflow there are several types of arcs:

* **Regular** - An arc with weight. An arc activates if in connected input place is equal or more tokens than weight of
  the arc.
* **Reset** - An arc that consumes all token from a connected place. It is implemented only as input arcs.
* **Inhibitor** - An arc with weight. An arc activates if in connected input place is less tokens than weight of the
  arc.
* **Read** - Similar to regular arc, but it does not consume tokens from a connected place.
* **Variable** - Similar to regular arc, but the weight is defined by a reference to a data field. Value of the data
  field is the weight of the arc.

<!-- tabs:start -->

#### **XML Schema**

```xml

<xs:element name="arc">
  <xs:complexType>
    <xs:sequence>
      <xs:element ref="id"/>
      <xs:element name="type" type="arc_type" default="regular"/>
      <xs:element ref="sourceId"/>
      <xs:element ref="destinationId"/>
      <xs:element ref="multiplicity"/>
      <xs:element ref="breakPoint" minOccurs="0" maxOccurs="unbounded"/>
    </xs:sequence>
  </xs:complexType>
</xs:element>
```

#### Example

```xml

<data type="number">
  <id>500001</id>
  <title>vararc_byt_true</title>
  <init>0.0</init>
</data>
        ...
<arc>
<id>3270</id>
<type>variable</type>
<sourceId>414</sourceId>
<destinationId>2284</destinationId>
<multiplicity>500001</multiplicity>
</arc>
```

<!-- tabs:end -->


### Roles

Important layer in every is application is access control. Petriflow offers system of process roles to control which user (or system) can do (or cannot do)
which activity in a process. Process roles are bound to transitions, their mapping object defines permissions on the mapped transition.

If you need more granular control, i.e. permissions system on the exact user, see Petriflow usage of user lists.

<!-- tabs:start -->

#### **XML Schema**

```xml

<xs:element name="role">
  <xs:complexType>
    <xs:sequence>
      <xs:element ref="id"/>
      <xs:choice>
        <xs:element ref="title"/>
        <xs:element ref="name"/>
      </xs:choice>
    </xs:sequence>
  </xs:complexType>
</xs:element>
```

<!-- tabs:end -->


#### Role Reference

### Data

Data layer is another addition to Petri Nets in Petriflow language. As in every system data layer in Petriflow defines data model of a application process.
Every instance of the process will have the same data model but with different values. Data layer is created with two kind of object.
Data variables represent all attributes of a process instance called case during its life-cycle. They are attribute definition describing type, id, title and many more properties.
Data fields are mapping obejct for data variables in transitions. Data fields are bases for transition forms. They can further define behaviour of the referenced variable
or override some of its properties from its variable definition only in scope of the bounded transition.

<!-- tabs:start -->

#### **XML Schema**

```xml

<xs:element name="data">
  <xs:complexType>
    <xs:sequence>
      <xs:element ref="id"/>
      <xs:element ref="title"/>
      <xs:element ref="placeholder" minOccurs="0"/>
      <xs:element ref="desc" minOccurs="0"/>
      <xs:element ref="values" minOccurs="0" maxOccurs="unbounded"/>
      <xs:element ref="valid" minOccurs="0" maxOccurs="unbounded"/>
      <xs:element ref="init" minOccurs="0"/>
      <xs:element ref="encryption" minOccurs="0"/>
      <xs:element ref="action" minOccurs="0" maxOccurs="unbounded"/>
      <xs:element ref="actionRef" minOccurs="0" maxOccurs="unbounded"/>
      <xs:element ref="documentRef" minOccurs="0"/>
      <xs:element ref="remote" minOccurs="0"/>
    </xs:sequence>
    <xs:attribute type="data_type" name="type" use="required"/>
    <xs:attribute type="xs:boolean" name="immediate"/>
  </xs:complexType>
</xs:element>
```

#### **Example**

```xml

```

<!-- tabs:end -->


#### Data Reference

#### Validation

#### Components

### Actions

Last but not least Petriflow core component are Actions.
Actions are pieces of Groovy/Java code that define reactions to events invoked in process execution. Petriflow recognised several types of evetns on almost every of its components.
Events on task represent change of state of the task (assign event, finish event, cancel event).
Events on data variable (or on data field) are triggered with every data manipulation.
There also evetns on the case object or on the process it self (process deployment, creation/deletion of the case etc.).
Thanks to the robust Action API events can be chained and further enriched business logic of an application process.

[Learn more about Actions](actions.md)

#### Functions

### Instance (Case)

From every deployed process can be created a case, its instance. A case is active process, it represents a started
workflow or process. A case is directed by its process workflow, it stores all values for data fields and action defined
in the process are executed in the case context.

<!-- tabs:start -->

#### **Engine Object**

```groovy
class Case {
    ObjectId _id
    String visualId
    PetriNet petriNet
    String processIdentifier
    Map<String, Integer> activePlaces
    String title
    String color
    String icon
    LocalDateTime creationDate
    LinkedHashMap<String, DataField> dataSet
    LinkedHashSet<String> immediateDataFields
    List<Field> immediateData
    Author author
    Map<String, Integer> resetArcTokens
    Set<TaskPair> tasks
}
```

<!-- tabs:end -->

##### Events

| Name | Trigger | Context | Description |
| --- | --- | --- | --- |
| create | - | process | - |
| view | - | case | - |
| delete | - | case | - |

#### Task

A task is an instances of transition from a case that is enabled or is executed. There can be only one instance of the
task in the same case at one moment.

<!-- tabs:start -->

#### Engine Object

```groovy
class Task {
    ObjectId _id
    String processId
    String caseId
    String transitionId
    I18nString title
    String caseColor
    String caseTitle
    Integer priority
    Long userId
    User user
    List<Trigger> triggers
    Map<String, Map<String, Boolean>> roles
    LocalDateTime startDate
    LocalDateTime finishDate
    Long finishedBy
    String transactionId
    Boolean requiredFilled
    LinkedHashSet<String> immediateDataFields
    List<Field> immediateData
    String icon
    AssignPolicy assignPolicy
    DataFocusPolicy dataFocusPolicy
    FinishPolicy finishPolicy
}
```

<!-- tabs:end -->


## Filters


## Localisation