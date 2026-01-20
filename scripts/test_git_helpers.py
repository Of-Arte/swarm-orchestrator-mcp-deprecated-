import sys
import os
from pathlib import Path

# Add project root
sys.path.append(str(Path(__file__).parent.parent))

# Test imports
from mcp_core.git_helpers import (
    infer_commit_type,
    infer_scope,
    format_commit_message,
    format_commit_body
)
from mcp_core.swarm_schemas import Task

print("=" * 60)
print("Testing Conventional Commits Helper Functions")
print("=" * 60)

# Test 1: Commit Type Inference
test_cases = [
    ("Add user authentication", "feat"),
    ("Fix login bug", "fix"),
    ("Refactor database layer", "refactor"),
    ("Update README documentation", "docs"),
    ("Optimize query performance", "perf"),
    ("Add unit tests", "test"),
]

print("\n📋 Test 1: Commit Type Inference")
for desc, expected in test_cases:
    task = Task(task_id="test", description=desc, status="PENDING")
    result = infer_commit_type(task)
    status = "✅" if result == expected else "❌"
    print(f"{status} '{desc}' → {result} (expected: {expected})")

# Test 2: Scope Inference
print("\n📋 Test 2: Scope Inference")
task_with_files = Task(
    task_id="test",
    description="Test",
    status="PENDING",
    output_files=["mcp_core/algorithms/auth.py"]
)
scope = infer_scope(task_with_files)
print(f"Files: {task_with_files.output_files} → Scope: {scope}")

# Test 3: Full Message Format
print("\n📋 Test 3: Full Commit Message")
task = Task(
    task_id="test",
    description="Implement OAuth2 login support",
    status="COMPLETED",
    output_files=["mcp_core/auth.py"],
    feedback_log=[
        "✅ Created auth module",
        "✅ Added OAuth2 client",
        "✅ Tests passing"
    ]
)

message = format_commit_message(task, include_emoji=True)
body = format_commit_body(task.feedback_log)

print(f"Message: {message}")
if body:
    print(f"Body:\n{body}")

print("\n" + "=" * 60)
print("✅ All tests completed")
