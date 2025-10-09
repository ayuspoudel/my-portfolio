# DMZ Release Pipeline

The DMZ release pipeline is fully automated using GitHub Actions and Terraform-based staging infrastructure.  
It builds, tests, and publishes binaries for macOS and Linux without manual steps.

<p align="center">
  <img 
    src="src/assets/diagrams/dmz/DMZ.png" 
    alt="TMS Architecture Diagram"
    style="max-width: 80%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: zoom-in;"
    onclick="window.open(this.src, '_blank')"
  />
</p>


### Staging phase

Trigger: push to branch `stg/v*`

The goal of the staging phase is to test the new version on a real EC2 host before release.

Steps:
1. Provision staging EC2 instance using Terraform (`.github/workflows/staging-provision.yml`)
2. Deploy latest build to staging
3. Run integration tests through SSH:
   - `dmz --help`
   - `dmz init`
   - `dmz add test`
   - `dmz refresh`
4. Verify expected output and runtime behavior
5. Tear down staging infra automatically after tests complete

This confirms the binary is stable and safe for public release.

### Release phase

Trigger: push tag like `v3.0.0`

The release phase builds, packages, and publishes DMZ as a universal binary.

Steps:
1. Build universal Rust binary (macOS `x86_64`, `aarch64`, Linux `x86_64`)
2. Generate shell completions and install scripts
3. Bundle the release archive:
```

dmz-v3.0.0/
├── dmz
├── install.sh
├── completions/
└── modules/

````
4. Update `install.sh` to point to the new version
5. Generate changelog and release notes
6. Publish to GitHub Releases

### Auto version bump

After a successful staging run, the pipeline bumps version automatically:
```bash
.pipeline/bump-version.sh 3.0.0
````

It commits and tags the new release using `cargo release` internally.

### Install script

Every release includes an install script that installs the latest version directly:

```bash
curl -L https://raw.githubusercontent.com/ayuspoudel/dmz/main/install.sh | bash
```

The script:

* Detects OS and architecture
* Downloads the correct binary
* Installs to `/usr/local/bin/dmz`
* Updates `.zshrc` automatically

### Rollback

If staging fails, the release pipeline halts immediately.
No GitHub Release or tag is created until all tests pass successfully.

### Summary

* Fully automated release from staging → production
* Tested on real EC2 infrastructure before publish
* Automatic version bump and changelog generation
* Single command install experience for users

