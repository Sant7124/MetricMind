from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Image, Spacer, PageBreak
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# Use built-in Times-Roman font as the presentation font family.
# Times New Roman is represented through the Times family in ReportLab.
pdfmetrics.registerFont(TTFont('Times-Roman', 'times.ttf')) if os.path.exists('times.ttf') else None

OUTPUT_PATH = "c:\\Users\\sant7\\OneDrive\\Desktop\\MetricMind\\MetricMind_Presentation_Detailed.pdf"
ASSETS_DIR = "c:\\Users\\sant7\\OneDrive\\Desktop\\MetricMind\\presentation_assets"

slides = [
    {
        "title": "MetricMind: AI-Powered Semantic BI",
        "subtitle": "A complete presentation of the website, its pages, and the real business value.",
        "image": "landing.png",
        "details": "MetricMind is a modern analytics platform that blends an AI assistant with a semantic business intelligence layer, so teams can ask questions in natural language and trust the results.",
        "notes": [
            "It eliminates repetitive SQL and manual spreadsheet work by using governed metrics, dimensions, and business definitions.",
            "The platform supports both business users and data teams with an intuitive interface and secure analytics workflows.",
            "Every slide of this presentation shows the real website experience, with screenshots and commentary for decision makers.",
            "The goal is to demonstrate how MetricMind delivers speed, trust, and operational visibility across the company.",
            "This introductory page explains why a semantic BI solution matters for data accuracy and faster decisions.",
            "MetricMind helps prevent data disputes by ensuring all reports use the same metric definitions and semantic logic.",
        ],
    },
    {
        "title": "How MetricMind Helps Every Sector",
        "subtitle": "Clear benefits for finance, sales, marketing, operations, and IT.",
        "image": "features.png",
        "details": "This slide summarizes how the platform addresses the most common business analytics problems across multiple teams, from finance to IT.",
        "notes": [
            "Finance teams gain consistent revenue, cost, margin, and cash flow insights without waiting on analysts.",
            "Sales leaders can monitor pipeline, conversion, average deal size, and churn in one trustworthy place.",
            "Marketing teams understand campaign performance, channel ROI, and audience behavior without manual Excel merges.",
            "Operations gains control with a data catalog, metric governance, and collaboration across business units.",
            "IT and security teams benefit from centralized role-based access, audit trails, and compliance-ready workflows.",
            "Executives get a single source of truth for KPIs, reducing conflicting reports and speeding decisions.",
            "The platform is designed to reduce time to insight and improve confidence in every analytics conversation.",
        ],
    },
    {
        "title": "Landing Page",
        "subtitle": "First impression and main product promise.",
        "image": "landing.png",
        "details": "The landing page is the first contact point for new visitors, explaining the product value in a concise, credible way.",
        "notes": [
            "It highlights the core promise: ask questions in business language and get answers without needing SQL.",
            "Strategic calls to action invite visitors to create an account or sign in, helping convert prospects quickly.",
            "Key benefits like conversational analytics, automated dashboards, and trusted data are highlighted for buyers.",
            "This page is ideal for product demos, sales meetings, investor discussions, and executive summaries.",
            "It conveys credibility by showing a mature enterprise solution with governance and collaboration.",
            "The landing page clarifies how MetricMind helps organizations operate with data confidence.",
        ],
    },
    {
        "title": "Features Page",
        "subtitle": "Detailed capabilities that support the product story.",
        "image": "features.png",
        "details": "This page is where the product story is elaborated with concrete capabilities, showing buyers what makes MetricMind different.",
        "notes": [
            "The platform’s major pillars are presented: AI agent, semantic layer, dashboards, and governance.",
            "It explains how the AI agent interprets queries, maps terms to governed metrics, and generates charts.",
            "The semantic layer prevents inconsistent analytics across teams by centralizing metric definitions.",
            "It also highlights business glossary entries, lineage tracking, and reusable definitions.",
            "Governance features such as role-based access, audit logging, and query validation are called out explicitly.",
            "This page reassures technical and business stakeholders that MetricMind is enterprise-ready.",
            "It demonstrates why organizations can scale analytics faster with a governed data model.",
        ],
    },
    {
        "title": "Pricing Page",
        "subtitle": "Simple plan structure for startups through enterprise.",
        "image": "pricing.png",
        "details": "The pricing page describes how MetricMind allows organizations to choose the right package based on team size, feature needs, and governance requirements.",
        "notes": [
            "Starter is positioned for small teams that need fast insights without a large upfront investment.",
            "Professional supports growing analytics teams with dashboard building, AI chat, and expanded metric governance.",
            "Enterprise adds advanced controls, audit capabilities, integration support, and dedicated onboarding.",
            "It emphasizes value by matching features to buyer needs like security, insights, and scale.",
            "The page helps decision-makers compare the right plan for their current maturity level and growth path.",
            "This clear tiering reduces pricing friction and increases buyer confidence.",
            "It also positions MetricMind as suitable for both early-stage projects and large enterprise deployments.",
        ],
    },
    {
        "title": "Login Page",
        "subtitle": "Secure access to the MetricMind workspace.",
        "image": "login.png",
        "details": "The login page is the secure access point for existing users and enforces authentication before users can reach analytics content.",
        "notes": [
            "It connects to backend authentication and ensures only authorized users can access sensitive dashboards.",
            "The page reinforces enterprise security with a clean interface and standard authentication fields.",
            "A password recovery link is included so users can quickly regain access if needed.",
            "The login experience is a core part of the onboarding and daily return flow.",
            "It is designed to protect company data while keeping the workflow simple for users.",
            "This page also supports security reviews by showing a professional, corporate-ready sign-in screen.",
        ],
    },
    {
        "title": "Register Page",
        "subtitle": "New user onboarding and account creation.",
        "image": "register.png",
        "details": "The registration page allows new users to join the platform with minimal friction, capturing only the information required for a secure account.",
        "notes": [
            "It collects first name, last name, email, and password with validation to prevent common errors.",
            "Once registration is complete, users are redirected to login and can begin using MetricMind immediately.",
            "The page is simple, modern, and designed to reduce dropoff during signup.",
            "It supports rapid onboarding for new team members and external stakeholders.",
            "The flow balances ease-of-use with enterprise-grade account security.",
            "This signup experience helps adoption by making it easy for users to get started.",
        ],
    },
    {
        "title": "Executive Dashboard",
        "subtitle": "High-level business summary for leaders.",
        "image": "dashboard.png",
        "details": "The Executive Dashboard is designed to provide leadership with a concise, trustworthy summary of the business at a glance.",
        "notes": [
            "It displays core metrics such as revenue, orders, active customers, and growth trends.",
            "The dashboard compares current performance against targets and prior periods.",
            "A panel of AI-generated insights highlights anomalies and potential opportunities.",
            "This page is ideal for daily status checks, board meetings, and strategic planning sessions.",
            "It enables executives to stay aligned without needing to drill into granular reports.",
            "The design emphasizes clarity, speed, and confidence in the underlying data.",
        ],
    },
    {
        "title": "Revenue Dashboard",
        "subtitle": "Deep financial analysis and revenue tracking.",
        "image": "dashboard_revenue.png",
        "details": "The Revenue Dashboard provides finance and sales teams with detailed visibility into revenue performance, margin trends, and customer value.",
        "notes": [
            "It includes revenue cards, trend analytics, and segmentation by product, region, or customer cohort.",
            "Users can compare actual revenue against forecasts and see margin impact over time.",
            "The dashboard highlights recurring revenue, bookings, churn, and profitability signals.",
            "This page is useful for monthly reviews, forecasting meetings, and revenue optimization.",
            "It translates raw financial numbers into actionable business insights.",
            "The visualizations help leadership understand where revenue is coming from and where to focus next.",
        ],
    },
    {
        "title": "AI Chat Page",
        "subtitle": "Natural language questions powered by the MetricMind agent.",
        "image": "dashboard_chat.png",
        "details": "The AI Chat page lets users ask natural language questions and receive instant analytics answers without needing technical expertise.",
        "notes": [
            "The semantic engine interprets business questions and selects the correct governed metrics.",
            "Responses can include charts, tables, written summaries, and follow-up recommendations.",
            "This page is ideal for non-technical users who need quick answers to business questions.",
            "It also helps analysts explore data faster by removing manual query construction.",
            "The chat experience makes analytics feel more conversational and accessible.",
            "It supports ad-hoc reporting and helps teams validate assumptions with trusted data.",
        ],
    },
    {
        "title": "Custom Dashboard Builder",
        "subtitle": "Create your own dashboards with widgets and charts.",
        "image": "dashboard_custom.png",
        "details": "The Dashboard Builder page enables users to create custom layouts that reflect the metrics most important to their role.",
        "notes": [
            "Users can add KPI cards, charts, tables, and explanatory panels to a reusable dashboard layout.",
            "Dashboards can be saved, shared, and refreshed with live data.",
            "This page supports cross-functional teams such as sales, marketing, finance, and operations.",
            "It allows business users to tailor the platform to their own decision-making needs.",
            "The custom dashboards reduce reliance on one-size-fits-all reports.",
            "This experience demonstrates how MetricMind adapts to different departments and workflows.",
        ],
    },
    {
        "title": "Report Center",
        "subtitle": "Manage, schedule, and export business reports.",
        "image": "dashboard_reports.png",
        "details": "The Report Center page organizes scheduled exports, one-off reports, and historic sharing in a centralized location.",
        "notes": [
            "Users can schedule recurring exports in PDF, Excel, or CSV format for stakeholders.",
            "It shows report status, last delivery time, and automation details.",
            "This page supports repeatable reporting for finance closes, executive summaries, and operational meetings.",
            "It reduces manual effort by automating report distribution and tracking.",
            "Teams benefit from consistent, trusted report delivery instead of ad-hoc manual exports.",
            "This page reinforces MetricMind’s ability to turn analytics into repeatable business processes.",
        ],
    },
    {
        "title": "Data Catalog",
        "subtitle": "Governed metric definitions and business glossary.",
        "image": "dashboard_catalog.png",
        "details": "The Data Catalog page houses metric definitions, business terms, and owner information to promote consistent understanding across the organization.",
        "notes": [
            "It documents governed metrics, dimensions, formulas, and the teams responsible for them.",
            "Users can search definitions for terms like MRR, ARR, churn, and customer lifetime value.",
            "The catalog helps business users understand how numbers are calculated and where they come from.",
            "It prevents confusion caused by different teams using different definitions for the same KPI.",
            "This page supports data governance, auditability, and cross-team alignment.",
            "The data catalog builds trust by making analytics definitions transparent and discoverable.",
        ],
    },
    {
        "title": "Query Inspector",
        "subtitle": "Review the actual SQL generated by the semantic engine.",
        "image": "dashboard_inspector.png",
        "details": "The Query Inspector page shows the actual SQL generated from user inputs, giving analysts and auditors the transparency they need.",
        "notes": [
            "It displays the user query, selected metrics, filters, dimensions, and generated SQL text.",
            "Analysts can verify that the semantic engine is translating business logic correctly.",
            "This page improves trust by making the underlying query generation visible and auditable.",
            "It also helps troubleshoot issues by allowing teams to inspect and refine generated logic.",
            "The Query Inspector supports compliance and performance reviews with clear documentation.",
            "This page demonstrates the balance between usability and technical transparency.",
        ],
    },
    {
        "title": "User Profile",
        "subtitle": "Manage account settings and activity for a single user.",
        "image": "dashboard_profile.png",
        "details": "The User Profile page helps individuals manage their own account settings, personal preferences, and session security.",
        "notes": [
            "It shows profile details, timezone settings, language preferences, and recent session history.",
            "Users can review account security and confirm recent login activity.",
            "The page enables self-service updates without needing administrator support.",
            "This improves the overall user experience by making profile management easy.",
            "It also helps users remain confident about their own access and settings.",
            "This page supports good governance by giving users control over their personal data.",
        ],
    },
    {
        "title": "Admin: User Management",
        "subtitle": "Control access, roles, and security for all users.",
        "image": "dashboard_admin_users.png",
        "details": "The Admin User Management page gives administrators complete visibility and control over user access, roles, and security.",
        "notes": [
            "Admins can assign roles, manage permissions, and revoke access for users as needed.",
            "The page shows seat usage, security posture, and last login activity at a glance.",
            "It supports user lifecycle management from onboarding to offboarding.",
            "This page helps enforce the principle of least privilege and maintain corporate security policy.",
            "It also simplifies compliance by making user access easier to review and audit.",
            "This admin view is essential for scaling the platform securely across the enterprise.",
        ],
    },
    {
        "title": "Admin: Audit Center",
        "subtitle": "Track events, monitor compliance, and inspect security activity.",
        "image": "dashboard_admin_audit.png",
        "details": "The Audit Center page provides a full event history for security and compliance teams to monitor system activity.",
        "notes": [
            "It captures login events, exports, data access, and administrative actions.",
            "Security teams can identify unusual behavior such as failed logins or unexpected data downloads.",
            "This page provides an immutable history for governance reviews and investigations.",
            "It helps organizations meet audit requirements with clear event logs.",
            "The page supports incident response by making activity easy to investigate and understand.",
            "It is a core control for enterprise deployments that require strong accountability.",
        ],
    },
    {
        "title": "Admin: System Settings",
        "subtitle": "Configure platform behavior, integration, and AI providers.",
        "image": "dashboard_admin_settings.png",
        "details": "The System Settings page centralizes platform configuration, integration options, and operational controls in one admin interface.",
        "notes": [
            "Admins can configure AI provider selection, caching, and integration settings.",
            "It centralizes changes so they apply consistently across the workspace.",
            "This page allows non-technical operators to manage platform behavior safely.",
            "It helps keep deployments aligned with organizational security and performance needs.",
            "The page is important for maintaining a stable, maintainable enterprise solution.",
            "It also supports future growth by making configuration easier to manage over time.",
        ],
    },
    {
        "title": "Admin: System Monitor",
        "subtitle": "Live infrastructure telemetry and operational health.",
        "image": "dashboard_admin_monitor.png",
        "details": "The System Monitor page gives operations teams real-time visibility into infrastructure health, usage, and AI provider performance.",
        "notes": [
            "It displays live metrics such as CPU, memory, network usage, uptime, and latency.",
            "Operations teams can detect issues early and maintain platform stability.",
            "This page provides confidence that the system is ready for business users.",
            "It helps teams prevent unexpected downtime and resolve performance problems quickly.",
            "This monitoring experience is especially valuable for production-grade deployments.",
            "It reinforces the operational maturity of the MetricMind platform in enterprise settings.",
        ],
    },
]


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='SlideTitle', parent=styles['Heading1'], fontName='Times-Bold', fontSize=28, leading=32, spaceAfter=12))
styles.add(ParagraphStyle(name='SlideSubtitle', parent=styles['Normal'], fontName='Times-Roman', fontSize=12, leading=16, textColor=colors.HexColor('#666666'), spaceAfter=12))
styles.add(ParagraphStyle(name='SlideBody', parent=styles['Normal'], fontName='Times-Roman', fontSize=11, leading=16, spaceAfter=12))
styles.add(ParagraphStyle(name='SlideBullet', parent=styles['Normal'], fontName='Times-Roman', bulletFontSize=10, leftIndent=18, bulletIndent=8, fontSize=11, leading=16, spaceAfter=10))
styles.add(ParagraphStyle(name='Footer', parent=styles['Normal'], fontName='Times-Roman', fontSize=8, leading=10, textColor=colors.HexColor('#999999'), alignment=1))


