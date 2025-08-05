# starwars-characters-vue

This project implements the Star Wars API as a template that should get you started developing an escalable and maintainable application with Vue 3 in Vite.

## Project Structure

This project follows a Clean Architecture approach, organizing files by business domains rather than technical layers. This makes the codebase more scalable, testable, and maintainable.

```
src/
├── domains/
│   └── characters/
│       ├── domain/         # Core business logic: Entities, Repositories (interfaces).
│       ├── application/    # Use Cases: Orchestrates the flow of data.
│       ├── adapters/       # Data transformation: Mappers, concrete repository implementations.
│       ├── infrastructure/ # Externals: API calls, data sources.
│       └── presentation/   # UI layer: Vue components, composables, pages.
│
├── shared/
│   ├── ui/               # Global, reusable UI components (e.g., StyledButton).
│   ├── styles/           # Global styles, variables, and mixins.
│   ├── utils/            # Utils functions.
│   └── ...               # Other shared files.
│
├── router/               # Application routing configuration.
└── main.ts               # Main entry point of the application.
```

### Folder Explanation

- **`domains`**: Contains all the core business logic, separated by specific business contexts (e.g., `characters`).
  - **`domain`**: The heart of the application. Contains business entities (`Character.ts`) and repository interfaces (`CharacterRepository.ts`). This layer has no dependencies on any other layer.
  - **`application`**: Holds the use cases of your application (e.g., `GetAllCharacters`). They orchestrate the execution of domain logic.
  - **`adapters`**: Connects infrastructure with the domain. Contains concrete repository implementations (`CharacterRepositoryHttp.ts`) and data mappers (`CharacterApiMapper.ts`) to transform data between layers.
  - **`infrastructure`**: It deals with external concerns like API services (`CharacterApi.ts`).
  - **`presentation`**: The UI layer. It includes Vue components and pages, and the logic to manage their state (`composables`, `stores`).
- **`shared`**: Contains code that is not specific to any single domain and can be reused across the entire application, such as UI components and global styles.
- **`router`**: Defines the application's routes.

### Default vue readme below

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
