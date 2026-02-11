import os
import sys
import subprocess

def run_command(command):
    try:
        subprocess.check_call(command, shell=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        sys.exit(1)

def main():
    print("🚀 Starting auto-push sequence...")
    
    # Stage all changes
    print("📦 Staging changes...")
    run_command("git add .")
    
    # Check for changes
    status = subprocess.check_output("git status --porcelain", shell=True).decode("utf-8").strip()
    
    if status:
        print("💾 Committing changes...")
        # Use a simple default message
        run_command('git commit -m "Auto-update: Saving progress"')
        
        print("⬆️ Pushing to remote...")
        run_command("git push")
        print("\n✅ Successfully pushed to GitHub!")
    else:
        print("\n✨ No changes to commit. Working tree clean.")

if __name__ == "__main__":
    main()
