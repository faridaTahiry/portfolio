"""
Calendar Coach API — time-management advice from calendar events using an LLM.
Deploy to Render, Railway, Fly.io, or run locally with: uvicorn main:app --reload
"""

import os
from datetime import datetime
from typing import Any

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Calendar Coach API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

SYSTEM_PROMPT = """You are a friendly, practical time-management coach. The user will share their upcoming calendar events. Give concise, actionable advice to help them:
- Prioritize and protect focus time
- Spot overcommitment or back-to-back meetings
- Suggest buffer time or breaks where useful
- Notice patterns (e.g. no deep work blocks)
Keep the tone supportive and brief. Use bullet points. Do not make up events; only refer to what the user shared."""


class AdviceRequest(BaseModel):
    events: list[dict[str, Any]] = []


class AdviceResponse(BaseModel):
    advice: str


def format_events_for_prompt(events: list[dict]) -> str:
    if not events:
        return "No upcoming events this week."
    lines = []
    for e in events:
        summary = e.get("summary") or "(No title)"
        start = e.get("start") or "?"
        end = e.get("end") or "?"
        if start != "?":
            try:
                start = datetime.fromisoformat(start.replace("Z", "+00:00")).strftime("%c")
            except Exception:
                pass
        if end != "?":
            try:
                end = datetime.fromisoformat(end.replace("Z", "+00:00")).strftime("%c")
            except Exception:
                pass
        all_day = e.get("allDay", False)
        suffix = " [all day]" if all_day else ""
        lines.append(f"- {summary} ({start} – {end}){suffix}")
    return "\n".join(lines)


@app.post("/advice", response_model=AdviceResponse)
async def get_advice(request: AdviceRequest) -> AdviceResponse:
    events = request.events or []
    api_key = os.environ.get("OPENAI_API_KEY")

    if not api_key:
        return AdviceResponse(
            advice="**Setup required:** Set the `OPENAI_API_KEY` environment variable on this backend (e.g. on Render/Railway/Fly.io), then redeploy. After that, I can give you personalized time-management advice based on your calendar."
        )

    events_text = format_events_for_prompt(events)
    user_message = f"Here are my upcoming calendar events:\n\n{events_text}\n\nPlease give me time-management advice based on this."

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            r = await client.post(
                OPENAI_API_URL,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {api_key}",
                },
                json={
                    "model": "gpt-4o-mini",
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": user_message},
                    ],
                    "max_tokens": 800,
                    "temperature": 0.6,
                },
            )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"LLM request failed: {e}")

    if r.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail="LLM request failed. Check OPENAI_API_KEY and quota.",
        )

    data = r.json()
    content = (
        (data.get("choices") or [{}])[0]
        .get("message", {})
        .get("content", "")
        .strip()
        or "No response generated."
    )
    return AdviceResponse(advice=content)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}
