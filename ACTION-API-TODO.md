# Action API TODO

Návrh tzv. Action API v2, ktoré by bolo naozaj low-code a sledovalo by štýl predpisov v podobe anglických viet
resp. príkazov imperatívneho štýlu a udávalo by tak sémantiku a syntax kódu použiteľného v akciách.
Výrazy by mali mať čo najväčšiu vyjadrovaciu schopnosť a pokrývať čo najviac z možností jazyka Petriflow.
Výrazy musia byť rýchlo pochopiteľné a už na prvý pohľad jasné, čo vykonávajú a s akým objektami manipulujú.
API musí byť jednoducho rozšíriteľné bez potreby zasahovať do pôvodnej implementácie. Musia byť poskytnuté spôsoby
ako rozšíriť API aby to bolo aj samo-dokumentujúce ľahko propagovateľné a prenositeľné bez ohľadu na proces, či projekt.
Výrazy musia pracovať s čo najmenším počtom druhov štruktúr aby sa developer nemusel oboznamovať s rôznymi implementáciami.

## Training examples

change field1 value { return some value }
change field1 choices { return [] }
change field1 choices { return [] }

make field,behaviour on transition when { 'some' instanceof String }

getData(task1) => Map<String, Field>
getData("t1",useCase)

setData(task, [
    "new_limit": [
        "value": "10000",
        "type" : "number"
    ],
])

Resources:
    Case
    Task
    Field
    User
    Role (permission system)

set #field1 value to "Some text"
set value of #field1 to "Some text"

get data of #task1
find task where { it.title.eq "Some string" }
find task "sometaskid"
find task field1.value

in case #caseRef.value { // !!! in je rezervované slovo
    set #otherField value to 25
}
set #field1 value in #case1 to "Some text"
set #field1 behaviour in #task1 to visible

has #field1 option "option 1"
has #field1 value  "option1"
#field1.options add "Option 1"

assign #task1 to #user
cancel #task1
finish #task1
execute #task1 with {
    set #field1 value to "Some text"
}



change <resource> <property> Closure<type of property> | Instance of property

## Queries

Bude potrebné vybudovať query language (pravdepodobné niečo elasticsearch query string query) ktorý bude jasne definovaný
a jednoduchý.
