## assignTask

> assignTask `transitionId`, `case`, `user` => `Task`
> 
> assignTask `task`, `user` => `Task`
> 
> assignTasks `tasks`, `user` => `Task`

Assign the task in current case with given `transitionId`. Optional parameter `user` identifies actor who will perform assign.
Optional parameter `case` identifies case which the task belongs to. A `task` object can be passed instead of `transitionId` and `case`.
Assign operation can be performed on a list of tasks in one call.

| **Param**    | **Type** | **Default**             | **Description**                                         |
| ------------ | ---------| ----------------------- | ------------------------------------------------------- |
| transitionId | `String` | -                       | Id of a transition.                                     |
| task         | `Task`   | -                       | Object of a task.                                       |
| case         | `Case`   | Current Case in context | A case in which task will be assigned.                  |
| user         | `User`   | Logged user or system   | A user to who will be the task assigned and executed.   |

#### Example

```groovy
selectedUser: f.select_controler;
if (selectedUser.value) {
    def aCase = findCase({ it.author.id.eq(selectedUser.value.id) })
    def user = userService.findById(selectedUser.value.id, false)
    assignTask("control", aCase, user);
}
```

```groovy
selectedUser: f.select_controler;
if (selectedUser.value) {
    def usecase = findCase({ it.title("Some case") }).first()
    def task = findTask({ it.importId.eq("control") & it.caseId.eq(usecase.stringId) })
    def user = userService.findById(selectedUser.value.id, false)
    assignTask(task, user);
}
```

```groovy
// Find all my cases and assign all their control tasks to me
def cases = findCases( { it.author.id.eq(loggedUser().id) } )
def caseIds = cases.collect { it.stringId }
def tasks = findTasks({ it.importId.eq("control") & it.caseId.in(cases) })
assignTasks(tasks)
```