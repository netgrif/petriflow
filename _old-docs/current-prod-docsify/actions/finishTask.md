## finishTask

> finishTask `transitionId`, `case`, `user` => `Task`
>
> finishTask `task`, `user` => `Task`
>
> finishTasks `tasks`, `user` => `Task`

Finish the task in current case with given `transitionId`. Optional parameter `user` identifies actor who will perform finish.
Optional parameter `case` identifies case which the task belongs to. A `task` object can be passed instead of `transitionId` and `case`.
Finish operation can be performed on a list of tasks in one call.

| **Param**    | **Type** | **Default**             | **Description**                          |
| ------------ | ---------| ----------------------- | -----------------------------------------|
| transitionId | `String` | -                       | Id of a transition.                      |
| task         | `Task`   | -                       | Object of a task.                        |
| case         | `Case`   | Current Case in context | A case in which task will be finished.   |
| user         | `User`   | Logged user or system   | A user to who will be the task finished. |

#### Example

```groovy
// Finish the task "work_task", currently assigned to me, in the current case
def taskId = "work_task";
finishTask(taskId);
```

```groovy
// Finish the task "work_task", currently assigned to me, in the current case
def taskId = "work_task";
def aCase = findCase({ it.author.id.eq(loggedUser().id) })
finishTask(taskId, aCase);
```

```groovy
// Finish the task "work_task", currently assigned to me in current case
def task = findTask( { it.transitionId.eq("work_task") & it.caseId.eq(useCase.stringId) & it.userId.eq(loggedUser().id) } );
finishTask(task);
```

```groovy
// Finish all the tasks "work_task", currently assigned to me
def tasks = findTasks( { it.transitionId.eq("work_task") & it.userId.eq(loggedUser().id) } );
finishTasks(tasks);
```