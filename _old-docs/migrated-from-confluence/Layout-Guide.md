#Form Layouts

The application engine supports 3 layouting algorithms.
Each transition and each data group can use a different algorithm.
If no algorithm is specified the **legacy** algorithm will be used.

##XSD Schema

The following section contains the XML specification of the various layout properties on various layout related elements.

###Transition

```xml
<xs:element name="layout">
    <xs:complexType>
        <xs:sequence>
            <xs:element ref="cols" minOccurs="0"/>
            <xs:element ref="rows" minOccurs="0"/>
            <xs:element ref="offset" minOccurs="0"/>
            <xs:element name="fieldAlignment" type="fieldAlignment" minOccurs="0"/>
        </xs:sequence>
        <xs:attribute name="type" type="layoutType"/>
    </xs:complexType>
</xs:element>
```

[comment]: <> (            <xs:element ref="hideEmptyRows" minOccurs="0"/>)

[comment]: <> (            <xs:element ref="compactDirection" minOccurs="0"/>)

**cols** - determines the default number of columns for the data groups contained in this task. If no value is specified the number of columns is set to 4.

**rows** - defines a maximum number of rows that can be displayed ad the same time, effectively limiting the task view port to a specific height. If the task contains more rows a scroll bar will be displayed. If omitted the maximum number of rows is unbounded.

**offset** - configures the side offset of all data fields from the side of their designated space in the task. This offset is added to the individual offset of each field that they may or may not define. If not specified the offset is 0. 

**fieldAlignment** - determines the default alignment of fields within their designated space. Allowed values are `top`, `center` and `bottom`. If not specified, `center` is used

