from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.lib import utils
import os

OUTPUT_PATH = "c:\\Users\\sant7\\OneDrive\\Desktop\\MetricMind\\MetricMind_Presentation.pdf"
ASSETS_DIR = "c:\\Users\\sant7\\OneDrive\\Desktop\\MetricMind\\presentation_assets"

slides = [
    {
        "title": "MetricMind Overview",
        "subtitle": "AI-powered Semantic BI Engine for modern enterprises.",
        "image": "landing.png",
        "notes": [
            "MetricMind turns natural language questions into governed analytics.",
            "It connects the AI agent to your data warehouse without exposing raw SQL.",
        ],
    },
    {
        "title": "Why MetricMind Matters",
        "subtitle": "How it helps every sector.",
        "image": "features.png",
        "notes": [
            "Finance: Accurate revenue forecasts and expense analysis.",
            "Sales: Faster pipeline reporting and churn risk detection.",
            "Marketing: Campaign ROI, conversion insights, and audience metrics.",
            "Operations: Data catalog governance and warehouse control.",
        ],
    },
    {
        "title": "Landing Page",
        "subtitle": "First impression & product positioning.",
        "image": "landing.png",
        "notes": [
            "Hero section explains AI-powered semantic analytics.",
            "Calls to action: Start free, sign in, and feature navigation.",
        ],
    },
    {
        "title": "Features Page",
        "subtitle": "Showcases core capabilities.",
        "image": "features.png",
        "notes": [
            "Explains autonomous AI, governance, dashboards, and security.",
            "Helps buyers understand what MetricMind offers.",
        ],
    },
    {
        "title": "Pricing Page",
        "subtitle": "Plans for startups to enterprise.",
        "image": "pricing.png",
        "notes": [
            "Clear pricing tiers with feature comparisons.",
            "Supports decision-making for buyers and stakeholders.",
        ],
    },
    {
        "title": "Login Page",
        "subtitle": "Access the protected workspace.",
        "image": "login.png",
        "notes": [
            "Secure login form with email and password.",
            "Preloaded demo credentials in the UI for testing.",
        ],
    },
    {
        "title": "Register Page",
        "subtitle": "New user onboarding.",
        "image": "register.png",
        "notes": [
            "Registration form collects user profile and credentials.",
            "Includes navigation back to login for returning users.",
        ],
    },
    {
        "title": "Executive Dashboard",
        "subtitle": "Top-level business health overview.",
        "image": "dashboard.png",
        "notes": [
            "KPI cards show revenue, orders, and customer metrics.",
            "Charts display revenue and profit trends for executives.",
        ],
    },
    {
        "title": "Revenue Dashboard",
        "subtitle": "Detailed revenue analytics.",
        "image": "dashboard_revenue.png",
        "notes": [
            "Shows revenue and gross margin with a revenue growth chart.",
            "Includes filters and summary metrics for business decisions.",
        ],
    },
    {
        "title": "AI Chat Page",
        "subtitle": "Natural language analytics.",
        "image": "dashboard_chat.png",
        "notes": [
            "Users ask business questions and receive AI-generated insights.",
            "Includes chat history and suggested queries for quick use.",
        ],
    },
    {
        "title": "Custom Dashboard Builder",
        "subtitle": "Personalized analytics workspace.",
        "image": "dashboard_custom.png",
        "notes": [
            "Add and arrange widgets for custom KPI views.",
            "Supports multiple chart types and saved layouts.",
        ],
    },
    {
        "title": "Report Center",
        "subtitle": "Export and manage business reports.",
        "image": "dashboard_reports.png",
        "notes": [
            "Create, export, and schedule reports in PDF, Excel, or CSV.",
            "Tracks report views and categories for easy access.",
        ],
    },
    {
        "title": "Data Catalog",
        "subtitle": "Governed metric glossary.",
        "image": "dashboard_catalog.png",
        "notes": [
            "Search business metrics, formulas, dimensions, and owners.",
            "Ensures users understand definitions and trust the data.",
        ],
    },
    {
        "title": "Query Inspector",
        "subtitle": "Transparency for AI-generated SQL.",
        "image": "dashboard_inspector.png",
        "notes": [
            "Shows the exact SQL produced by the semantic engine.",
            "Helps auditors and analysts validate query correctness.",
        ],
    },
    {
        "title": "User Profile",
        "subtitle": "User settings and activity.",
        "image": "dashboard_profile.png",
        "notes": [
            "Manage personal preferences and view recent actions.",
            "Includes usage statistics and active session control.",
        ],
    },
    {
        "title": "Admin User Management",
        "subtitle": "Control access and roles.",
        "image": "dashboard_admin_users.png",
        "notes": [
            "Add, edit, or remove users and assign roles.",
            "Monitors seat usage and security score for admins.",
        ],
    },
    {
        "title": "Audit Center",
        "subtitle": "Security and compliance monitoring.",
        "image": "dashboard_admin_audit.png",
        "notes": [
            "Tracks login events, failed attempts, and data exports.",
            "Provides actionable alerts and anomaly charts.",
        ],
    },
    {
        "title": "System Settings",
        "subtitle": "Platform configuration and integrations.",
        "image": "dashboard_admin_settings.png",
        "notes": [
            "Adjust AI providers, theme, timezone, and system options.",
            "Manage integrations and view system health status.",
        ],
    },
    {
        "title": "System Monitor",
        "subtitle": "Infrastructure health dashboard.",
        "image": "dashboard_admin_monitor.png",
        "notes": [
            "Monitors CPU, memory, network, and uptime in real time.",
            "Alerts on system health, storage usage, and worker status.",
        ],
    },
]

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 50


def draw_slide(c, slide):
    c.setFont("Helvetica-Bold", 28)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - 10, slide["title"])
    c.setFont("Helvetica", 14)
    c.setFillColorRGB(0.4, 0.4, 0.4)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - 40, slide["subtitle"])
    c.setFillColorRGB(0, 0, 0)

    image_path = os.path.join(ASSETS_DIR, slide["image"])
    if os.path.exists(image_path):
        img = utils.ImageReader(image_path)
        img_width, img_height = img.getSize()
        max_width = PAGE_WIDTH - 2 * MARGIN
        max_height = PAGE_HEIGHT * 0.45
        ratio = min(max_width / img_width, max_height / img_height)
        width = img_width * ratio
        height = img_height * ratio
        x = MARGIN
        y = PAGE_HEIGHT - MARGIN - 60 - height
        c.drawImage(img, x, y, width=width, height=height, preserveAspectRatio=True)

    text_y = PAGE_HEIGHT - MARGIN - 80 - (max_height if os.path.exists(image_path) else 0)
    text_y -= 20
    c.setFont("Helvetica-Bold", 16)
    c.drawString(MARGIN, text_y, "Key Points")
    c.setFont("Helvetica", 12)
    text_y -= 20

    for note in slide["notes"]:
        if text_y < MARGIN + 40:
            c.showPage()
            c.setFont("Helvetica-Bold", 16)
            c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - 10, "Key Points Continued")
            c.setFont("Helvetica", 12)
            text_y = PAGE_HEIGHT - MARGIN - 40
        c.drawString(MARGIN + 10, text_y, "- " + note)
        text_y -= 18


if __name__ == "__main__":
    c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)
    for slide in slides:
        draw_slide(c, slide)
        c.showPage()
    c.save()
    print(f"Presentation generated: {OUTPUT_PATH}")
