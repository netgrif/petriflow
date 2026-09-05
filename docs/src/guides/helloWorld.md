# "Hello world" application

## What you will build

You will build a basic web-based process-driven application that will greet you when you enter your name. You will be
able to create instances of the hello world process and interact with them.

![Hello world application example](/guides/helloWorld/b.png)

![Hello world application example](/guides/helloWorld/a.png)

## What you will need

* 10 - 15 minutes
* Netgrif Application Engine CE already installed or created free account
  at [etask.netgrif.cloud](https://etask.netgrif.cloud)
* Access to the internet for [builder.netgrif.com](https://builder.netgrif.com) site

## Tutorial

### Modeling the process

Head to https://builder.netgrif.com. At this site, you are able to create Petri Nets which describe how the process will
behave. Let’s start drawing the process. You can learn more about fundamentals of Petri nets here.

![Petri net canvas in the builder](/guides/helloWorld/1.png)

First, add one place. This will be the starting point of the process. Now we need to add new “screen” on which we can
interact with the process as a user. This is done via transition.

![Adding a place to the process](/guides/helloWorld/2.png)

Now let’s add one output place and connect them together with arcs, to demonstrate the flow of the process.

![Connecting places and transitions with arcs](/guides/helloWorld/3.png)

As a next step, add another transition. This will behave as our greeting screen. We will connect it with read arc.

![Adding the greeting transition](/guides/helloWorld/4.png)

Last, we need to add one token into the place p1 so the first transition is executable.

![Adding a token to place p1](/guides/helloWorld/5.png)

With this we are done with modeling of the process. Let’s move to data layer next.

### Adding data & screens into process

Right click on the transition Type your name and select `Create form`. A new screen will appear.

![Creating a form for the transition](/guides/helloWorld/6.png)

This screen consists of three main elements:

1. On the left, there is selection of possible fields that can be added into the screen. You can either choose one of
   the existing fields in the process or create a new one. If you are interested in the list of all fields with
   explanation, click here.
2. In the middle there is a place to arrange the fields how they shall look on the web
3. On the left, there is possibility to change field properties such as name of the field.

Let’s add two new text fields. Simply drag them from the left onto the grey area.

![Adding text fields to the form](/guides/helloWorld/7.png)

Left click on the field to see properties of the selected field on the right. We can set id of the two fields `name` and
`surname` using the pencil icon. We can also set label, which will help user to distinguish between them.

![Setting a data field template](/guides/helloWorld/8.png)

In set field behaviour we can also alter the behaviour of the field on this given transition (screen). To make sure the
user will fill both of the fields, set both to editable and required from the multichoice menu on the right. To learn
more about field behaviours, click here.

![Setting a data field behaviour](/guides/helloWorld/9.png)

Repeat the same steps on the transition `Hello world`, but this time add only one field and call it greetings. Set its
behaviour to visible, as we do not want user to change content of the field (by effectively making it read-only)

![Setting the greeting field behaviour](/guides/helloWorld/10.png)

At this point we are done with adding data. Now we construct the greetings message.

### Adding actions

We now want to make an action, where when user finishes the task `Type your name`, the system will construct greetings
message into the datafield greetings. To learn more about actions, click here.

From the default view there the Petri Net was modeled, right click on the transition `Type your name`. This will open
`Actions` view.

![Opening the Actions view](/guides/helloWorld/11.png)

We want to react on an event when the task `Type your name` is finished, so let’s click `Events` -> `Finish` -> `Post`

![Selecting the finish event](/guides/helloWorld/12.png)

In the window, we can start typing the code that is supposed to be executed when the task is finished. The code uses the
Petriflow language based on Groovy. First, let’s declare all the datafields we want to interact with in this action. For
us it is `name`, `surname` and `greetings`.

![Declaring data fields in the action](/guides/helloWorld/13.png)

Now we will change the value of the greetings field.

![Changing the greeting value](/guides/helloWorld/14.png)

The full code of the action is bellow:

```groovy
name: f.name,
surname: f.surname,
greetings: f.greetings;

change greetings value { return "Hello " + name.value  " " + surname.value ", nice to meet you!" }
```

We are done with the process at this point. Let’s test it now.

### Downloading the process

To download the process click the `download` button and accept the prompt. You can name the file.

![Downloading the process](/guides/helloWorld/15.png)

The download of the process will start immediately. The download file is in XML format and human readable definition of
the process. At any point you can upload this XML into the builder application and continue editing it. At the end, just
download the new version of the process again.

## Testing the downloaded process

### Uploading the process XML file

Head onto https://etask.netgrif.cloud and sign into your account. On the left side select `Process` tab. In case you do not
have an account yet, you need to create one for free.

![Application Engine process tab](/guides/helloWorld/16.png)

In the bottom right corner click on the `Upload` button and upload the downloaded XML file. It will appear in the tab
immediately.

![Uploading the process](/guides/helloWorld/17.png)

At this point the process is registered successfully and new instances can be created.

### Creating an instance of the Hello world process

Click on the `All Cases` tab. In the top right corner there is a plus button (`+`) to create a new instance of a
process. Click that button to create a new instance of our Hello World project.

![Creating a new case](/guides/helloWorld/18.png)

After you name your case, you’ll be redirected onto `Tasks` tab of the recently created case.

![Creating a new process instance](/guides/helloWorld/19.png)

After you assign the task, you can start filling the `Name` and `Surname` fields.

![Case tasks tab](/guides/helloWorld/20.png)

When you are finished, click on `Finish` to signalize the engine to finish the task and move in the process of this
exact case.

![Finishing the task](/guides/helloWorld/21.png)

Now the application is completed and you successfully finished the hello world tutorial!
Congratulations!