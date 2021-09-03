## execute

> execute `transitionId` where `query` with `data`

Executes all enabled transitions identified by the `transitionId` in all case where the `query` returns value _true_. 
For each task following actions are called:

* assign to the system user
* save new data values if any are provided
* finish

The `query` is a list of Querydsl queries. Every Case property can be used in a `query`. For more info see QueryDSL doc and QCase Javadoc.

| **Param**    | **Type**             | **Description**                                                                                                  |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| transitionId | `String`             | Id of transition                                                                                                 |
| query        | `QueryDSL Predicate` | QueryDSL Predicate to query for cases.                                                                           |
| data         | `Map<String,Object>` | Map of new values of data fields. Key of the map is id of a data field and value is new value of the data field. |

#### Example
````groovy
field: f.field;
execute "synchronized" where ([
    "title eq Case 1"
] as List) with ([
    "field": [
        value: 128.0,
        type: "number"
    ]
] as Map)
````