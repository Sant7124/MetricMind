from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from .base_model import BaseModel, GUID

class Country(BaseModel):
    __tablename__ = "countries"

    code = Column(String(3), unique=True, index=True, nullable=False) # ISO code
    name = Column(String(100), nullable=False)
    
    regions = relationship("Region", back_populates="country")

class Region(BaseModel):
    __tablename__ = "regions"

    name = Column(String(100), nullable=False)
    country_id = Column(GUID(), ForeignKey("countries.id", ondelete="CASCADE"), nullable=False)

    country = relationship("Country", back_populates="regions")
    companies = relationship("Company", back_populates="region")

class Company(BaseModel):
    __tablename__ = "companies"

    name = Column(String(100), index=True, nullable=False)
    industry = Column(String(100))
    region_id = Column(GUID(), ForeignKey("regions.id", ondelete="SET NULL"), nullable=True)

    region = relationship("Region", back_populates="companies")
    departments = relationship("Department", back_populates="company", cascade="all, delete-orphan")
    users = relationship("User", back_populates="company")

class Department(BaseModel):
    __tablename__ = "departments"

    name = Column(String(100), nullable=False)
    company_id = Column(GUID(), ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)

    company = relationship("Company", back_populates="departments")
    users = relationship("User", back_populates="department")
