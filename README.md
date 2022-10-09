# ![image](https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/gmnukmlpf3yqguzggdvk) Inqom Technical Test [![sylvain-viole](https://circleci.com/gh/sylvain-viole/inqmTest.svg?style=svg)](https://app.circleci.com/pipelines/github/sylvain-viole/inqmTest)

## Description

**Automate a user avatar update scenario**
- Visit `www.welcometothejungle.com/fr/me/settings/account`
- Log in
- Update avatar
---

## Insights :
- This project uses both `CYPRESS` and `PLAYWRIGHT`
- With *Cypress* :
    - basic POM to handle locators.
    - `cy.session` is used to handle login and cookies.
    - API is asserted as well as UI.
- With *Playwright* :
    - Quick win mode
    - No locators design patterns
---
## Setup / installation

⚠️ `node.js` mandatory

1. Clone the repository

```bash
git clone https://github.com/sylvain-viole/inqmTest.git
```

2. Request env var file `cypress.env.json` from the author or use your own, you'll need :
- `USER_EMAIL`
- `USER_PASSWORD`
- `API_URL`

3. Install the dependencies

```bash
npm i
```

4. Use Cypress open to initialize

```bash
npx cypress open
```

5. Run tests with Cypress
`npm run cy:<browser>:<viewport>:<action>`

- Example :
```bash
npm run cy:electron:desktop:run
```

6. Run tests with Playwright
`npm run pw:<browser>:run`

- Example :
```bash
npm run pw:webkit:run
```

---
## Documentation

### Dependencies :
- Cypress : `10.9`
- Cypress-file-upload: `5.0.8`
- Playwright/test: `1.27.0`,
- dotenv: `16.0.3`

### CI :
- Circle CI
- 2 jobs : `test_cypress` and `test_playwright`
- *Cypress* runs against `electron` and `desktop` and `mobile` viewport
- *Playwright* runs against `chorme`, `webkit` and `firefox` on `desktop`(default) viewport

## license

MIT
