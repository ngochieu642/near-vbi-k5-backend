# Contributing to this repo

## Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working
- All features or bug fixes must be tested by one or more specs
- All Public API must be documented

## Set up environment
- Please make sure that you have node install on your develop machine
- If your `.husky` directory does not look like this, please run `npm install` again
```bash
.husky/
├── _
│   ├── .gitignore
│   └── husky.sh
├── commit-msg
└── pre-commit
```

## By pass git hooks
- The repository was set up to automatically format your staged code with eslint
- In the case the eslint fail (due to the file you are working on have already had unresolved eslint errors & not in your scope of change), and you still want to commit it, you can bypas the hook using `-n` (`--no-veirify`) with git commit
- Please in mind that we should not bypass

```bash
git commit -n -m "Non verified commit"
```

## Commit message format
- Each commit message consist of a header, a body, and a footer

```txt
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- The header is mandatory and must conform to the [Commit Message Header](#Commit Message Header) format
- The body is mandatory for all commits except for those of type "docs". When the body is present it must conform to the [Commit Message Body](#Commit Message Body) format

### Commit Message Header

- The repository was set up to use [Angular commit convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-coding-rules)

```text
<type>(<scope>):  <short summary>
```
- The `<type>` and `<summary>` are mandatory, the `(<scope>)` field is optional

#### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (examples: CircleCi, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests

##### Summary

- Use the summary field to provide a succinct description of the change
- Use the imperative, present tense. Ex "change" instead of "changed" or "changes"
- When applied, this commit will `<summary>`
- No dot (.) at the end

Ex:

- A valid commit header
```
refactor: refactor class AmqpClient to remove duplicate reconnect
```

### Commit Message Body

- Use the imperative, present tense
- Explain the motivation for the change. This commit message should explain **Why** you are making the change. You can include a comparison of the previous behavior with the new behavior in order to illustrate the impact of the change

### Commit Message Footer

- Can contain information about to reference related task/issue/story/tickets/etc and other PRs that this commit closes or is related to


## References
- https://chris.beams.io/posts/git-commit/
