## cancelTask

> cancelTask `transitionId`, `case`, `user` => `Task`
>
> cancelTask `task`, `user` => `Task`
>
> cancelTasks `tasks`, `user` => `Task`

Cancel the task in current case with given `transitionId`. Optional parameter `user` identifies actor who will perform cancel.
Optional parameter `case` identifies case which the task belongs to. A `task` object can be passed instead of `transitionId` and `case`.
Cancel operation can be performed on a list of tasks in one call.

| **Param**    | **Type** | **Default**             | **Description**                        |
| ------------ | ---------| ----------------------- | ---------------------------------------|
| transitionId | `String` | -                       | Id of a transition.                    |
| task         | `Task`   | -                       | Object of a task.                      |
| case         | `Case`   | Current Case in context | A case in which task will be canceled. |
| user         | `User`   | Logged user or system   | A user who will cancel the task.       |

#### Example

```groovy
// Cancel the task "work_task", currently assigned to me, in the current case
def taskId = "work_task";
cancelTask(taskId);
```

```groovy
def taskId = "work_task";
def aCase = findCase({ it.author.id.eq(loggedUser().id) })
cancelTask(taskId, aCase);
```

```groovy
// Cancel the task "work_task", currently assigned to me, in the current case
def task = findTask( { it.transitionId.eq("work_task") } );
cancelTask(task);
```

```groovy
// Cancel the task "work_task", currently assigned to me, in the current case
def tasks = findTasks( { it.transitionId.eq("work_task") } );
cancelTasks(tasks);
```
