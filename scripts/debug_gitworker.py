import os
import sys
import logging
from pathlib import Path

# Add project root
sys.path.append(str(Path(__file__).parent.parent))

# Max logging
logging.basicConfig(level=logging.DEBUG, format='%(levelname)s: %(message)s')

# Load env
from scripts.publish_changes import load_local_env
load_local_env()

print("=" * 60)
print("GitWorker Diagnostic")
print("=" * 60)

try:
    from mcp_core.worker_prompts import prompt_git_commit
    from mcp_core.swarm_schemas import Task
    from mcp_core.llm import generate_response
    from mcp_core.algorithms.git_worker import GitWorker
    
    # Initialize GitWorker
    git = GitWorker()
    
    if not git.has_changes():
        print("✅ No changes to commit")
        sys.exit(0)
    
    print(f"📝 Changes detected")
    print(f"🔧 Model: llama-3.2-3b")
    
    # Create minimal task
    task = Task(
        task_id="debug",
        description="Debug commit",
        status="PENDING",
        output_files=[]
    )
    
    # Generate prompt
    git_context = {
        "output_files": [],
        "repo_owner": "test",
        "repo_name": "swarm"
    }
    
    prompt = prompt_git_commit(task, git_context)
    print("\n" + "=" * 60)
    print("PROMPT SENT TO LLM:")
    print("=" * 60)
    print(prompt[:500] + "...")
    
    # Call LLM
    print("\n" + "=" * 60)
    print("CALLING LLM...")
    print("=" * 60)
    
    try:
        response = generate_response(prompt, model_alias="llama-3.2-3b")
        print(f"✅ Response received")
        print(f"Status: {response.status}")
        print(f"Tool Calls: {len(response.tool_calls)}")
        print(f"Reasoning: {response.reasoning_trace[:200]}...")
        
        if response.tool_calls:
            for i, tool in enumerate(response.tool_calls):
                print(f"\nTool {i+1}:")
                print(f"  Function: {tool.function}")
                print(f"  Arguments: {tool.arguments}")
        
    except Exception as e:
        print(f"\n❌ LLM ERROR:")
        print(f"Type: {type(e).__name__}")
        print(f"Message: {str(e)}")
        import traceback
        print("\nFull Traceback:")
        traceback.print_exc()
        
except Exception as e:
    print(f"\n❌ SETUP ERROR: {e}")
    import traceback
    traceback.print_exc()
