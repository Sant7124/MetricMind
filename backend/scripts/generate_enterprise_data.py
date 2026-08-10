import asyncio
import os
import sys
from datetime import datetime, timedelta
import random
import uuid

# Add the parent directory to the sys path so we can import 'app'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database.session import AsyncSessionLocal
from app.models.sales import Customer, Product, Order, OrderItem, Payment, Shipping
from sqlalchemy import text

# Seed to make data reproducible if necessary
random.seed(42)

NUM_CUSTOMERS = 2000
NUM_PRODUCTS = 100
NUM_ORDERS = 10000

print(f"Generating Synthetic Data...")
print(f"Target: {NUM_CUSTOMERS} Customers, {NUM_PRODUCTS} Products, {NUM_ORDERS} Orders")

first_names = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"]
categories = ["Electronics", "Home & Garden", "Sports", "Toys", "Books", "Clothing", "Beauty", "Automotive"]

def generate_random_date(start, end):
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds())),
    )

async def generate():
    async with AsyncSessionLocal() as session:
        # Clear existing data safely
        try:
            print("Cleaning existing data...")
            await session.execute(text("DELETE FROM order_items"))
            await session.execute(text("DELETE FROM payments"))
            await session.execute(text("DELETE FROM shipping"))
            await session.execute(text("DELETE FROM orders"))
            await session.execute(text("DELETE FROM customers"))
            await session.execute(text("DELETE FROM products"))
            await session.commit()
        except Exception as e:
            print(f"Cleanup failed, continuing anyway: {e}")
            await session.rollback()

        # Create Customers
        print("Generating Customers...")
        customers = []
        for _ in range(NUM_CUSTOMERS):
            name = f"{random.choice(first_names)} {random.choice(last_names)}"
            email = f"{name.replace(' ', '.').lower()}{random.randint(1, 9999)}@example.com"
            cust = Customer(
                id=uuid.uuid4(),
                name=name,
                email=email,
                company_name=None
            )
            customers.append(cust)
            session.add(cust)
            
        await session.commit()
        
        # Create Products
        print("Generating Products...")
        products = []
        for i in range(NUM_PRODUCTS):
            cat = random.choice(categories)
            price = round(random.uniform(10.0, 500.0), 2)
            prod = Product(
                id=uuid.uuid4(),
                name=f"{cat} Item {i+1}",
                sku=f"SKU-{cat[:3].upper()}-{i+1000}",
                category=cat,
                price=price
            )
            products.append(prod)
            session.add(prod)
            
        await session.commit()
        
        # Create Orders
        print("Generating Orders...")
        start_date = datetime.now() - timedelta(days=730) # 2 years ago
        end_date = datetime.now()
        
        orders_batch = []
        order_items_batch = []
        payments_batch = []
        shipping_batch = []
        
        for i in range(NUM_ORDERS):
            cust = random.choice(customers)
            order_date = generate_random_date(start_date, end_date).date()
            
            order_id = uuid.uuid4()
            order = Order(
                id=order_id,
                customer_id=cust.id,
                order_date=order_date,
                status="completed",
                total_amount=0 # We will calculate this
            )
            
            num_items = random.randint(1, 5)
            total_amount = 0
            
            for _ in range(num_items):
                prod = random.choice(products)
                qty = random.randint(1, 3)
                total_price = prod.price * qty
                total_amount += float(total_price)
                
                item = OrderItem(
                    id=uuid.uuid4(),
                    order_id=order_id,
                    product_id=prod.id,
                    quantity=qty,
                    unit_price=prod.price,
                    total_price=total_price
                )
                order_items_batch.append(item)
                
            order.total_amount = round(total_amount, 2)
            orders_batch.append(order)
            
            # Payment
            payment = Payment(
                id=uuid.uuid4(),
                order_id=order_id,
                amount=round(total_amount, 2),
                payment_method=random.choice(["credit_card", "paypal", "stripe"]),
                status="completed"
            )
            payments_batch.append(payment)
            
            # Shipping
            shipping = Shipping(
                id=uuid.uuid4(),
                order_id=order_id,
                tracking_number=f"TRK{random.randint(10000000, 99999999)}",
                carrier=random.choice(["FedEx", "UPS", "USPS"]),
                status="delivered"
            )
            shipping_batch.append(shipping)
            
            if len(orders_batch) >= 1000:
                session.add_all(orders_batch)
                session.add_all(order_items_batch)
                session.add_all(payments_batch)
                session.add_all(shipping_batch)
                await session.commit()
                print(f"Inserted {i+1} orders...")
                
                orders_batch = []
                order_items_batch = []
                payments_batch = []
                shipping_batch = []
                
        # Final batch
        if orders_batch:
            session.add_all(orders_batch)
            session.add_all(order_items_batch)
            session.add_all(payments_batch)
            session.add_all(shipping_batch)
            await session.commit()
            
        print("Data generation complete!")

if __name__ == "__main__":
    asyncio.run(generate())
