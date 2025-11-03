
# Architecture

DMZ follows a clean command-module design similar to Git and Cargo.  
Each command is implemented in its own Rust module and orchestrated by a central CLI entry point.

### Core structure

```

src/
├── main.rs          # CLI entry point
├── cli.rs           # Command definitions and argument parsing
├── commands/        # Subcommand implementations
│   ├── add.rs
│   ├── edit.rs
│   ├── list.rs
│   ├── remove.rs
│   ├── refresh.rs
│   └── init.rs
└── utils.rs         # Helper functions for paths and file handling

````

### Command execution flow

Each subcommand is registered through Clap and invoked by the main dispatcher.

Example:
```bash
dmz add git
````

The flow:

1. Parse `git` as a subcommand argument.
2. Create a new file `~/.dmz/zsh/git.zsh`.
3. Open the file using `$EDITOR`.
4. Run `refresh` to rebuild `.zshrc`.

### Refresh logic

`dmz refresh` scans the `.dmz/zsh` folder, collects all `.zsh` files, and generates a consistent loader section inside `.zshrc`.

```zsh
# dmz module loader
for f in $HOME/.dmz/zsh/*.zsh; do source "$f"; done
```

If the loader already exists, it updates the section idempotently.
No duplication, no broken `.zshrc` states.

### Data model

DMZ stores no external state or database.
Everything is file-based:

* Config files live in `~/.dmz/config.toml`
* Modules live in `~/.dmz/zsh/`
* Logs (if enabled) are stored in `~/.dmz/logs/`

### Error handling

All file operations are wrapped with safe defaults:

* Creates missing directories if they don’t exist
* Skips unreadable or invalid ZSH files
* Returns clean error messages with colorized output

### CLI behavior

* Built with `clap` for argument parsing and completions
* Uses `inquire` for prompts and confirmations
* Prints colored logs for clear visibility
* Supports `--verbose` and `--silent` modes for scripting

### Safety model

* Never overwrites `.zshrc` directly — always makes a `.zshrc.bak` backup
* Writes temporary loader content to `.zshrc.tmp` before swapping
* Uses atomic file writes to prevent corruption on failure

### Performance

All operations are local filesystem reads and writes.
DMZ starts instantly, runs in milliseconds, and scales with the number of managed files.


