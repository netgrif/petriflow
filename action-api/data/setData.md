## setData

> setData `task`, `fields`
> 
> setData `transition`, `fields`
> 
> setDate `transitionId`, `case`, `fields`

It sets values of data fields on a `task` given as parameter or searched by given `transition` or combination of parameters `transition` and `case`. 
Values are mapped to data fields in dataSet using data fields id from process as key.

| **Param**    | **Type**                   | **Description**                                                                                                         |
| ------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| task         | `Task`                     | Object of a task.                                                                                                       |
| transition   | `Transition`               | Object of a transition. A task from this transition in current case will be user.
| transitionId | `String`                   | Id of a transition.                                                                                                     |
| case         | `Case`                     | A case in which task will be searched.                                                                                  |
| fields       | `Map<String,{type,value}>` | A map of fields to set new values. Key in the map is the field id and value is object with the field type and new value |

#### Example

```groovy
def usecase = findCase({ it.title.eq("Limits") }).first()
def task = findTask({ it.caseId.eq(usecase.stringId & it.transitionId.eq("edit_limit")) })
setData(task, [
    "new_limit": [
        "value": "10000",
        "type" : "number"
    ],
])
```

```groovy
transition: t.edit_limit;
setData(transition, [
    "new_limit": [
        "value": "10000",
        "type" : "number"
    ],
])
```

```groovy
def usecase = findCase({ it.title.eq("Limits") }).first()
setData("edit_limit", usecase, [
    "new_limit": [
        "value": "10000",
        "type" : "number"
    ],
])
```