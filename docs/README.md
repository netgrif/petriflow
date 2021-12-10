# Petriflow
**Next-generation end-to-end low code language based on Petri nets.**

Petriflow process consists of a workflow model, roles, data and actions.

## Workflow
As a workflow model, Petriflow uses place/transition Petri nets enriched by reset arcs, inhibitor arcs and read arcs. 
Transitions of Petri nets represent tasks of workflow models. 

## Roles
Roles layer defines who can execute tasks. 

## Data variables
Data variables represent all attributes of a process instance called case during its life-cycle. 
Data variables associated to workflow tasks define data fields and create task forms. 

## Actions
Actions are pieces of Groovy code that define reactions to events on tasks (assign event, finish event, cancel event) and events on data fields. 
In actions, events can be triggered and external functions can be called.
Workflow model, roles, data variables and data fields defining task forms are stored in XML.

## Learn more
To learn more about Petriflow language go to [Petriflow Wiki](https://netgrif.atlassian.net/wiki/spaces/PF) .
You can also try to build your own application in publicly available [Application builder](https://builder.netgrif.com)
and then deploy it to [Application Engine](https://netgrif.com/products/#nae).

