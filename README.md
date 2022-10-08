# Inqom Technical Test
[![<sylvain-viole>](https://circleci.com/gh/<sylvain-viole>/<inqmTest>.svg?style=svg)](https://app.circleci.com/pipelines/github/sylvain-viole/inqmTest)

## Description

**Automate a user avatar update scenario**

- This project uses a basic POM to handle locators.
- `cy.session` is used to handle login and cookies.
- API is asserted as well as UI.

---
## Setup / installation

1. Clone the repository

```bash
git clone https://github.com/sylvain-viole/inqmTest.git
```

2. Install the dependencies

```bash
npm i
```

3. Open Cypress

```bash
npx cypress open
```

4. Run tests
`npm run cy:<browser>:<viewport>:<action>`

- Example :
```bash
npm run cy:electron:desktop:run
```


---
## Documentation

### Dependencies :
- Cypress : `10.9`
- Cypress-file-upload: `5.0.8`

### CI :
- Circle CI

## license

MIT
