from cryptography.fernet import Fernet
from report_server import (
    issue_report token,
    verify_report_token,
    encrypt_report_payload,
    decrypt_report_payload,
)


def test_token_round_trip():
    token = issue_report_token({"report_id": 42}, secret="test-secret")
    decoded = verify_report_token(token, secret="test-secret")
    assert decoded["report_id"] == 42


def test_token_rejects_wrong_secret():
    token = issue_report_token({"report_id": 1}, secret="right-secret")
    try:
        verify_report_token(token, secret="wrong-secret")
        assert False, "expected a decode failure"
    except Exception:
        pass


def test_encrypt_decrypt_round_trip():
    key = Fernet.generate_key()
    original = b"quarterly usage report contents"
    encrypted = encrypt_report_payload(original, key)
    assert encrypted != original
    assert decrypt_report_payload(encrypted, key) == original 
