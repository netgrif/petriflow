# Petriflow
Next-generation end-to-end low code language based on Petri nets.

[Petriflow Wiki](https://netgrif.atlassian.net/wiki/spaces/PF) [Application builder](https://builder.netgrif.com) [Application Engine](https://netgrif.com/products/#nae)

Petriflow process consits of a workflow model, roles, data and actions. As a workflow model, Petriflow uses place/transition Petri nets enriched by reset arcs, inhibitor arcs and read arcs. Transitions of Petri nets represent tasks of workflow models. Roles layer defines who can execute tasks. Data variables represent all attributes of a process instance called case during its life-cycle. Data variables associated to workflow tasks define data fields and create task forms. Workflow model, roles, data variables and data fields defining task forms are stored in XML. Actions are pieces of Groovy code that define reactions to events on tasks (assign event, finish event, cancel event) and events on data fields. In actions, events can be triggered and external fucntions can be called.

For complete documentation and other materials of Petriflow language please visit [Petriflow Wiki](https://netgrif.atlassian.net/wiki/spaces/PF).
