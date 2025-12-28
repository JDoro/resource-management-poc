## 2024-05-20 - Mitigating IDOR with UUIDs in Mock Data
**Vulnerability:** Insecure Direct Object Reference (IDOR)
**Learning:** The application's mock API used predictable, sequential integer IDs (e.g., 1, 2, 3), making it easy to guess other users' or resources' IDs. This is a common IDOR vulnerability.
**Prevention:** Always use non-sequential, randomized identifiers (like UUIDs) for resource IDs, even in mock data. This prevents attackers from enumerating resources and accessing unauthorized data.
