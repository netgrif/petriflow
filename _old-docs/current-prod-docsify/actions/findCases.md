## findCases

> findCases `query` => `List<Case>`
> 
> findCases `query`, `page` => `List<Case>`

Finds all the cases that match the given `query`. The `query` is a groovy closure that accepts QCase object and returns QueryDSL Predicate.
`Page` determines the requested page number, page size, sort fields, and sort direction.

| **Param**    | **Type**             | **Description**                        |
| ------------ | -------------------- | -------------------------------------- |
| query        | `QueryDSL Predicate` | QueryDSL Predicate to query for cases. |
| page         | `Pageable` | Object for pagination of query results.          |

#### Example

```groovy
List<Case> cases = findCases( { it.title.eq("Case 1") } );
List<Case> cases = findCases( { it.dataSet.get("name").value.eq("John") } );
```

```groovy
// Returns the first page of 5 cases sorted by the title
List<Case> cases = findCases( { it.dataSet.get("name").value.eq("John") }, new PageRequest(0, 10, Sort.by("title").ascending() ) );

// Returns the second page of 5 cases sorted from the newest to oldest
List<Case> cases = findCases( { it.dataSet.get("name").value.eq("John") }, new PageRequest(1, 5, Sort.by("creationDate").descending() ) );
```