# Objects

Every source code of Petriflow process is a XML file with well-defined structure. The process document consists of
process metadata like `id`, `version` etc., structural data (transitions, places, arcs), roles, data and their mappings
to other objects of the process.

## Process

Every Petriflow application is build from one or more processes. Process is a template or definition for all application
data, behaviour and business logic. To run the deployed process an instance of the process is created, in Petriflow it
is called a `Case`.

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

## Case (process instance)

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

## Transition

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

## Task

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

## Place

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

## Arc

Arc is a connection between place and transition or transition and place. In Petriflow there are several types of arcs:

* **Regular** - An arc with weight. An arc activates if in connected input place is equal or more tokens than weight of
  the arc.
* **Reset** - An arc that consumes all token from a connected place. It is implemented only as input arcs.
* **Inhibitor** - An arc with weight. An arc activates if in connected input place is less tokens than weight of the
  arc.
* **Read** - Similar to regular arc, but it does not consume tokens from a connected place.

Some arc type (regular, inhibitor, read) can have assigned a weight value. Weight of an arc is an integer number.
In Petriflow weight can also be set as a reference to a data field and a place of the process.

* **Data** **field** - The weight of an arc is defined by a reference to a data field. Value of the data
 field is the weight of the arc.
* **Place** - The weight of an arc is defined by the number of tokens in references place. If the referenced place
 is the source of the arcs it behaves as a reset arc.

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

## Role

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

## Data

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

