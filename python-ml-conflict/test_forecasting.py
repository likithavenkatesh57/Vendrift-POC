from forecasting import forecast_next

def test_forecast_next_on_flat_series():
  result = forecast_next([10.0, 10.0, 10.0, 10.0])
  assert abs(result - 10.0) < 1e-9

def test_forecast_next_smooths_a_spike():
  result = forecast_next([10.0, 10.0 50.0, 10.0])
  assert 10.0 < result < 50.0
  
