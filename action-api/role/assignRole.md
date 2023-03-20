## assignRole

> assignRole `roleId`, `user` => `User`

Assigns role identified by `roleId` to `user`. User is optional parameter, default value is currently logged user. Returns updated object of user.

| **Param** | **Type** | **Default**           | **Description**                             |
| ----------| ---------| ----------------------| --------------------------------------------|
| roleId    | `String` | -                     | Id of a role to be assigned.                |
| user      | `User`   | Logged user or system | A user to who will be the role assigned to. |

#### Example

```groovy
transition: t.task;
assignRole(transition.defaultRoleId);
```