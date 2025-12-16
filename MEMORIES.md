# Memories

This file records what was learned, challenges faced, and how they were 
overcome during the development of this project.

---

## Task: Add "Current Roster" section to client page

**Date**: 2025-12-16

### What was learned

- The utilization field in the ConsultantContract type uses an unconventional 
  mapping: `0 = Full Time`, `1 = Part Time` (contrary to typical percentage-
  based utilization)
- The application uses TanStack Start with file-based routing, where route 
  files define both data loading and UI components
- The dev server runs on a subpath (`/resource-management-poc/`) which is 
  important when testing locally
- The app uses gradient backgrounds (`bg-gradient-to-br from-light-blue/30 
  to-light-grey/50`) with light-blue borders as a consistent visual pattern 
  for main content sections

### Challenges faced

1. **Understanding the utilization field**: Initially, the code review tool 
   flagged the utilization logic as potentially incorrect, suggesting that 
   `0` meant "not utilized" rather than "Full Time"
   
2. **Handling duplicate consultants**: Needed to deduplicate consultants who 
   might be assigned to multiple contracts for the same client

3. **Filtering active consultants**: Had to filter consultant contracts to 
   only show those that are currently active (no end_date or future end_date)

### How challenges were overcome

1. **Utilization field confusion**: Reviewed the TypeScript type definition 
   in `app/shared/types/index.ts` which explicitly documents: 
   `utilization: 0 | 1; // 0=Full Time, 1=Part Time`. Also verified that the 
   existing "Contracts" section uses the same logic, confirming this is the 
   correct implementation

2. **Deduplication logic**: Implemented a simple reducer that keeps only the 
   first occurrence of each consultant based on `consultant_id`. This works 
   well for the current use case where consultants typically appear on one 
   contract per client

3. **Active consultant filtering**: Added a filter condition 
   `!cc.end_date || new Date(cc.end_date) > new Date()` to only include 
   consultants with no end date or an end date in the future

### Implementation details

- Added data aggregation logic to extract and deduplicate active consultants 
  from all client contracts
- Created a responsive grid layout (1/2/3 columns for mobile/tablet/desktop)
- Positioned the "Current Roster" section above the existing "Contracts" 
  section for better visibility
- Each consultant card displays: name, years employed, role, contract name, 
  and utilization status
- Used consistent styling with existing UI patterns (gradient backgrounds, 
  color schemes, spacing)

### Testing

- Manually tested with multiple clients (TechCorp Solutions with 3 consultants, 
  Global Finance Inc with 2 consultants)
- Verified responsive layout behavior
- Ran CodeQL security scan (0 alerts)
- Code review completed (minor false positive about utilization field)

### Files modified

- `app/routes/clients.$id.tsx`: Added Current Roster section with data 
  aggregation and UI components (~77 lines added)

---
