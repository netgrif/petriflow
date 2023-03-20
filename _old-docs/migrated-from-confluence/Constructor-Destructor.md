#Constructor and Destructor

Constructor and Destructor are 3 types of process and case events:

*   create
*   delete
*   upload

##Upload event

The upload event is a process event that is triggered when a new version of the net is deployed into the application engine.

Its XML syntax is as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://raw.githubusercontent.com/netgrif/petriflow/main/petriflow.schema.xsd">
    <id>constructor_destructor</id>
    <title>Constructor and Destructor</title>
    <initials>CAD</initials>
    <processEvents>
        <event type="upload">
            <id>upload</id>
            <actions phase="pre">
                <action>
                    ...
                </action>
            </actions>
            <actions phase="post">
                <action>
                    ...
                </action>
            </actions>
        </event>
    </processEvents>
</document>
```

Upload events are run without context, i.e. `useCase` is `null`. Therefore, it is not possible to run the changed fields actions - the `change <field> value` command does not work as it relies on the `useCase` variable.
If you want to change data on another cases, you need to use the `setData` function.

##Create & Delete events

The create and delete events are case events that are triggered when a new process instance is created, or when a process instance is deleted.

Their XML syntax is as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://raw.githubusercontent.com/netgrif/petriflow/main/petriflow.schema.xsd">
    <id>constructor_destructor</id>
    <title>Constructor and Destructor</title>
    <initials>CAD</initials>
    <caseEvents>
        <event type="create">
            <id>create</id>
            <actions phase="pre">
                <action>
                    ...
                </action>
            </actions>
            <actions phase="post">
                <action>
                    ...
                </action>
            </actions>
        </event>
        <event type="delete">
            <id>pdf</id>
            <actions phase="pre">
                <action>
                    ...
                </action>
            </actions>
            <actions phase="post">
                <action>
                    ...
                </action>
            </actions>
        </event>
    </caseEvents>
</document>
```

The create event in its PRE phase and the delete event in its POST phase are also run without case context (`useCase` is `null`), like the upload event.
The create POST event and the delete PRE event have their case context set, since their case does exist during their execution.

Roles can be associated with both the create and delete events and can be used to restrict who is able to create new instances or to delete existing instances of the process.

User lists can be associated with the delete event, but cannot be associated with the create event, since they don't exist before a case instance is created.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<document xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://raw.githubusercontent.com/netgrif/petriflow/main/petriflow.schema.xsd">
    <id>constructor_destructor</id>
    <title>Constructor and Destructor</title>
    <initials>CAD</initials>
    <!-- ROLES -->
    <role>
        <id>process_role</id>
        <title>Process role</title>
    </role>
    <roleRef>
        <id>process_role</id>
        <caseLogic>
            <create>true</create>
            <delete>true</delete>
        </caseLogic>
    </roleRef>
</document>
```
