# "Hello world" application

## What you will build

You will build a basic web-based process-driven application that will greet you when you enter your name. You will be able to create instances of the hello world process and interact with them.

<p align="center">
    <img src="_media/helloWorld/b.png">
</p>

<p align="center">
    <img src="_media/helloWorld/a.png">
</p>

## What you will need

* 10 - 15 minutes
* Netgrif Application Engine CE already installed or created free account at [demo.netgrif.com](https://demo.netgrif.com)
* Access to the internet for [builder.netgrif.com](https://builder.netgrif.com) site

## Tutorial

### Modeling the process

Head to https://builder.netgrif.com. At this site, you are able to create Petri Nets which describe how the process will behave. Let’s start drawing the process. You can learn more about fundamentals of Petri nets here.

<p align="center">
    <img src="_media/helloWorld/1.png">
</p>

First, add one place. This will be the starting point of the process. Now we need to add new “screen” on which we can interact with the process as a user. This is done via transition.

<p align="center">
    <img src="_media/helloWorld/2.png">
</p>

Now let’s add one output place and connect them together with arcs, to demonstrate the flow of the process.

<p align="center">
    <img src="_media/helloWorld/3.png">
</p>

As a next step, add another transition. This will behave as our greeting screen. We will connect it with read arc.

<p align="center">
    <img src="_media/helloWorld/4.png">
</p>

Last, we need to add one token into the place p1 so the first transition is executable.

<p align="center">
    <img src="_media/helloWorld/5.png">
</p>

With this we are done with modeling of the process. Let’s move to data layer next.

### Adding data & screens into process

Right click on the transition Type your name and select `Create form`. A new screen will appear.

<p align="center">
    <img src="_media/helloWorld/6.png">
</p>

This screen consists of three main elements:
<ol>
    <li>On the left, there is selection of possible fields that can be added into the screen. You can either choose one of the existing fields in the process or create a new one. If you are interested in the list of all fields with explanation, click here.</li>
    <li>In the middle there is a place to arrange the fields how they shall look on the web</li>
    <li>On the left, there is possibility to change field properties such as name of the field.</li>
</ol>

Let’s add two new text fields. Simply drag them from the left onto the grey area.

<p align="center">
    <img src="_media/helloWorld/7.png">
</p>

Left click on the field to see properties of the selected field on the right. We can set id of the two fields `name` and `surname` using the pencil icon. We can also set label, which will help user to distinguish between them.

<p align="center">
    <img src="_media/helloWorld/8.png">
</p>

In set field behaviour we can also alter the behaviour of the field on this given transition (screen). To make sure the user will fill both of the fields, set both to editable and required from the multichoice menu on the right. To learn more about field behaviours, click here.

<p align="center">
    <img src="_media/helloWorld/9.png">
</p>

Repeat the same steps on the transition `Hello world`, but this time add only one field and call it greetings. Set its behaviour to visible, as we do not want user to change content of the field (by effectively making it read-only)

<p align="center">
    <img src="_media/helloWorld/10.png">
</p>

At this point we are done with adding data. Now we construct the greetings message.

### Adding actions

We now want to make an action, where when user finishes the task `Type your name`, the system will construct greetings message into the datafield greetings. To learn more about actions, click here.

From the default view there the Petri Net was modeled, right click on the transition `Type your name`. This will open `Actions` view.

<p align="center">
    <img src="_media/helloWorld/11.png">
</p>

We want to react on an event when the task `Type your name` is finished, so let’s click `Events` -> `Finish` -> `Post`

<p align="center">
    <img src="_media/helloWorld/12.png">
</p>

In the window, we can start typing the code that is supposed to be executed when the task is finished. The code uses the Petriflow language based on Groovy. First, let’s declare all the datafields we want to interact with in this action. For us it is `name`, `surname` and `greetings`.

<p align="center">
    <img src="_media/helloWorld/13.png">
</p>

Now we will change the value of the greetings field.

<p align="center">
    <img src="_media/helloWorld/14.png">
</p>

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

<p align="center">
    <img src="_media/helloWorld/15.png">
</p>

The download of the process will start immediately. The download	file is in XML format and human readable definition of the process. At any point you can upload this XML into the builder application and continue editing it. At the end, just download the new version of the process again.

## Testing the downloaded process

### Uploading the process XML file

Head onto https://demo.netgrif.com and sign into your account. On the left side select `Process` tab. In case you do not have an account yet, you need to create one for free.

<p align="center">
    <img src="_media/helloWorld/16.png">
</p>

In the bottom right corner click on the `Upload` button and upload the downloaded XML file. It will appear in the tab immediately.

<p align="center">
    <img src="_media/helloWorld/17.png">
</p>

At this point the process is registered successfully and new instances can be created.

### Creating an instance of the Hello world process

Click on the `All Cases` tab. In the top right corner there is a plus button (`+`) to create a new instance of a process. Click that button to create a new instance of our Hello World project.

<p align="center">
    <img src="_media/helloWorld/18.png">
</p>

After you name your case, you’ll be redirected onto `Tasks` tab of the recently created case.

<p align="center">
    <img src="_media/helloWorld/19.png">
</p>

After you assign the task, you can start filling the `Name` and `Surname` fields.

<p align="center">
    <img src="_media/helloWorld/20.png">
</p>

When you are finished, click on `Finish` to signalize the engine to finish the task and move in the process of this exact case.

<p align="center">
    <img src="_media/helloWorld/21.png">
</p>

Now the application is completed and you successfully finished the hello world tutorial!
Congratulations!