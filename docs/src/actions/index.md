# Actions API

Reference for all Petriflow actions available for use in process events (assign, finish, cancel) and data field events.

## Case

- [createCase](createCase.md) - `createCase identifier, title, colour, author => Case`
- [findCase](findCase.md) - `findCase query => Case`
- [findCases](findCases.md) - `findCases query => List<Case>`
- [close](close.md) - `close` *(deprecated)*

## Task

- [assignTask](assignTask.md) - `assignTask transitionId, case, user => Task`
- [cancelTask](cancelTask.md) - `cancelTask transitionId, case, user => Task`
- [finishTask](finishTask.md) - `finishTask transitionId, case, user => Task`
- [findTask](findTask.md) - `findTask query => Task`
- [findTasks](findTasks.md) - `findTasks query => List<Task>`
- [execute](execute.md) - `execute transitionId where query with data`

## Data

- [setData](setData.md) - `setData task, fields`
- [getData](getData.md) - `getData task => Map<String, Field>`

## Field

- [change](change.md) - `change field value`
- [generate](generate.md) - `generate method, repetition into field`
- [make](make.md) - `make field, behaviour on transition when condition`

## Other

- [assignRole](assignRole.md) - `assignRole roleId, user => User`
- [changeCaseProperty](changeCaseProperty.md) - `changeCaseProperty property about newValueClosure`
