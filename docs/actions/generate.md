## generate

> generate `method`,`repetition` into `field`

Calls method and saves generated value into data `field`. The field can be only of type _text_ or _file_. 
If `repetition` is equal to _always_ new value is generated on each run of action. If `repetition` is equal to _once_ 
new value is generated only if fields value is `null`.

| **Param**  | **Type** | **Description**                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| method     | `String` | Name of the Java/Groovy method implemented in the application to call. The method must return value compatible with given data field. |
| repetition | constant | Values: always, once                                                                                                                  |
| field      | `Field`  | Reference to process data field. The local variable from the action reference mapping can be used.                                    |

#### Example
```groovy
self: f.this;
generate "Insurance.offerPDF",always into self
```