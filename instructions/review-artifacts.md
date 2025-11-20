# Review and Update Artifacts - AI Instructions

> **Purpose**: This is your entrypoint when asked to review, create, or update MangoJS project artifacts.

---

## 🎯 Your Mission

When asked to review or update artifacts, you must:

1. **Read the Artifact Guide**: [`handbook/common/artifacts.context.md`](../handbook/common/artifacts.context.md)
2. **Identify Required Artifacts**: Based on the change type (new entity, endpoint, service)
3. **Check Existing Artifacts**: Verify what exists in `docs/` directory
4. **Create/Update Artifacts**: Follow templates from the handbook
5. **Verify Completeness**: Use workflow checklists from the handbook

---

## 📝 Quick Workflow Reference

**For artifact checklists by change type**, see the **"Update Workflows"** section in:
[`handbook/common/artifacts.context.md`](../handbook/common/artifacts.context.md#update-workflows)

Common scenarios covered:

- Adding a new entity
- Adding a new endpoint
- Modifying business logic

---

## ⚡ Step-by-Step Process

### Step 1: Understand the Change

- What type of change? (entity/endpoint/service/logic)
- What files were modified in `src/`?
- What new features or behaviors were added?

### Step 2: Identify Required Artifacts

- Consult **"Update Workflows"** section in handbook
- Use the appropriate checklist above
- Note which artifacts already exist vs need creation

### Step 3: Check Current State

- List files in `docs/` directory structure
- Read existing artifacts that need updates
- Identify gaps

### Step 4: Create/Update Artifacts

- Follow templates from handbook exactly
- Use Mermaid for diagrams (ERD, flows, architecture)
- Keep consistent formatting
- Cross-reference related artifacts

### Step 5: Validate Completeness

- ✅ All checklist items completed
- ✅ Diagrams reflect current code state
- ✅ OpenAPI matches controller implementation
- ✅ Examples are accurate
- ✅ No redundant or outdated information

---

## 🔍 Where to Find Templates

**All templates are in**: [`handbook/common/artifacts.context.md`](../handbook/common/artifacts.context.md)

**Each artifact section includes**:

- File path and naming convention
- What it contains
- When to update it
- Template or example to follow

---

## 💡 Key Rules

1. **Never skip artifacts** - If the checklist says update, update it
2. **Use Mermaid for visuals** - ERD, flows, and architecture diagrams
3. **Follow templates exactly** - Consistency matters
4. **Update with code** - Artifacts should always match implementation
5. **Be concise** - Avoid redundancy, keep it clear and brief
6. **Cross-reference** - Link related artifacts together
7. **Version everything** - Track changes in changelogs and history

---

## Ready to Start?

1. **Ask clarifying questions** if the change is unclear
2. **Review the handbook** for the specific artifact templates you need
3. **Check existing artifacts** to understand current state
4. **Create/update systematically** following the checklists
5. **Validate completeness** before finishing

---

**Remember**: The handbook is your source of truth. When in doubt, refer to:

- [`handbook/common/artifacts.context.md`](../handbook/common/artifacts.context.md) - Complete artifact guide and templates
