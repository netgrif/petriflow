## findTasks

> findTasks `query` => `List<Task>`
> 
> findTasks `query`, `page` => `List<Task>`

Finds all tasks that match the given `query`. The predicate is a groovy closure that accepts QCase object and returns QueryDSL Predicate.
`Page` determines the requested page number, page size, sort fields, and sort direction.

| **Param**    | **Type**             | **Description**                        |
| ------------ | -------------------- | -------------------------------------- |
| query        | `QueryDSL Predicate` | QueryDSL Predicate to query for tasks. |
| page         | `Pageable` | Object for pagination of query results.          |

#### Example

```groovy
def useCase = findCase(...)
Task task = findTask( { it.caseId.eq(useCase.stringId) & it.transitionId.eq("edit_limit") } );
```

```groovy
// Find 10 tasks sorted by priority
def newTasks = findTasks( { it.transitionId.eq("new_task") }, new PageRequest(0, 10, Sort.by("priority").descending() ) )
```