# Data Fields

In engine there are multiple supported field types which can be used, when creating form. Some types can have multiple
views depending on the use case. Here is the overview of all types with their views (components). Views can be changed
via `<component>` `<name>` tag E.g.:

```xml

<data type="i18n">
    <id>i18n_field</id>
    <title>Title</title>
    <placeholder>Placeholder</placeholder>
    <init name="i18n_field_translation">Init value</init>
    <component>
        <name>divider</name>
    </component>
</data>
```

In the next section of document, if (default) is mentioned in component part, it means you don't have to specify
`<name>` tag in the field component.

## Boolean field

> Coming soon

## Button field

> Coming soon

#### Component

* `basic` (default)
* `raised`
* `stroked`
* `flat`
* `icon`
* `fab`
* `minifab`

Please refer to [Angular material button guide](https://material.angular.io/components/button/overview), to find out
design of each button.

## Date field

> Coming soon

## Datetime field

> Coming soon

## Enumeration field

An Enumeration Field is a user interface element used for inputting values from a predetermined set of choices. It typically appears as a dropdown list or selection box in which users can choose from a list of available options. The value of this field is represented as a ChoiceField, which is a data type that allows users to select from a list of pre-defined choices.

In the case of the enumeration field described, the ChoiceField is of type I18nString. I18nString is a data type that allows for the localization of string values, meaning that the choices available in the enumeration field can be displayed in different languages based on the user's locale settings.

Therefore, the enumeration field with a value of `ChoiceField<I18nString>` allows users to select from a list of localized options, with the application being able to capture and process the user's selection accordingly. The application can use the selected I18nString value to perform various operations or display information to the user in the selected language.

```xml

<data type="enumeration">
  <id>enumeration_1</id>
  <title>Enumeration field</title>
  <options>
    <option key="Choice one">Choice one</option>
    <option key="Choice two">Choice two</option>
    <option key="Choice three">Choice three</option>
  </options>
  <init>Choice one</init>
</data>

```

<img alt="numberfield" src="../data/img/numberField.png" width="438" title="numberfield"/>

#### Value

* `ChoiceField<I18nString>` / `Set<String>`

```Netgrif Actions API
enumeration_1: f.enumeration_1;

change enumeration_1 choices { ["a", "b", "c"] }
change enumeration_1 value { "a" }
```

#### Component

* `select` (default)
* `autocomplete_dynamic`
* `autocomplete`
* `list`
* `stepper`
* `icon`

## File field

Servers for uploading file to the server. File is persisted in server storage, until user deletes the file or uploads
another file on top of the existing one. If new file is uploaded, old one is deleted from the storage. Exception in this
behavior is, when you try to upload file with the same name as already uploaded file. In that case, you need to rename
file, you are trying to upload or delete uploaded file and then re-upload new file. File field saves name of the file
and
path to the file in the application storage.

File field has two views. **default** view has only an upload button and file name (which adds possibility to download
file
on click) in its field input. **preview** extends **default** view with preview of uploaded file. Preview is supported
only for these file formats: jpg, jpeg, png, pdf

#### Component

* `default` (default)
* `preview`

## File list field

Similarly to file field, this one also servers to upload file to the server, but in this case, it can handle multiple
files at the same time. Unlike file field, file list field has only one view, because you cannot display preview for
multiple files in good way. You can upload new files to this field, but similarly to file field, you cannot upload files
with same names as already uploaded files. You can rename files, you want to upload or delete already uploaded files.

File list field has only a default view, which looks similarly to file field default view, but there is a list of
uploaded
files names instead of just one file name.

This field also has one validation for maximum number of uploaded files `maxFiles`, which can be set in xml document.

## Filter field

> Coming soon

## I18n field

This field servers to support translations in the application. Value of this field is I18nType, which means, you can set
default value of this field with translations in all languages you want.

This field has two views. First one is **text** view, which is similar to text field in visible form. In editable form
you can choose multiple translations as value of this field. Second one is **divider**
form which is displayed as horizontal line with text (text is optional). This divider view is customizable with font
size and divider line color.

This field has two validations:

* `translationRequired` - accepts language codes separated by comma, that are required (
  eg. `translationRequired sk,pl,cz`)
* `translationOnly` - accepts language codes separated by comma, that are only allowed in field (
  eg. `translationOnly sk,pl,cz,en`)

#### Component

* `text` (default)
* `divider`

#### Properties

In **divider** view, i18n field supports these properties:

* `fontSize` - defines size of text font between divider lines
* `dividerColor` - defines color of the divider line

In **text** view, i18n field supports these properties (disabled behavior):

* `plainText` - defines view of text field, if false, field is displayed as disabled text field, otherwise it is
  displayed as plain text
* `fontSize` - defines size of text font
* `dividerColor` - defines color of the text

## Multichoice field

Multichoice Field is a user interface element used for inputting multiple values from a predetermined set of choices. It typically appears as a dropdown list or selection box with checkboxes next to each option, allowing users to select one or more choices from a list of available options. The value of this field is represented as a ChoiceField with a Set of I18nString, which is a data type that allows users to select from a list of pre-defined choices, where each choice can be localized into multiple languages based on the user's locale settings.

In the case of the Multichoice field described, the ChoiceField is of type `Set<I18nString>`, which allows users to select multiple localized options from the list of available choices. The application can capture and process the user's selection as a set of I18nString values, each representing the localized version of the selected option. The application can then use these selected values to perform various operations or display information to the user in the selected languages.

Overall, the Multichoice field with a value of `ChoiceField<Set<I18nString>>` allows users to select and submit multiple localized options simultaneously, providing a more flexible and powerful way of capturing user input compared to the single-selection Enumeration field.

```xml
<data type="multichoice">
  <id>multichoice_0</id>
  <title/>
  <options>
    <option key="Choice One">Choice One</option>
    <option key="Choice Two">Choice Two</option>
    <option key="Choice Three">Choice Three</option>
  </options>
  <inits>
    <init>Choice One</init>
    <init>Choice Two</init>
  </inits>
</data>
```

#### Component

* `select` (default)
* `list`

```Netgrif Actions API
multichoice_0: f.multichoice_0;

change multichoice_0 choices { ["a", "b", "c"] }
change multichoice_0 value { ["a", "b"] }
```

## Number field

A Number Field is a user interface element used for inputting numerical data. It typically appears as a rectangular box or input area in which users can enter numeric values, such as measurements, quantities, or other numeric data. The value of this field is a decimal number that can be manipulated by the application as needed, with the specific type being a Double. Double is a data type that represents a 64-bit floating-point number in the IEEE 754 standard, and can hold a wide range of numerical values, including those with decimal places. The application can perform calculations, comparisons, and other operations on the Double value entered into the Number Field as needed.

```xml

<data type="number">
  <id>number_0</id>
  <title>Text field</title>
  <init>1</init>
</data>
```

<img alt="numberfield" src="../data/img/numberField.png" width="438" title="numberfield"/>

#### Value

* `Double`

Action to change number field value:
```Netgrif Actions API
number_0: f.number_0;
change number_0 value {  3.525; }
```

#### Component

* `default` (default)
* `currency`

## Text field

A Text Field is a user interface element used for inputting text data. It typically appears as a rectangular box or
input area in which users can enter text, such as names, descriptions, or other free-form text. The value of this field
is a string of text that can be manipulated by the application as needed.

```xml

<data type="text">
    <id>text_0</id>
    <title>Text field</title>
    <init>Initial value</init>
</data>
```

<img src="img/textfield.png" width="50%"/>

#### Value

* `String`

Action to change text field value:
```Netgrif Actions API
text_0: f.text_0;
change text_0 value {  "New text field value."; }
```

#### Component

* `simple` (default)
* `password`
* `textarea`
* `richtextarea`
* `htmltextarea`

```xml

<data type="text">
    <id>text_0</id>
    <title>Text field</title>
    <init>Initial value</init>
    <component>
        <name>textarea</name>
    </component>
</data>
```

## User field

> Coming soon
