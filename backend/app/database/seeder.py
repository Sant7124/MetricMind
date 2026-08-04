import asyncio
import random
from datetime import datetime, timedelta
from app.database.session import AsyncSessionLocal
from app.models import (
    Country, Region, Department, Company, User,
    Product, Customer, Order, OrderItem, Payment, Shipping,
    Expense
)
from app.semantic.engine import GOVERNED_METRICS
from app.models.metrics import MetricDefinition

async def seed_database():
    print("Starting massive enterprise data seeding...")
    async with AsyncSessionLocal() as session:
        # Check if already seeded to ensure idempotency
        existing = await session.execute("SELECT COUNT(id) FROM countries")
        if existing.scalar() > 0:
            print("Database already seeded. Skipping.")
            return

        # 1. Countries (10) & Regions (30)
        countries = [Country(code=f"C{i}", name=f"Country {i}") for i in range(1, 11)]
        session.add_all(countries)
        await session.flush()

        regions = []
        for c in countries:
            for i in range(3):
                regions.append(Region(name=f"Region {c.code}-{i}", country_id=c.id))
        session.add_all(regions)
        await session.flush()

        # 2. Company & Departments (10)
        company = Company(name="MetricMind Enterprise", industry="Technology")
        session.add(company)
        await session.flush()

        departments = [Department(name=f"Department {i}", company_id=company.id) for i in range(1, 11)]
        session.add_all(departments)
        await session.flush()

        # 3. Products (300)
        categories = ["Electronics", "Software", "Hardware", "Services"]
        products = [
            Product(
                name=f"Enterprise Product {i}",
                sku=f"SKU-{i:05d}",
                category=random.choice(categories),
                price=random.uniform(50.0, 5000.0)
            )
            for i in range(1, 301)
        ]
        session.add_all(products)
        await session.flush()

        # 4. Customers (5000)
        customers = [
            Customer(
                name=f"Customer {i}",
                email=f"customer{i}@enterprise.com",
                company_name=f"Corp {i}"
            )
            for i in range(1, 5001)
        ]
        session.add_all(customers)
        await session.flush()

        # 5. Semantic Metric Definitions (Sync to DB)
        metric_defs = [
            MetricDefinition(
                name=m.name,
                description=m.description,
                sql_query=m.formula
            )
            for m in GOVERNED_METRICS
        ]
        session.add_all(metric_defs)
        
        # 6. Orders (50,000) - Generating in chunks to avoid memory bloat
        print("Seeding 50,000 Orders (This might take a minute)...")
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=730) # 2 Years

        chunk_size = 5000
        for chunk in range(10):
            orders = []
            for i in range(chunk_size):
                days_ago = random.randint(0, 730)
                order_date = end_date - timedelta(days=days_ago)
                customer = random.choice(customers)
                orders.append(
                    Order(
                        customer_id=customer.id,
                        order_date=order_date,
                        status=random.choice(["completed", "completed", "completed", "pending", "refunded"]),
                        total_amount=0 # Calculated later
                    )
                )
            session.add_all(orders)
            await session.flush()

            # Order Items & Payments
            items = []
            payments = []
            for order in orders:
                num_items = random.randint(1, 5)
                order_total = 0
                for _ in range(num_items):
                    product = random.choice(products)
                    qty = random.randint(1, 3)
                    total_price = float(product.price) * qty
                    order_total += total_price
                    items.append(
                        OrderItem(
                            order_id=order.id,
                            product_id=product.id,
                            quantity=qty,
                            unit_price=product.price,
                            total_price=total_price
                        )
                    )
                order.total_amount = order_total
                
                if order.status == "completed":
                    payments.append(
                        Payment(
                            order_id=order.id,
                            amount=order_total,
                            payment_method=random.choice(["Credit Card", "Wire Transfer"]),
                            status="completed"
                        )
                    )
            
            session.add_all(items)
            session.add_all(payments)
            await session.commit() # Commit chunks to free memory
            print(f"Committed chunk {chunk+1}/10 ({(chunk+1)*chunk_size} orders)")

        # 7. Expenses (2 Years)
        print("Seeding Expenses...")
        expenses = []
        for i in range(730): # Daily expenses for 2 years
            exp_date = start_date + timedelta(days=i)
            expenses.append(
                Expense(
                    date=exp_date,
                    category="Shipping",
                    amount=random.uniform(500, 5000),
                    department_id=random.choice(departments).id
                )
            )
            expenses.append(
                Expense(
                    date=exp_date,
                    category="Marketing",
                    amount=random.uniform(1000, 10000),
                    department_id=random.choice(departments).id
                )
            )
        session.add_all(expenses)
        await session.commit()
        print("Data Seeding Complete!")

if __name__ == "__main__":
    asyncio.run(seed_database())
