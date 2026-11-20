# Git and GitHub: A Step-by-Step Guide for Complete Beginners

This guide uses the **Practice To-Do** app in this folder. You will put it on GitHub, change it, break it, fix it, and learn the commands along the way.

Do the parts in order. Each part builds on the one before it. Lines that start with `$` are commands you type in the terminal (don't type the `$`).

---

## Part 0: The big ideas (5 minutes)

| Term | Plain meaning |
|------|---------------|
| **Git** | A program on your computer that records the history of your files. |
| **GitHub** | A website that stores a copy of your Git history online. |
| **Repository (repo)** | A project folder that Git is tracking. |
| **Commit** | A saved snapshot of your files, with a message. Like a save point in a game. |
| **Branch** | A separate line of work. You can experiment without touching the main version. |
| **Remote** | The copy of your repo on GitHub. It is usually named `origin`. |
| **Push** | Send your commits from your computer to GitHub. |
| **Pull** | Bring new commits from GitHub to your computer. |
| **Clone** | Download a whole repo from GitHub to your computer. |
| **Pull request (PR)** | A request on GitHub to merge one branch into another, so changes can be reviewed. |

Your files live in **three places** on your computer. Understanding this makes everything else easier:

```
Working folder  --git add-->  Staging area  --git commit-->  Local repository  --git push-->  GitHub
(files you edit)              (what goes into                (your saved history)             (online copy)
                               the next commit)
```

---

## Part 1: One-time setup

### 1.1 Install Git

- **Windows:** Download from https://git-scm.com/download/win and install with the default options. Then open **Git Bash** from the Start menu. Use Git Bash for this guide.
- **Mac:** Open Terminal and type `git --version`. If Git is missing, your Mac offers to install it. Accept.
- **Linux (Ubuntu/Debian):** `sudo apt install git`

Check that it worked:

```
$ git --version
```

You should see something like `git version 2.45.0`.

### 1.2 Tell Git who you are

Git stamps your name and email on every commit. Use the same email as your GitHub account.

```
$ git config --global user.name "Your Name"
$ git config --global user.email "you@example.com"
$ git config --global init.defaultBranch main
$ git config --list
```

The last command shows your settings so you can confirm them.

### 1.3 Create a GitHub account

Go to https://github.com and sign up. Verify your email.

### 1.4 Let your computer log in to GitHub

GitHub does not accept your account password in the terminal. Choose **one** option:

**Option A (easiest): GitHub CLI**

1. Install it from https://cli.github.com
2. Run:
   ```
   $ gh auth login
   ```
3. Choose `GitHub.com`, then `HTTPS`, then `Login with a web browser`. Follow the prompts.

**Option B: Personal access token**

1. On GitHub: click your profile picture, then **Settings**, then **Developer settings**, then **Personal access tokens**, then **Tokens (classic)**, then **Generate new token (classic)**.
2. Tick the `repo` box, set an expiry, and generate. **Copy the token now.** GitHub shows it only once.
3. The first time you `git push`, Git asks for a username and password. Enter your GitHub username, and paste the token as the password.

---

## Part 2: Put the project on GitHub

### 2.1 Unzip and open the project in the terminal

Unzip `github-practice-todo.zip` somewhere easy, such as your Documents folder. Then move into it:

```
$ cd path/to/github-practice-todo
```

Tip: In Git Bash, you can type `cd ` and drag the folder into the window.

Useful terminal commands:

| Command | What it does |
|---------|--------------|
| `pwd` | Shows which folder you are in |
| `ls` | Lists files in the folder |
| `ls -a` | Lists files including hidden ones (like `.git`) |
| `cd folder` | Enters a folder |
| `cd ..` | Goes up one folder |

Open `index.html` in your browser to see the app working.

### 2.2 Create an empty repository on GitHub

1. On GitHub, click the **+** at the top right, then **New repository**.
2. Name it `github-practice-todo`.
3. Choose **Public** (or Private, your choice).
4. **Do not** tick "Add a README", ".gitignore" or "license". Your project already has files.
5. Click **Create repository**.

GitHub now shows a page with a URL like `https://github.com/YOUR-USERNAME/github-practice-todo.git`. Keep it handy.

### 2.3 Turn the folder into a Git repository

```
$ git init
```

This creates a hidden `.git` folder. That folder *is* the repository. Never edit it by hand.

### 2.4 Check the status

```
$ git status
```

You will see your files listed in red under "Untracked files". Git sees them but is not recording them yet. You will run `git status` constantly. It is the best habit you can build.

### 2.5 Stage your files

```
$ git add .
$ git status
```

The `.` means "everything in this folder". The files turn green: they are now **staged**, meaning ready to go into the next commit.

(To stage only one file: `git add script.js`)

### 2.6 Make your first commit

```
$ git commit -m "Add initial to-do app"
```

The text in quotes is the **commit message**. Write it as a short description of what changed.

### 2.7 See your history

```
$ git log
$ git log --oneline
```

`--oneline` gives a compact view. If the log fills the screen, press `q` to exit.

### 2.8 Connect to GitHub and push

```
$ git branch -M main
$ git remote add origin https://github.com/YOUR-USERNAME/github-practice-todo.git
$ git remote -v
$ git push -u origin main
```

What each line does:

- `git branch -M main` makes sure your branch is named `main`.
- `git remote add origin URL` saves the GitHub address under the nickname `origin`.
- `git remote -v` shows the saved addresses so you can check them.
- `git push -u origin main` uploads your commit. The `-u` links your local `main` to GitHub's `main`, so later you can just type `git push`.

Refresh your GitHub page. Your files are online. 🎉

---

## Part 3: The everyday loop

This is what you will do 90% of the time:

```
1. Edit files
2. git status          (see what changed)
3. git diff            (see exactly what changed)
4. git add .           (stage the changes)
5. git commit -m "..." (save a snapshot)
6. git push            (upload to GitHub)
```

### Practice 3.1: Make a small change

1. Open `settings.js` in any text editor (VS Code, Notepad, etc.).
2. Change the subtitle to something of your own, for example:
   ```js
   const APP_SUBTITLE = "My first Git practice project";
   ```
3. Save the file and refresh `index.html` in your browser to see it.
4. Now run:

```
$ git status
$ git diff
```

`git diff` shows lines removed (starting with `-`) and lines added (starting with `+`). Press `q` to leave it.

```
$ git add settings.js
$ git commit -m "Change app subtitle"
$ git push
```

Look at the repo on GitHub, click **Commits**, and find your commit.

### Writing good commit messages

- Keep the first line short (under about 60 characters).
- Start with a verb: "Add", "Fix", "Change", "Remove".
- Good: `Fix delete button not removing tasks`
- Bad: `stuff`, `update`, `asdf`

---

## Part 4: Branches (and `git checkout`)

A branch lets you work on something without disturbing `main`. Real teams make a new branch for every feature or fix.

### 4.1 See your branches

```
$ git branch
```

The one with `*` is the branch you are on right now. Right now there is only `main`.

### 4.2 Create a branch and switch to it

```
$ git checkout -b feature/dark-header
```

`checkout -b` means "create this branch **and** switch to it". The modern, clearer equivalent is:

```
$ git switch -c feature/dark-header
```

Both do the same thing. Use whichever you like. This guide shows both so you recognize them in tutorials.

Confirm:

```
$ git branch
```

### 4.3 Make a change on the branch

Open `style.css` and change the first color variable:

```css
--accent: #7a3e9d;
```

Save, refresh the browser, and see the purple buttons. Then:

```
$ git add style.css
$ git commit -m "Change accent color to purple"
```

### 4.4 Switch back and forth

```
$ git checkout main
```

(or `git switch main`). Now refresh the browser. **The color is teal again.** Your purple change is safe on the other branch. Switch back:

```
$ git checkout feature/dark-header
```

Refresh: purple again. This is the magic of branches. Git rewrites the files in your folder to match the branch you are on.

> **Warning:** Before switching branches, commit your work (or stash it, see Part 6). Git may refuse to switch if you have uncommitted changes that would be overwritten.

### 4.5 Push the branch to GitHub

```
$ git push -u origin feature/dark-header
```

On GitHub, use the branch dropdown (it says `main`) to see both branches.

### 4.6 Open a pull request

1. Go to your repo on GitHub. A yellow banner says **"feature/dark-header had recent pushes"**. Click **Compare & pull request**.
2. Write a title and a short description.
3. Click **Create pull request**.
4. Scroll down and look at the **Files changed** tab to see the review view.
5. Click **Merge pull request**, then **Confirm merge**.
6. Click **Delete branch** (it is no longer needed).

### 4.7 Bring the merged result to your computer

```
$ git checkout main
$ git pull
```

`git pull` downloads the merge from GitHub. Refresh the browser: purple is now on `main`.

### 4.8 Clean up the old branch

```
$ git branch -d feature/dark-header
```

(`-d` deletes a branch that is already merged. Git will warn you if it is not.)

### What exactly does `git checkout` do?

`checkout` is an older, multi-purpose command. You will see it everywhere:

| Command | What it does | Modern alternative |
|---------|--------------|--------------------|
| `git checkout main` | Switch to the `main` branch | `git switch main` |
| `git checkout -b new-branch` | Create a branch and switch to it | `git switch -c new-branch` |
| `git checkout abc1234` | Look at an old commit (see Part 6.5) | `git switch --detach abc1234` |
| `git checkout -- file.js` | Throw away uncommitted edits in a file | `git restore file.js` |

---

## Part 5: Merge conflicts (do this on purpose, so it isn't scary later)

A conflict happens when two branches change **the same line** differently. Git cannot decide which is right, so it asks you.

### 5.1 Set up two competing changes

Start from a clean `main`:

```
$ git checkout main
$ git pull
$ git status
```

Create the first branch and edit the name:

```
$ git checkout -b feature/name-a
```

In `settings.js`, change the `APP_NAME` line to:

```js
const APP_NAME = "Study Tasks";
```

```
$ git add settings.js
$ git commit -m "Rename app to Study Tasks"
```

Go back to `main` and create a second branch from the **same starting point**:

```
$ git checkout main
$ git checkout -b feature/name-b
```

Edit the **same line** differently:

```js
const APP_NAME = "Daily Planner";
```

```
$ git add settings.js
$ git commit -m "Rename app to Daily Planner"
```

### 5.2 Merge the first branch (works fine)

```
$ git checkout main
$ git merge feature/name-a
```

This succeeds. (Git calls it a "fast-forward": `main` just moved forward.)

### 5.3 Merge the second branch (conflict!)

```
$ git merge feature/name-b
```

Git says: `CONFLICT (content): Merge conflict in settings.js`. Don't panic. Run:

```
$ git status
```

It says "both modified: settings.js". Open `settings.js`. You will see:

```
<<<<<<< HEAD
const APP_NAME = "Study Tasks";
=======
const APP_NAME = "Daily Planner";
>>>>>>> feature/name-b
```

How to read it:

- Between `<<<<<<< HEAD` and `=======` is the version on your current branch (`main`).
- Between `=======` and `>>>>>>>` is the version from the branch you are merging in.

### 5.4 Resolve it

1. Decide what the final line should be. You can pick one, or write something new.
2. **Delete the three marker lines** (`<<<<<<<`, `=======`, `>>>>>>>`) and the version you don't want. The file should contain only:
   ```js
   const APP_NAME = "Study Planner";
   ```
3. Save the file, then:

```
$ git add settings.js
$ git commit -m "Merge feature/name-b and choose combined app name"
```

(If your editor opens for the commit message, save and close it.)

Optionally, see the shape of your history:

```
$ git log --oneline --graph --all
```

### 5.5 Push and clean up

```
$ git push
$ git branch -d feature/name-a
$ git branch -d feature/name-b
```

> **Changed your mind mid-conflict?** Run `git merge --abort` to go back to how things were before the merge.

---

## Part 6: Undoing things

Everybody makes mistakes. Git makes most of them fixable.

### 6.1 Discard edits you haven't staged

You edited a file and want the last committed version back:

```
$ git restore script.js
```

> This permanently throws away those edits. Git cannot bring them back.

### 6.2 Unstage a file (keep the edits)

You ran `git add` on the wrong file:

```
$ git restore --staged script.js
```

### 6.3 Fix the last commit message

Only if you have **not pushed** yet:

```
$ git commit --amend -m "Better message"
```

### 6.4 Undo a commit safely: `git revert`

`revert` creates a **new** commit that cancels an old one. This is the safe choice for anything already pushed.

```
$ git log --oneline
$ git revert abc1234
$ git push
```

(Replace `abc1234` with the short ID from your log.)

### 6.5 Look at an old version: `git checkout <commit>`

```
$ git log --oneline
$ git checkout abc1234
```

Git warns you about **"detached HEAD"**. This just means you are looking at the past, not on a branch. Look around, run the app, but don't make commits here. Return to the present:

```
$ git checkout main
```

### 6.6 Stash: park unfinished work

You are halfway through a change and need to switch branches:

```
$ git stash
$ git checkout main
...do other things...
$ git checkout your-branch
$ git stash pop
```

`stash` hides your uncommitted changes; `stash pop` brings them back.

### 6.7 The dangerous one: `git reset --hard`

```
$ git reset --hard abc1234
```

This moves your branch back to that commit and **deletes everything after it, including uncommitted work**. Avoid it until you are comfortable. Never use it on commits you already pushed and shared.

---

## Part 7: Working from GitHub (clone, pull, fetch)

### 7.1 Clone a repo

This is how you get a project onto a new computer, or download someone else's:

```
$ cd ..
$ git clone https://github.com/YOUR-USERNAME/github-practice-todo.git practice-copy
$ cd practice-copy
```

You now have a second, complete copy in a folder called `practice-copy`.

### 7.2 Practice syncing between two copies

1. In `practice-copy`, edit `README.md`, then add, commit and `git push`.
2. Go back to your first folder and run:
   ```
   $ git fetch
   $ git status
   ```
   Status says "Your branch is behind 'origin/main' by 1 commit."
3. Now bring it down:
   ```
   $ git pull
   ```

**fetch vs pull:** `fetch` only *looks* at what is new on GitHub. `pull` fetches **and** merges it into your files.

### 7.3 Edit directly on GitHub

On GitHub, open any file and click the pencil icon. Edit it and click **Commit changes**. Then run `git pull` on your computer. You will see the change arrive.

### 7.4 If `git push` is rejected

If you see `! [rejected] ... (fetch first)`, GitHub has commits you don't have. Run `git pull`, fix any conflicts, then `git push` again.

---

## Part 8: Bonus: publish the app as a real website

GitHub Pages hosts static sites for free, and this app is one.

1. On GitHub, open your repo, then **Settings**, then **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`, then **Save**.
4. Wait a minute or two and refresh. GitHub shows your URL: `https://YOUR-USERNAME.github.io/github-practice-todo/`.

From now on, every push to `main` updates the live site.

---

## Part 9: Practice challenges

Try each one using a **new branch**, a commit, a push, and a pull request.

1. **Easy:** Change the placeholder text in `index.html` from "What needs doing?" to your own wording.
2. **Easy:** Add your name to the end of `README.md`.
3. **Medium:** In `style.css`, change `--bg` to a different background color.
4. **Medium:** In `script.js`, change the footer text from "task left" to "to do".
5. **Medium:** Add a new file `notes.txt`, commit it, then delete it with `git rm notes.txt` and commit again. Find both commits in `git log`.
6. **Hard:** Add a feature: show the date each task was created. (Hint: you already store `id: Date.now()`.)
7. **Hard:** Create two branches that both edit `style.css` in the same place, merge both, and resolve the conflict without looking at Part 5.
8. **Hard:** Make a bad commit, push it, then undo it with `git revert`.
9. **Team practice:** Ask a friend to **fork** your repo (the Fork button on GitHub), make a change, and open a pull request to you. Review and merge it.

---

## Quick reference (cheat sheet)

| Goal | Command |
|------|---------|
| Start tracking a folder | `git init` |
| Download a repo | `git clone URL` |
| See what changed | `git status` |
| See line-by-line changes | `git diff` |
| Stage everything | `git add .` |
| Stage one file | `git add file` |
| Commit | `git commit -m "message"` |
| See history | `git log --oneline` |
| See history as a graph | `git log --oneline --graph --all` |
| List branches | `git branch` |
| Create + switch branch | `git checkout -b name` or `git switch -c name` |
| Switch branch | `git checkout name` or `git switch name` |
| Merge a branch into the current one | `git merge name` |
| Delete a merged branch | `git branch -d name` |
| Upload commits | `git push` |
| Upload a new branch | `git push -u origin name` |
| Download + merge | `git pull` |
| Download only | `git fetch` |
| Discard unstaged edits | `git restore file` |
| Unstage | `git restore --staged file` |
| Safely undo a commit | `git revert ID` |
| Park unfinished work | `git stash` / `git stash pop` |
| Cancel a merge | `git merge --abort` |
| Show remotes | `git remote -v` |

---

## Troubleshooting

**"fatal: not a git repository"**
You are in the wrong folder. Use `pwd` and `cd` to get into the project folder (the one that has the hidden `.git` folder).

**"Author identity unknown" / "Please tell me who you are"**
Run the `git config --global user.name` and `user.email` commands from Part 1.2.

**"remote origin already exists"**
You already added it. Check with `git remote -v`. To change the URL: `git remote set-url origin NEW-URL`.

**"Authentication failed" or "Permission denied"**
Redo Part 1.4. If using a token, make sure it has the `repo` permission and has not expired.

**"Your local changes would be overwritten by checkout"**
Commit your changes first, or run `git stash`, then switch branches.

**"error: src refspec main does not match any"**
You have not made a commit yet. Run `git add .` and `git commit -m "..."` first.

**Vim opened and I'm stuck!**
Git opens the Vim editor when you run `git commit` without `-m`. Press `Esc`, type `:wq`, and press Enter to save and exit. To cancel instead: `Esc`, then `:q!` and Enter.

**I'm completely lost.**
Run `git status`. It almost always tells you what state you are in and what to do next.

---

Happy practicing! The most important rule: **commit often, and run `git status` before every step.**
