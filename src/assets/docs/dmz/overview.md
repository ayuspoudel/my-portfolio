# DMZ — Dotfile Manager for ZSH

DMZ is a Rust-based command-line tool that manages modular ZSH configurations.  
It helps structure and sync environment files across machines without ever touching `.zshrc` manually.

### Why I built this

Every developer rebuilds their shell setup again and again on new machines.  
I wanted a single CLI that could bootstrap my ZSH environment, manage aliases and paths modularly, and sync dotfiles like a proper project.

Lambda, EC2, and GitOps workflows are automated — but local setups still aren’t.  
So I built DMZ to automate the most repetitive part of developer onboarding.

### What it does

- Manages ZSH configuration in modular files under `~/.dmz/zsh`
- Automatically rebuilds `.zshrc` using a loader block
- Keeps your shell setup consistent across all environments
- Works on macOS and Linux, built as a static Rust binary

### Key commands

- `dmz init` – migrate existing `.zshrc` into modular structure
- `dmz add <module>` – create a new ZSH config file (ex: aliases, git, aws)
- `dmz list` – show all managed modules
- `dmz edit <module>` – open a module in your default editor
- `dmz refresh` – rebuild and reload your `.zshrc`
- `dmz remove <module>` – remove a module safely

### Why Rust

Rust gives strong guarantees on safety, speed, and portability.  
DMZ compiles into a single binary, making it fast and easy to distribute.  
No runtime dependencies, no package managers — just one file that works everywhere.

### Typical workflow

```bash
dmz init
dmz add git
dmz edit git
dmz refresh
````

Now your `.zshrc` loads all modules automatically:

```zsh
# dmz module loader
for f in $HOME/.dmz/zsh/*.zsh; do source "$f"; done
```

### What DMZ replaces

* Manual `.zshrc` edits
* Copying dotfiles between machines
* Broken shell configs after reinstalling OS
* Slow bootstrap scripts or Makefiles for shell setup

```

