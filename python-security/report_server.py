"""A small internal reporting service — real usage of each dependency below,
not just names sitting in a manifest. This is the subject of the direct,
real-CVE test (aiohttp, cryptography, PyJWT), run through the pipeline we
confirmed in lib/security/advisories.ts: chooseTarget() only ever moves
forward to a newer version, never backward, and verifiedTarget() re-checks
the chosen version against OSV before committing to it.
"""
import aiohttp
import jwt
from cryptography.fernet import Fernet


def issue_report_token(payload: dict, secret: str) -> str:
    """Signs a short-lived token granting access to a generated report."""
    return jwt.encode(payload, secret, algorithm="HS256")


def verify_report_token(token: str, secret: str) -> dict:
    return jwt.decode(token, secret, algorithms=["HS256"])


def encrypt_report_payload(data: bytes, key: bytes) -> bytes:
    """Encrypts a report body before it's written to shared storage."""
    return Fernet(key).encrypt(data)


def decrypt_report_payload(token: bytes, key: bytes) -> bytes:
    return Fernet(key).decrypt(token)


async def fetch_upstream_metrics(url: str) -> dict:
    """Pulls usage metrics from an internal metrics service."""
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()