class SlideDocTemplate(SimpleDocTemplate):
    def __init__(self, filename, **kwargs):
        super().__init__(filename, **kwargs)


def make_image(path, max_width, max_height):
    if not os.path.exists(path):
        return None
    img = ImageReader(path)
    width, height = img.getSize()
    ratio = min(max_width / width, max_height / height)
    return Image(path, width=width * ratio, height=height * ratio)


def build_presentation():
    doc = SlideDocTemplate(OUTPUT_PATH, pagesize=A4, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
    story = []

    for slide in slides:
        story.append(Paragraph(slide['title'], styles['SlideTitle']))
        story.append(Paragraph(slide['subtitle'], styles['SlideSubtitle']))
        story.append(Paragraph(slide.get('details', ''), styles['SlideBody']))

        image_path = os.path.join(ASSETS_DIR, slide['image']) if slide['image'] else None
        if image_path and os.path.exists(image_path):
            img = make_image(image_path, max_width=5.5*inch, max_height=3*inch)
            if img:
                story.append(img)
                story.append(Spacer(1, 12))

        for note in slide['notes']:
            story.append(Paragraph(f"• {note}", styles['SlideBullet']))

        story.append(Spacer(1, 12))
        story.append(PageBreak())

    doc.build(story)


if __name__ == '__main__':
    if not os.path.exists(ASSETS_DIR):
        raise FileNotFoundError(f"Assets directory not found: {ASSETS_DIR}")
    build_presentation()
    print(f"Generated presentation: {OUTPUT_PATH}")
