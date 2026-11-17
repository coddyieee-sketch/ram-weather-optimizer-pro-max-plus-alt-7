import pytest
from fastapi.testclient import TestClient
from app import app

@pytest.fixture(autouse=True)
def reset_data():
    client = TestClient(app)
    client.post("/reset")

def test_submit_data():
    client = TestClient(app)
    response = client.post("/submit", json={"key": "some_key", "value": "some_value"})
    assert response.status_code == 200
    assert response.json() == {"message": "Data submitted successfully"}

def test_fetch_data():
    client = TestClient(app)
    client.post("/submit", json={"key": "some_key", "value": "some_value"})
    response = client.get("/fetch")
    assert response.status_code == 200
    assert response.json() == [{"key": "some_key", "value": "some_value"}]

def test_reset_data():
    client = TestClient(app)
    client.post("/submit", json={"key": "some_key", "value": "some_value"})
    response = client.post("/reset")
    assert response.status_code == 200
    assert response.json() == {"message": "Data reset successfully"}
    response = client.get("/fetch")
    assert response.status_code == 200
    assert response.json() == []

def test_get_status():
    client = TestClient(app)
    response = client.get("/status")
    assert response.status_code == 200
    assert response.json() == {"status": "OK", "data_count": 0}

def test_get_metrics():
    client = TestClient(app)
    response = client.get("/metrics")
    assert response.status_code == 200
    assert response.json() == {"metrics": {"data_count": 0}}

def test_get_logs():
    client = TestClient(app)
    response = client.get("/logs")
    assert response.status_code == 200
    assert response.json() == {"logs": []}

def test_healthcheck():
    client = TestClient(app)
    response = client.get("/healthcheck")
    assert response.status_code == 200
    assert response.json() == {"status": "OK"}

def test_invalid_submit_data():
    client = TestClient(app)
    response = client.post("/submit", json={"invalid_key": "some_value"})
    assert response.status_code == 422

def test_empty_submit_data():
    client = TestClient(app)
    response = client.post("/submit", json={})
    assert response.status_code == 422