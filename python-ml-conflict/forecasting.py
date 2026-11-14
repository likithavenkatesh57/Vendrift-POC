"""A small forecasting utility using numba to speed up a numeric loop.

This is the subject of the conflict-detection test. numba==0.59.1 is pinned
in pyproject.toml deliberately, a real, older release whose own dependency
constraint (numpy >=1.22,<1.27, confirmed directly with Poetry) keeps numpy
below 2.0. Confirmed against the actual source (lib/core/run-security.ts,
prepareTransitive): when a transitive dependency can't reach a target
version because something else in the tree blocks it, the code checks the
real, resulting version afterward and reports the specific blocker, rather
than assuming the bump succeeded.

Honest caveat, not glossed over: at the time this was built, numpy's
currently-allowed range here (1.22 up to 1.27) carries no known OSV advisory
of its own. This project tests the conflict-reporting mechanism on a real,
reproducible version constraint — not a currently live, OSV-flagged
vulnerability. Treat any PR or lack of one here as a test of that specific
mechanism, not of an active security fix.
"""
from numba import njit
import numpy as np


@njit
def _smoothed_forecast(values: np.ndarray, alpha: float) -> np.ndarray:
    out = np.empty_like(values)
    out[0] = values[0]
    for i in range(1, len(values)):
        out[i] = alpha * values[i] + (1 - alpha) * out[i - 1]
    return out


def forecast_next(values: list[float], alpha: float = 0.3) -> float:
    arr = np.array(values, dtype=np.float64)
    smoothed = _smoothed_forecast(arr, alpha)
    return float(smoothed[-1])
