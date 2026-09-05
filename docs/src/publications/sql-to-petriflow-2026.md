::: titlepage
<!-- ![image](LOGA_PROJEKTY_R2R4.jpg){height="2cm"} -->\
Pan-European University, Faculty of Informatics\
Interim Research Report\
**Translation of subset of SQL to a low-code language based on
object-centric processes\**
of the project\
**Requirements and formal definition of a low-code language based on
object-centric processes - LowcodeOCP\**
Authors:\
Gabriel Juhás, Milan Mladoniczky, Juraj Mažári, Tomáš Kováčik and Jozef
Daxner\
Contact:\
gabriel.juhas@paneurouni.com, milan.mladoniczky@paneurouni.com\
Funded by the EU NextGenerationEU through the Recovery and Resilience
Plan for Slovakia under the project No.\
09I03-03-V04-00493\
2026-09-05\
Version: v0.1
:::

# Executive Summary {#executive-summary .unnumbered}

Provide a non-technical 1--2 page summary: objectives, scope, key
achievements so far, preliminary results, notable deviations from plan,
upcoming milestones, and high-level risks.

# Introduction

## Background and Motivation

Context of the problem, why it matters, and who benefits.

## Objectives and Scope

List primary and secondary objectives. Define the scope and out-of-scope
items.

## Research Questions / Hypotheses

State the research questions or hypotheses driving the work.

# Related Work

Briefly survey the most relevant literature. Use citations like
[@knuth1984texbook]. Contrast existing approaches and identify gaps this
project addresses.

# Methods and Approach

## Methodology

## Requirements Specification

In this article, we will specify what we need to implement a Petriflow
pre-processor to transform SQL statements into Petriflow processes. In
the following section, we will list the functional and non-functional
requirements for this implementation.[@DaxThesis]

### SQL statement preprocessor

Now we will list the functional and non-functional requirements for the
SQL statement preprocessor, with functional requirements determining the
capabilities that the preprocessor will provide and non-functional
requirements determining the technical constraints that should be
respected.[@DaxThesis]

#### Functional requirements

[@DaxThesis]

- The preprocessor will be able to work with the following SQL dialects:
  MySQL, PostgreSQL and Oracle SQL

- The preprocessor will support table creation and deletion operations
  (CREATE and DROP TABLE) as well as insert, modify, search and delete
  data operations (INSERT, UPDATE, SELECT, DELETE, TRUNCATE) from
  existing tables.

- The output of the preprocessing will be a Petriflow process in XML
  format. If it is a table creation command, this process will support
  the creation of new instances of this process (new records in the
  table), browsing the record data, editing them, and also deleting the
  record.

- Along with the pre-processor, a registration service will also be
  created, which will ensure the registration of pre-processors that
  will be created in the future. This service will have a web interface
  and will support the registration of new pre-processors, editing
  information about existing pre-processors, and also deleting them.

#### Non-functional requirements

[@DaxThesis]

- When processing one file, the pre-processor will be able to process
  only one table creation operation, but the number of other operations
  will not be limited.

- Pre-processing time will not exceed 1 second when processing up to 100
  commands.

- For faster application execution, functions for searching for process
  instances that use Elasticsearch will be used.

- If the commands do not contain a command to create a table or a
  command to search for data (SELECT), the process is automatically
  deleted from the application after the actions have finished running.

## Solution Design

In this part, we will focus on the solution design itself and will focus
on the Petriflow SQL command pre-processor.[@DaxThesis]

### SQL statement pre-processor

For Petriflow language pre-processing, we decided to use services that
will be managed as separate modules, which will ensure that such a
module can be created by anyone and then registered using a registration
service. To implement such a solution, we will first need to create a
registration service that will provide the possibility of registering
such modules. This service can be located outside the infrastructure of
the server Petriflow platform itself, while the server Petriflow
platform will query this service when processing process files in the
Petriflow language, which are intended for a given type of
pre-processor.[@DaxThesis]

The functioning of such pre-processing would therefore have the
following steps[@DaxThesis]:

