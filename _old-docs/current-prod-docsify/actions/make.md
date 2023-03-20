## make

> make `field`,`behaviour` on `transition` when `condition`

Changes `behaviour` of given data `field` on `transition`, if `condition` evaluates to true. Condition can return any
object or expression that can be interpreted into boolean value.

| **Param**     | **Type**      | **Description**                                                                                           |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| field         | `Field`       | Reference to process data field. The local variable from the action reference mapping can be used.        |
| behaviour     | constant      | Can be one of the following values: `visible`, `editable`, `required`, `optional`, `hidden`, `forbidden`  |
| transition    | `Transition`  | Reference to process transition. The local variable from the action reference mapping can be user.        |
| condition     | `Closure<Boolean>`     | Groovy closure that has to resolve into boolean value.                                                    |

#### Example

```groovy
garage_check: f.garage_check,
garage_cost: f.garage_cost,
garage: t.garage;
make garage_cost, visible on garage when {
    return garage_check.value == true;
}
```

