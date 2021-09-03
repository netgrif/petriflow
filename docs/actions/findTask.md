## findTask

> findTask `query` => `Task`

Finds the first task that matches the given predicate. The predicate is a groovy closure that accepts QCase object and returns QueryDSL Predicate.

| **Param**    | **Type**             | **Description**                        |
| ------------ | -------------------- | -------------------------------------- |
| query        | `QueryDSL Predicate` | QueryDSL Predicate to query for a task. |

#### Example

```groovy
List<Task> tasks = findTasks( { it.transitionId.eq("edit_limit") } )
def useCase = findCase(...)
List<Task> tasks = findTasks( { it.caseId.eq(useCase.stringId) } );
```