from __future__ import annotations
from typing import List
from sqlalchemy.orm import Session
from uuid import UUID

from app.crud.base import CRUDBase
from app.models import Invitation
from app.schemas import InvitationCreate, InvitationUpdate, Invitation as InvitationOut
from app.core.config import settings


class CRUDInvitation(CRUDBase[Invitation, InvitationCreate, InvitationUpdate, InvitationOut]):
    def get_multi_by_group(
        self, db: Session, *, group_id: UUID, page: int = 0, page_break: bool = False
    ) -> List[Invitation]:
        db_objs = db.query(self.model).filter(self.model.group_id == group_id)
        if not page_break:
            if page > 0:
                db_objs = db_objs.offset(page * settings.MULTI_MAX)
            db_objs = db_objs.limit(settings.MULTI_MAX)
        return db_objs.all()

    def get_multi_by_email(
        self, db: Session, *, email: str, page: int = 0, page_break: bool = False
    ) -> List[Invitation]:
        db_objs = db.query(self.model).filter(self.model.email == email)
        if not page_break:
            if page > 0:
                db_objs = db_objs.offset(page * settings.MULTI_MAX)
            db_objs = db_objs.limit(settings.MULTI_MAX)
        return db_objs.all()

    def get_count(self, db: Session, *, email: str) -> int:
        return db.query(self.model).filter(self.model.email == email).count()


invitation = CRUDInvitation(
    model=Invitation,
    schema=InvitationOut,
)
