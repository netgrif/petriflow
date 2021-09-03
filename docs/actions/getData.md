## getData

> getData `task` => `Map<String,Field>`
>
> getData `transition` => `Map<String,Field>` 
>
> getData `transitionId`, `case` => `Map<String,Field>`

Gets all data fields on given `task` or `transition` or combination of `transitionId` and a `case`. Returned results are mapped by its process id.

| **Param**    | **Type**                   | **Description**                                                                   |
| ------------ | -------------------------- | --------------------------------------------------------------------------------- |
| task         | `Task`                     | Object of a task.                                                                 |
| transition   | `Transition`               | Object of a transition. A task from this transition in current case will be user. |                                    
| transitionId | `String`                   | Id of a transition.                                                               |
| case         | `Case`                     | A case in which task will be searched.                                            |

#### Example

```groovy
actual_limit: f.actual_limit;
def usecase = findCase({ it.title.eq("Limits") }).first()
def task = findTask({ it.transitionId.eq("view_limit") & it.caseId.eq(usecase.stringId) })
def data = getData(task)
change actual_limit value {
    data["remote_limit"].value
}
```

```groovy
view_limit: t.view_limit;
actual_limit: f.actual_limit;
def data = getData(view_limit)
change actual_limit value {
    data["remote_limit"].value
}
```

```groovy
view_limit: t.view_limit;
def usecase = findCase({ it.title.eq("Limits") }).first()
def data = getData("view_limit", usecase)
change actual_limit value {
    data["remote_limit"].value
}
```