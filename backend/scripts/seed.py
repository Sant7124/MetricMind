import asyncio
import sys
import os
from faker import Faker
from datetime import timedelta
import random

# Add backend directory to sys.path so we can import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database.session import engine, AsyncSessionLocal
from app.models.base_model import BaseModel
from app.models.sales import Customer, Product, Order, OrderItem
from app.models.user import User
from sqlalchemy import select

fake = Faker()

async def seed_db():
    print("Initializing Database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(BaseModel.metadata.create_all)
        
    print("Starting data generation...")
    async with AsyncSessionLocal() as session:
        # Generate Admin User
        from app.core.security import get_password_hash
        print("Generating Admin User...")
        admin_email = "admin@metricmind.com"
        result = await session.execute(select(User).where(User.email == admin_email))
        if not result.scalar_one_or_none():
            admin_user = User(
                email=admin_email,
                hashed_password=get_password_hash("password"),
                first_name="Admin",
                last_name="User"
            )
            session.add(admin_user)
            await session.commit()
            print("Admin user created (admin@metricmind.com / password)")
        else:
            print("Admin user already exists.")

        # Generate Customers
        print("Generating Customers...")
        customers = []
        for _ in range(50):
            customer = Customer(
                name=fake.name(),
                email=fake.email(),
                company_name=fake.company()
            )
            session.add(customer)
            customers.append(customer)
            
        # Generate Products
        print("Generating Products...")
        products = []
        categories = ["Electronics", "Software", "Consulting", "Hardware", "Services"]
        for i in range(20):
            product = Product(
                name=fake.catch_phrase(),
                sku=f"SKU-{fake.unique.random_number(digits=6)}",
                category=random.choice(categories),
                price=round(random.uniform(10.0, 5000.0), 2)
            )
            session.add(product)
            products.append(product)
            
        await session.flush()
        
        # Generate Orders & Items
        print("Generating Orders...")
        for _ in range(200):
            order = Order(
                customer_id=random.choice(customers).id,
                order_date=fake.date_between(start_date='-1y', end_date='today'),
                status=random.choice(["pending", "completed", "shipped", "cancelled"]),
                total_amount=0 # Calculate below
            )
            session.add(order)
            await session.flush()
            
            # Add Items
            total = 0
            for _ in range(random.randint(1, 5)):
                product = random.choice(products)
                qty = random.randint(1, 10)
                price = product.price
                line_total = qty * price
                
                item = OrderItem(
                    order_id=order.id,
                    product_id=product.id,
                    quantity=qty,
                    unit_price=price,
                    total_price=line_total
                )
                session.add(item)
                total += line_total
                
            order.total_amount = total
            
        await session.commit()
        print("Database seeded successfully with synthetic data!")

if __name__ == "__main__":
    asyncio.run(seed_db())
