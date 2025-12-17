# CI/CD Pipeline Documentation

This document describes the Continuous Integration and Continuous Deployment (CI/CD) pipeline for the Git Galaxy Explorer project.

## Overview

The CI pipeline automatically runs on:
- **Pull Requests** to the `main` branch
- **Pushes** to the `main` branch

## Pipeline Jobs

### 1. Lint Code
**Purpose**: Ensures code quality and consistency

**Steps**:
- Checkout code
- Setup Node.js 20
- Install dependencies with `npm ci`
- Run ESLint with `npm run lint`

**What it checks**:
- Code style adherence
- Common JavaScript/TypeScript errors
- React-specific best practices

---

### 2. Build Application
**Purpose**: Verifies the application builds successfully

**Steps**:
- Checkout code
- Setup Node.js 20
- Install dependencies with `npm ci`
- Build with `npm run build`
- Upload build artifacts

**Output**:
- Build artifacts stored for 7 days
- Production-ready `dist/` folder

---

### 3. Security Checks
**Purpose**: Identifies known security vulnerabilities

**Steps**:
- Checkout code
- Setup Node.js 20
- Install dependencies with `npm ci`
- Run `npm audit` to check for vulnerabilities
- Upload audit results

**What it checks**:
- Known vulnerabilities in dependencies
- Security issues at moderate level or higher

**Artifacts**:
- Audit results JSON stored for 30 days

---

### 4. Test Application
**Purpose**: Runs automated tests (when available)

**Steps**:
- Checkout code
- Setup Node.js 20
- Install dependencies with `npm ci`
- Run tests with `npm test`

**Current tests**:
- Route scenario validation (checks git command coverage)

---

### 5. Quality Checks
**Purpose**: Validates route scenarios and code quality

**Steps**:
- Checkout code
- Setup Node.js 20
- Install dependencies with `npm ci`
- Validate route scenarios
- Check TypeScript compilation

**What it checks**:
- All routes have git commands (>80% coverage required)
- All operations have descriptions
- TypeScript compiles without errors

---

### 6. CI Summary
**Purpose**: Provides overall pipeline status

**Steps**:
- Aggregate results from all jobs
- Create summary in GitHub Actions UI
- Fail pipeline if critical jobs failed

**Critical jobs**:
- Lint
- Build
- Security

## Local Development

### Run Linting
```bash
npm run lint
```

### Run Build
```bash
npm run build
```

### Validate Routes
```bash
npm run validate:routes
# or
npm test
```

### Check Security
```bash
npm audit
```

## Continuous Deployment

The deployment pipeline (`.github/workflows/deploy.yml`) handles:
- Building the application
- Deploying to GitHub Pages
- Only runs on pushes to `main` branch

## Troubleshooting

### Lint Failures
- Check ESLint output for specific errors
- Run `npm run lint` locally to reproduce
- Fix errors and commit changes

### Build Failures
- Check TypeScript compilation errors
- Run `npm run build` locally
- Ensure all dependencies are installed

### Security Vulnerabilities
- Review `npm audit` output
- Update vulnerable dependencies
- Use `npm audit fix` for automatic fixes

### Route Validation Failures
- Ensure all operations have git commands
- Check that descriptions are present
- Run `npm run validate:routes` locally

## Best Practices

1. **Always run CI checks locally before pushing**
2. **Fix security vulnerabilities promptly**
3. **Maintain >80% git command coverage in routes**
4. **Keep dependencies up to date**
5. **Review CI results for every PR**

## Scripts Reference

| Script | Command | Purpose |
|--------|---------|---------|
| Development | `npm run dev` | Start development server |
| Build | `npm run build` | Build for production |
| Lint | `npm run lint` | Check code quality |
| Test | `npm test` | Run validation tests |
| Validate Routes | `npm run validate:routes` | Check route completeness |
| Preview | `npm run preview` | Preview production build |

## CI Configuration Files

- **`.github/workflows/ci.yml`** - Main CI pipeline
- **`.github/workflows/deploy.yml`** - Deployment pipeline
- **`scripts/validate-routes.js`** - Route validation script
- **`eslint.config.js`** - ESLint configuration
- **`tsconfig.json`** - TypeScript configuration
