import type { ProjectQA } from "@/data/qa";

/**
 * ServeBiz QA evidence, generated from ServeBiz-QA-Test-Cases.xlsx (document date 2026-10-29).
 * Every number below comes from that workbook. Re-generate or edit it if the workbook changes.
 */
export const servebizQA: ProjectQA = {
  "manual": {
    "summary": "198 written test cases across 24 modules. Each case has steps, test data, an expected result, a priority and a type (functional, negative, boundary, security or UI). All are marked Pass in the final recorded run (29 October 2026, build up to migration 016), and the 10 defects logged during testing are closed.",
    "stats": [
      {
        "value": "198",
        "label": "Test cases"
      },
      {
        "value": "24",
        "label": "Modules"
      },
      {
        "value": "82",
        "label": "High-priority cases"
      },
      {
        "value": "10",
        "label": "Defects logged and fixed"
      }
    ],
    "coverage": [
      {
        "name": "Accounts & login",
        "count": "15 cases"
      },
      {
        "name": "Onboarding",
        "count": "6 cases"
      },
      {
        "name": "Inventory - Receiving",
        "count": "9 cases"
      },
      {
        "name": "Inventory - Products & search",
        "count": "14 cases"
      },
      {
        "name": "Inventory - Adjustments",
        "count": "5 cases"
      },
      {
        "name": "Inventory - Suppliers",
        "count": "3 cases"
      },
      {
        "name": "Purchase orders",
        "count": "9 cases"
      },
      {
        "name": "CSV import",
        "count": "7 cases"
      },
      {
        "name": "Settings & tax",
        "count": "7 cases"
      },
      {
        "name": "POS",
        "count": "24 cases"
      },
      {
        "name": "PWA & offline",
        "count": "6 cases"
      },
      {
        "name": "Sales history",
        "count": "8 cases"
      },
      {
        "name": "Refunds & voids",
        "count": "7 cases"
      },
      {
        "name": "Dashboard & trends",
        "count": "8 cases"
      },
      {
        "name": "Reports",
        "count": "5 cases"
      },
      {
        "name": "Team & roles",
        "count": "11 cases"
      },
      {
        "name": "Invitations",
        "count": "8 cases"
      },
      {
        "name": "Businesses & branches",
        "count": "14 cases"
      },
      {
        "name": "All-branches overview",
        "count": "3 cases"
      },
      {
        "name": "Demo account",
        "count": "9 cases"
      },
      {
        "name": "Audit log",
        "count": "6 cases"
      },
      {
        "name": "Permissions & security",
        "count": "6 cases"
      },
      {
        "name": "Mobile & responsive",
        "count": "4 cases"
      },
      {
        "name": "Accessibility & display",
        "count": "4 cases"
      }
    ],
    "sampleCases": [
      {
        "id": "REFD-01",
        "title": "Partial refund",
        "steps": [
          "Open the sale",
          "Refund items",
          "Latte = 1, reason",
          "Refund selected, confirm"
        ],
        "expected": "Refund recorded; stock +1; receipt shows 'Refunded: 1 of 3', -100.00, 'PARTIALLY REFUNDED' and Net total.",
        "result": "pass",
        "note": "High priority · Functional · Role: Owner/Manager · Test data: 1"
      },
      {
        "id": "AUTH-06",
        "title": "Log in with the wrong password",
        "steps": [
          "Open /login",
          "Enter correct email, wrong password",
          "Click Log in"
        ],
        "expected": "An error message is shown; you stay on the login page.",
        "result": "pass",
        "note": "High priority · Negative · Role: Visitor · Test data: qa1@example.com / Wrong1234!"
      },
      {
        "id": "BIZ-08",
        "title": "Remove a branch needs the exact name",
        "steps": [
          "Remove branch",
          "Type a wrong name",
          "Confirm"
        ],
        "expected": "'Type the branch name ...' and nothing deleted.",
        "result": "pass",
        "note": "High priority · Negative · Role: Owner · Test data: nope"
      }
    ],
    "defects": [
      {
        "id": "D-001",
        "title": "Price set on an unpriced product left it inactive and unsellable",
        "severity": "medium",
        "status": "fixed",
        "summary": "Edit a Needs-pricing product, enter a price, save: it stays inactive. Fix: Price now switches Active on automatically."
      },
      {
        "id": "D-002",
        "title": "Same supplier name could be added twice",
        "severity": "medium",
        "status": "fixed",
        "summary": "Add 'Dairy Direct' twice (also different case). Fix: Duplicate check in both forms + unique index."
      },
      {
        "id": "D-003",
        "title": "Guest first load could create two demo stores",
        "severity": "high",
        "status": "fixed",
        "summary": "Open the app as a new guest with two tabs / quick reloads. Fix: Per-guest advisory lock in create_demo_business."
      },
      {
        "id": "D-004",
        "title": "POS discount dropdown text clipped",
        "severity": "low",
        "status": "fixed",
        "summary": "Open POS discount select. Fix: Shorter labels ('PHP off', '% off')."
      },
      {
        "id": "D-005",
        "title": "Declining the last invite showed no confirmation",
        "severity": "low",
        "status": "fixed",
        "summary": "Decline the only invite. Fix: Notice shown on the setup page."
      },
      {
        "id": "D-006",
        "title": "Re-invite / pending role change not in audit log",
        "severity": "low",
        "status": "fixed",
        "summary": "Re-invite same email with another role. Fix: trg_audit_invites now logs it."
      },
      {
        "id": "D-007",
        "title": "Phone layout: tables pushed page sideways (Products, Sales, Overview, Team)",
        "severity": "medium",
        "status": "fixed",
        "summary": "Open those pages at 390px. Fix: Grid column fixed; menu starts collapsed on phones."
      },
      {
        "id": "D-008",
        "title": "'1 product still need a selling price' grammar",
        "severity": "low",
        "status": "fixed",
        "summary": "Have exactly one unpriced product. Fix: Wording fixed."
      },
      {
        "id": "D-009",
        "title": "Refund amount wrapped ('-' on its own line)",
        "severity": "low",
        "status": "fixed",
        "summary": "View a refund on the sale page. Fix: No-wrap on the amount."
      },
      {
        "id": "D-010",
        "title": "New user's first page load threw a server error before redirecting to setup",
        "severity": "high",
        "status": "fixed",
        "summary": "Sign up and open /dashboard before creating a business. Fix: requireMembership redirects cleanly."
      }
    ],
    "links": [
      {
        "label": "Download the full test sheet (Excel)",
        "href": "/projects/servebiz/ServeBiz-QA-Test-Cases.xlsx",
        "note": "198 test cases, summary and defect log"
      }
    ],
    "images": [
      {
        "src": "/projects/servebiz/qa-summary.png",
        "alt": "Summary sheet: pass counts for each of the 24 modules, 198 of 198 passed, and 10 defects logged and closed",
        "width": 2055,
        "height": 1541,
        "caption": "Results summary by module"
      },
      {
        "src": "/projects/servebiz/qa-defects.png",
        "alt": "Defect log listing 10 defects with severity, status, how to reproduce and the fix",
        "width": 2238,
        "height": 424,
        "caption": "Defect log"
      }
    ]
  },
  "scope": [
    "The recorded results come from an automated browser QA round run by an AI assistant (Claude) on 29 October 2026. The cases are written so they can also be run by hand.",
    "Tested in Chrome only, at desktop (1280px) and phone (390px) widths.",
    "Run against a local stand-in for Supabase (real Postgres with all 16 migrations). Payments used Stripe test mode; Turnstile and email were not real.",
    "Not covered: load and performance testing, penetration testing, Safari and Firefox, and native apps."
  ]
};
