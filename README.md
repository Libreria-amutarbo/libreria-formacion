# DcxNgComponents

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve dcx-ng-components
```

To create a production bundle:

```sh
npx nx build dcx-ng-components
```

To see all available targets to run for a project, run:

```sh
npx nx show project dcx-ng-components
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Generate component

To generate a component, the first step is to navigate to the library folder _libs/dcx-ng-lib/src/lib/dcx-ng-components_, and run the command: 

```sh
npx nx g c
```

Then you select the option **@nx/angular:component**. We will create it in the folder associated with that component (_e.g., dcx-ng-button/dcx-ng-button_) and with the name of the component to be developed (_e.g., button)_.