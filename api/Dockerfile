FROM python:3.11-slim

RUN pip install --no-cache-dir poetry
WORKDIR /app

COPY pyproject.toml /app/
RUN poetry install --no-root

COPY app /app/app
EXPOSE 8000

CMD ["poetry","run","uvicorn","app.main:app","--host","0.0.0.0","--port","8000","--reload"]