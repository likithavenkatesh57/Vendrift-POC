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
  
