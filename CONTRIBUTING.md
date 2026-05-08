# Contributing to Ikovaline Website

## Branch Strategy

This project follows a **two-branch workflow**:

### 🚀 `main` - Production Branch
- **Purpose**: Stable production code
- **Status**: Default branch
- **Deployment**: Auto-deploys to production environment
- **Protection**: Requires PR approval before merge
- **Merges from**: `dev` only (via Pull Request)

### 🔧 `dev` - Development Branch
- **Purpose**: Active development and preview
- **Status**: Preview branch
- **Deployment**: Auto-deploys to preview/staging environment
- **Merges from**: Feature branches
- **Merges to**: `main` (when stable)

## Workflow

### For New Features
1. Create feature branch from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. Push and create PR to `dev`:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. After review and testing on `dev`, create PR from `dev` to `main`

### For Hotfixes
1. Create hotfix branch from `main`:
   ```bash
   git checkout main
   git checkout -b hotfix/issue-description
   ```

2. Fix and commit:
   ```bash
   git commit -m "fix: critical bug description"
   ```

3. Create PR to `main` AND merge back to `dev`

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Code Review

All changes to `main` must go through Pull Request review.

## Deployment Environments

- **Production**: https://ikovaline.com (from `main`)
- **Preview**: https://dev.ikovaline.com (from `dev`)

---

Happy coding! 🚀