- 1\. Uploading the process file intended for pre-processing using the
  Petriflow platform client part

- 2\. Sending this process file to the Petriflow platform server part

- 3\. Deserializing this process file

- 4\. Detecting the need to use a pre-processor

- 5\. Querying the pre-processor address stored in the registration
  service

- 6\. The registration service sends the Petriflow platform server part
  the address of the selected pre-processor

- 7\. Sending the process file to the address received from the
  registration service

- 8\. The pre-processor processes the process file

- 9\. The pre-processor sends the Petriflow platform server part a
  process file in the Petriflow base language

- 10\. The Petriflow platform server part processes this processed file
  in the Petriflow base language and then saves it

In order for this process to work, we will have to modify the Petriflow
platform server part, which handles import/upload process files so that
when detecting a process file that requires pre-processing, it
automatically finds the address of the selected pre-processor using the
registration service and sends the process file uploaded by the user to
the address thus found. The server part of the Petriflow platform will
then wait for the processed process file in the basic form of the
Petriflow language and save this processed process file.[@DaxThesis]

It will also be necessary to supplement/extend the Petriflow language
with two attributes, one of which will identify the type or name of the
pre-processor that is to be used when processing process files that
require pre-processing. The second attribute will be used to hold data
that is not part of the Petriflow language, but the pre-processor needs
such data for its operation. This attribute will therefore hold data
specific to the given type of pre-processor and we will call it process
points. Both of these new attributes must be voluntary, since we need to
maintain backward compatibility of the Petriflow language.[@DaxThesis]

### SQL command pre-processor

The SQL command pre-processor will receive a process file from the
Petriflow platform server in the Petriflow language format we have
extended. Where the main part of such a process will be the \"body\",
which should contain the SQL commands themselves. As mentioned above,
within the framework of transforming SQL commands into Petriflow
processes, we will mainly focus on commands for creating a table,
searching, inserting, modifying and deleting data, and also deleting the
tables themselves.[@DaxThesis]

The pre-processor will be written in Java, similar to the Petriflow
platform server and registration service, and will serve only one
endpoint, the endpoint itself, which provides pre-processing. This
endpoint will receive a process file in XML format and return the
processed process file in XML format.[@DaxThesis]

The resulting structure of the process after processing is influenced by
the SQL commands that are in the body of the process file requiring
pre-processing using the SQL pre-processor. The commands can be divided
into 3 groups according to how they affect the structure of the
resulting process[@DaxThesis]:

- 1\. Data search commands (SELECT) -- in this case, one transition will
  be created in the resulting process for each SELECT command that is in
  the body of the process file.

- 2\. Commands for inserting, modifying, deleting data (INSERT, UPDATE,
  DELETE, TRUNCATE), or deleting a table (DROP TABLE) -- in this case,
  the structure of the resulting process is not affected.

- 3\. Command to create a table (CREATE TABLE) -- such a command affects
  the resulting process structure the most, since in this case,
  transitions need to be created for reading data, modifying data, and
  deleting the transition itself.

Since there can be various combinations of these commands in a process
file intended for pre-processing, we will show how the resulting
processes should look. If only commands from the second group are used,
which do not affect the resulting structure of the process file, the
process will look like in [3.1](#fig:img1){reference-type="ref"
reference="fig:img1"}. Such a process will have only one initialization
point, since all used SQL commands will be executed in actions
immediately after the process is uploaded (process upload), and the
process will be automatically deleted after all actions are performed,
since its existence in the system is not necessary. Deleting a process
after its upload is performed only in this case, since in other cases
preserving processes is important, as we can see below.[@DaxThesis]