[comment]: <> (**hideEmptyRows** _&#40;od verzie 5.7.0&#41;_ - konfiguruje pravidlo pre skrývanie riadkov. Povolené hodnoty sú _all_, _compacted_ a _none_. Ovplyvňuje správanie `grid` layoutu.)

[comment]: <> (**compactDirection** _&#40;od verzie 5.7.0&#41;_ - konfiguruje pravidlo pre presúvanie referencovaných fieldov na voľné miesta. Povolené hodnoty sú _none_ a _up_. Ovplyvňuje správanie `grid` layoutu.)

**type** attribute - determines the default layouting algorithm for the data groups contained in this task. Allowed values are `legacy`, `flow` and `grid`. If not specified, `grid` is used

#### Example

```xml
<transition>
    <layout type="legacy">
        <cols>4</cols>
        <fieldAlignment>center</fieldAlignment>
    </layout>
</transition>
```

###Data Group

```xml
<xs:element name="dataGroup">
    <xs:complexType>
        <xs:sequence>
            <xs:element ref="id"/>
            <xs:element ref="cols" minOccurs="0"/>
            <xs:element ref="rows" minOccurs="0"/>
            <xs:element name="layout" type="layoutType"/>
            <xs:element ref="title" minOccurs="0"/>
            <xs:element ref="alignment" minOccurs="0"/>
            <xs:element ref="stretch" minOccurs="0"/>
            <xs:element ref="dataRef" maxOccurs="unbounded" minOccurs="0"/>
        </xs:sequence>
    </xs:complexType>
</xs:element>
```

[comment]: <> (            <xs:element ref="hideEmptyRows" minOccurs="0"/>)

[comment]: <> (            <xs:element ref="compactDirection" minOccurs="0"/>)

**title** - the title of the data group. If not present, nothing is displayed. If present but with an empty value, a continuous line will be displayed above the first field in the group.
If a non-empty value is set, the value is displayed with a line above the first field in the group.

[comment]: <> (TODO)
**cols** - the number of columns of the data group. Cannot be greater than the number of columns of the parent task. If a smaller number is set, only the leftmost _N_ columns will be used.

**rows** - _currently does nothing_

**layout** - determines the layouting algorithm of the data group. If none is specified, the parent tasks algorithm will be used. Allowed values are `legacy`, `flow` and `grid`

**alignment** - determines where should fields be placed if they cannot fill the entire row. Only affects the `lagacy` and `flow` layouts. The allowed values are `start`, `center` and `end`. If not specified `start` is used

**stretch** - determines whether the data fields should be stretched to fill the entire row. Only affects the `lagacy` and `flow` layouts. If not specified `false` is used

[comment]: <> (**hideEmptyRows** _&#40;od verzie 5.7.0&#41;_ - konfiguruje pravidlo pre skrývanie riadkov. Povolené hodnoty sú _all_, _compacted_ a _none_. Ovplyvňuje správanie `grid` layoutu.)

[comment]: <> (**compactDirection** _&#40;od verzie 5.7.0&#41;_ - konfiguruje pravidlo pre presúvanie referencovaných fieldov na voľné miesta. Povolené hodnoty sú _none_ a _up_. Ovplyvňuje správanie `grid` layoutu.)

#### Example

```xml
<dataGroup>
    <cols>3</cols>
    <layout>flow</layout>
    <alignment>start</alignment>
    <stretch>true</stretch>
<dataGroup>
```

###Data Ref

```xml
<xs:element name="dataRef">
    <xs:complexType>
        <xs:sequence>
            <xs:element ref="id"/>
            <xs:element ref="logic"/>
            <xs:element ref="layout" minOccurs="0"/>
        </xs:sequence>
    </xs:complexType>
</xs:element>

<xs:element name="layout">
    <xs:complexType>
        <xs:sequence>
            <xs:element ref="x"/>
            <xs:element ref="y"/>
            <xs:element ref="rows"/>
            <xs:element ref="cols"/>
            <xs:element ref="offset"/>
            <xs:element ref="template" minOccurs="0"/>
            <xs:element ref="appearance" minOccurs="0"/>
            <xs:element name="alignment" type="fieldAlignment" minOccurs="0"/>
        </xs:sequence>
    </xs:complexType>
</xs:element>
```

**x** - coordinate of the column which is occupied by the top-left corner of the field. The left most column has value 0. Only affects the `grid` layout

**y** - coordinate of the row which is occupied by the top-left corner of the field. The first row has value 0. Only affects the `grid` layout

**rows** - determines how many rows are occupied by the data field (its height). Only affects the `grid` layout

**cols** - determines how many columns are occupied by the data field (its width). Only affects the `grid` layout

**offset** - configures the offset of the data field form the side of the space designated for it. Is added to the offset defined in the transition

**template** - determines the display template used by the fields. If not specified `material` is used. The available options are:
* `material` - most of the available space is occupied by the input, with the field title above it
* `netgrif` - the available space is split in half vertically. The field title is displayed in the left half, the input is displayed in the right half. If the total available width is too small `material` template is used regardless of the setting.

**appearance** - determines the appearance of the input according to Material Design. Affects only those data fields that contain input elements (for example boolean fields are not affected).
Allowed values are `standard`, `outline`, `fill` and `legacy`. If not specified `outline` is used

**alignment** - overrides the **fieldAlignment** setting from the transition.  Allowed values are `top`, `center` and `bottom`

#### Example

```xml
<dataRef>
    <layout>
        <x>2</x>
        <y>2</y>
        <rows>1</rows>
        <cols>2</cols>
        <template>material</template>
        <appearance>outline</appearance>
    </layout>
</dataRef>
```

##Layout mechanics

This section contains the general rules for the computation of the final layout. Examples of each layout are available in the following sections.

All layouting algorithms operate in a grid, the algorithm affects only how the fields placed into it.
The rows of the grid stretch to accommodate the highest element inside them. If a field that takes multiple rows requires more space, all of its rows are stretched evenly.
None of the algorithms allow creation of empty rows in the layout.
[comment]: <> (TODO grid does in 5.7.0)

Each data group is a mostly independent layouting unit. Data groups have independent coordinate systems but, once their layout is resolved,
they are combined into a single grid and displayed.

All data refs that are not contained in data groups are added to a "virtual" data group at the end of the task.
This data group has the `legacy` layout and the `stretch` property set to `true`.
Creating references without data groups is impossible without modifying the XML generated by the builder by hand.

A data group with no visible fields is hidden and does not display its title.
A data group that has at least one of its fields visible display its title (if set).

If the `grid` layout is used and two or more elements are designated to occupy the same coordinate an error is thrown.
The error contains the identifiers of the overlapping fields, as well as, the overlapping coordinate.
The displayed IDs don't completely follow the IDs declared in the process, but remove special character and may contain variations that assure their uniqueness within the grid.

##Legacy layout

The legacy layout behaves the same way as the layouting in the pre-4.0.0 versions of the application engine.

The legacy layout requires tha data group to have exactly 4 columns. If set to a different number, the count is changed to 4 and a warning is displayed.

Fields are laid out in a zig-zag patter from left to right into two columns. The order of the fields is given by the order of their references in the process.
The last field (if their number is odd) is displayed in the left, middle or right part of the last row base on the value of the `alignment` attribute of the parent data group.

If some fields are hidden, their space is filled by the remaining fields in the layout in a zig-zag fashion, according to the ordering of their references in the data group.

###Example

![](Layout-Guide-legacy-example1.png)
![](Layout-Guide-legacy-example2.png)

Process file downloadable [HERE](Layout-Guide-legacy-example.xml).

##Flow Layout

The flow layout is similar to the legacy layout, but works with any number of columns.
Each field occupies a single cell of the grid and the fields are placed in a zig-zag pattern from left to right, same as in legacy layout.
The `alignment` attribute affects all the fields that overflow from the last full row.
If `center` alignment is used and the number of left over fields does not match the number of columns (if the number of left over fields is odd, but the number of columns is even and vice-versa),
then the fields are placed towards the center, as if their number was correct, but the rightmost position is left empty.

If the `stretch` attribute is set, this layout behaves the exact same way, as the legacy layout.

###Example

![](Layout-Guide-flow-example1.png)
![](Layout-Guide-flow-example2.png)

Process file downloadable [HERE](Layout-Guide-flow-example.xml).

##Grid Layout

The layout of the fields is given by the `x` and `y` coordinates and `rows` and `cols` attribute values of the individual data refs.

Each data group has its own coordinate system, where the top-left corner has the coordinates `(0,0)`, the x coordinate increases to the right, while the y coordinate increases downwards.
The maximum x coordinate is limited by the number of columns of the task, the maximum y coordinate is unlimited.
If a field occupies an already occupied space, or a space outside the bounds, an error is thrown and the conflicting location is logged.

[comment]: <> (Posúvanie data fieldov v rámci data grupy je konfigurovateľné &#40;od verzie 5.7.0&#41; pomocou atribútov **hideEmptyRows** a **compactDirection**. Pokiaľ data grupa nedefinuje tieto atribúty zdedia sa z konfigurácie uvedenej v nadradenom transition. Pokiaľ transition nedefinuje tieto atribúty použijú sa default hodnoty.)

[comment]: <> (Default hodnoty pre verziu 5.7.0 sú:)

[comment]: <> (`hideEmptyRows: all`)

[comment]: <> (`compactDirection: none`)

[comment]: <> (Vo verziách <5.7.0 toto správanie nie je možné konfigurovať. Layout sa správa akoby boli tieto atribúty nastavené nasledovne:)

[comment]: <> (`hideEmptyRows: all`)

[comment]: <> (`compactDirection: up`)

[comment]: <> (###compactDirection)

[comment]: <> (Určuje akým spôsobom sa majú fieldy “skompaktňovať“.)

[comment]: <> (**none** - fieldy sa neposúvajú zo svojich pozícií)

[comment]: <> (**up** - pokiaľ je nad fieldom voľné miesto do ktorého sa field zmestí posunie sa nahor. Fieldy sa posúvajú nezávisle na sebe, takže fieldy definované v rovnakom riadku môžu skončiť v rôznych riadkoch vo výslednom layoute.)

[comment]: <> (###hideEmptyRows)

[comment]: <> (Určuje čo sa má stať s riadkami, ktoré nepobsahujú žiadne fieldy.)

[comment]: <> (**all** - všetky riadky ktoré sú vo výslednom layoute prázdne sú z layoutu odstránené)

[comment]: <> (**compacted** - riadky, ktoré sa vyprázdnia tým, že sa z nich presunú fieldy pri skompaktňovaní sú odstránené. Riadky ktoré neobsahujú žiadne viditeľné fieldy sú zachované.)

[comment]: <> (**none** - všetky prázdne riadky zostávajú vo výslednom layoute)

###Example

![](Layout-Guide-grid-example.png)

Process file downloadable [HERE](Layout-Guide-grid-example.xml).

[comment]: <> (![]&#40;attachments/954662921/2120712195.png&#41;)

[comment]: <> (![]&#40;attachments/954662921/2120024071.png?width=680&#41;)

[comment]: <> ([![]&#40;attachments/thumbnails/954662921/2119860243&#41;]&#40;attachments/954662921/2119860243.xml&#41;)

##Task ref

Task ref is a special data variable type introduced in NAE 4.1.0 . It allows referencing other tasks and to display their content within tasks.

###Task ref mechanics

A task ref field is never displayed in the layout, only its content is displayed. The server resolves the content of the referenced tasks and places the resulting data groups AFTER the current data group. The position of the task ref within the current data group does not affect where the referenced data groups end up.

That is the content is displayed immediately following the current data group, any fields that are in the same data group as the task ref are displayed before the referenced content, regardless of their relative position to the task ref in their data group.

Since the data groups are rendered IN ORDER and the task ref field places the data groups it contains AFTER its host data group the content is displayed immediately following the host data group.

If a task that contains fewer columns than the host task is referenced only the leftmost N columns will be used to display its content. Where N is its width.

If a task that contains more columns than the host task is referenced a layouting error will be thrown and the layout won’t display at all.

#### Example

![](Layout-Guide-taskref-example-model.png)

![](Layout-Guide-taskref-example-layout.png)

[comment]: <> (The content of task refs is displayed in-place. That is wherever the task ref is in the host data group its content will be inserted at its position, pushing any other content down.)

[comment]: <> (Each data group is now contained in a separate grid for rendering and can therefore have a different number of columns in its layout. All data group are stretched horizontally to fit the same space - a data group with more columns has a larger number of narrower columns, but the total width is the same.)

[comment]: <> (#### Example)

[comment]: <> (![]&#40;attachments/954662921/2154921993.png&#41;)

[comment]: <> (![]&#40;attachments/954662921/2155118603.png&#41;)