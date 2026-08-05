from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.utils.responses import success_response, error_response, APIResponse
from app.schemas.user import UserCreate, Token
from app.models.user import User
from app.core.security import verify_password, get_password_hash, create_access_token
from app.database.session import AsyncSessionLocal
from sqlalchemy import select

router = APIRouter()

@router.post("/register", response_model=APIResponse)
async def register(user_in: UserCreate):
    async with AsyncSessionLocal() as session:
        # Check if user exists
        stmt = select(User).where(User.email == user_in.email)
        result = await session.execute(stmt)
        if result.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Email already registered")
            
        # Create real user in Database
        hashed_pw = get_password_hash(user_in.password)
        new_user = User(
            email=user_in.email,
            hashed_password=hashed_pw,
            first_name=user_in.first_name,
            last_name=user_in.last_name
        )
        session.add(new_user)
        await session.commit()
        await session.refresh(new_user)
        
        return success_response(message="User registered successfully")

@router.post("/login", response_model=APIResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    async with AsyncSessionLocal() as session:
        # Query DB for user
        stmt = select(User).where(User.email == form_data.username)
        result = await session.execute(stmt)
        user = result.scalar_one_or_none()
        
        if not user or not verify_password(form_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        # Generate real cryptographically signed JWT
        access_token = create_access_token(subject=user.email)
        
        return success_response(
            data={
                "access_token": access_token, 
                "token_type": "bearer", 
                "user": {
                    "email": user.email, 
                    "name": f"{user.first_name} {user.last_name}",
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role_id": str(user.role_id) if user.role_id else "user"
                }
            }, 
            message="Login successful"
        )

@router.post("/logout", response_model=APIResponse)
async def logout():
    # True logout requires token invalidation (e.g. redis blacklist), 
    # but for stateless JWTs, the client simply drops the token.
    return success_response(message="Logged out successfully")