<!-- ![The resulting process using commands from the second
group](img/img1.png){#fig:img1 width="20%"} -->

If only commands from the first group are found in the SQL commands, or
in combination with commands from the second group, such a process will
look like in [3.2](#fig:img2){reference-type="ref"
reference="fig:img2"}. As mentioned, in this case, one transition is
created for each SELECT command, which is connected to the original
location by a read edge, which ensures that such a transition is always
executable. After opening such a transition, only data that meets the
condition will be automatically displayed. Preserving such a process is
important, since we need to be able to create an instance of the process
to open the transition.[@DaxThesis]

<!-- ![The resulting process using the commands from the first
group](img/img2.png){#fig:img2 width="25%"} -->

If the SQL commands contain only the CREATE TABLE command, or in
combination with commands from the second group, the resulting process
will look like in [3.3](#fig:img3){reference-type="ref"
reference="fig:img3"}. In such a process, we need to perform operations
on the instance such as reading data (Read transition), editing data
(Update transition) or deleting the instance itself (Delete transition).
If we want to display an instance of such a process using the SELECT
command, we will need a transition in which we can hide and reveal
individual data variables, for this reason we will need a Select
transition. However, if we want to reference this process in another
instance, we will need one more transition, the Reference transition.
These two transitions should not be visible in the list of transitions
above the given instance. Therefore, only the transitions for reading
data, editing data and deleting the instance should be visible to the
user in the list of transitions. The creation of the instance itself is
provided by the NAE interface itself, which complements all CRUD
database operations (i.e. Create, Read, Update and Delete).[@DaxThesis]

<!-- ![The resulting process using the CREATE TABLE
command](img/img3.png){#fig:img3 width="35%"} -->

The last form of the process is therefore a combination of commands from
all three groups. We can see this process in
[3.4](#fig:img4){reference-type="ref" reference="fig:img4"}. In such a
case, each instance of the process will offer the user transitions for
reading data, editing data and deleting the instance, as well as the
displays of individual SELECT commands.[@DaxThesis]

<!-- ![The resulting process using commands from all
groups](img/img4.png){#fig:img4 width="40%"} -->

Since the current Petriflow platform behaves in such a way that if an
action fails, all other actions are terminated, so we need to ensure
that the application runs smoothly. For this reason, we need to address
several issues related to primary keys. One issue is creating a record
(instance) when a record with the same primary key already exists.
Another issue is modifying the value of a primary key when a primary key
with the given value already exists.[@DaxThesis]

When creating the instance, we were deciding between two solutions to
this problem. One solution was to simply not create the record and
continue with the next actions in the SQL statements. However, since we
cannot throw an error that the record was not created, we would not be
able to give the user feedback about which records were created and
which were not (assuming that the user entered a large number of INSERT
statements and some of them had the same primary keys). The second
solution was to create the record as if using the AUTO_INCREMENT
database function, which automatically assigns the next primary key to
the record. In this case, the record would always be created, even if a
record with such a primary key already exists. The new record would have
the new highest primary key number. The problem with such a solution
would be that the primary keys could be swapped and thus the structure
could be disrupted even when referencing using foreign keys. Both of
these solutions have their pros and cons, we decided to use the second
solution, since in this case the situation will not arise that the data
will not be uploaded and we will not receive feedback as to why this
happened.[@DaxThesis] If there is an attempt to edit the primary key
during data editing and such a primary key already exists, we will
simply not change its value.

When referencing using foreign keys, we must keep in mind that within
individual processes we do not know which process can reference our
instance. Within foreign keys, there are three types of behavior in
databases that interest us. These types of behavior can be defined for
modifying the value (ON UPDATE) of the primary key of the referenced
record and also when deleting the referenced record (ON
DELETE)[@DaxThesis]:

- CASCADE -- with this type of foreign key, when changing the primary
  key that is referenced, the same action is automatically performed on
  the referring record. That is, if the referenced primary key is
  changed, the referring foreign key is automatically changed. If the
  referenced record is deleted, the referring record is automatically
  deleted.

- SET NULL -- when using this type of foreign key, the value of the
  referring foreign key is automatically reset if the referenced primary
  key is changed or if the referenced record is deleted.

- RESTRICT (NO ACTION) -- in this case, changing the referenced primary
  key is prohibited, or deleting the referenced record is prohibited.

Since processes do not know that they are referenced, each process that
is created using the CREATE TABLE command needs to store information
about who is referencing it and what type of reference it is. For these
purposes, 6 data variables should be created that will store values
about who is referencing the given record and what type of reference it
is. If the given referencing behavior is not specified, we will consider
RESTRICT as the default value.[@DaxThesis]

To ensure transactional behavior even when using the web interface, we
need to modify the Update transition so that the data is not
automatically updated in the database after it is changed. Since the
default behavior of the Petriflow platform is such that the value of a
variable automatically changes in the database after it is changed in
the web interface, we designed a mechanism that ensures that the data
changes only after the Update transition is completed. This mechanism is
actually that for each data item (column) there will be two data
variables. One of them is the original value, which is used when
searching and displaying data. The second is a value that is temporary
and is used only in the Update transition. The mechanism will work in
such a way that the original value is copied to a temporary variable at
the time of assignment of the transition, and after its completion, the
values of all temporary variables will be automatically copied to their
original halves.[@DaxThesis]

The transformation of individual database variable types into Petriflow
types can be seen in the following table
[3.1](#tab){reference-type="ref" reference="tab"}.[@DaxThesis]

::: {#tab}
  *Type in Java*                *Database type*                                                                       
  ----------------------------- ------------------------------------------------------------------------------------- --
  *taskRef*                     FOREIGN KEY                                                                           
  *boolean*                     BOOL, BOOLEAN                                                                         
  *dateTime*                    TIME, TIMESTAMP, DATETIME                                                             
  *date*                        DATE                                                                                  
  *file*                        CLOB, BLOB, BFILE, RAW, BYTEA                                                         
  *number*                      NUMBER, FLOAT, DOUBLE, REAL, INT, INTEGER, DECIMAL, NUMERIC                           
  *text*                        CHAR, CHARACTER, CHAR variations (VARCHAR, NVARCHAR\...), TINYTEXT, BINARY            
  *text (textArea component)*   TEXT, JSON, CHAR, CHARACTER and CHAR variations with length more than 60 characters   

  : Transformation of database types into Petriflow
:::

The process will therefore have the following data
variables[@DaxThesis]:

- One taskRef variable, which will be used in Select passes

- One i18n variable, which will serve as a warning when deleting an
  instance

- Two variables by type (original and temporary variable) for each data
  item of the process

- Six taskRef variables for storing referring records

- One taskRef variable for each foreign key, to store the Reference pass
  of the referenced record

# Results to Date

Summarise completed experiments/analyses. Use figures and tables with
clear captions.

## Quantitative Results

::: tabular
l S S S Model & Accuracy (%) & Precision (%) & Recall (%)\
Baseline A & 78.3 & 75.1 & 76.2\
Prototype B & 82.7 & 81.4 & 80.2\
:::

## Qualitative Results

Add representative examples, error analyses, ablation notes, or case
studies.

# Discussion

Interpret interim results, limitations, threats to validity, and
implications. Compare against related work.

# Work Plan

## Completed Milestones

Bullet list with dates.

## Upcoming Milestones and Timeline

Outline remaining tasks with target dates. A simple timeline table:

  Start        End          Task
  ------------ ------------ -------------------------------
  2025-10-01   2025-10-15   Data augmentation experiments
  2025-10-16   2025-11-05   Model tuning and validation
  2025-11-06   2025-11-20   Error analysis and ablations
  2025-11-21   2025-12-05   Write-up of final report

  : Planned timeline (next quarter)

## Risks and Mitigations

Identify top risks (technical, data, resourcing) and planned
mitigations.

# Resources and Budget (Optional)

Summarise compute, software, datasets, and estimated costs.

# Ethics, Privacy, and Data Management

Describe data handling, consent, privacy safeguards, bias assessment,
and data management plan.

# Conclusion

Recap progress, highlight contributions so far, and restate next steps.

# Supplementary Material

Additional figures, tables, or proofs.

# Glossary and Acronyms (Optional)

Define specialised terms and acronyms used in the report.
