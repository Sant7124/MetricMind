from sqlalchemy import Column, String, Numeric, ForeignKey, Date, Integer
from sqlalchemy.orm import relationship
from .base_model import BaseModel, GUID

class Product(BaseModel):
    __tablename__ = "products"

    name = Column(String(150), index=True, nullable=False)
    sku = Column(String(50), unique=True, index=True, nullable=False)
    category = Column(String(100))
    price = Column(Numeric(10, 2))
    
    order_items = relationship("OrderItem", back_populates="product")


class Customer(BaseModel):
    __tablename__ = "customers"

    name = Column(String(150), index=True, nullable=False)
    email = Column(String(255), unique=True, index=True)
    company_name = Column(String(150))
    
    orders = relationship("Order", back_populates="customer")


class Order(BaseModel):
    __tablename__ = "orders"

    customer_id = Column(GUID(), ForeignKey("customers.id", ondelete="CASCADE"), nullable=False)
    order_date = Column(Date, nullable=False)
    status = Column(String(50), default="pending")
    total_amount = Column(Numeric(12, 2), default=0)

    customer = relationship("Customer", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="order", cascade="all, delete-orphan")
    shipping = relationship("Shipping", back_populates="order", uselist=False, cascade="all, delete-orphan")


class OrderItem(BaseModel):
    __tablename__ = "order_items"

    order_id = Column(GUID(), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(GUID(), ForeignKey("products.id", ondelete="RESTRICT"), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    unit_price = Column(Numeric(10, 2), nullable=False)
    total_price = Column(Numeric(12, 2), nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")


class Payment(BaseModel):
    __tablename__ = "payments"

    order_id = Column(GUID(), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    payment_method = Column(String(50))
    status = Column(String(50), default="completed")

    order = relationship("Order", back_populates="payments")


class Shipping(BaseModel):
    __tablename__ = "shipping"

    order_id = Column(GUID(), ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, unique=True)
    tracking_number = Column(String(100))
    carrier = Column(String(50))
    status = Column(String(50), default="processing")

    order = relationship("Order", back_populates="shipping")


class Sale(BaseModel):
    __tablename__ = "sales"

    date = Column(Date, nullable=False, index=True)
    amount = Column(Numeric(15, 2), nullable=False)
    region_id = Column(GUID(), ForeignKey("regions.id", ondelete="SET NULL"), nullable=True)


class Expense(BaseModel):
    __tablename__ = "expenses"

    date = Column(Date, nullable=False, index=True)
    category = Column(String(100), nullable=False)
    amount = Column(Numeric(15, 2), nullable=False)
    department_id = Column(GUID(), ForeignKey("departments.id", ondelete="SET NULL"), nullable=True)


class Revenue(BaseModel):
    __tablename__ = "revenues"

    date = Column(Date, nullable=False, index=True)
    source = Column(String(100), nullable=False)
    amount = Column(Numeric(15, 2), nullable=False)
