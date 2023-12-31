from __future__ import annotations
from typing import Optional, List, Union
from pydantic import Field, validator
from sqlalchemy.orm import Query
from uuid import UUID
from datetime import datetime

from app.schemas.base_schema import BaseSchema, LocaleType
from app.schemas.form import FormAttributeModel
from app.schemas.comment import Comment


class ResponseBase(BaseSchema):
    id: Optional[UUID] = Field(None, description="Automatically generated unique identity.")
    created: Optional[datetime] = Field(None, description="Automatically generated date response was created.")
    modified: Optional[datetime] = Field(None, description="Automatically generated date response was last modified.")
    answer: Optional[Union[List[FormAttributeModel], FormAttributeModel]] = Field(
        {},
        description="Dictionary defining the answer response to a question raised in a `node`.",
    )
    validated: Optional[bool] = Field(False, description="Answer meets formType validation requirements.")
    language: Optional[LocaleType] = Field(
        None,
        description="Specify the language of pathway. Controlled vocabulary defined by ISO 639-1, ISO 639-2 or ISO 639-3.",
    )


class ResponseCreate(ResponseBase):
    id: UUID = Field(..., description="Automatically generated unique identity.")
    answer: Union[List[FormAttributeModel], FormAttributeModel] = Field(
        ..., description="Dictionary defining the answer response to a question raise in a `node`."
    )
    node_id: UUID = Field(..., description="Response associated node identity.")
    group_id: Optional[UUID] = Field(None, description="Response associated group identity.")
    respondent_id: UUID = Field(..., description="Response associated respondent identity.")


class ResponseUpdate(ResponseCreate):
    id: UUID = Field(..., description="Automatically generated unique identity.")
    node_id: Optional[UUID] = Field(None, description="Response associated node identity.")


class Response(ResponseBase):
    id: UUID = Field(..., description="Automatically generated unique identity.")
    answer: Union[List[FormAttributeModel], FormAttributeModel] = Field(
        ..., description="Dictionary defining the answer response to a question raise in a `node`."
    )
    node_id: UUID = Field(..., description="Response associated node identity.")
    group_id: Optional[UUID] = Field(None, description="Response associated group identity.")
    respondent_id: UUID = Field(..., description="Response associated respondent identity.")
    comments: Optional[int] = Field(default=0, description="A count of comments to this response.")

    @validator("comments", pre=True)
    def evaluate_lazy_comments(cls, v):
        # https://github.com/samuelcolvin/pydantic/issues/1334#issuecomment-745434257
        # Call PydanticModel.from_orm(dbQuery)
        if isinstance(v, Query):
            return v.count()
        if isinstance(v, int):
            return v
        return 0


class ResponseCommented(Response):
    comments: Optional[List[Comment]] = Field([], description="A list of comments to this response.")

    @validator("comments", pre=True)
    def evaluate_lazy_comments(cls, v):
        # https://github.com/samuelcolvin/pydantic/issues/1334#issuecomment-745434257
        # Call PydanticModel.from_orm(dbQuery)
        if isinstance(v, Query):
            return v.all()
