## Python and Flask
   - Python is more readable (no semicolons, fewer {} and ;)
   - Runs in Python interpreter, limited in async support
   -  Flask is a lightweight web framework for Python (built on top of python), similar to how Express.js makes working with Node.js easier, helps simplify backend development.
   - Handles HTTP requests and responses, create web routes (@app.route("/")), process JSON data, manage databases

## Key Differences Between Node.js and Python Dependency Management

   ### Tracks dependencies:
   - **Python:** `requirements.txt` or `pyproject.toml`
   - **Node.js:** `package.json`

   ### Stores dependencies:
   - **Python:** `venv/lib/python3.x/site-packages/`
   - **Node.js:** `node_modules/`

   ### Installs dependencies with in requirements.txt:
   - **Python:** `pip install -r requirements.txt`
   - **Node.js:** `npm install`

   ### Install depdendency not in requirements.txt:
   - **Python:** `pip install <package_name>`
   - **Node.js:** `npm install <package_name>`

   ### Version control for dependencies:
   - **Python:** `requirements.txt` (manual) or `poetry.lock` (modern)
   - **Node.js:** `package-lock.json`

   ### Global package management:
   - **Python:** Avoided with `venv/`
   - **Node.js:** Avoided with `node_modules/`

## Installing Python and Flask (from terminal)
   -install python: brew install python
   -verify installation/version: python --version || python3 --version
   -install flask: pip install flask

## Setup (From Terminal, CD to /backend of app)

1. Create a virtual environment:
   ```
   python -m venv venv
   ```
## Virtual Environment (`venv`)
- `venv` is a self-contained Python environment that isolates project dependencies.
- Located inside: `/backend/venv/`
- **Must be active when working on the backend** to ensure Flask finds installed packages.
- **Add venv to .gitignore so it's not tracked**

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

   - Venv active if (venv) appears before name in terminal -> (venv) <username@computer> backend %
   Deactivate virtual environment: `deactivate`

### Why Keep `venv` Active?
- Prevents conflicts with system-wide Python packages.
- Ensures Flask, dotenv, and other dependencies are available.
- Best practice: **Always keep `venv` active while working on the backend.**

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
   -**This installs all the dependencies listed in requirements.txt**

   **if dependencies are not in requirements.txt, install them with pip install <package_name>**
   -**This is similar to `npm install` in Node.js**

4. Create a `.env` file based on `.env.example` and add your OpenAI API key.

## Running the Server

```
python run.py
```

The server will start on http://localhost:5001.