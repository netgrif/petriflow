## createCase

> createCase `identifier`, `title`, `colour`, `author` => `Case`
> 
> createCase `net`, `title`, `colour`, `author` => `Case`

It creates a new instance of the newest version of net identified by the `identifier`. If the `title` is not specified, 
nets default case name is used. If the `colour` is `null`, the default colour is used (black at the moment).

The second method creates a new instance of the given `net`. If the `title` is not specified, nets default case name is used. 
If the `colour` is `null`, the default colour is used (black at the moment).

| **Param**  | **Type**   | **Default**                | **Description**                               |
| -----------| -----------| ---------------------------| --------------------------------------------- |
| identifier | `String`   | -                          | Deployed process identifier.                  |
| net        | `PetriNet` | -                          | PetriNet object.                              |
| title      | `String`   | Default case name          | Title of the new case.                        |
| colour     | `String`   | Default application colour | Name of the style class for colour.           |
| author     | `User`     | Logged user or system      | User as author of the new case.               |

#### Example

```groovy
createCase("create_case_net","Create Case Case","color-fg-amber-500", otherUser);
createCase("create_case_net","Create Case Case","color-fg-amber-500");
createCase("create_case_net","Create Case Case");
createCase("create_case_net");
```

```groovy
def net = petriNetService.getNewestVersionByIdentifier("insurance")
createCase(net)
createCase(net, "My insurance")
createCase(net, "My insurance", "color-fg-amber-500")
createCase(net, "Other insurance", "color-fg-amber-500", otherUser)
```