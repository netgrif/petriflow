## findCase

> findCase `query` => `Case`

Finds the first case that matches the given `query`. The predicate is a groovy closure that accepts QCase object and returns QueryDSL Predicate.

| **Param**    | **Type**             | **Description**                        |
| ------------ | -------------------- | -------------------------------------- |
| query        | `QueryDSL Predicate` | QueryDSL Predicate to query for a case. |

#### Example

```groovy
Case useCase = findCase( { it.title.eq("Case 1") & it.processIdentifier.eq("insurance") } );
Case useCase = findCase( { it.dataSet.get("name").value.eq("John") & it.processIdentifier.eq("insurance") } );
```