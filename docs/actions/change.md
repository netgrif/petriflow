## change

### change value

> change `field` value `newValueClosure`
> 
> change `field` about `newValueClosure`

Sets new value to data `field` returned by `newValueClosure`. If the returned value is null, fields
value is set to default value. If the returned value is constant unchanged, fields value is unchanged and actions with a
trigger set on given field are not triggered.

| **Param**         | **Type**  | **Description**                                                                                    |
| -------------     | ----------| -------------------------------------------------------------------------------------------------- |
| field             | `Field`   | Reference to process data field. The local variable from the action reference mapping can be used. |
| newValueClosure   | `Closure` | Groovy closure which returned object is set as new value of the data field.                        |

#### Example

```groovy
period: f.108001,
sum: f.308011;
change period value {
    def limit = 20.0;
    if (period.value == "halfyear")
        limit = 40.0;
    if (period.value == "quarteryear")
        limit = 80.0;
    if ((sum.value as Double) < (limit as Double))
        return "year";
    return unchanged;
}
```

### change choices

> change `field` choices `newChoicesClosure`

Sets a new set of choices to data `field` returned by `newChoicesClosure`. Returned object from closure has to be an array or a set of new choices.
Choices can be set on fields of type _enumeration_ and _multichoice_. Choice can be simple string or localised string (`I18NString`). 
On change of choices no additional event is triggered on given `field`.

| **Param**         | **Type**  | **Description**                                                                                    |
| -------------     | ----------| -------------------------------------------------------------------------------------------------- |
| field             | `Field`   | Reference to process data field. The local variable from the action reference mapping can be used. |
| newChoicesClosure | `Closure<List<String>\|Set<String>>` | Groovy closure which returned object is set as new choices of the data field.                         |

#### Example

```groovy
other: f.410001,
field: f.this;
change field choices {
    if (other.value == "Real estate")
        return field.choices + ["unfinished building"];
    return field.choices;
}
```

### change options

> change `field` options `newOptionsClosure`

Sets a new set of options to data `field` returned by `newOptionsClosure`. Returned object from closure has to be a map collection of new options 
where key of a map item is key of an option and value of a map item is value of an option. Options can be set on fields of type *enumeration_map* and *multichoice_map*.
Option key is always type of string. Option value can be simple string or localised string (`I18NString`). On change of options no additional event is triggered on given `field`.

| **Param**         | **Type**  | **Description**                                                                                    |
| -------------     | ----------| -------------------------------------------------------------------------------------------------- |
| field             | `Field`   | Reference to process data field. The local variable from the action reference mapping can be used. |
| newOptionsClosure | `Closure<Map<String, String\|I18NString>>` | Groovy closure which returned object is set as new choices of the data field.                         |

#### Example

```groovy
other: f.410001,
field: f.this;
change field options {
    if (other.value == "Real estate")
        return field.options + ["unfin":"unfinished building"];
    return field.options;
}
```